"use strict";
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["AndKeyword"] = 0] = "AndKeyword";
    SyntaxKind[SyntaxKind["BreakKeyword"] = 1] = "BreakKeyword";
    SyntaxKind[SyntaxKind["ElseKeyword"] = 2] = "ElseKeyword";
    SyntaxKind[SyntaxKind["ExportKeyword"] = 3] = "ExportKeyword";
    SyntaxKind[SyntaxKind["FalseKeyword"] = 4] = "FalseKeyword";
    SyntaxKind[SyntaxKind["FnKeyword"] = 5] = "FnKeyword";
    SyntaxKind[SyntaxKind["ForKeyword"] = 6] = "ForKeyword";
    SyntaxKind[SyntaxKind["IfKeyword"] = 7] = "IfKeyword";
    SyntaxKind[SyntaxKind["LetKeyword"] = 8] = "LetKeyword";
    SyntaxKind[SyntaxKind["LoopKeyword"] = 9] = "LoopKeyword";
    SyntaxKind[SyntaxKind["MutKeyword"] = 10] = "MutKeyword";
    SyntaxKind[SyntaxKind["NotKeyword"] = 11] = "NotKeyword";
    // NullKeyword,
    SyntaxKind[SyntaxKind["OrKeyword"] = 12] = "OrKeyword";
    SyntaxKind[SyntaxKind["ReturnKeyword"] = 13] = "ReturnKeyword";
    SyntaxKind[SyntaxKind["ThenKeyword"] = 14] = "ThenKeyword";
    SyntaxKind[SyntaxKind["ThrowKeyword"] = 15] = "ThrowKeyword";
    SyntaxKind[SyntaxKind["TrueKeyword"] = 16] = "TrueKeyword";
    SyntaxKind[SyntaxKind["WhileKeyword"] = 17] = "WhileKeyword";
    SyntaxKind[SyntaxKind["OpenBraceToken"] = 18] = "OpenBraceToken";
    SyntaxKind[SyntaxKind["CloseBraceToken"] = 19] = "CloseBraceToken";
    SyntaxKind[SyntaxKind["OpenBracketToken"] = 20] = "OpenBracketToken";
    SyntaxKind[SyntaxKind["CloseBracketToken"] = 21] = "CloseBracketToken";
    SyntaxKind[SyntaxKind["OpenParenToken"] = 22] = "OpenParenToken";
    SyntaxKind[SyntaxKind["CloseParenToken"] = 23] = "CloseParenToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskEqualsToken"] = 24] = "AsteriskAsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskToken"] = 25] = "AsteriskAsteriskToken";
    SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 26] = "AsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskToken"] = 27] = "AsteriskToken";
    SyntaxKind[SyntaxKind["BarToken"] = 28] = "BarToken";
    SyntaxKind[SyntaxKind["ColonToken"] = 29] = "ColonToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 30] = "CommaToken";
    SyntaxKind[SyntaxKind["DotToken"] = 31] = "DotToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 32] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 33] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["EqualsToken"] = 34] = "EqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 35] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 36] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 37] = "GreaterThanToken";
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 38] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 39] = "LessThanToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 40] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 41] = "MinusToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 42] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 43] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 44] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 45] = "PlusToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 46] = "SemicolonToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 47] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 48] = "SlashToken";
    SyntaxKind[SyntaxKind["NewlineToken"] = 49] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 50] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["Comment"] = 51] = "Comment";
    SyntaxKind[SyntaxKind["Block"] = 52] = "Block";
    SyntaxKind[SyntaxKind["Function"] = 53] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 54] = "Identifier";
    SyntaxKind[SyntaxKind["TypeBound"] = 55] = "TypeBound";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 56] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 57] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 58] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 59] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 60] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 61] = "IfExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 62] = "LoopExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 63] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 64] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 65] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 66] = "MemberAccess";
    SyntaxKind[SyntaxKind["BreakStatement"] = 67] = "BreakStatement";
    SyntaxKind[SyntaxKind["ExportStatement"] = 68] = "ExportStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 69] = "ReturnStatement";
    SyntaxKind[SyntaxKind["ArrayLiteral"] = 70] = "ArrayLiteral";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 71] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 72] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 73] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 74] = "StringLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 75] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 76] = "StringLiteralPart";
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
    'export': SyntaxKind.ExportKeyword,
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
function isIndex(token) {
    return token.kind === SyntaxKind.IndexAccess;
}
exports.isIndex = isIndex;
var _a, _b;
// export const NULL: Token = { kind: SyntaxKind.NullKeyword }
