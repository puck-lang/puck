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
    SyntaxKind[SyntaxKind["CommaToken"] = 36] = "CommaToken";
    SyntaxKind[SyntaxKind["DotToken"] = 37] = "DotToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 38] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 39] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["EqualsToken"] = 40] = "EqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 41] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 42] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 43] = "GreaterThanToken";
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 44] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 45] = "LessThanToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 46] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 47] = "MinusToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 48] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 49] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 50] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 51] = "PlusToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 52] = "SemicolonToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 53] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 54] = "SlashToken";
    SyntaxKind[SyntaxKind["NewlineToken"] = 55] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 56] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["Comment"] = 57] = "Comment";
    SyntaxKind[SyntaxKind["Block"] = 58] = "Block";
    SyntaxKind[SyntaxKind["EnumDeclaration"] = 59] = "EnumDeclaration";
    SyntaxKind[SyntaxKind["Function"] = 60] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 61] = "Identifier";
    SyntaxKind[SyntaxKind["ImplDeclaration"] = 62] = "ImplDeclaration";
    SyntaxKind[SyntaxKind["Module"] = 63] = "Module";
    SyntaxKind[SyntaxKind["ObjectDestructure"] = 64] = "ObjectDestructure";
    SyntaxKind[SyntaxKind["ObjectDestructureMember"] = 65] = "ObjectDestructureMember";
    SyntaxKind[SyntaxKind["TraitDeclaration"] = 66] = "TraitDeclaration";
    SyntaxKind[SyntaxKind["TypeBound"] = 67] = "TypeBound";
    SyntaxKind[SyntaxKind["NamedTypeBound"] = 68] = "NamedTypeBound";
    SyntaxKind[SyntaxKind["FunctionTypeBound"] = 69] = "FunctionTypeBound";
    SyntaxKind[SyntaxKind["ObjectTypeBound"] = 70] = "ObjectTypeBound";
    SyntaxKind[SyntaxKind["TupleTypeBound"] = 71] = "TupleTypeBound";
    SyntaxKind[SyntaxKind["TypeDeclaration"] = 72] = "TypeDeclaration";
    SyntaxKind[SyntaxKind["TypeParameter"] = 73] = "TypeParameter";
    SyntaxKind[SyntaxKind["TypeProperty"] = 74] = "TypeProperty";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 75] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["ExportDirective"] = 76] = "ExportDirective";
    SyntaxKind[SyntaxKind["ImportDirective"] = 77] = "ImportDirective";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 78] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 79] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 80] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 81] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 82] = "IfExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 83] = "LoopExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 84] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 85] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 86] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 87] = "MemberAccess";
    SyntaxKind[SyntaxKind["BreakStatement"] = 88] = "BreakStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 89] = "ReturnStatement";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 90] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["ListLiteral"] = 91] = "ListLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 92] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 93] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 94] = "StringLiteral";
    SyntaxKind[SyntaxKind["TupleLiteral"] = 95] = "TupleLiteral";
    SyntaxKind[SyntaxKind["EnumMember"] = 96] = "EnumMember";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 97] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 98] = "StringLiteralPart";
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
