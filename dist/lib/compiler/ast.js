"use strict";
var SyntaxKind;
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["AndKeyword"] = 0] = "AndKeyword";
    SyntaxKind[SyntaxKind["AsKeyword"] = 1] = "AsKeyword";
    SyntaxKind[SyntaxKind["BreakKeyword"] = 2] = "BreakKeyword";
    SyntaxKind[SyntaxKind["ElseKeyword"] = 3] = "ElseKeyword";
    SyntaxKind[SyntaxKind["EnumKeyword"] = 4] = "EnumKeyword";
    SyntaxKind[SyntaxKind["ExportKeyword"] = 5] = "ExportKeyword";
    SyntaxKind[SyntaxKind["FalseKeyword"] = 6] = "FalseKeyword";
    SyntaxKind[SyntaxKind["FnKeyword"] = 7] = "FnKeyword";
    SyntaxKind[SyntaxKind["ForKeyword"] = 8] = "ForKeyword";
    SyntaxKind[SyntaxKind["IfKeyword"] = 9] = "IfKeyword";
    SyntaxKind[SyntaxKind["ImplKeyword"] = 10] = "ImplKeyword";
    SyntaxKind[SyntaxKind["ImportKeyword"] = 11] = "ImportKeyword";
    SyntaxKind[SyntaxKind["LetKeyword"] = 12] = "LetKeyword";
    SyntaxKind[SyntaxKind["MutKeyword"] = 13] = "MutKeyword";
    SyntaxKind[SyntaxKind["MatchKeyword"] = 14] = "MatchKeyword";
    SyntaxKind[SyntaxKind["NotKeyword"] = 15] = "NotKeyword";
    SyntaxKind[SyntaxKind["OrKeyword"] = 16] = "OrKeyword";
    SyntaxKind[SyntaxKind["ReturnKeyword"] = 17] = "ReturnKeyword";
    SyntaxKind[SyntaxKind["ThenKeyword"] = 18] = "ThenKeyword";
    SyntaxKind[SyntaxKind["ThrowKeyword"] = 19] = "ThrowKeyword";
    SyntaxKind[SyntaxKind["TraitKeyword"] = 20] = "TraitKeyword";
    SyntaxKind[SyntaxKind["TrueKeyword"] = 21] = "TrueKeyword";
    SyntaxKind[SyntaxKind["TypeKeyword"] = 22] = "TypeKeyword";
    SyntaxKind[SyntaxKind["WhileKeyword"] = 23] = "WhileKeyword";
    SyntaxKind[SyntaxKind["OpenBraceToken"] = 24] = "OpenBraceToken";
    SyntaxKind[SyntaxKind["CloseBraceToken"] = 25] = "CloseBraceToken";
    SyntaxKind[SyntaxKind["OpenBracketToken"] = 26] = "OpenBracketToken";
    SyntaxKind[SyntaxKind["CloseBracketToken"] = 27] = "CloseBracketToken";
    SyntaxKind[SyntaxKind["OpenParenToken"] = 28] = "OpenParenToken";
    SyntaxKind[SyntaxKind["CloseParenToken"] = 29] = "CloseParenToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskEqualsToken"] = 30] = "AsteriskAsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskToken"] = 31] = "AsteriskAsteriskToken";
    SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 32] = "AsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskToken"] = 33] = "AsteriskToken";
    SyntaxKind[SyntaxKind["BarToken"] = 34] = "BarToken";
    SyntaxKind[SyntaxKind["ColonToken"] = 35] = "ColonToken";
    SyntaxKind[SyntaxKind["ColonColonToken"] = 36] = "ColonColonToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 37] = "CommaToken";
    SyntaxKind[SyntaxKind["DotToken"] = 38] = "DotToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 39] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 40] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["EqualsToken"] = 41] = "EqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 42] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 43] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 44] = "GreaterThanToken";
    SyntaxKind[SyntaxKind["HashToken"] = 45] = "HashToken";
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 46] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 47] = "LessThanToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 48] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["MinusGreaterThanToken"] = 49] = "MinusGreaterThanToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 50] = "MinusToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 51] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 52] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 53] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 54] = "PlusToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 55] = "SemicolonToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 56] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 57] = "SlashToken";
    SyntaxKind[SyntaxKind["UnderscoreToken"] = 58] = "UnderscoreToken";
    SyntaxKind[SyntaxKind["NewlineToken"] = 59] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 60] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["Comment"] = 61] = "Comment";
    SyntaxKind[SyntaxKind["Attribute"] = 62] = "Attribute";
    SyntaxKind[SyntaxKind["Block"] = 63] = "Block";
    SyntaxKind[SyntaxKind["EnumDeclaration"] = 64] = "EnumDeclaration";
    SyntaxKind[SyntaxKind["Function"] = 65] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 66] = "Identifier";
    SyntaxKind[SyntaxKind["ImplDeclaration"] = 67] = "ImplDeclaration";
    SyntaxKind[SyntaxKind["ImplShorthandDeclaration"] = 68] = "ImplShorthandDeclaration";
    SyntaxKind[SyntaxKind["Module"] = 69] = "Module";
    SyntaxKind[SyntaxKind["ObjectDestructure"] = 70] = "ObjectDestructure";
    SyntaxKind[SyntaxKind["ObjectDestructureMember"] = 71] = "ObjectDestructureMember";
    SyntaxKind[SyntaxKind["TraitDeclaration"] = 72] = "TraitDeclaration";
    SyntaxKind[SyntaxKind["TypeBound"] = 73] = "TypeBound";
    SyntaxKind[SyntaxKind["NamedTypeBound"] = 74] = "NamedTypeBound";
    SyntaxKind[SyntaxKind["FunctionTypeBound"] = 75] = "FunctionTypeBound";
    SyntaxKind[SyntaxKind["ObjectTypeBound"] = 76] = "ObjectTypeBound";
    SyntaxKind[SyntaxKind["TupleTypeBound"] = 77] = "TupleTypeBound";
    SyntaxKind[SyntaxKind["TypeDeclaration"] = 78] = "TypeDeclaration";
    SyntaxKind[SyntaxKind["TypeParameter"] = 79] = "TypeParameter";
    SyntaxKind[SyntaxKind["TypeProperty"] = 80] = "TypeProperty";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 81] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["ExportDirective"] = 82] = "ExportDirective";
    SyntaxKind[SyntaxKind["ImportDirective"] = 83] = "ImportDirective";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 84] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 85] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 86] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 87] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 88] = "IfExpression";
    SyntaxKind[SyntaxKind["IfLetExpression"] = 89] = "IfLetExpression";
    SyntaxKind[SyntaxKind["MatchExpression"] = 90] = "MatchExpression";
    SyntaxKind[SyntaxKind["TypePathExpression"] = 91] = "TypePathExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 92] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileLoop"] = 93] = "WhileLoop";
    SyntaxKind[SyntaxKind["IndexAccess"] = 94] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 95] = "MemberAccess";
    SyntaxKind[SyntaxKind["TypePath"] = 96] = "TypePath";
    SyntaxKind[SyntaxKind["BreakStatement"] = 97] = "BreakStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 98] = "ReturnStatement";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 99] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["ListLiteral"] = 100] = "ListLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 101] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 102] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 103] = "StringLiteral";
    SyntaxKind[SyntaxKind["TupleLiteral"] = 104] = "TupleLiteral";
    SyntaxKind[SyntaxKind["EnumMember"] = 105] = "EnumMember";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 106] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 107] = "StringLiteralPart";
})(SyntaxKind = exports.SyntaxKind || (exports.SyntaxKind = {}));
exports.textToToken = Object['assign'](Object.create(null), {
    'and': SyntaxKind.AndKeyword,
    'break': SyntaxKind.BreakKeyword,
    // 'as': SyntaxKind.AsKeyword,
    // 'debugger': SyntaxKind.DebuggerKeyword,
    'else': SyntaxKind.ElseKeyword,
    'enum': SyntaxKind.EnumKeyword,
    'export': SyntaxKind.ExportKeyword,
    'false': SyntaxKind.FalseKeyword,
    'for': SyntaxKind.ForKeyword,
    'fn': SyntaxKind.FnKeyword,
    'if': SyntaxKind.IfKeyword,
    'impl': SyntaxKind.ImplKeyword,
    'import': SyntaxKind.ImportKeyword,
    'let': SyntaxKind.LetKeyword,
    'match': SyntaxKind.MatchKeyword,
    'mut': SyntaxKind.MutKeyword,
    'not': SyntaxKind.NotKeyword,
    'or': SyntaxKind.OrKeyword,
    'return': SyntaxKind.ReturnKeyword,
    'throw': SyntaxKind.ThrowKeyword,
    'true': SyntaxKind.TrueKeyword,
    'then': SyntaxKind.ThenKeyword,
    'trait': SyntaxKind.TraitKeyword,
    'type': SyntaxKind.TypeKeyword,
    'while': SyntaxKind.WhileKeyword,
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
    '::': SyntaxKind.ColonColonToken,
    '.': SyntaxKind.DotToken,
    // '...': SyntaxKind.DotDotDotToken,
    '#': SyntaxKind.HashToken,
    ';': SyntaxKind.SemicolonToken,
    '_': SyntaxKind.UnderscoreToken,
    '<': SyntaxKind.LessThanToken,
    '>': SyntaxKind.GreaterThanToken,
    '<=': SyntaxKind.LessThanEqualsToken,
    '>=': SyntaxKind.GreaterThanEqualsToken,
    '==': SyntaxKind.EqualsEqualsToken,
    '!=': SyntaxKind.ExclamationEqualsToken,
    '=>': SyntaxKind.EqualsGreaterThanToken,
    '->': SyntaxKind.MinusGreaterThanToken,
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
    ',', ';', ':', '::', '.', '_', '|',
    '{', '}', '[', ']', '(', ')',
    '+', '-', '*', '**', '/', '%',
    '=', '+=', '-=', '*=', '**=', '/=', '%=',
    '==', '!=', '<', '<=', '>', '>=',
    '=>', '->', '#'
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
    _a[SyntaxKind.SlashToken] = 20,
    _a[SyntaxKind.PercentToken] = 20,
    _a[SyntaxKind.AsteriskAsteriskToken] = 25,
    _a);
exports.tokenToText = Object['assign'](reverse(exports.textToToken), (_b = {},
    _b[SyntaxKind.Identifier] = function (i) { return (i && i.name)
        ? "identifier: " + i.name
        : 'identifier'; },
    _b));
function isBlock(token) {
    return token.kind === SyntaxKind.Block;
}
exports.isBlock = isBlock;
function isExport(token) {
    return token.kind === SyntaxKind.ExportDirective;
}
exports.isExport = isExport;
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
