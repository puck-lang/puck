"use strict";
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
    SyntaxKind[SyntaxKind["LoopKeyword"] = 13] = "LoopKeyword";
    SyntaxKind[SyntaxKind["MutKeyword"] = 14] = "MutKeyword";
    SyntaxKind[SyntaxKind["MatchKeyword"] = 15] = "MatchKeyword";
    SyntaxKind[SyntaxKind["NotKeyword"] = 16] = "NotKeyword";
    SyntaxKind[SyntaxKind["OrKeyword"] = 17] = "OrKeyword";
    SyntaxKind[SyntaxKind["ReturnKeyword"] = 18] = "ReturnKeyword";
    SyntaxKind[SyntaxKind["ThenKeyword"] = 19] = "ThenKeyword";
    SyntaxKind[SyntaxKind["ThrowKeyword"] = 20] = "ThrowKeyword";
    SyntaxKind[SyntaxKind["TraitKeyword"] = 21] = "TraitKeyword";
    SyntaxKind[SyntaxKind["TrueKeyword"] = 22] = "TrueKeyword";
    SyntaxKind[SyntaxKind["TypeKeyword"] = 23] = "TypeKeyword";
    SyntaxKind[SyntaxKind["WhileKeyword"] = 24] = "WhileKeyword";
    SyntaxKind[SyntaxKind["OpenBraceToken"] = 25] = "OpenBraceToken";
    SyntaxKind[SyntaxKind["CloseBraceToken"] = 26] = "CloseBraceToken";
    SyntaxKind[SyntaxKind["OpenBracketToken"] = 27] = "OpenBracketToken";
    SyntaxKind[SyntaxKind["CloseBracketToken"] = 28] = "CloseBracketToken";
    SyntaxKind[SyntaxKind["OpenParenToken"] = 29] = "OpenParenToken";
    SyntaxKind[SyntaxKind["CloseParenToken"] = 30] = "CloseParenToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskEqualsToken"] = 31] = "AsteriskAsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskToken"] = 32] = "AsteriskAsteriskToken";
    SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 33] = "AsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskToken"] = 34] = "AsteriskToken";
    SyntaxKind[SyntaxKind["BarToken"] = 35] = "BarToken";
    SyntaxKind[SyntaxKind["ColonToken"] = 36] = "ColonToken";
    SyntaxKind[SyntaxKind["ColonColonToken"] = 37] = "ColonColonToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 38] = "CommaToken";
    SyntaxKind[SyntaxKind["DotToken"] = 39] = "DotToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 40] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 41] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["EqualsToken"] = 42] = "EqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 43] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 44] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 45] = "GreaterThanToken";
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
    SyntaxKind[SyntaxKind["Block"] = 62] = "Block";
    SyntaxKind[SyntaxKind["EnumDeclaration"] = 63] = "EnumDeclaration";
    SyntaxKind[SyntaxKind["Function"] = 64] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 65] = "Identifier";
    SyntaxKind[SyntaxKind["ImplDeclaration"] = 66] = "ImplDeclaration";
    SyntaxKind[SyntaxKind["Module"] = 67] = "Module";
    SyntaxKind[SyntaxKind["ObjectDestructure"] = 68] = "ObjectDestructure";
    SyntaxKind[SyntaxKind["ObjectDestructureMember"] = 69] = "ObjectDestructureMember";
    SyntaxKind[SyntaxKind["TraitDeclaration"] = 70] = "TraitDeclaration";
    SyntaxKind[SyntaxKind["TypeBound"] = 71] = "TypeBound";
    SyntaxKind[SyntaxKind["NamedTypeBound"] = 72] = "NamedTypeBound";
    SyntaxKind[SyntaxKind["FunctionTypeBound"] = 73] = "FunctionTypeBound";
    SyntaxKind[SyntaxKind["ObjectTypeBound"] = 74] = "ObjectTypeBound";
    SyntaxKind[SyntaxKind["TupleTypeBound"] = 75] = "TupleTypeBound";
    SyntaxKind[SyntaxKind["TypeDeclaration"] = 76] = "TypeDeclaration";
    SyntaxKind[SyntaxKind["TypeParameter"] = 77] = "TypeParameter";
    SyntaxKind[SyntaxKind["TypeProperty"] = 78] = "TypeProperty";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 79] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["ExportDirective"] = 80] = "ExportDirective";
    SyntaxKind[SyntaxKind["ImportDirective"] = 81] = "ImportDirective";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 82] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 83] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 84] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 85] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 86] = "IfExpression";
    SyntaxKind[SyntaxKind["IfLetExpression"] = 87] = "IfLetExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 88] = "LoopExpression";
    SyntaxKind[SyntaxKind["MatchExpression"] = 89] = "MatchExpression";
    SyntaxKind[SyntaxKind["TypePathExpression"] = 90] = "TypePathExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 91] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 92] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 93] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 94] = "MemberAccess";
    SyntaxKind[SyntaxKind["TypePath"] = 95] = "TypePath";
    SyntaxKind[SyntaxKind["BreakStatement"] = 96] = "BreakStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 97] = "ReturnStatement";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 98] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["ListLiteral"] = 99] = "ListLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 100] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 101] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 102] = "StringLiteral";
    SyntaxKind[SyntaxKind["TupleLiteral"] = 103] = "TupleLiteral";
    SyntaxKind[SyntaxKind["EnumMember"] = 104] = "EnumMember";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 105] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 106] = "StringLiteralPart";
})(exports.SyntaxKind || (exports.SyntaxKind = {}));
var SyntaxKind = exports.SyntaxKind;
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
    'loop': SyntaxKind.LoopKeyword,
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
    '=>', '->',
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
