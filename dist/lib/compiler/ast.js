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
    SyntaxKind[SyntaxKind["NewlineToken"] = 56] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 57] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["Comment"] = 58] = "Comment";
    SyntaxKind[SyntaxKind["Block"] = 59] = "Block";
    SyntaxKind[SyntaxKind["EnumDeclaration"] = 60] = "EnumDeclaration";
    SyntaxKind[SyntaxKind["Function"] = 61] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 62] = "Identifier";
    SyntaxKind[SyntaxKind["ImplDeclaration"] = 63] = "ImplDeclaration";
    SyntaxKind[SyntaxKind["Module"] = 64] = "Module";
    SyntaxKind[SyntaxKind["ObjectDestructure"] = 65] = "ObjectDestructure";
    SyntaxKind[SyntaxKind["ObjectDestructureMember"] = 66] = "ObjectDestructureMember";
    SyntaxKind[SyntaxKind["TraitDeclaration"] = 67] = "TraitDeclaration";
    SyntaxKind[SyntaxKind["TypeBound"] = 68] = "TypeBound";
    SyntaxKind[SyntaxKind["NamedTypeBound"] = 69] = "NamedTypeBound";
    SyntaxKind[SyntaxKind["FunctionTypeBound"] = 70] = "FunctionTypeBound";
    SyntaxKind[SyntaxKind["ObjectTypeBound"] = 71] = "ObjectTypeBound";
    SyntaxKind[SyntaxKind["TupleTypeBound"] = 72] = "TupleTypeBound";
    SyntaxKind[SyntaxKind["TypeDeclaration"] = 73] = "TypeDeclaration";
    SyntaxKind[SyntaxKind["TypeParameter"] = 74] = "TypeParameter";
    SyntaxKind[SyntaxKind["TypeProperty"] = 75] = "TypeProperty";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 76] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["ExportDirective"] = 77] = "ExportDirective";
    SyntaxKind[SyntaxKind["ImportDirective"] = 78] = "ImportDirective";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 79] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 80] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 81] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 82] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 83] = "IfExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 84] = "LoopExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 85] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 86] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 87] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 88] = "MemberAccess";
    SyntaxKind[SyntaxKind["TypePath"] = 89] = "TypePath";
    SyntaxKind[SyntaxKind["BreakStatement"] = 90] = "BreakStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 91] = "ReturnStatement";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 92] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["ListLiteral"] = 93] = "ListLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 94] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 95] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 96] = "StringLiteral";
    SyntaxKind[SyntaxKind["TupleLiteral"] = 97] = "TupleLiteral";
    SyntaxKind[SyntaxKind["EnumMember"] = 98] = "EnumMember";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 99] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 100] = "StringLiteralPart";
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
    ',', ';', ':', '::', '.', '{', '}', '[', ']', '(', ')', '|',
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
