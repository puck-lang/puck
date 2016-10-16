"use strict";
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["AndKeyword"] = 0] = "AndKeyword";
    SyntaxKind[SyntaxKind["AsKeyword"] = 1] = "AsKeyword";
    SyntaxKind[SyntaxKind["BreakKeyword"] = 2] = "BreakKeyword";
    SyntaxKind[SyntaxKind["ElseKeyword"] = 3] = "ElseKeyword";
    SyntaxKind[SyntaxKind["ExportKeyword"] = 4] = "ExportKeyword";
    SyntaxKind[SyntaxKind["FalseKeyword"] = 5] = "FalseKeyword";
    SyntaxKind[SyntaxKind["FnKeyword"] = 6] = "FnKeyword";
    SyntaxKind[SyntaxKind["ForKeyword"] = 7] = "ForKeyword";
    SyntaxKind[SyntaxKind["IfKeyword"] = 8] = "IfKeyword";
    SyntaxKind[SyntaxKind["ImplKeyword"] = 9] = "ImplKeyword";
    SyntaxKind[SyntaxKind["ImportKeyword"] = 10] = "ImportKeyword";
    SyntaxKind[SyntaxKind["LetKeyword"] = 11] = "LetKeyword";
    SyntaxKind[SyntaxKind["LoopKeyword"] = 12] = "LoopKeyword";
    SyntaxKind[SyntaxKind["MutKeyword"] = 13] = "MutKeyword";
    SyntaxKind[SyntaxKind["NotKeyword"] = 14] = "NotKeyword";
    SyntaxKind[SyntaxKind["OrKeyword"] = 15] = "OrKeyword";
    SyntaxKind[SyntaxKind["ReturnKeyword"] = 16] = "ReturnKeyword";
    SyntaxKind[SyntaxKind["ThenKeyword"] = 17] = "ThenKeyword";
    SyntaxKind[SyntaxKind["ThrowKeyword"] = 18] = "ThrowKeyword";
    SyntaxKind[SyntaxKind["TraitKeyword"] = 19] = "TraitKeyword";
    SyntaxKind[SyntaxKind["TrueKeyword"] = 20] = "TrueKeyword";
    SyntaxKind[SyntaxKind["TypeKeyword"] = 21] = "TypeKeyword";
    SyntaxKind[SyntaxKind["WhileKeyword"] = 22] = "WhileKeyword";
    SyntaxKind[SyntaxKind["OpenBraceToken"] = 23] = "OpenBraceToken";
    SyntaxKind[SyntaxKind["CloseBraceToken"] = 24] = "CloseBraceToken";
    SyntaxKind[SyntaxKind["OpenBracketToken"] = 25] = "OpenBracketToken";
    SyntaxKind[SyntaxKind["CloseBracketToken"] = 26] = "CloseBracketToken";
    SyntaxKind[SyntaxKind["OpenParenToken"] = 27] = "OpenParenToken";
    SyntaxKind[SyntaxKind["CloseParenToken"] = 28] = "CloseParenToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskEqualsToken"] = 29] = "AsteriskAsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskToken"] = 30] = "AsteriskAsteriskToken";
    SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 31] = "AsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskToken"] = 32] = "AsteriskToken";
    SyntaxKind[SyntaxKind["BarToken"] = 33] = "BarToken";
    SyntaxKind[SyntaxKind["ColonToken"] = 34] = "ColonToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 35] = "CommaToken";
    SyntaxKind[SyntaxKind["DotToken"] = 36] = "DotToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 37] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 38] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["EqualsToken"] = 39] = "EqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 40] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 41] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 42] = "GreaterThanToken";
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 43] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 44] = "LessThanToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 45] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 46] = "MinusToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 47] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 48] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 49] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 50] = "PlusToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 51] = "SemicolonToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 52] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 53] = "SlashToken";
    SyntaxKind[SyntaxKind["NewlineToken"] = 54] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 55] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["Comment"] = 56] = "Comment";
    SyntaxKind[SyntaxKind["Block"] = 57] = "Block";
    SyntaxKind[SyntaxKind["Function"] = 58] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 59] = "Identifier";
    SyntaxKind[SyntaxKind["ImplDeclaration"] = 60] = "ImplDeclaration";
    SyntaxKind[SyntaxKind["Module"] = 61] = "Module";
    SyntaxKind[SyntaxKind["ObjectDestructure"] = 62] = "ObjectDestructure";
    SyntaxKind[SyntaxKind["ObjectDestructureMember"] = 63] = "ObjectDestructureMember";
    SyntaxKind[SyntaxKind["TraitDeclaration"] = 64] = "TraitDeclaration";
    SyntaxKind[SyntaxKind["TypeBound"] = 65] = "TypeBound";
    SyntaxKind[SyntaxKind["NamedTypeBound"] = 66] = "NamedTypeBound";
    SyntaxKind[SyntaxKind["FunctionTypeBound"] = 67] = "FunctionTypeBound";
    SyntaxKind[SyntaxKind["ObjectTypeBound"] = 68] = "ObjectTypeBound";
    SyntaxKind[SyntaxKind["TupleTypeBound"] = 69] = "TupleTypeBound";
    SyntaxKind[SyntaxKind["TypeDeclaration"] = 70] = "TypeDeclaration";
    SyntaxKind[SyntaxKind["TypeParameter"] = 71] = "TypeParameter";
    SyntaxKind[SyntaxKind["TypeProperty"] = 72] = "TypeProperty";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 73] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["ExportDirective"] = 74] = "ExportDirective";
    SyntaxKind[SyntaxKind["ImportDirective"] = 75] = "ImportDirective";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 76] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 77] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 78] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 79] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 80] = "IfExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 81] = "LoopExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 82] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 83] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 84] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 85] = "MemberAccess";
    SyntaxKind[SyntaxKind["BreakStatement"] = 86] = "BreakStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 87] = "ReturnStatement";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 88] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["ListLiteral"] = 89] = "ListLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 90] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 91] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 92] = "StringLiteral";
    SyntaxKind[SyntaxKind["TupleLiteral"] = 93] = "TupleLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 94] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 95] = "StringLiteralPart";
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
