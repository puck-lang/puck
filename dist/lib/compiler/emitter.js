"use strict";
var ast_1 = require("./ast");
var entities_1 = require("../entities");
var impls_1 = require("../typeck/src/impls");
var jsKeywords = [
    'arguments', 'case', 'class', 'default', 'function', 'module', 'new', 'null',
    'static', 'Object', 'typeof', 'undefined',
];
var tokenToJs = Object['assign'](ast_1.tokenToText, (_a = {},
    _a[ast_1.SyntaxKind.AndKeyword] = '&&',
    _a[ast_1.SyntaxKind.OrKeyword] = '||',
    _a[ast_1.SyntaxKind.NotKeyword] = '!',
    _a));
var Context;
(function (Context) {
    Context[Context["Return"] = 1] = "Return";
    Context[Context["Value"] = 2] = "Value";
})(Context || (Context = {}));
function isEnumPattern(pattern) {
    if (pattern.kind === 'UnitType' || pattern.kind === 'TupleType' || pattern.kind === 'RecordType') {
        var typePath = pattern.value[0];
        if (typePath.kind === '_Object') {
            if (typePath.value[1].kind !== 'Member')
                throw 'Multi step type paths is not supported';
            return true;
        }
    }
    return false;
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
    function newValueVariable() {
        valueVarableCount += 1;
        return "__PUCK__value__" + valueVarableCount;
    }
    function getType(e) {
        if (e.kind === ast_1.SyntaxKind.Identifier &&
            typeOverrides[e.name] &&
            typeOverrides[e.name].old === e.type_) {
            return typeOverrides[e.name].new;
        }
        return e.type_;
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
        currentPrecedence = ast_1.precedence[operator.kind];
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
    function getTypeProp(type, trait) {
        if (trait) {
            var impls = impls_1.getImplementationsForInstance(type);
            impls = impls_1.getImplementationsForTrait(type, trait, impls);
            if (impls.length > 1) {
                impls = impls_1.getMostSpecificImplementations(type, impls);
            }
            type = impls[0].type_;
        }
        else {
            type = getTypeClass(type);
        }
        if (type && type.name && type.name.kind) {
            return "'$" + entities_1.Type.displayName.call(type) + "'";
        }
        return "'$" + type.name + "'";
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
    function emitModule(module, isBin) {
        var preamble = (isBin ? '#!/usr/bin/env node\n' : '') + "'use strict';\n";
        var expressions = module.expressions
            .filter(function (e) { return e.kind === ast_1.SyntaxKind.TypeDeclaration ||
            (ast_1.isExport(e) && e.expression.kind === ast_1.SyntaxKind.TypeDeclaration); })
            .map(function (e) {
            return ast_1.isExport(e)
                ? emitExportDirective(e)
                : emitTypeDeclaration(e);
        });
        expressions = expressions.concat(module.expressions
            .filter(function (e) { return e.kind === ast_1.SyntaxKind.EnumDeclaration ||
            (ast_1.isExport(e) && e.expression.kind === ast_1.SyntaxKind.EnumDeclaration); })
            .map(function (e) {
            return ast_1.isExport(e)
                ? emitExportDirective(e)
                : emitEnumDeclaration(e);
        }));
        expressions = expressions.concat(module.expressions
            .filter(function (e) { return e.kind === ast_1.SyntaxKind.TraitDeclaration ||
            (ast_1.isExport(e) && e.expression.kind === ast_1.SyntaxKind.TraitDeclaration); })
            .map(function (e) {
            return ast_1.isExport(e)
                ? emitExportDirective(e)
                : emitTraitDeclaration(e);
        }));
        expressions = expressions.concat(module.expressions
            .filter(function (e) { return e.kind === ast_1.SyntaxKind.ImplDeclaration; })
            .map(function (e) { return emitImplDeclaration(e); }));
        expressions = expressions.concat(module.expressions
            .filter(function (e) { return e.kind === ast_1.SyntaxKind.ImplShorthandDeclaration; })
            .map(function (e) { return emitImplShorthandDeclaration(e); }));
        expressions = expressions.concat(emitExpressions(module.expressions.filter(function (e) { return !(e.kind === ast_1.SyntaxKind.EnumDeclaration ||
            e.kind === ast_1.SyntaxKind.ImplDeclaration ||
            e.kind === ast_1.SyntaxKind.ImplShorthandDeclaration ||
            e.kind === ast_1.SyntaxKind.TraitDeclaration ||
            e.kind === ast_1.SyntaxKind.TypeDeclaration ||
            (ast_1.isExport(e) && (e.expression.kind === ast_1.SyntaxKind.EnumDeclaration ||
                e.expression.kind === ast_1.SyntaxKind.TraitDeclaration ||
                e.expression.kind === ast_1.SyntaxKind.TypeDeclaration))); })));
        if (includeTraitObjectHelper) {
            preamble += '\nconst $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);\n';
        }
        return preamble + expressions.join(';\n');
    }
    function emitBlock(block, inContext, assignedTo_) {
        level++;
        var expressions = emitExpressions(block.expressions, inContext, assignedTo_);
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
    function emitScalarExpression(expression, assignedTo) {
        switch (expression.kind) {
            case ast_1.SyntaxKind.Function: return emitFunctionDeclaration(expression);
            case ast_1.SyntaxKind.Identifier: return emitIdentifier(expression);
            case ast_1.SyntaxKind.VariableDeclaration: return emitVariableDeclaration(expression);
            case ast_1.SyntaxKind.ExportDirective: return emitExportDirective(expression);
            case ast_1.SyntaxKind.ImportDirective: return emitImportDirective(expression);
            case ast_1.SyntaxKind.AssignmentExpression: return emitAssignmentExpression(expression);
            case ast_1.SyntaxKind.BinaryExpression: return emitBinaryExpression(expression);
            case ast_1.SyntaxKind.CallExpression: return emitCallExpression(expression);
            case ast_1.SyntaxKind.TypePathExpression: return emitTypePath(expression.typePath);
            case ast_1.SyntaxKind.UnaryExpression: return emitUnaryExpression(expression);
            case ast_1.SyntaxKind.WhileLoop: return emitWhileLoop(expression);
            case ast_1.SyntaxKind.IndexAccess: return emitIndexAccess(expression);
            case ast_1.SyntaxKind.MemberAccess: return emitMemberAccess(expression);
            case ast_1.SyntaxKind.TypePath: return emitOldTypePath(expression);
            case ast_1.SyntaxKind.BreakKeyword: return emitBreak(expression);
            case ast_1.SyntaxKind.ReturnStatement: return emitReturn(expression);
            case ast_1.SyntaxKind.ThrowKeyword: return emitThrow(expression);
            case ast_1.SyntaxKind.BooleanLiteral: return emitBooleanLiteral(expression);
            case ast_1.SyntaxKind.ListLiteral: return emitListLiteral(expression, assignedTo);
            case ast_1.SyntaxKind.NumberLiteral: return emitNumberLiteral(expression);
            case ast_1.SyntaxKind.ObjectLiteral: return emitObjectLiteral(expression, assignedTo);
            case ast_1.SyntaxKind.StringLiteral: return emitStringLiteral(expression);
            case ast_1.SyntaxKind.TupleLiteral: return emitTupleLiteral(expression, assignedTo);
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
                if (assignedTo && expression.type_ && (context == Context.Return || context == Context.Value)) {
                    if (assignedTo.kind.kind === 'Trait' && getType(expression).kind.kind !== 'Trait') {
                        scalarExpression = "{type: " + getTypeProp(expression.type_, assignedTo) + ", value: " + scalarExpression + ", $isTraitObject: true}";
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
                case ast_1.SyntaxKind.IfExpression: return emitIfExpression(expression);
                case ast_1.SyntaxKind.IfLetExpression: return emitIfLetExpression(expression);
                case ast_1.SyntaxKind.MatchExpression: return emitMatchExpression(expression);
                default:
                    console.error('expression', expression);
                    throw Error(ast_1.SyntaxKind[expression.kind] + " is not supported");
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
    function emitEnumDeclaration(e) {
        return "var " + emitIdentifier(e.name) + " = {\n" + indent(e.members.map(emitEnumMember).join('\n')) + "\n}";
    }
    function emitEnumMember(t) {
        var value;
        if (t.bound.kind == 'Some') {
            var bound = t.bound.value[0];
            if (bound.kind === ast_1.SyntaxKind.ObjectTypeBound) {
                value = "(object) => ({kind: '" + emitIdentifier(t.name) + "', value: object})";
            }
            else if (bound.kind === ast_1.SyntaxKind.TupleTypeBound) {
                value = "(...members) => ({kind: '" + emitIdentifier(t.name) + "', value: members})";
            }
            else {
                throw "Unsupproted type bound " + ast_1.SyntaxKind[t.bound.kind] + ", " + t.bound.kind;
            }
        }
        else {
            value = "{kind: '" + emitIdentifier(t.name) + "', value: Symbol('" + emitIdentifier(t.name) + "')}";
        }
        return emitIdentifier(t.name) + ": " + value + ",";
    }
    function emitFunctionDeclaration(fn) {
        var name = fn.name.kind == 'Some' ? emitIdentifier(fn.name.value[0]) : '';
        var parameterList = fn.parameterList;
        if (fn.body.kind == 'None')
            throw 'Function without body';
        var body = fn.body.value[0];
        var firstParameter = parameterList.length > 0 && parameterList[0];
        if (firstParameter && firstParameter.pattern.kind === 'Identifier' && firstParameter.pattern.value[0].name == 'self') {
            parameterList = fn.parameterList.slice(1);
            if (body.expressions.length > 0) {
                body = Object['assign']({}, body, {
                    expressions: [Object['assign'](fn.parameterList[0], {
                            initializer: {
                                kind: 'Some',
                                value: [{
                                        kind: ast_1.SyntaxKind.Identifier,
                                        name: 'this',
                                    }]
                            }
                        })].concat(body.expressions)
                });
            }
        }
        if (fn.traitFunctionType) {
            var selfBinding = fn.traitFunctionType.kind.value[0].selfBinding;
            if (selfBinding.kind === 'Some') {
                typeOverrides['self'] = {
                    old: firstParameter.type_,
                    new: selfBinding.value[0].type_,
                };
            }
            parameterList.forEach(function (p, i) {
                if (p.pattern.kind === 'Identifier') {
                    typeOverrides[p.pattern.value[0].name] = {
                        old: p.pattern.value[0].type_,
                        new: fn.traitFunctionType.kind.value[0]._arguments[i].type_,
                    };
                }
            });
        }
        var returnType = fn.traitFunctionType
            ? fn.traitFunctionType.kind.value[0].returnType
            : fn.returnType.kind === 'Some' && fn.returnType.value[0].type_;
        var code = "function " + name + "(" + parameterList.map(emitFunctionParameter).join(', ') + ") ";
        code += withContext(Context.Return, function () { return emitBlock(body, undefined, returnType); }, true);
        typeOverrides = {};
        return code;
    }
    function emitFunctionParameter(vd) {
        var initializer = vd.initializer.kind == 'Some'
            ? " = " + emitExpression(vd.initializer.value[0], Context.Value)
            : '';
        return "" + emitPatternDestructuring(vd.pattern) + initializer;
    }
    function emitIdentifier(identifier) {
        if (jsKeywords.indexOf(identifier.name) != -1) {
            return "_" + identifier.name;
        }
        return identifier.name;
    }
    function emitImplDeclaration(i) {
        var functions = Object['assign']({}, i.trait_.type_.kind.value[0].functions);
        i.members.forEach(function (m) { return functions[m.name.value[0].name] = emitFunctionDeclaration(m); });
        return emitTypePath(i.trait_.path) + "[" + getTypeProp(i.type_.type_) + "] = {\n" + indent(Object.keys(functions).map(function (f) {
            return emitIdentifier({ name: f }) + ": " + (typeof functions[f] === 'string'
                ? functions[f]
                : emitTypePath(i.trait_.path) + "." + emitIdentifier({ name: f }));
        }))
            .join(',\n') + "\n}";
    }
    function emitImplShorthandDeclaration(i) {
        return i.members
            .map(function (m) {
            return emitTypePath(i.type_.path) + "." + emitIdentifier(m.name.value[0]) + " = " + emitFunctionDeclaration(m);
        })
            .join(';\n');
    }
    function emitTraitDeclaration(t) {
        return "var " + emitIdentifier(t.name) + " = {\n" + indent(t.members
            .filter(function (m) { return m.body.kind === 'Some'; })
            .map(function (m) { return emitIdentifier(m.name.value[0]) + ": " + emitFunctionDeclaration(m); }))
            .join(',\n') + "\n}";
    }
    function emitTypeDeclaration(t) {
        var value;
        if (t.bound.kind == 'Some') {
            var bound = t.bound.value[0];
            if (bound.kind === ast_1.SyntaxKind.ObjectTypeBound) {
                value = "(object) => object";
            }
            else if (bound.kind === ast_1.SyntaxKind.TupleTypeBound) {
                value = '(...members) => members';
            }
            else {
                throw "Unsupproted type bound " + ast_1.SyntaxKind[t.bound.kind] + ", " + t.bound.kind;
            }
        }
        else {
            value = "Symbol('" + emitIdentifier(t.name) + "')";
        }
        return "var " + emitIdentifier(t.name) + " = " + value;
    }
    function emitVariableDeclaration(vd) {
        var willBeRedefined = true;
        var binding;
        if (vd.pattern.kind === 'Identifier') {
            if (!vd.scope) {
                console.log('vasdas', vd);
            }
            binding = vd.scope.getBinding(vd.pattern.value[0].name);
            willBeRedefined = binding.redefined;
            while (binding && (binding.token !== vd.pattern)) {
                binding = binding.previous;
            }
        }
        var initializer = vd.initializer.kind == 'Some'
            ? " = " + emitExpression(vd.initializer.value[0], Context.Value, vd.type_)
            : '';
        if (binding && binding.previous) {
            return "" + emitPatternDestructuring(vd.pattern) + initializer;
        }
        if (context) {
            var valueVariable_1 = newValueVariable();
            hoist("let " + emitPatternDestructuring(vd.pattern) + ";");
            return "" + emitPatternDestructuring(vd.pattern) + initializer;
        }
        var kw = (vd.mutable || willBeRedefined) ? 'let' : 'const';
        return kw + " " + emitPatternDestructuring(vd.pattern) + initializer;
    }
    function emitExportDirective(e) {
        return "export " + (e.expression.kind === ast_1.SyntaxKind.EnumDeclaration
            ? emitEnumDeclaration(e.expression) :
            e.expression.kind === ast_1.SyntaxKind.TraitDeclaration
                ? emitTraitDeclaration(e.expression) :
                e.expression.kind === ast_1.SyntaxKind.TypeDeclaration
                    ? emitTypeDeclaration(e.expression)
                    : emitExpression(e.expression));
    }
    function emitImportDirective(i) {
        var specifier = ast_1.isIdentifier(i.specifier)
            ? "* as " + emitIdentifier(i.specifier)
            : "{" + i.specifier.members
                .map(function (_a) {
                var property = _a.property, local = _a.local;
                return property.name === local.name
                    ? emitIdentifier(property)
                    : emitIdentifier(property) + " as " + emitIdentifier(local);
            })
                .join(', ') + "}";
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
        else if (i.domain.value[0] == 'node') {
            path = i.path;
        }
        else if (i.domain.value[0] == 'puck') {
            path = "puck-lang/dist/lib/stdlib/" + i.path;
        }
        else {
            throw "Unsupported import-domain \"" + i.domain + "\"";
        }
        return "import " + specifier + " from '" + path + "'";
    }
    function emitPatternDestructuring(p) {
        var isEnum = isEnumPattern(p);
        if (p.kind === 'CatchAll') {
            return newValueVariable();
        }
        if (p.kind === 'Identifier') {
            return emitIdentifier(p.value[0]);
        }
        else if (p.kind === 'Record') {
            return "{" + p.value[0].properties.map(function (_a) {
                var property = _a.property, pattern = _a.pattern;
                return emitIdentifier(property) + ": " + emitPatternDestructuring(pattern);
            }).join(', ') + "}";
        }
        else if (p.kind === 'RecordType') {
            var destructure = "{" + p.value[1].properties.map(function (_a) {
                var property = _a.property, pattern = _a.pattern;
                return emitIdentifier(property) + ": " + emitPatternDestructuring(pattern);
            }).join(', ') + "}";
            if (isEnum) {
                destructure = "{value: " + destructure + "}";
            }
            return destructure;
        }
        else if (p.kind === 'Tuple') {
            return "[" + p.value[0].properties.map(emitPatternDestructuring).join(', ') + "]";
        }
        else if (p.kind === 'TupleType') {
            var destructure = "[" + p.value[1].properties.map(emitPatternDestructuring).join(', ') + "]";
            if (isEnum) {
                destructure = "{value: " + destructure + "}";
            }
            return destructure;
        }
    }
    function emitAssignmentExpression(e) {
        var left = ast_1.isIdentifier(e.lhs)
            ? emitIdentifier(e.lhs)
            : (ast_1.isMember(e.lhs)
                ? emitMemberAccess(e.lhs)
                : emitIndexAccess(e.lhs));
        return left + " " + tokenToJs[e.token.kind] + " " + emitExpression(e.rhs, Context.Value, e.lhs.type_);
    }
    function emitBinaryExpression(e) {
        return withPrecedence(e.operator, function () {
            return emitExpression(e.lhs) + " " + tokenToJs[e.operator.kind] + " " + emitExpression(e.rhs);
        });
    }
    function emitCallExpression(fn_) {
        var fn = fn_;
        var functionName;
        var argumentBindings = fn.func.type_ && fn.func.type_.kind.value[0]._arguments;
        if (fn.traitName) {
            argumentBindings = fn.functionType.kind.value[0]._arguments;
            var selfBinding = fn.functionType.kind.value[0].selfBinding;
            if (selfBinding.kind === 'Some') {
                argumentBindings = [selfBinding.value[0]].concat(argumentBindings);
            }
            var outerValueVariable = void 0;
            if (fn.isTraitObject) {
                outerValueVariable = valueVariable;
                if (fn.func.object.kind === ast_1.SyntaxKind.Identifier) {
                    valueVariable = fn.func.object.name;
                }
                else {
                    valueVariable = newValueVariable();
                    hoist("let " + valueVariable + " = " + emitExpression(fn.func.object) + "\n");
                }
            }
            functionName = "" + fn.traitName + (fn.isShorthand ? "" :
                fn.isTraitObject ? "[" + emitIdentifier({ name: valueVariable }) + ".type]"
                    : "[" + getTypeProp(fn.implementationType) + "]") + "." + emitIdentifier(fn.func.member);
            if (fn.functionType.kind.value[0].selfBinding.kind === 'Some') {
                if (fn.isTraitObject) {
                    fn.argumentList.unshift({
                        kind: ast_1.SyntaxKind.Identifier,
                        name: valueVariable,
                        type_: fn.func.object.type_,
                    });
                    valueVariable = outerValueVariable;
                }
                else {
                    fn.argumentList.unshift(fn.func.object);
                }
                functionName += '.call';
            }
        }
        else {
            functionName = emitExpression(fn.func);
        }
        return functionName + "(" + fn.argumentList.map(function (arg, i) {
            return emitExpression(arg, Context.Value, argumentBindings && argumentBindings[i] && argumentBindings[i].type_);
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
            ? ("\n" + indent('else') + " " + emitBlock(e.else_.value[0]))
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
        var isEnum = isEnumPattern(pattern);
        var condition = [];
        if (isEnum) {
            var typePath = pattern.value[0];
            condition.push({
                kind: ast_1.SyntaxKind.BinaryExpression,
                lhs: {
                    kind: ast_1.SyntaxKind.MemberAccess,
                    object: expression,
                    member: {
                        kind: ast_1.SyntaxKind.Identifier,
                        name: 'kind',
                    },
                },
                operator: { kind: ast_1.SyntaxKind.EqualsEqualsToken },
                rhs: {
                    kind: ast_1.SyntaxKind.StringLiteral,
                    parts: [{
                            kind: ast_1.SyntaxKind.StringLiteralPart,
                            value: emitIdentifier(typePath.value[1].value[0]),
                        }],
                },
            });
            var innerPattern = void 0;
            if (pattern.kind === 'TupleType') {
                innerPattern = {
                    kind: 'Tuple',
                    value: [pattern.value[1]],
                };
            }
            else if (pattern.kind === 'RecordType') {
                innerPattern = {
                    kind: 'Record',
                    value: [pattern.value[1]],
                };
            }
            if (innerPattern) {
                condition.push(emitPatternComparison(innerPattern, {
                    kind: ast_1.SyntaxKind.MemberAccess,
                    object: expression,
                    member: {
                        kind: ast_1.SyntaxKind.Identifier,
                        name: 'value',
                    },
                }));
            }
        }
        else {
            if (pattern.kind === 'Record') {
                condition = pattern.value[0].properties
                    .map(function (p) { return emitPatternComparison(p.pattern, {
                    kind: ast_1.SyntaxKind.MemberAccess,
                    object: expression,
                    member: p.property,
                }); });
            }
            else if (pattern.kind === 'Tuple') {
                condition = pattern.value[0].properties
                    .map(function (p, i) { return emitPatternComparison(p, {
                    kind: ast_1.SyntaxKind.IndexAccess,
                    object: expression,
                    index: {
                        kind: ast_1.SyntaxKind.NumberLiteral,
                        value: i,
                    },
                }); });
            }
        }
        condition = condition.filter(function (e) { return e.kind !== ast_1.SyntaxKind.BooleanLiteral; });
        if (condition.length === 0)
            return { kind: ast_1.SyntaxKind.BooleanLiteral, value: true };
        return condition.reduce(function (acc, curr) { return ({
            kind: ast_1.SyntaxKind.BinaryExpression,
            lhs: acc,
            operator: { kind: ast_1.SyntaxKind.AndKeyword },
            rhs: curr,
        }); });
    }
    function emitIfLetExpression(e) {
        var outerValueVariable = valueVariable;
        valueVariable = newValueVariable();
        hoist("let " + valueVariable + " = " + emitExpression(e.expression));
        var condition = emitPatternComparison(e.pattern, {
            kind: ast_1.SyntaxKind.Identifier,
            name: valueVariable,
        });
        var then_ = {
            kind: e.then_.kind,
            expressions: [
                {
                    scope: e.scope,
                    kind: ast_1.SyntaxKind.VariableDeclaration,
                    mutable: false,
                    pattern: e.pattern,
                    typeBound: { kind: 'None' },
                    initializer: {
                        kind: 'Some',
                        value: [{
                                kind: ast_1.SyntaxKind.Identifier,
                                name: valueVariable,
                            }],
                    },
                }
            ].concat(e.then_.expressions)
        };
        valueVariable = outerValueVariable;
        return emitIfExpression({
            kind: ast_1.SyntaxKind.IfExpression,
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
                kind: ast_1.SyntaxKind.IfLetExpression,
                pattern: arm.pattern,
                expression: { kind: ast_1.SyntaxKind.Identifier, name: valueVariable },
                scope: e.scope,
                then_: arm.block,
                else_: ifLet
                    ? { kind: 'Some', value: [{
                                kind: ast_1.SyntaxKind.Block,
                                expressions: [ifLet]
                            }] }
                    : { kind: 'None' }
            };
        }
        valueVariable = outerValueVariable;
        return emitIfLetExpression(ifLet);
    }
    function emitUnaryExpression(e) {
        return withPrecedence(e.operator, function () { return "" + tokenToJs[e.operator.kind] + emitExpression(e.rhs); });
    }
    function emitWhileLoop(e) {
        var body = function () { return emitBlock(e.body, null); };
        return "while (" + emitExpression(e.condition) + ") " + body();
    }
    function emitIndexAccess(e) {
        return unwrap(emitExpression(e.object), e.object) + "[" + unwrap(emitExpression(e.index, Context.Value), e.index) + "]";
    }
    function emitMemberAccess(e) {
        var object = e.object.kind == ast_1.SyntaxKind.NumberLiteral
            ? "(" + emitExpression(e.object) + ")"
            : unwrap(emitExpression(e.object), e.object);
        return object + "." + emitExpression(e.member, Context.Value);
    }
    function emitTypePath(e) {
        if (e.kind === 'Member') {
            return emitIdentifier(e.value[0]);
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
            elementType = assignedTo.instance.value[0].typeParameters[0];
        }
        else if (l.type_ && l.type_.instance.kind === 'Some') {
            elementType = l.type_.instance.value[0].typeParameters[0];
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
        if (assignedTo && assignedTo.kind.value[0].kind && assignedTo.kind.value[0].kind.kind === 'Record') {
            memberTypes = assignedTo.kind.value[0].kind.value[0].properties;
        }
        var members = l.members.map(function (member) { return emitIdentifier(member.name) + ": " + emitExpression(member.value, Context.Value, memberTypes && memberTypes[member.name.name]); });
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
        if (l.value !== undefined)
            return emitStringLiteralPart(l);
        return l.parts
            .map(function (p) { return p.kind === ast_1.SyntaxKind.StringLiteralPart
            ? emitStringLiteralPart(p)
            : emitIdentifier(p); })
            .join(' + ');
    }
    function emitTupleLiteral(l, assignedTo) {
        var memberTypes;
        if (assignedTo && assignedTo.kind.value[0].kind && assignedTo.kind.value[0].kind.kind === 'Tuple') {
            memberTypes = assignedTo.kind.value[0].kind.value[0].properties;
        }
        var members = l.expressions.map(function (e, i) { return emitExpression(e, Context.Value, memberTypes && memberTypes[i]); });
        var body;
        if (members.length == 0) {
            body = ']';
        }
        else if (l.expressions.length == 1) {
            body = members[0] + "]";
        }
        else {
            level++;
            body = "\n" + indent(members).join(",\n") + ",\n" + indent(']', level - 1);
            level--;
        }
        return "[" + body;
    }
    return { emitModule: emitModule };
}
exports.Emitter = Emitter;
var _a;
