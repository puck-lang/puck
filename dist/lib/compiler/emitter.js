"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var ast_1 = require("../ast/ast");
var token_1 = require("../ast/token");
var entities_1 = require("../entities");
var functions_1 = require("../typeck/src/functions");
var impls_1 = require("../typeck/src/impls");
var scope_1 = require("../typeck/src/scope");
var jsKeywords = [
    'arguments', 'case', 'class', 'default', 'delete', 'function', 'global', 'module', 'new', 'null',
    'require', 'static', 'Object', 'typeof', 'undefined',
];
var tokenToJs = function (kind) {
    if (kind.kind == 'AndKeyword')
        return '&&';
    if (kind.kind == 'OrKeyword')
        return '||';
    if (kind.kind == 'NotKeyword')
        return '!';
    if (kind.kind == 'EqualsEqualsToken')
        return '===';
    if (kind.kind == 'ExclamationEqualsToken')
        return '!==';
    return token_1.SyntaxKind.name.call(kind);
};
var Context;
(function (Context) {
    Context[Context["Return"] = 1] = "Return";
    Context[Context["Value"] = 2] = "Value";
})(Context || (Context = {}));
function getEnumMember(pattern) {
    if (pattern.kind === 'UnitType' || pattern.kind === 'TupleType' || pattern.kind === 'RecordType') {
        var typePath = pattern.value[0] || pattern.value;
        if (typePath.type_.enumMember.kind == 'Some') {
            return typePath.type_.enumMember.value[0];
        }
    }
    return null;
}
function Emitter() {
    var level = 0;
    var context = null;
    var allowReturnContext = true;
    var hoist;
    var valueVariable;
    var valueVarableCount = 0;
    var currentPrecedence;
    var typeOverrides = {};
    var includeTraitObjectHelper = false;
    var exportPreamble = [];
    function newValueVariable() {
        valueVarableCount += 1;
        return "$puck_" + valueVarableCount;
    }
    function getType(e) {
        if (e.kind === 'Identifier' &&
            typeOverrides[e.value.name] &&
            typeOverrides[e.value.name].old === e.value.type_) {
            return typeOverrides[e.value.name].new;
        }
        return e.value.type_;
    }
    function unwrap(code, e) {
        var type = getType(e);
        if (type && type.kind.kind === 'Trait') {
            return code + ".value";
        }
        else if (!type || type.kind.kind === 'Parameter') {
            includeTraitObjectHelper = true;
            return "$unwrapTraitObject(" + code + ")";
        }
        return code;
    }
    function withContext(newContext, fn, forceSet) {
        if (forceSet === void 0) { forceSet = false; }
        if (!forceSet && newContext === Context.Return && context === Context.Return) {
            return fn();
        }
        if (newContext === Context.Return) {
            allowReturnContext = true;
        }
        var wasInContext = context;
        context = newContext;
        var value = fn();
        context = wasInContext;
        if (newContext === Context.Return) {
            allowReturnContext = true;
        }
        return value;
    }
    function withPrecedence(operator, emitter) {
        var parentPrecedence = currentPrecedence;
        currentPrecedence = token_1.SyntaxKind.precedence.call(operator.kind);
        if (parentPrecedence > currentPrecedence)
            return "(" + emitter() + ")";
        else
            return emitter();
    }
    function indent(lines, level_) {
        if (level_ === void 0) { level_ = level; }
        var indentation = '';
        for (var i = 0; i < level_; i++) {
            indentation += '  ';
        }
        if (Array.isArray(lines)) {
            return lines.map(function (line) { return indentation + line; });
        }
        else {
            return indentation + lines;
        }
    }
    function getTypeClass(type) {
        if (type._class && type.typeParameters && type.typeParameters.some(function (p) { return p.isTypeParameter; })) {
            return type._class;
        }
        else
            return type;
    }
    function getImplId(type, trait) {
        var opt = impls_1.getImplementationForTrait(type, trait).value;
        if (opt.kind == 'None') {
            throw Error('No impl');
        }
        return opt.value.id;
    }
    function implProp(impl) {
        return "[" + JSON.stringify(impl.id) + "]";
    }
    function emitExpressions(block, inContext, assignedTo_) {
        if (inContext === void 0) { inContext = context; }
        var wasInContext = inContext;
        context = null;
        var expressions = [];
        var outerHoist = hoist;
        hoist = function (code) {
            expressions.push(code);
        };
        var assignedTo;
        for (var i = 0; i < block.length; i++) {
            if (i == block.length - 1) {
                context = wasInContext;
                assignedTo = assignedTo_;
            }
            allowReturnContext = true;
            expressions.push(emitExpressionKeepContext(block[i], assignedTo));
        }
        hoist = outerHoist;
        return expressions;
    }
    function emitTopLevelStatements(block) {
        var expressions = [];
        hoist = function (code) {
            expressions.push(code);
        };
        for (var i = 0; i < block.length; i++) {
            context = null;
            allowReturnContext = true;
            if (isExported(block[i])) {
                expressions.push(emitExportDirective(block[i].value));
            }
            else {
                expressions.push(emitBlockLevelStatement(block[i].value, null));
            }
        }
        hoist = null;
        return expressions;
    }
    function emitBlockLevelStatements(block, inContext, assignedTo_) {
        if (inContext === void 0) { inContext = context; }
        var wasInContext = inContext;
        context = null;
        var expressions = [];
        var outerHoist = hoist;
        hoist = function (code) {
            expressions.push(code);
        };
        var assignedTo;
        for (var i = 0; i < block.length; i++) {
            if (i == block.length - 1) {
                context = wasInContext;
                assignedTo = assignedTo_;
            }
            allowReturnContext = true;
            expressions.push(emitBlockLevelStatement(block[i], assignedTo));
        }
        hoist = outerHoist;
        return expressions;
    }
    function isExported(e, kind) {
        if (kind === void 0) { kind = ''; }
        return e.kind === 'ExportDirective' &&
            (kind === '' || e.value.statement.kind === kind);
    }
    function emitModule(module, isBin) {
        var preamble = (isBin ? '#!/usr/bin/env node\n' : '') + "'use strict';\n";
        var statements = module.statements
            .filter(function (e) { return e.kind === 'ImportDirective'; })
            .map(function (e) { return emitImportDirective(e.value); });
        statements = statements.concat(module.statements
            .filter(function (e) { return e.kind === 'TypeDeclaration' || isExported(e, 'TypeDeclaration'); })
            .map(function (e) {
            return isExported(e, 'TypeDeclaration')
                ? emitExportDirective(e.value)
                : emitTypeDeclaration(e.value);
        }));
        statements = statements.concat(module.statements
            .filter(function (e) { return e.kind === 'EnumDeclaration' || isExported(e, 'EnumDeclaration'); })
            .map(function (e) {
            return isExported(e, 'EnumDeclaration')
                ? emitExportDirective(e.value)
                : emitEnumDeclaration(e.value);
        }));
        statements = statements.concat(module.statements
            .filter(function (e) { return e.kind === 'TraitDeclaration' || isExported(e, 'TraitDeclaration'); })
            .map(function (e) {
            return isExported(e, 'TraitDeclaration')
                ? emitExportDirective(e.value)
                : emitTraitDeclaration(e.value);
        }));
        statements = statements.concat(module.statements
            .filter(function (e) { return e.kind === 'ImplDeclaration'; })
            .map(function (e) { return emitImplDeclaration(e.value); }));
        statements = statements.concat(module.statements
            .filter(function (e) { return e.kind === 'ImplShorthandDeclaration'; })
            .map(function (e) { return emitImplShorthandDeclaration(e.value); }));
        statements = statements.concat(emitTopLevelStatements(module.statements
            .filter(function (e) {
            return e.kind === 'BlockLevelStatement' ||
                isExported(e, 'FunctionDeclaration') ||
                isExported(e, 'VariableDeclaration');
        })));
        if (includeTraitObjectHelper) {
            preamble += '\nconst $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);\n';
        }
        var e = '';
        if (exportPreamble.length) {
            e = exportPreamble.join(' = ') + 'undefined;\n';
        }
        return preamble + e + statements.join(';\n');
    }
    function emitBlock(block, inContext, assignedTo_) {
        level++;
        var expressions = emitBlockLevelStatements(block.statements, inContext, assignedTo_);
        var body;
        var end = '}';
        if (expressions.length !== 0) {
            var last = expressions.length - 1;
            if (expressions[last] !== 'break') {
                expressions[last] = expressions[last] + ";\n";
            }
            body = "\n" + indent(expressions).join(";\n");
            end = indent(end, level - 1);
        }
        level--;
        return "{" + (body || '') + end;
    }
    function emitBlockLevelStatement(expression, assignedTo) {
        switch (expression.kind) {
            case 'WhileLoop': return emitWhileLoop(expression.value);
            case 'BreakStatement': return emitBreak(expression.value);
            case 'ReturnStatement': return emitReturn(expression.value);
            case 'Expression': return emitExpressionKeepContext(expression.value, assignedTo);
        }
    }
    function emitScalarExpression(expression, assignedTo) {
        switch (expression.kind) {
            case 'ThrowStatement': return emitThrow(expression.value);
            case 'FunctionDeclaration': return emitFunctionDeclaration(expression.value);
            case 'Identifier': return emitIdentifier(expression.value);
            case 'VariableDeclaration': return emitVariableDeclaration(expression.value);
            case 'AssignmentExpression': return emitAssignmentExpression(expression.value);
            case 'BinaryExpression': return emitBinaryExpression(expression.value);
            case 'CallExpression': return emitCallExpression(expression.value);
            case 'TypePathExpression': return emitTypePath(expression.value.typePath);
            case 'UnaryExpression': return emitUnaryExpression(expression.value);
            case 'IndexAccess': return emitIndexAccess(expression.value);
            case 'MemberAccess': return emitMemberAccess(expression.value);
            case 'UnknownAccess': return emitMemberAccess(expression.value);
            case 'UnknownIndexAccess': return emitIndexAccess(expression.value);
            case 'BooleanLiteral': return emitBooleanLiteral(expression.value);
            case 'ListLiteral': return emitListLiteral(expression.value, assignedTo);
            case 'NumberLiteral': return emitNumberLiteral(expression.value);
            case 'RecordLiteral': return emitObjectLiteral(expression.value, assignedTo);
            case 'StringLiteral': return emitStringLiteral(expression.value);
            case 'TupleLiteral': return emitTupleLiteral(expression.value, assignedTo);
        }
    }
    var currentValueVariableContext;
    function emitExpressionKeepContext(expression, assignedTo) {
        if (assignedTo === void 0) { assignedTo = null; }
        var outerValueVariableContext = currentValueVariableContext;
        if (currentValueVariableContext == valueVariable) {
            valueVariable = null;
        }
        else {
            currentValueVariableContext = valueVariable;
        }
        try {
            var scalarExpression = emitScalarExpression(expression, assignedTo);
            if (scalarExpression) {
                var expressionType = getType(expression);
                if (assignedTo && expressionType && (context == Context.Return || context == Context.Value)) {
                    if (assignedTo.kind.kind === 'Trait' && getType(expression).kind.kind !== 'Trait') {
                        scalarExpression = "{type: '" + getImplId(expressionType, assignedTo) + "', value: " + scalarExpression + ", $isTraitObject: true}";
                    }
                    else if (assignedTo.kind.kind !== 'Trait') {
                        scalarExpression = unwrap(scalarExpression, expression);
                    }
                }
                if (allowReturnContext && context == Context.Return) {
                    allowReturnContext = false;
                    return "return " + scalarExpression;
                }
                else if (allowReturnContext && context == Context.Value && valueVariable) {
                    return valueVariable + " = " + scalarExpression;
                }
                else {
                    return scalarExpression;
                }
            }
            switch (expression.kind) {
                case 'IfExpression': return emitIfExpression(expression.value);
                case 'IfLetExpression': return emitIfLetExpression(expression.value);
                case 'MatchExpression': return emitMatchExpression(expression.value);
                default:
                    throw Error(expression.kind + " is not supported");
            }
        }
        finally {
            valueVariable = currentValueVariableContext;
            currentValueVariableContext = outerValueVariableContext;
        }
    }
    function emitExpression(expression, context, assignedTo_) {
        if (context === void 0) { context = null; }
        if (assignedTo_ === void 0) { assignedTo_ = null; }
        return withContext(context, function () { return emitExpressionKeepContext(expression, assignedTo_); }, false);
    }
    function emitEnumDeclaration(e, export_) {
        if (export_ === void 0) { export_ = ''; }
        return "var " + emitIdentifier(e.name) + " = " + export_ + "{\n" + indent(e.members.map(emitEnumMember).join('\n')) + "\n}";
    }
    function emitEnumMember(t) {
        var value;
        if (t.bound.kind == 'Some') {
            var bound = t.bound.value;
            if (bound.kind === 'RecordTypeBound') {
                value = "(object) => ({kind: '" + emitIdentifier(t.name) + "', value: object})";
            }
            else if (bound.kind === 'TupleTypeBound') {
                if (bound.value.properties.length === 0) {
                    value = "() => ({kind: '" + emitIdentifier(t.name) + "', value: null})";
                }
                else if (bound.value.properties.length === 1) {
                    value = "(member) => ({kind: '" + emitIdentifier(t.name) + "', value: member})";
                }
                else {
                    value = "(...members) => ({kind: '" + emitIdentifier(t.name) + "', value: members})";
                }
            }
            else {
                throw "Unsupported type bound";
            }
        }
        else {
            value = "{kind: '" + emitIdentifier(t.name) + "', value: Symbol('" + emitIdentifier(t.name) + "')}";
        }
        return emitIdentifier(t.name) + ": " + value + ",";
    }
    function emitFunctionDeclaration(fn, emitName) {
        if (emitName === void 0) { emitName = true; }
        var name = (emitName && fn.name.kind == 'Some') ? emitIdentifier(fn.name.value) : '';
        var parameterList = fn.parameterList;
        if (fn.body.kind == 'None')
            throw 'Function without body';
        var body = fn.body.value;
        var firstParameter = parameterList.length > 0 && parameterList[0];
        if (firstParameter && firstParameter.pattern.kind === 'Identifier' && firstParameter.pattern.value.identifier.name == 'self') {
            parameterList = fn.parameterList.slice(1);
            if (body.statements.length > 0) {
                body = __assign({}, body, { statements: [
                        {
                            kind: 'Expression',
                            value: {
                                kind: 'VariableDeclaration',
                                value: __assign({}, fn.parameterList[0], { initializer: {
                                        kind: 'Some',
                                        value: {
                                            kind: 'Identifier',
                                            value: {
                                                name: 'this',
                                            }
                                        }
                                    } }),
                            },
                        }
                    ].concat(body.statements) });
            }
        }
        var oldTypeOverrides = typeOverrides;
        typeOverrides = __assign({}, typeOverrides);
        if (fn.traitFunctionType) {
            var selfBinding = fn.traitFunctionType.kind.value.selfBinding;
            if (selfBinding.kind === 'Some') {
                typeOverrides['self'] = {
                    old: firstParameter.type_,
                    new: selfBinding.value.type_,
                };
            }
            parameterList.forEach(function (p, i) {
                if (p.pattern.kind === 'Identifier') {
                    typeOverrides[p.pattern.value.identifier.name] = {
                        old: p.type_,
                        new: fn.traitFunctionType.kind.value.parameters[i].type_,
                    };
                }
            });
        }
        var returnType = fn.traitFunctionType
            ? fn.traitFunctionType.kind.value.returnType
            : fn.returnType.kind === 'Some' && fn.returnType.value.value.type_;
        var code = "function " + name + "(" + parameterList.map(emitFunctionParameter).join(', ') + ") ";
        if (returnType && entities_1.Type.isEmpty && entities_1.Type.isEmpty.call(returnType)) {
            code += emitBlock(body, undefined, returnType);
        }
        else {
            code += withContext(Context.Return, function () { return emitBlock(body, undefined, returnType); }, true);
        }
        typeOverrides = oldTypeOverrides;
        return code;
    }
    function emitFunctionParameter(vd) {
        var initializer = vd.initializer.kind == 'Some'
            ? " = " + emitExpression(vd.initializer.value, Context.Value)
            : '';
        return "" + (emitPatternDestructuring(vd.pattern) || newValueVariable()) + initializer;
    }
    function emitIdentifier(identifier) {
        if (identifier.binding && identifier.binding.definition.token.value.importName) {
            return identifier.binding.definition.token.value.importName;
        }
        if (jsKeywords.indexOf(identifier.name) != -1) {
            return "_" + identifier.name;
        }
        return identifier.name;
    }
    function emitImplDeclaration(i) {
        var functions = Object['assign']({}, i.trait_.type_.kind.value.functions);
        i.members.forEach(function (m) { return functions[m.name.value.name] = emitFunctionDeclaration(m, false); });
        return "" + emitTypePath(i.trait_.path) + implProp(i.implementation) + " = {\n" + indent(Object.keys(functions).map(function (f) {
            return emitIdentifier({ name: f }) + ": " + (typeof functions[f] === 'string'
                ? functions[f]
                : emitTypePath(i.trait_.path) + "." + emitIdentifier({ name: f }));
        }))
            .join(',\n') + "\n}";
    }
    function emitImplShorthandDeclaration(i) {
        return i.members
            .map(function (m) {
            return emitTypePath(i.type_.path) + "." + emitIdentifier(m.name.value) + " = " + emitFunctionDeclaration(m, false);
        })
            .join(';\n');
    }
    function emitTraitDeclaration(t, export_) {
        if (export_ === void 0) { export_ = ''; }
        return "var " + emitIdentifier(t.name) + " = " + export_ + "{\n" + indent(t.members
            .filter(function (m) { return m.body.kind === 'Some'; })
            .map(function (m) { return emitIdentifier(m.name.value) + ": " + emitFunctionDeclaration(m, false); }))
            .join(',\n') + "\n}";
    }
    function emitTypeDeclaration(t, export_) {
        if (export_ === void 0) { export_ = ''; }
        var value;
        if (t.bound.kind == 'Some') {
            var bound = t.bound.value;
            if (bound.kind === 'RecordTypeBound') {
                value = "(object) => object";
            }
            else if (bound.kind === 'TupleTypeBound') {
                value = '(...members) => members';
            }
            else {
                throw "Unsupported type bound";
            }
        }
        else {
            value = "Symbol('" + emitIdentifier(t.name) + "')";
        }
        return "var " + emitIdentifier(t.name) + " = " + export_ + value;
    }
    function emitVariableDeclaration(vd, export_) {
        if (export_ === void 0) { export_ = ''; }
        var willBeRedefined = true;
        var binding;
        if (vd.pattern.kind === 'Identifier') {
            binding = scope_1.Scope.getBinding.call(vd.scope, vd.pattern.value.identifier.name).value;
            willBeRedefined = binding.redefined || (binding.previous && binding.previous.kind == 'Some');
            while (binding && binding.definition && binding.definition.token.value !== vd.pattern) {
                binding = binding.previous.value;
            }
        }
        var initializer = "";
        if (vd.initializer.kind == 'Some') {
            initializer = emitExpression(vd.initializer.value, Context.Value, vd.type_);
            var type = getType(vd.initializer.value);
            if (vd.pattern.kind !== 'Identifier' && vd.pattern.kind !== 'CatchAll') {
                initializer = unwrap(initializer, vd.initializer.value);
            }
            initializer = "" + export_ + initializer;
        }
        var destructure = emitPatternDestructuring(vd.pattern);
        if (initializer && destructure) {
            initializer = " = " + initializer;
        }
        if (binding && binding.previous && binding.previous.kind == 'Some') {
            return "" + (destructure || '') + initializer;
        }
        if (context) {
            var valueVariable_1 = newValueVariable();
            if (destructure) {
                hoist("let " + valueVariable_1 + initializer + ";");
                hoist("let " + destructure + " = " + valueVariable_1 + ";");
            }
            else {
                hoist("let " + valueVariable_1 + " = " + initializer + ";");
            }
            return valueVariable_1;
        }
        if (!destructure)
            return initializer;
        var kw = export_ ? 'var' : ((willBeRedefined || functions_1.isPatternMutable(vd.pattern)) ? 'let' : 'const');
        return kw + " " + destructure + initializer;
    }
    function emitExportDirective(e) {
        var export_ = "exports." + emitIdentifier(e.identifier) + " = ";
        var definition = "" + (e.statement.kind === 'EnumDeclaration'
            ? emitEnumDeclaration(e.statement.value, export_) :
            e.statement.kind === 'TraitDeclaration'
                ? emitTraitDeclaration(e.statement.value, export_) :
                e.statement.kind === 'TypeDeclaration'
                    ? emitTypeDeclaration(e.statement.value, export_) :
                    e.statement.kind === 'FunctionDeclaration'
                        ? emitFunctionDeclaration(e.statement.value, true) + ";\n" + export_ + emitIdentifier(e.identifier) :
                        e.statement.kind === 'VariableDeclaration'
                            ? emitVariableDeclaration(e.statement.value, export_)
                            : (function () { throw 'Unknown Exported statement'; })());
        exportPreamble.push("exports." + emitIdentifier(e.identifier));
        return definition;
    }
    function emitImportDirective(i) {
        var importName = i.specifier.kind === 'Identifier'
            ? "" + emitIdentifier(i.specifier.value)
            : newValueVariable();
        if (i.specifier.kind === 'ObjectDestructure') {
            i.specifier.value.members.forEach(function (m) {
                m['importName'] = importName + "." + emitIdentifier(m.property);
            });
        }
        var path;
        if (i.domain.kind == 'None') {
            if (i.path.charAt(0) == '/') {
                path = i.path;
            }
            else {
                path = "./" + i.path;
            }
            path = path.replace(/\.(puck|ts)$/, '');
        }
        else if (i.domain.value == 'node') {
            path = i.path;
        }
        else if (i.domain.value == 'puck') {
            path = "puck-lang/dist/lib/stdlib/" + i.path;
        }
        else {
            throw "Unsupported import-domain \"" + i.domain + "\"";
        }
        return "const " + importName + " = require(" + JSON.stringify(path) + ")";
    }
    function emitPatternDestructuring(p) {
        var isEnum = !!getEnumMember(p);
        if (p.kind === 'Identifier') {
            return emitIdentifier(p.value.identifier);
        }
        else if (p.kind === 'Record') {
            return "{" + p.value.properties.map(function (_a) {
                var property = _a.property, pattern = _a.pattern;
                var destructure = emitPatternDestructuring(pattern);
                if (destructure)
                    return emitIdentifier(property) + ": " + destructure;
            }).filter(function (p) { return !!p; }).join(', ') + "}";
        }
        else if (p.kind === 'RecordType') {
            var destructure = "{" + p.value[1].properties.map(function (_a) {
                var property = _a.property, pattern = _a.pattern;
                var destructure = emitPatternDestructuring(pattern);
                if (destructure)
                    return emitIdentifier(property) + ": " + destructure;
            }).filter(function (p) { return !!p; }).join(', ') + "}";
            if (isEnum) {
                destructure = "{value: " + destructure + "}";
            }
            return destructure;
        }
        else if (p.kind === 'Tuple') {
            return p.value.properties.length === 1
                ? emitPatternDestructuring(p.value.properties[0])
                : "[" + p.value.properties.map(emitPatternDestructuring).join(', ') + "]";
        }
        else if (p.kind === 'TupleType') {
            var destructure = p.value[1].properties.length === 1
                ? emitPatternDestructuring(p.value[1].properties[0])
                : "[" + p.value[1].properties.map(emitPatternDestructuring).join(', ') + "]";
            if (isEnum) {
                destructure = destructure && "{value: " + destructure + "}";
            }
            return destructure;
        }
    }
    function emitAssignmentExpression(e) {
        var left = emitScalarExpression(e.lhs, null);
        return left + " " + tokenToJs(e.token.kind) + " " + emitExpression(e.rhs, Context.Value, getType(e.lhs));
    }
    function emitBinaryExpression(e) {
        var call = e.call;
        if (call) {
            var lhsType = ast_1.Expression.getType.call(e.lhs);
            var rhsType = ast_1.Expression.getType.call(e.rhs);
            if (!rhsType ||
                (lhsType.id.value === 'Bool' && rhsType.id.value === 'Bool') ||
                (lhsType.id.value === 'Num' && rhsType.id.value === 'Num') ||
                (lhsType.id.value === 'String' && rhsType.id.value === 'String')) {
                call = false;
            }
        }
        if (call) {
            return emitCallExpression(e.call);
        }
        return withPrecedence(e.operator, function () {
            return emitExpression(e.lhs) + " " + tokenToJs(e.operator.kind) + " " + emitExpression(e.rhs);
        });
    }
    function emitCallExpression(fn_) {
        var fn = fn_;
        var functionName;
        var functionType = fn_.functionType || getType(fn.func);
        var parameterBindings = functionType && functionType.kind.value.parameters;
        if (fn.traitName) {
            parameterBindings = fn.functionType.kind.value.parameters;
            var selfBinding = fn.functionType.kind.value.selfBinding;
            if (selfBinding.kind === 'Some') {
                parameterBindings = [selfBinding.value].concat(parameterBindings);
            }
            var outerValueVariable = valueVariable;
            if (fn.isTraitObject) {
                if (fn.func.value.object.kind === 'Identifier') {
                    valueVariable = fn.func.value.object.value.name;
                }
                else {
                    valueVariable = newValueVariable();
                    hoist("let " + valueVariable + " = " + emitExpression(fn.func.value.object) + "\n");
                }
            }
            var traitName = fn.traitBinding && fn.traitBinding.definition.token.value.importName
                ? fn.traitBinding.definition.token.value.importName
                : fn.traitName;
            functionName = "" + traitName + ((fn.isShorthand || (selfBinding.kind === 'None' && !fn.isDirectTraitCall)) ? "" :
                fn.isTraitObject ? "[" + emitIdentifier({ name: valueVariable }) + ".type]"
                    : "" + implProp(fn.implementation)) + "." + emitIdentifier(fn.func.value.member);
            if (selfBinding.kind === 'Some') {
                if (fn.isTraitObject) {
                    fn.argumentList.unshift({
                        kind: 'Identifier',
                        value: {
                            name: valueVariable,
                            type_: fn.func.value.object.value.type_,
                        },
                    });
                }
                else {
                    fn.argumentList.unshift(fn.func.value.object);
                }
                functionName += '.call';
            }
            else if (fn.isDirectTraitCall) {
                functionName += '.call';
            }
            // transmute is a noop
            if (fn.implementation && fn.implementation.type_.id.kind === 'Some' &&
                fn.implementation.type_.id.value === 'Unknown' &&
                fn.func.value.member.name == 'transmute') {
                return emitExpression(fn.func.value.object);
            }
            valueVariable = outerValueVariable;
        }
        else {
            functionName = emitExpression(fn.func);
        }
        return functionName + "(" + fn.argumentList.map(function (arg, i) {
            return emitExpression(arg, Context.Value, parameterBindings && parameterBindings[i] && parameterBindings[i].type_);
        }).join(', ') + ")";
    }
    function emitIfExpression(e) {
        var condition = emitExpression(e.condition, Context.Value);
        var produceValue = context == Context.Value;
        var outerValueVariable = valueVariable;
        if (produceValue) {
            valueVariable = newValueVariable();
        }
        var then = emitBlock(e.then_);
        var el = e.else_.kind == 'Some'
            ? ("\n" + indent('else') + " " + emitBlock(e.else_.value))
            : '';
        var code = "if (" + condition + ") " + then + el;
        if (produceValue) {
            hoist("let " + valueVariable + ";\n" + indent(code));
            var thisValueVariable = valueVariable;
            valueVariable = outerValueVariable;
            return valueVariable
                ? valueVariable + " = " + thisValueVariable
                : thisValueVariable;
        }
        else
            return code;
    }
    function emitPatternComparison(pattern, expression) {
        var enumMember = getEnumMember(pattern);
        var condition = [];
        if (enumMember) {
            condition.push({
                kind: 'BinaryExpression',
                value: {
                    lhs: {
                        kind: 'MemberAccess',
                        value: {
                            object: expression,
                            member: {
                                name: 'kind',
                            },
                        }
                    },
                    operator: { kind: token_1.SyntaxKind.EqualsEqualsToken },
                    rhs: {
                        kind: 'StringLiteral',
                        value: {
                            parts: [{
                                    kind: 'Literal',
                                    value: { value: emitIdentifier({ name: enumMember }) },
                                }],
                        },
                    },
                }
            });
            var innerPattern = void 0;
            if (pattern.kind === 'TupleType') {
                innerPattern = {
                    kind: 'Tuple',
                    value: pattern.value[1],
                };
            }
            else if (pattern.kind === 'RecordType') {
                innerPattern = {
                    kind: 'Record',
                    value: pattern.value[1],
                };
            }
            if (innerPattern) {
                condition.push(emitPatternComparison(innerPattern, {
                    kind: 'MemberAccess',
                    value: {
                        object: expression,
                        member: {
                            name: 'value',
                        },
                    }
                }));
            }
        }
        else {
            if (pattern.kind === 'Record') {
                condition = pattern.value.properties
                    .map(function (p) { return emitPatternComparison(p.pattern, {
                    kind: 'MemberAccess',
                    value: {
                        object: expression,
                        member: p.property,
                    }
                }); });
            }
            else if (pattern.kind === 'Tuple') {
                if (pattern.value.properties.length === 1) {
                    condition.push(emitPatternComparison(pattern.value.properties[0], expression));
                }
                else {
                    condition = pattern.value.properties
                        .map(function (p, i) { return emitPatternComparison(p, {
                        kind: 'IndexAccess',
                        value: {
                            object: expression,
                            index: {
                                kind: 'NumberLiteral',
                                value: { value: i, type_: { kind: { kind: 'Struct' } } },
                            },
                        }
                    }); });
                }
            }
        }
        condition = condition.filter(function (e) { return e.kind !== 'BooleanLiteral'; });
        if (condition.length === 0)
            return { kind: 'BooleanLiteral', value: { value: true } };
        return condition.reduce(function (acc, curr) { return ({
            kind: 'BinaryExpression',
            value: {
                lhs: acc,
                operator: { kind: token_1.SyntaxKind.AndKeyword },
                rhs: curr,
            }
        }); });
    }
    function emitIfLetExpression(e) {
        var outerValueVariable = valueVariable;
        var initializer;
        if (e.expression.kind === 'Identifier' && e.expression.value.name.startsWith('$puck_')) {
            initializer = e.expression.value;
        }
        else {
            valueVariable = newValueVariable();
            hoist("let " + valueVariable + " = " + emitExpression(e.expression));
            initializer = { name: valueVariable, type_: { kind: { kind: 'Struct' } } };
        }
        var condition = emitPatternComparison(e.pattern, {
            kind: 'Identifier',
            value: initializer,
        });
        var then_ = {
            statements: [
                {
                    kind: 'Expression',
                    value: {
                        kind: 'VariableDeclaration',
                        value: {
                            scope: e.scope,
                            mutable: false,
                            pattern: e.pattern,
                            typeBound: { kind: 'None' },
                            initializer: {
                                kind: 'Some',
                                value: {
                                    kind: 'Identifier',
                                    value: initializer,
                                },
                            },
                        }
                    },
                }
            ].concat(e.then_.statements)
        };
        valueVariable = outerValueVariable;
        return emitIfExpression({
            condition: condition,
            then_: then_,
            else_: e.else_,
        });
    }
    function emitMatchExpression(e) {
        var outerValueVariable = valueVariable;
        valueVariable = newValueVariable();
        hoist("let " + valueVariable + " = " + emitExpression(e.expression));
        if (e.patterns.length === 0)
            return '';
        var ifLet;
        for (var i = e.patterns.length - 1; i >= 0; i--) {
            var arm = e.patterns[i];
            ifLet = {
                pattern: arm.pattern,
                expression: { kind: 'Identifier', value: { name: valueVariable } },
                scope: e.scope,
                then_: arm.block,
                else_: ifLet
                    ? { kind: 'Some', value: {
                            statements: [{ kind: 'Expression', value: { kind: 'IfLetExpression', value: ifLet } }],
                        } }
                    : { kind: 'None' },
            };
        }
        valueVariable = outerValueVariable;
        return emitIfLetExpression(ifLet);
    }
    function emitUnaryExpression(e) {
        return withPrecedence(e.operator, function () { return "" + tokenToJs(e.operator.kind) + emitExpression(e.rhs); });
    }
    function emitWhileLoop(e) {
        var body = function () { return emitBlock(e.body, null); };
        return "while (" + emitExpression(e.condition) + ") " + body();
    }
    function emitIndexAccess(e) {
        if (e.call) {
            return emitCallExpression(e.call);
        }
        return unwrap(emitExpression(e.object), e.object) + "[" + unwrap(emitExpression(e.index, Context.Value), e.index) + "]";
    }
    function emitMemberAccess(e) {
        var object = e.object.kind == 'NumberLiteral'
            ? "(" + emitExpression(e.object) + ")"
            : unwrap(emitExpression(e.object), e.object);
        var code = object + "." + emitIdentifier(e.member);
        return code;
    }
    function emitTypePath(e) {
        if (e.kind === 'Member') {
            return emitIdentifier(e.value);
        }
        else {
            return emitIdentifier(e.value[0]) + "." + emitTypePath(e.value[1]);
        }
    }
    function emitOldTypePath(e) {
        var object = emitExpression(e.object);
        return object + "." + emitExpression(e.member, Context.Value);
    }
    function emitBreak(_) {
        allowReturnContext = false;
        return "break";
    }
    function emitReturn(e) {
        var code = emitExpression(e.expression, Context.Return);
        allowReturnContext = false;
        return code;
    }
    function emitThrow(e) {
        allowReturnContext = false;
        return "throw " + emitExpression(e.expression, Context.Value);
    }
    function emitBooleanLiteral(l) {
        return "" + l.value;
    }
    function emitListLiteral(l, assignedTo) {
        var elementType;
        if (assignedTo && assignedTo.instance.kind === 'Some') {
            elementType = assignedTo.instance.value.typeParameters[0];
        }
        else if (l.type_ && l.type_.instance.kind === 'Some') {
            elementType = l.type_.instance.value.typeParameters[0];
        }
        var members = l.members.map(function (e) { return emitExpression(e, Context.Value, elementType); });
        var body;
        if (members.length == 0) {
            body = ']';
        }
        else if (l.members.length == 1) {
            body = members[0] + "]";
        }
        else {
            level++;
            body = "\n" + indent(members).join(",\n") + ",\n" + indent(']', level - 1);
            level--;
        }
        return "[" + body;
    }
    function emitNumberLiteral(l) {
        return "" + l.value;
    }
    function emitObjectLiteral(l, assignedTo) {
        var memberTypes;
        if (assignedTo && assignedTo.kind.value.kind && assignedTo.kind.value.kind.kind === 'Record') {
            memberTypes = assignedTo.kind.value.kind.value.properties;
        }
        var members = l.members.map(function (member) {
            return !member.kind
                ? emitIdentifier(member.name) + ": " + emitExpression(member.value, Context.Value, memberTypes && memberTypes[member.name.name]) :
                member.kind === 'Property'
                    ? emitIdentifier(member.value.name) + ": " + emitExpression(member.value.value, Context.Value, memberTypes && memberTypes[member.value.name.name])
                    : "..." + emitExpression(member.value, Context.Value);
        });
        var body;
        if (members.length == 0) {
            body = '}';
        }
        else if (l.members.length == 1) {
            body = members[0] + "}";
        }
        else {
            level++;
            body = "\n" + indent(members).join(",\n") + ",\n" + indent('}', level - 1);
            level--;
        }
        return "{" + body;
    }
    function emitStringLiteralPart(l) {
        return JSON.stringify(l.value);
    }
    function emitStringLiteral(l) {
        return l.parts
            .map(function (p) { return (p.kind === 'Literal')
            ? emitStringLiteralPart(p.value)
            : emitIdentifier(p.value); })
            .join(' + ');
    }
    function emitTupleLiteral(l, assignedTo) {
        var memberTypes;
        if (assignedTo && assignedTo.kind.value.kind && assignedTo.kind.value.kind.kind === 'Tuple') {
            memberTypes = assignedTo.kind.value.kind.value.properties;
        }
        var members = l.expressions.map(function (e, i) { return emitExpression(e, Context.Value, memberTypes && memberTypes[i]); });
        if (members.length == 0) {
            return 'null';
        }
        else if (l.expressions.length == 1) {
            return members[0];
        }
        else {
            level++;
            var body = "\n" + indent(members).join(",\n") + ",\n" + indent(']', level - 1);
            level--;
            return "[" + body;
        }
    }
    return { emitModule: emitModule };
}
exports.Emitter = Emitter;
