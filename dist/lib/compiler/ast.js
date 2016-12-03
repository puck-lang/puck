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
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 45] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 46] = "LessThanToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 47] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 48] = "MinusToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 49] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 50] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 51] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 52] = "PlusToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 53] = "SemicolonToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 54] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 55] = "SlashToken";
    SyntaxKind[SyntaxKind["UnderscoreToken"] = 56] = "UnderscoreToken";
    SyntaxKind[SyntaxKind["NewlineToken"] = 57] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 58] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["Comment"] = 59] = "Comment";
    SyntaxKind[SyntaxKind["Block"] = 60] = "Block";
    SyntaxKind[SyntaxKind["EnumDeclaration"] = 61] = "EnumDeclaration";
    SyntaxKind[SyntaxKind["Function"] = 62] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 63] = "Identifier";
    SyntaxKind[SyntaxKind["ImplDeclaration"] = 64] = "ImplDeclaration";
    SyntaxKind[SyntaxKind["Module"] = 65] = "Module";
    SyntaxKind[SyntaxKind["ObjectDestructure"] = 66] = "ObjectDestructure";
    SyntaxKind[SyntaxKind["ObjectDestructureMember"] = 67] = "ObjectDestructureMember";
    SyntaxKind[SyntaxKind["TraitDeclaration"] = 68] = "TraitDeclaration";
    SyntaxKind[SyntaxKind["TypeBound"] = 69] = "TypeBound";
    SyntaxKind[SyntaxKind["NamedTypeBound"] = 70] = "NamedTypeBound";
    SyntaxKind[SyntaxKind["FunctionTypeBound"] = 71] = "FunctionTypeBound";
    SyntaxKind[SyntaxKind["ObjectTypeBound"] = 72] = "ObjectTypeBound";
    SyntaxKind[SyntaxKind["TupleTypeBound"] = 73] = "TupleTypeBound";
    SyntaxKind[SyntaxKind["TypeDeclaration"] = 74] = "TypeDeclaration";
    SyntaxKind[SyntaxKind["TypeParameter"] = 75] = "TypeParameter";
    SyntaxKind[SyntaxKind["TypeProperty"] = 76] = "TypeProperty";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 77] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["ExportDirective"] = 78] = "ExportDirective";
    SyntaxKind[SyntaxKind["ImportDirective"] = 79] = "ImportDirective";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 80] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 81] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 82] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 83] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 84] = "IfExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 85] = "LoopExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 86] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 87] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 88] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 89] = "MemberAccess";
    SyntaxKind[SyntaxKind["TypePath"] = 90] = "TypePath";
    SyntaxKind[SyntaxKind["BreakStatement"] = 91] = "BreakStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 92] = "ReturnStatement";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 93] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["ListLiteral"] = 94] = "ListLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 95] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 96] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 97] = "StringLiteral";
    SyntaxKind[SyntaxKind["TupleLiteral"] = 98] = "TupleLiteral";
    SyntaxKind[SyntaxKind["EnumMember"] = 99] = "EnumMember";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 100] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 101] = "StringLiteralPart";
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
    'enum': SyntaxKind.EnumKeyword,
    'export': SyntaxKind.ExportKeyword,
    'false': SyntaxKind.FalseKeyword,
    'for': SyntaxKind.ForKeyword,
    'fn': SyntaxKind.FnKeyword,
    // 'get': SyntaxKind.GetKeyword,
    'if': SyntaxKind.IfKeyword,
    'impl': SyntaxKind.ImplKeyword,
    'import': SyntaxKind.ImportKeyword,
    // 'is': SyntaxKind.IsKeyword,
    'let': SyntaxKind.LetKeyword,
    'loop': SyntaxKind.LoopKeyword,
    'mut': SyntaxKind.MutKeyword,
    'not': SyntaxKind.NotKeyword,
    'or': SyntaxKind.OrKeyword,
    'return': SyntaxKind.ReturnKeyword,
    // 'set': SyntaxKind.SetKeyword,
    'throw': SyntaxKind.ThrowKeyword,
    'true': SyntaxKind.TrueKeyword,
    'then': SyntaxKind.ThenKeyword,
    'trait': SyntaxKind.TraitKeyword,
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
