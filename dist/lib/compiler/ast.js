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
    // NullKeyword,
    SyntaxKind[SyntaxKind["OrKeyword"] = 14] = "OrKeyword";
    SyntaxKind[SyntaxKind["ReturnKeyword"] = 15] = "ReturnKeyword";
    SyntaxKind[SyntaxKind["ThenKeyword"] = 16] = "ThenKeyword";
    SyntaxKind[SyntaxKind["ThrowKeyword"] = 17] = "ThrowKeyword";
    SyntaxKind[SyntaxKind["TrueKeyword"] = 18] = "TrueKeyword";
    SyntaxKind[SyntaxKind["TypeKeyword"] = 19] = "TypeKeyword";
    SyntaxKind[SyntaxKind["WhileKeyword"] = 20] = "WhileKeyword";
    SyntaxKind[SyntaxKind["OpenBraceToken"] = 21] = "OpenBraceToken";
    SyntaxKind[SyntaxKind["CloseBraceToken"] = 22] = "CloseBraceToken";
    SyntaxKind[SyntaxKind["OpenBracketToken"] = 23] = "OpenBracketToken";
    SyntaxKind[SyntaxKind["CloseBracketToken"] = 24] = "CloseBracketToken";
    SyntaxKind[SyntaxKind["OpenParenToken"] = 25] = "OpenParenToken";
    SyntaxKind[SyntaxKind["CloseParenToken"] = 26] = "CloseParenToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskEqualsToken"] = 27] = "AsteriskAsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskAsteriskToken"] = 28] = "AsteriskAsteriskToken";
    SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 29] = "AsteriskEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskToken"] = 30] = "AsteriskToken";
    SyntaxKind[SyntaxKind["BarToken"] = 31] = "BarToken";
    SyntaxKind[SyntaxKind["ColonToken"] = 32] = "ColonToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 33] = "CommaToken";
    SyntaxKind[SyntaxKind["DotToken"] = 34] = "DotToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 35] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 36] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["EqualsToken"] = 37] = "EqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 38] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 39] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 40] = "GreaterThanToken";
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 41] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 42] = "LessThanToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 43] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 44] = "MinusToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 45] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 46] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 47] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 48] = "PlusToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 49] = "SemicolonToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 50] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 51] = "SlashToken";
    SyntaxKind[SyntaxKind["NewlineToken"] = 52] = "NewlineToken";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 53] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["ImportDirective"] = 54] = "ImportDirective";
    SyntaxKind[SyntaxKind["Comment"] = 55] = "Comment";
    SyntaxKind[SyntaxKind["Block"] = 56] = "Block";
    SyntaxKind[SyntaxKind["Function"] = 57] = "Function";
    SyntaxKind[SyntaxKind["Identifier"] = 58] = "Identifier";
    SyntaxKind[SyntaxKind["ObjectDestructure"] = 59] = "ObjectDestructure";
    SyntaxKind[SyntaxKind["ObjectDestructureMember"] = 60] = "ObjectDestructureMember";
    SyntaxKind[SyntaxKind["TypeBound"] = 61] = "TypeBound";
    SyntaxKind[SyntaxKind["TypeDeclaration"] = 62] = "TypeDeclaration";
    SyntaxKind[SyntaxKind["TypeParameter"] = 63] = "TypeParameter";
    SyntaxKind[SyntaxKind["TypeProperty"] = 64] = "TypeProperty";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 65] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["AssignmentExpression"] = 66] = "AssignmentExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 67] = "BinaryExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 68] = "CallExpression";
    SyntaxKind[SyntaxKind["ForExpression"] = 69] = "ForExpression";
    SyntaxKind[SyntaxKind["IfExpression"] = 70] = "IfExpression";
    SyntaxKind[SyntaxKind["LoopExpression"] = 71] = "LoopExpression";
    SyntaxKind[SyntaxKind["UnaryExpression"] = 72] = "UnaryExpression";
    SyntaxKind[SyntaxKind["WhileExpression"] = 73] = "WhileExpression";
    SyntaxKind[SyntaxKind["IndexAccess"] = 74] = "IndexAccess";
    SyntaxKind[SyntaxKind["MemberAccess"] = 75] = "MemberAccess";
    SyntaxKind[SyntaxKind["BreakStatement"] = 76] = "BreakStatement";
    SyntaxKind[SyntaxKind["ExportStatement"] = 77] = "ExportStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 78] = "ReturnStatement";
    SyntaxKind[SyntaxKind["ArrayLiteral"] = 79] = "ArrayLiteral";
    SyntaxKind[SyntaxKind["BooleanLiteral"] = 80] = "BooleanLiteral";
    SyntaxKind[SyntaxKind["NumberLiteral"] = 81] = "NumberLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteral"] = 82] = "ObjectLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 83] = "StringLiteral";
    SyntaxKind[SyntaxKind["ObjectLiteralMember"] = 84] = "ObjectLiteralMember";
    SyntaxKind[SyntaxKind["StringLiteralPart"] = 85] = "StringLiteralPart";
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
    'import': SyntaxKind.ImportKeyword,
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
function isExport(token) {
    return token.kind === SyntaxKind.ExportStatement;
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
isIndex;
var _a, _b;
// export const NULL: Token = { kind: SyntaxKind.NullKeyword }
