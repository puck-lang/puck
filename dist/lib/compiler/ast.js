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
    SyntaxKind[SyntaxKind["TypeKeyword"] = 17] = "TypeKeyword";
    SyntaxKind[SyntaxKind["WhileKeyword"] = 18] = "WhileKeyword";
    SyntaxKind[SyntaxKind["OpenBraceToken"] = 19] = "OpenBraceToken";
    SyntaxKind[SyntaxKind["CloseBraceToken"] = 20] = "CloseBraceToken";
    SyntaxKind[SyntaxKind["OpenBracketToken"] = 21] = "OpenBracketToken";
    SyntaxKind[SyntaxKind["CloseBracketToken"] = 22] = "CloseBracketToken";
    SyntaxKind[SyntaxKind["OpenParenToken"] = 23] = "OpenParenToken";
    SyntaxKind[SyntaxKind["CloseParenToken"] = 24] = "CloseParenToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskEqualsToken"] = 25] = "AsteriskAsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskToken"] = 26] = "AsteriskAsteriskToken";
    SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 27] = "AsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskToken"] = 28] = "AsteriskToken";
    SyntaxKind[SyntaxKind["BarToken"] = 29] = "BarToken";
    SyntaxKind[SyntaxKind["ColonToken"] = 30] = "ColonToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 31] = "CommaToken";
    SyntaxKind[SyntaxKind["DotToken"] = 32] = "DotToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 33] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 34] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["EqualsToken"] = 35] = "EqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 36] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 37] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 38] = "GreaterThanToken";
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 39] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 40] = "LessThanToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 41] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 42] = "MinusToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 43] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 44] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 45] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 46] = "PlusToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 47] = "SemicolonToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 48] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 49] = "SlashToken";
    SyntaxKind[SyntaxKind["NewlineToken"] = 50] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 51] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["Comment"] = 52] = "Comment";
    SyntaxKind[SyntaxKind["Block"] = 53] = "Block";
    SyntaxKind[SyntaxKind["Function"] = 54] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 55] = "Identifier";
    SyntaxKind[SyntaxKind["TypeBound"] = 56] = "TypeBound";
    SyntaxKind[SyntaxKind["TypeDeclaration"] = 57] = "TypeDeclaration";
    SyntaxKind[SyntaxKind["TypeParameter"] = 58] = "TypeParameter";
    SyntaxKind[SyntaxKind["TypeProperty"] = 59] = "TypeProperty";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 60] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 61] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 62] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 63] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 64] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 65] = "IfExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 66] = "LoopExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 67] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 68] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 69] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 70] = "MemberAccess";
    SyntaxKind[SyntaxKind["BreakStatement"] = 71] = "BreakStatement";
    SyntaxKind[SyntaxKind["ExportStatement"] = 72] = "ExportStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 73] = "ReturnStatement";
    SyntaxKind[SyntaxKind["ArrayLiteral"] = 74] = "ArrayLiteral";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 75] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 76] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 77] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 78] = "StringLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 79] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 80] = "StringLiteralPart";
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
    'type': SyntaxKind.TypeKeyword,
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
isIndex;
var _a, _b;
// export const NULL: Token = { kind: SyntaxKind.NullKeyword }
