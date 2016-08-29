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
    SyntaxKind[SyntaxKind["ColonToken"] = 27] = "ColonToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 28] = "CommaToken";
    SyntaxKind[SyntaxKind["DotToken"] = 29] = "DotToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 30] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 31] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["EqualsToken"] = 32] = "EqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 33] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 34] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 35] = "GreaterThanToken";
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 36] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 37] = "LessThanToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 38] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 39] = "MinusToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 40] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 41] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 42] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 43] = "PlusToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 44] = "SemicolonToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 45] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 46] = "SlashToken";
    SyntaxKind[SyntaxKind["NewlineToken"] = 47] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 48] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["Comment"] = 49] = "Comment";
    SyntaxKind[SyntaxKind["Block"] = 50] = "Block";
    SyntaxKind[SyntaxKind["Function"] = 51] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 52] = "Identifier";
    SyntaxKind[SyntaxKind["TypeBound"] = 53] = "TypeBound";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 54] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 55] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 56] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 57] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 58] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 59] = "IfExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 60] = "LoopExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 61] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 62] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 63] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 64] = "MemberAccess";
    SyntaxKind[SyntaxKind["ArrayLiteral"] = 65] = "ArrayLiteral";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 66] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 67] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 68] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 69] = "StringLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 70] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 71] = "StringLiteralPart";
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
    ',', ';', ':', '.', '{', '}', '[', ']', '(', ')',
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
