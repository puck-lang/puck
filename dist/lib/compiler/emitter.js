"use strict";
var ast_1 = require('./ast');
var helpers_1 = require('../helpers');
var jsKeywords = ['arguments', 'class', 'module', 'new', 'null', 'Object', 'typeof', 'undefined'];
var tokenToJs = Object['assign'](ast_1.tokenToText, (_a = {},
    _a[ast_1.SyntaxKind.AndKeyword] = '&&',
    _a[ast_1.SyntaxKind.OrKeyword] = '||',
    _a[ast_1.SyntaxKind.NotKeyword] = '!',
    _a
));
var Context;
(function (Context) {
    Context[Context["Return"] = 1] = "Return";
    Context[Context["Value"] = 2] = "Value";
})(Context || (Context = {}));
function Emitter() {
    var level = 0;
    var context = null;
    var allowReturnContext = true;
    var hoist;
    var valueVariable;
    var valueVarableCount = 0;
    var currentPrecedence;
    function newValueVariable() {
        valueVarableCount += 1;
        return "__PUCK__value__" + valueVarableCount;
    }
    function withContext(newContext, fn) {
        var wasInContext = context;
        context = newContext;
        var value = fn();
        context = wasInContext;
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
    function emitLines(block) {
        var wasInContext = context;
        context = null;
        var lines = [];
        var outerHoist = hoist;
        hoist = function (code) {
            lines.push(code);
        };
        for (var i = 0; i < block.length; i++) {
            if (wasInContext && i == block.length - 1) {
                context = wasInContext;
            }
            lines.push(emitExpressionKeepContext(block[i]));
        }
        hoist = outerHoist;
        return lines;
    }
    function emitModule(module) {
        var preamble = "#!/usr/bin/env node\n'use strict';\n";
        var lines = emitLines(module.lines.filter(function (e) { return !(e.kind === ast_1.SyntaxKind.TraitDeclaration ||
            e.kind === ast_1.SyntaxKind.TypeDeclaration ||
            (ast_1.isExport(e) && (e.expression.kind === ast_1.SyntaxKind.TraitDeclaration ||
                e.expression.kind === ast_1.SyntaxKind.TypeDeclaration))); }));
        return preamble + lines.join(';\n');
    }
    function emitBlock(block) {
        level++;
        var lines = emitLines(block.block);
        var body;
        var end = '}';
        if (lines.length !== 0) {
            var last = lines.length - 1;
            if (lines[last] !== 'break') {
                lines[last] = lines[last] + ";\n";
            }
            body = "\n" + indent(lines).join(";\n");
            end = indent(end, level - 1);
        }
        level--;
        return "{" + (body || '') + end;
    }
    function emitScalarExpression(expression) {
        switch (expression.kind) {
            case ast_1.SyntaxKind.Function: return emitFunctionDeclaration(expression);
            case ast_1.SyntaxKind.Identifier: return emitIdentifier(expression);
            case ast_1.SyntaxKind.VariableDeclaration: return emitVariableDeclaration(expression);
            case ast_1.SyntaxKind.ExportDirective: return emitExportDirective(expression);
            case ast_1.SyntaxKind.ImportDirective: return emitImportDirective(expression);
            case ast_1.SyntaxKind.AssignmentExpression: return emitAssignmentExpression(expression);
            case ast_1.SyntaxKind.BinaryExpression: return emitBinaryExpression(expression);
            case ast_1.SyntaxKind.CallExpression: return emitCallExpression(expression);
            case ast_1.SyntaxKind.UnaryExpression: return emitUnaryExpression(expression);
            case ast_1.SyntaxKind.WhileExpression: return emitWhileExpression(expression);
            case ast_1.SyntaxKind.IndexAccess: return emitIndexAccess(expression);
            case ast_1.SyntaxKind.MemberAccess: return emitMemberAccess(expression);
            case ast_1.SyntaxKind.BreakKeyword: return emitBreak(expression);
            case ast_1.SyntaxKind.ReturnStatement: return emitReturn(expression);
            case ast_1.SyntaxKind.ThrowKeyword: return emitThrow(expression);
            case ast_1.SyntaxKind.ArrayLiteral: return emitArrayLiteral(expression);
            case ast_1.SyntaxKind.BooleanLiteral: return emitBooleanLiteral(expression);
            case ast_1.SyntaxKind.NumberLiteral: return emitNumberLiteral(expression);
            case ast_1.SyntaxKind.ObjectLiteral: return emitObjectLiteral(expression);
            case ast_1.SyntaxKind.StringLiteral: return emitStringLiteral(expression);
        }
    }
    var currentValueVariableContext;
    function emitExpressionKeepContext(expression) {
        var outerValueVariableContext = currentValueVariableContext;
        if (currentValueVariableContext == valueVariable) {
            valueVariable = null;
        }
        else {
            currentValueVariableContext = valueVariable;
        }
        try {
            var scalarExpression = emitScalarExpression(expression);
            if (scalarExpression) {
                if (context == Context.Return) {
                    return "return " + scalarExpression;
                }
                else if (context == Context.Value && valueVariable) {
                    return valueVariable + " = " + scalarExpression;
                }
                else {
                    allowReturnContext = true;
                    return scalarExpression;
                }
            }
            switch (expression.kind) {
                case ast_1.SyntaxKind.IfExpression: return emitIfExpression(expression);
                default: throw ast_1.SyntaxKind[expression.kind] + " is not supported";
            }
        }
        finally {
            valueVariable = currentValueVariableContext;
            currentValueVariableContext = outerValueVariableContext;
        }
    }
    function emitExpression(expression, context) {
        if (context === void 0) { context = null; }
        return withContext(context, function () { return emitExpressionKeepContext(expression); });
    }
    function emitFunctionDeclaration(fn) {
        var name = fn.name ? emitIdentifier(fn.name) : '';
        var parameterList = fn.parameterList;
        var body = fn.body;
        if (parameterList.length > 0 && parameterList[0].identifier.name == 'self') {
            parameterList = fn.parameterList.slice(1);
            if (fn.body.block.length > 0) {
                body = Object['assign']({}, body, {
                    block: [Object['assign'](fn.parameterList[0], {
                        initializer: {
                            kind: ast_1.SyntaxKind.Identifier,
                            name: 'this',
                        }
                    })].concat(body.block)
                });
            }
        }
        var code = "function " + name + "(" + parameterList.map(emitFunctionParameter).join(', ') + ") ";
        code += withContext(Context.Return, function () { return emitBlock(body); });
        return code;
    }
    function emitFunctionParameter(vd) {
        var initializer = vd.initializer
            ? " = " + emitExpression(vd.initializer, Context.Value)
            : '';
        return "" + emitIdentifier(vd.identifier) + initializer;
    }
    function emitIdentifier(identifier) {
        if (jsKeywords.indexOf(identifier.name) != -1) {
            return "_" + identifier.name;
        }
        return identifier.name;
    }
    function emitVariableDeclaration(vd) {
        var binding = vd.scope.getBinding(vd.identifier.name);
        var willBeRedefined = binding.redefined;
        while (binding && binding.token !== vd) {
            binding = binding.previous;
        }
        var initializer = vd.initializer
            ? " = " + emitExpression(vd.initializer, Context.Value)
            : '';
        if (binding && binding.previous) {
            return "" + emitIdentifier(vd.identifier) + initializer;
        }
        if (context) {
            var valueVariable_1 = newValueVariable();
            hoist("let " + emitIdentifier(vd.identifier) + ";");
            return "" + emitIdentifier(vd.identifier) + initializer;
        }
        var kw = (vd.mutable || willBeRedefined) ? 'let' : 'const';
        return kw + " " + emitIdentifier(vd.identifier) + initializer;
    }
    function emitExportDirective(e) {
        return "export " + emitExpression(e.expression);
    }
    function emitImportDirective(i) {
        var specifier = ast_1.isIdentifier(i.specifier)
            ? "* as " + emitIdentifier(i.specifier)
            : "{" + i.specifier.members
                .filter(function (_a) {
                var property = _a.property, local = _a.local;
                if (/\.puck$/.test(i.path) && /^[A-Z]/.test(local.name) &&
                    ['TokenStream', 'InputStream', 'TopScopeVisitor', 'ScopeVisitor', 'ImportVisitor']
                        .indexOf(local.name) == -1) {
                    return false;
                }
                if (!i['module'])
                    return true;
                var e = i['module'].exports[local.name];
                return helpers_1.isTypeScopeDeclaration(e.expression);
            })
                .map(function (_a) {
                var property = _a.property, local = _a.local;
                return property.name === local.name
                    ? emitIdentifier(property)
                    : emitIdentifier(property) + " as " + emitIdentifier(local);
            })
                .join(', ') + "}";
        var path;
        if (i.domain == 'node') {
            path = i.path;
        }
        else if (i.domain == 'puck') {
            path = "puck-lang/dist/lib/stdlib/" + i.path;
        }
        else if (!i.domain) {
            if (i.path.charAt(0) == '/') {
                path = i.path;
            }
            else {
                path = "./" + i.path;
            }
            path = path.replace(/\.(puck|ts)$/, '.js');
        }
        else {
            throw "Unsupported import-domain \"" + i.domain + "\"";
        }
        return "import " + specifier + " from '" + path + "'";
    }
    function emitAssignmentExpression(e) {
        var left = ast_1.isIdentifier(e.lhs)
            ? emitIdentifier(e.lhs)
            : (ast_1.isMember(e.lhs)
                ? emitMemberAccess(e.lhs)
                : emitIndexAccess(e.lhs));
        return left + " " + tokenToJs[e.token.kind] + " " + emitExpression(e.rhs, Context.Value);
    }
    function emitBinaryExpression(e) {
        return withPrecedence(e.operator, function () {
            return (emitExpression(e.lhs) + " " + tokenToJs[e.operator.kind] + " " + emitExpression(e.rhs));
        });
    }
    function emitCallExpression(fn) {
        return emitExpression(fn.func) + "(" + fn.argumentList.map(function (arg) { return emitExpression(arg, Context.Value); }).join(', ') + ")";
    }
    function emitIfExpression(e) {
        var condition = emitExpression(e.condition, Context.Value);
        var produceValue = context == Context.Value;
        var outerValueVariable = valueVariable;
        if (produceValue) {
            valueVariable = newValueVariable();
        }
        var then = emitBlock(e._then);
        var el = e._else
            ? ("\n" + indent('else') + " " + emitBlock(e._else))
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
    function emitUnaryExpression(e) {
        return withPrecedence(e.operator, function () { return ("" + tokenToJs[e.operator.kind] + emitExpression(e.rhs)); });
    }
    function emitWhileExpression(e) {
        var body = function () { return emitBlock(e.body); };
        if (!context)
            return "while (" + emitExpression(e.condition) + ") " + body();
        var hoisted = '';
        var hoist = function (code) { return hoisted += "\n" + indent(code) + ";\n"; };
        return "(() => {" +
            "let __value__;" +
            ("while (" + emitExpression(e.condition) + ") {" + hoisted) +
            ("__value__ = " + withContext(Context.Value, body)) +
            "} return value})()";
    }
    function emitIndexAccess(e) {
        return emitExpression(e.object) + "[" + emitExpression(e.index, Context.Value) + "]";
    }
    function emitMemberAccess(e) {
        var object = e.object.kind == ast_1.SyntaxKind.NumberLiteral
            ? "(" + emitExpression(e.object) + ")"
            : emitExpression(e.object);
        return object + "." + emitExpression(e.member, Context.Value);
    }
    function emitBreak(_) {
        allowReturnContext = false;
        return "break";
    }
    function emitReturn(e) {
        allowReturnContext = false;
        context = null;
        return "return " + emitExpression(e.expression, Context.Value);
    }
    function emitThrow(e) {
        allowReturnContext = false;
        context = null;
        return "throw " + emitExpression(e.expression, Context.Value);
    }
    function emitArrayLiteral(l) {
        var members = l.members.map(function (e) { return emitExpression(e, Context.Value); });
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
    function emitBooleanLiteral(l) {
        return "" + l.value;
    }
    function emitNumberLiteral(l) {
        return "" + l.value;
    }
    function emitObjectLiteral(l) {
        var members = l.members.map(function (member) { return (emitIdentifier(member.name) + ": " + emitExpression(member.value, Context.Value)); });
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
    return { emitModule: emitModule };
}
exports.Emitter = Emitter;
var _a;
