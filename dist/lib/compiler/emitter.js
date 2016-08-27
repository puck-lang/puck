"use strict";
var ast_1 = require('./ast');
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
var level = 0;
var context = null;
var allowReturnContext = true;
var hoist;
var valueVariable;
var valueVarableCount = 0;
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
function emitProgram(program) {
    var preamble = "#!/usr/bin/env node\n'use strict';\n";
    var lines = emitLines(program.block);
    return preamble + lines.join(';\n');
}
exports.emitProgram = emitProgram;
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
exports.emitBlock = emitBlock;
function emitScalarExpression(expression) {
    switch (expression.kind) {
        case ast_1.SyntaxKind.Function: return emitFunctionDeclaration(expression);
        case ast_1.SyntaxKind.Identifier: return emitIdentifier(expression);
        case ast_1.SyntaxKind.VariableDeclaration: return emitVariableDeclaration(expression);
        case ast_1.SyntaxKind.AssignmentExpression: return emitAssignmentExpression(expression);
        case ast_1.SyntaxKind.BinaryExpression: return emitBinaryExpression(expression);
        case ast_1.SyntaxKind.CallExpression: return emitCallExpression(expression);
        case ast_1.SyntaxKind.UnaryExpression: return emitUnaryExpression(expression);
        case ast_1.SyntaxKind.WhileExpression: return emitWhileExpression(expression);
        case ast_1.SyntaxKind.IndexAccess: return emitIndexAccess(expression);
        case ast_1.SyntaxKind.MemberAccess: return emitMemberAccess(expression);
        case ast_1.SyntaxKind.BreakKeyword: return emitBreak(expression);
        case ast_1.SyntaxKind.ReturnKeyword: return emitReturn(expression);
        case ast_1.SyntaxKind.ThrowKeyword: return emitThrow(expression);
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
    var code = "function " + name + "(" + fn.parameterList.map(emitFunctionParameter).join(', ') + ") ";
    code += withContext(Context.Return, function () { return emitBlock(fn.body); });
    return code;
}
function emitFunctionParameter(vd) {
    var initializer = vd.initializer
        ? " = " + emitExpression(vd.initializer, Context.Value)
        : '';
    return "" + emitIdentifier(vd.identifier) + initializer;
}
function emitIdentifier(identifier) {
    if (['arguments'].indexOf(identifier.name) != -1) {
        return "_" + identifier.name;
    }
    return identifier.name;
}
function emitVariableDeclaration(vd) {
    var kw = vd.mutable ? 'let' : 'const';
    var initializer = vd.initializer
        ? " = " + emitExpression(vd.initializer, Context.Value)
        : '';
    return kw + " " + emitIdentifier(vd.identifier) + initializer;
}
function emitAssignmentExpression(e) {
    var left = ast_1.isIdentifier(e.lhs)
        ? emitIdentifier(e.lhs)
        : emitMemberAccess(e.lhs);
    return left + " " + tokenToJs[e.token.kind] + " " + emitExpression(e.rhs, Context.Value);
}
function emitBinaryExpression(e) {
    return emitExpression(e.lhs) + " " + tokenToJs[e.operator.kind] + " " + emitExpression(e.rhs);
}
function emitCallExpression(fn) {
    return emitExpression(fn.fn) + "(" + fn.argumentList.map(function (arg) { return emitExpression(arg, Context.Value); }).join(', ') + ")";
}
function emitIfExpression(e) {
    var condition = emitExpression(e.condition, Context.Value);
    var produceValue = context == Context.Value;
    var outerValueVariable = valueVariable;
    if (produceValue) {
        valueVariable = newValueVariable();
    }
    var then = emitBlock(e.then);
    var el = e.else
        ? ("\n" + indent('else') + " " + emitBlock(e.else))
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
    return "" + tokenToJs[e.operator.kind] + emitExpression(e.rhs);
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
    return emitExpression(e.object) + "." + emitExpression(e.member, Context.Value);
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
function emitBooleanLiteral(l) {
    return "" + l.value;
}
function emitNumberLiteral(l) {
    return "" + l.value;
}
function emitObjectLiteral(l) {
    var members = l.members.map(function (member) { return (member.name.name + ": " + emitExpression(member.value)); });
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
function emitStringLiteral(l) {
    return "" + JSON.stringify(l.value);
}
var _a;
