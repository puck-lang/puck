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
    SyntaxKind[SyntaxKind["MinusToken"] = 49] = "MinusToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 50] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 51] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 52] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 53] = "PlusToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 54] = "SemicolonToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 55] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 56] = "SlashToken";
    SyntaxKind[SyntaxKind["UnderscoreToken"] = 57] = "UnderscoreToken";
    SyntaxKind[SyntaxKind["NewlineToken"] = 58] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 59] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["Comment"] = 60] = "Comment";
    SyntaxKind[SyntaxKind["Block"] = 61] = "Block";
    SyntaxKind[SyntaxKind["EnumDeclaration"] = 62] = "EnumDeclaration";
    SyntaxKind[SyntaxKind["Function"] = 63] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 64] = "Identifier";
    SyntaxKind[SyntaxKind["ImplDeclaration"] = 65] = "ImplDeclaration";
    SyntaxKind[SyntaxKind["Module"] = 66] = "Module";
    SyntaxKind[SyntaxKind["ObjectDestructure"] = 67] = "ObjectDestructure";
    SyntaxKind[SyntaxKind["ObjectDestructureMember"] = 68] = "ObjectDestructureMember";
    SyntaxKind[SyntaxKind["TraitDeclaration"] = 69] = "TraitDeclaration";
    SyntaxKind[SyntaxKind["TypeBound"] = 70] = "TypeBound";
    SyntaxKind[SyntaxKind["NamedTypeBound"] = 71] = "NamedTypeBound";
    SyntaxKind[SyntaxKind["FunctionTypeBound"] = 72] = "FunctionTypeBound";
    SyntaxKind[SyntaxKind["ObjectTypeBound"] = 73] = "ObjectTypeBound";
    SyntaxKind[SyntaxKind["TupleTypeBound"] = 74] = "TupleTypeBound";
    SyntaxKind[SyntaxKind["TypeDeclaration"] = 75] = "TypeDeclaration";
    SyntaxKind[SyntaxKind["TypeParameter"] = 76] = "TypeParameter";
    SyntaxKind[SyntaxKind["TypeProperty"] = 77] = "TypeProperty";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 78] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["ExportDirective"] = 79] = "ExportDirective";
    SyntaxKind[SyntaxKind["ImportDirective"] = 80] = "ImportDirective";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 81] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 82] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 83] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 84] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 85] = "IfExpression";
    SyntaxKind[SyntaxKind["IfLetExpression"] = 86] = "IfLetExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 87] = "LoopExpression";
    SyntaxKind[SyntaxKind["MatchExpression"] = 88] = "MatchExpression";
    SyntaxKind[SyntaxKind["TypePathExpression"] = 89] = "TypePathExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 90] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 91] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 92] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 93] = "MemberAccess";
    SyntaxKind[SyntaxKind["TypePath"] = 94] = "TypePath";
    SyntaxKind[SyntaxKind["BreakStatement"] = 95] = "BreakStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 96] = "ReturnStatement";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 97] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["ListLiteral"] = 98] = "ListLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 99] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 100] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 101] = "StringLiteral";
    SyntaxKind[SyntaxKind["TupleLiteral"] = 102] = "TupleLiteral";
    SyntaxKind[SyntaxKind["EnumMember"] = 103] = "EnumMember";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 104] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 105] = "StringLiteralPart";
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
