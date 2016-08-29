"use strict";
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["AndKeyword"] = 0] = "AndKeyword";
    SyntaxKind[SyntaxKind["BreakKeyword"] = 1] = "BreakKeyword";
    SyntaxKind[SyntaxKind["ElseKeyword"] = 2] = "ElseKeyword";
    SyntaxKind[SyntaxKind["FalseKeyword"] = 3] = "FalseKeyword";
    SyntaxKind[SyntaxKind["FnKeyword"] = 4] = "FnKeyword";
    SyntaxKind[SyntaxKind["ForKeyword"] = 5] = "ForKeyword";
    SyntaxKind[SyntaxKind["IfKeyword"] = 6] = "IfKeyword";
    SyntaxKind[SyntaxKind["LetKeyword"] = 7] = "LetKeyword";
    SyntaxKind[SyntaxKind["LoopKeyword"] = 8] = "LoopKeyword";
    SyntaxKind[SyntaxKind["MutKeyword"] = 9] = "MutKeyword";
    SyntaxKind[SyntaxKind["NotKeyword"] = 10] = "NotKeyword";
    // NullKeyword,
    SyntaxKind[SyntaxKind["OrKeyword"] = 11] = "OrKeyword";
    SyntaxKind[SyntaxKind["ReturnKeyword"] = 12] = "ReturnKeyword";
    SyntaxKind[SyntaxKind["ThenKeyword"] = 13] = "ThenKeyword";
    SyntaxKind[SyntaxKind["ThrowKeyword"] = 14] = "ThrowKeyword";
    SyntaxKind[SyntaxKind["TrueKeyword"] = 15] = "TrueKeyword";
    SyntaxKind[SyntaxKind["WhileKeyword"] = 16] = "WhileKeyword";
    SyntaxKind[SyntaxKind["OpenBraceToken"] = 17] = "OpenBraceToken";
    SyntaxKind[SyntaxKind["CloseBraceToken"] = 18] = "CloseBraceToken";
    SyntaxKind[SyntaxKind["OpenBracketToken"] = 19] = "OpenBracketToken";
    SyntaxKind[SyntaxKind["CloseBracketToken"] = 20] = "CloseBracketToken";
    SyntaxKind[SyntaxKind["OpenParenToken"] = 21] = "OpenParenToken";
    SyntaxKind[SyntaxKind["CloseParenToken"] = 22] = "CloseParenToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskEqualsToken"] = 23] = "AsteriskAsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskToken"] = 24] = "AsteriskAsteriskToken";
    SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 25] = "AsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskToken"] = 26] = "AsteriskToken";
    SyntaxKind[SyntaxKind["BarToken"] = 27] = "BarToken";
    SyntaxKind[SyntaxKind["ColonToken"] = 28] = "ColonToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 29] = "CommaToken";
    SyntaxKind[SyntaxKind["DotToken"] = 30] = "DotToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 31] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 32] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["EqualsToken"] = 33] = "EqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 34] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 35] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 36] = "GreaterThanToken";
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 37] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 38] = "LessThanToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 39] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 40] = "MinusToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 41] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 42] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 43] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 44] = "PlusToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 45] = "SemicolonToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 46] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 47] = "SlashToken";
    SyntaxKind[SyntaxKind["NewlineToken"] = 48] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 49] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["Comment"] = 50] = "Comment";
    SyntaxKind[SyntaxKind["Block"] = 51] = "Block";
    SyntaxKind[SyntaxKind["Function"] = 52] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 53] = "Identifier";
    SyntaxKind[SyntaxKind["TypeBound"] = 54] = "TypeBound";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 55] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 56] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 57] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 58] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 59] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 60] = "IfExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 61] = "LoopExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 62] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 63] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 64] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 65] = "MemberAccess";
    SyntaxKind[SyntaxKind["ArrayLiteral"] = 66] = "ArrayLiteral";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 67] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 68] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 69] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 70] = "StringLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 71] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 72] = "StringLiteralPart";
})(exports.SyntaxKind || (exports.SyntaxKind = {}));
var SyntaxKind = exports.SyntaxKind;
exports.textToToken = Object['assign'](Object.create(null), {
    'and': SyntaxKind.AndKeyword,
    'break': SyntaxKind.BreakKeyword,
    // 'any': SyntaxKind.AnyKeyword,
    // 'as': SyntaxKind.AsKeyword,
    // 'debugger': SyntaxKind.DebuggerKeyword,
    // 'delete': SyntaxKind.DeleteKeyword,
    'else': SyntaxKind.ElseKeyword,
    // 'enum': SyntaxKind.EnumKeyword,
    // 'export': SyntaxKind.ExportKeyword,
    'false': SyntaxKind.FalseKeyword,
    'for': SyntaxKind.ForKeyword,
    // 'from': SyntaxKind.FromKeyword,
    'fn': SyntaxKind.FnKeyword,
    // 'get': SyntaxKind.GetKeyword,
    'if': SyntaxKind.IfKeyword,
    // 'import': SyntaxKind.ImportKeyword,
    // 'interface': SyntaxKind.InterfaceKeyword,
    // 'is': SyntaxKind.IsKeyword,
    'let': SyntaxKind.LetKeyword,
    'loop': SyntaxKind.LoopKeyword,
    'mut': SyntaxKind.MutKeyword,
    'not': SyntaxKind.NotKeyword,
    // 'null': SyntaxKind.NullKeyword,
    'or': SyntaxKind.OrKeyword,
    'return': SyntaxKind.ReturnKeyword,
    // 'set': SyntaxKind.SetKeyword,
    // 'this': SyntaxKind.ThisKeyword,
    'throw': SyntaxKind.ThrowKeyword,
    'true': SyntaxKind.TrueKeyword,
    'then': SyntaxKind.ThenKeyword,
    // 'try': SyntaxKind.TryKeyword,
    // 'type': SyntaxKind.TypeKeyword,
    'while': SyntaxKind.WhileKeyword,
    // 'yield': SyntaxKind.YieldKeyword,
    // 'async': SyntaxKind.AsyncKeyword,
    // 'await': SyntaxKind.AwaitKeyword,
    // 'of': SyntaxKind.OfKeyword,
    '{': SyntaxKind.OpenBraceToken,
    '}': SyntaxKind.CloseBraceToken,
    '[': SyntaxKind.OpenBracketToken,
    ']': SyntaxKind.CloseBracketToken,
    '(': SyntaxKind.OpenParenToken,
    ')': SyntaxKind.CloseParenToken,
    '|': SyntaxKind.BarToken,
    ',': SyntaxKind.CommaToken,
    ':': SyntaxKind.ColonToken,
    '.': SyntaxKind.DotToken,
    // '...': SyntaxKind.DotDotDotToken,
    ';': SyntaxKind.SemicolonToken,
    '<': SyntaxKind.LessThanToken,
    '>': SyntaxKind.GreaterThanToken,
    '<=': SyntaxKind.LessThanEqualsToken,
    '>=': SyntaxKind.GreaterThanEqualsToken,
    '==': SyntaxKind.EqualsEqualsToken,
    '!=': SyntaxKind.ExclamationEqualsToken,
    '=>': SyntaxKind.EqualsGreaterThanToken,
    '+': SyntaxKind.PlusToken,
    '-': SyntaxKind.MinusToken,
    '**': SyntaxKind.AsteriskAsteriskToken,
    '*': SyntaxKind.AsteriskToken,
    '/': SyntaxKind.SlashToken,
    '%': SyntaxKind.PercentToken,
    '=': SyntaxKind.EqualsToken,
    '+=': SyntaxKind.PlusEqualsToken,
    '-=': SyntaxKind.MinusEqualsToken,
    '*=': SyntaxKind.AsteriskEqualsToken,
    '**=': SyntaxKind.AsteriskAsteriskEqualsToken,
    '/=': SyntaxKind.SlashEqualsToken,
    '%=': SyntaxKind.PercentEqualsToken,
});
function reverse(object) {
    var reverse = {};
    Object.keys(object).forEach(function (key) {
        reverse[object[key]] = key;
    });
    return reverse;
}
exports.operators = [
    ',', ';', ':', '.', '{', '}', '[', ']', '(', ')', '|',
    '+', '-', '*', '**', '/', '%',
    '=', '+=', '-=', '*=', '**=', '/=', '%=',
    '==', '!=', '<', '<=', '>', '>=',
    '=>',
];
exports.precedence = (_a = {},
    _a[SyntaxKind.EqualsToken] = 1,
    _a[SyntaxKind.PlusEqualsToken] = 1.1,
    _a[SyntaxKind.MinusEqualsToken] = 1.1,
    _a[SyntaxKind.OrKeyword] = 2,
    _a[SyntaxKind.AndKeyword] = 3,
    _a[SyntaxKind.NotKeyword] = 4,
    _a[SyntaxKind.EqualsEqualsToken] = 7,
    _a[SyntaxKind.ExclamationEqualsToken] = 7,
    _a[SyntaxKind.GreaterThanToken] = 7,
    _a[SyntaxKind.GreaterThanEqualsToken] = 7,
    _a[SyntaxKind.LessThanToken] = 7,
    _a[SyntaxKind.LessThanEqualsToken] = 7,
    _a[SyntaxKind.PlusToken] = 10,
    _a[SyntaxKind.MinusToken] = 10,
    _a[SyntaxKind.AsteriskToken] = 20,
    _a[SyntaxKind.AsteriskAsteriskToken] = 20,
    _a[SyntaxKind.SlashToken] = 20,
    _a[SyntaxKind.PercentToken] = 20,
    _a
);
exports.tokenToText = Object['assign'](reverse(exports.textToToken), (_b = {},
    _b[SyntaxKind.Identifier] = function (i) { return (i && i.name)
        ? "identifier: " + i.name
        : 'identifier'; },
    _b
));
function isBlock(token) {
    return token.kind === SyntaxKind.Block;
}
exports.isBlock = isBlock;
function isIdentifier(token) {
    return token.kind === SyntaxKind.Identifier;
}
exports.isIdentifier = isIdentifier;
function isMember(token) {
    return token.kind === SyntaxKind.MemberAccess;
}
exports.isMember = isMember;
var _a, _b;
// export const NULL: Token = { kind: SyntaxKind.NullKeyword }
