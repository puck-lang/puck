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
    SyntaxKind[SyntaxKind["ImportKeyword"] = 9] = "ImportKeyword";
    SyntaxKind[SyntaxKind["LetKeyword"] = 10] = "LetKeyword";
    SyntaxKind[SyntaxKind["LoopKeyword"] = 11] = "LoopKeyword";
    SyntaxKind[SyntaxKind["MutKeyword"] = 12] = "MutKeyword";
    SyntaxKind[SyntaxKind["NotKeyword"] = 13] = "NotKeyword";
    SyntaxKind[SyntaxKind["OrKeyword"] = 14] = "OrKeyword";
    SyntaxKind[SyntaxKind["ReturnKeyword"] = 15] = "ReturnKeyword";
    SyntaxKind[SyntaxKind["ThenKeyword"] = 16] = "ThenKeyword";
    SyntaxKind[SyntaxKind["ThrowKeyword"] = 17] = "ThrowKeyword";
    SyntaxKind[SyntaxKind["TraitKeyword"] = 18] = "TraitKeyword";
    SyntaxKind[SyntaxKind["TrueKeyword"] = 19] = "TrueKeyword";
    SyntaxKind[SyntaxKind["TypeKeyword"] = 20] = "TypeKeyword";
    SyntaxKind[SyntaxKind["WhileKeyword"] = 21] = "WhileKeyword";
    SyntaxKind[SyntaxKind["OpenBraceToken"] = 22] = "OpenBraceToken";
    SyntaxKind[SyntaxKind["CloseBraceToken"] = 23] = "CloseBraceToken";
    SyntaxKind[SyntaxKind["OpenBracketToken"] = 24] = "OpenBracketToken";
    SyntaxKind[SyntaxKind["CloseBracketToken"] = 25] = "CloseBracketToken";
    SyntaxKind[SyntaxKind["OpenParenToken"] = 26] = "OpenParenToken";
    SyntaxKind[SyntaxKind["CloseParenToken"] = 27] = "CloseParenToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskEqualsToken"] = 28] = "AsteriskAsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskToken"] = 29] = "AsteriskAsteriskToken";
    SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 30] = "AsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskToken"] = 31] = "AsteriskToken";
    SyntaxKind[SyntaxKind["BarToken"] = 32] = "BarToken";
    SyntaxKind[SyntaxKind["ColonToken"] = 33] = "ColonToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 34] = "CommaToken";
    SyntaxKind[SyntaxKind["DotToken"] = 35] = "DotToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 36] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 37] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["EqualsToken"] = 38] = "EqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 39] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 40] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 41] = "GreaterThanToken";
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 42] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 43] = "LessThanToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 44] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 45] = "MinusToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 46] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 47] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 48] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 49] = "PlusToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 50] = "SemicolonToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 51] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 52] = "SlashToken";
    SyntaxKind[SyntaxKind["NewlineToken"] = 53] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 54] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["Comment"] = 55] = "Comment";
    SyntaxKind[SyntaxKind["Block"] = 56] = "Block";
    SyntaxKind[SyntaxKind["Function"] = 57] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 58] = "Identifier";
    SyntaxKind[SyntaxKind["Module"] = 59] = "Module";
    SyntaxKind[SyntaxKind["ObjectDestructure"] = 60] = "ObjectDestructure";
    SyntaxKind[SyntaxKind["ObjectDestructureMember"] = 61] = "ObjectDestructureMember";
    SyntaxKind[SyntaxKind["TraitDeclaration"] = 62] = "TraitDeclaration";
    SyntaxKind[SyntaxKind["TypeBound"] = 63] = "TypeBound";
    SyntaxKind[SyntaxKind["NamedTypeBound"] = 64] = "NamedTypeBound";
    SyntaxKind[SyntaxKind["FunctionTypeBound"] = 65] = "FunctionTypeBound";
    SyntaxKind[SyntaxKind["TypeDeclaration"] = 66] = "TypeDeclaration";
    SyntaxKind[SyntaxKind["TypeParameter"] = 67] = "TypeParameter";
    SyntaxKind[SyntaxKind["TypeProperty"] = 68] = "TypeProperty";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 69] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["ExportDirective"] = 70] = "ExportDirective";
    SyntaxKind[SyntaxKind["ImportDirective"] = 71] = "ImportDirective";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 72] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 73] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 74] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 75] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 76] = "IfExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 77] = "LoopExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 78] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 79] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 80] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 81] = "MemberAccess";
    SyntaxKind[SyntaxKind["BreakStatement"] = 82] = "BreakStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 83] = "ReturnStatement";
    SyntaxKind[SyntaxKind["ArrayLiteral"] = 84] = "ArrayLiteral";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 85] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 86] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 87] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 88] = "StringLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 89] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 90] = "StringLiteralPart";
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
