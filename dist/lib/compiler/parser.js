"use strict";
var ast_1 = require('./ast');
var PRECEDENCE = (_a = {},
    _a[ast_1.SyntaxKind.EqualsToken] = 1,
    _a[ast_1.SyntaxKind.PlusEqualsToken] = 1.1,
    _a[ast_1.SyntaxKind.MinusEqualsToken] = 1.1,
    _a[ast_1.SyntaxKind.OrKeyword] = 2,
    _a[ast_1.SyntaxKind.AndKeyword] = 3,
    _a[ast_1.SyntaxKind.NotKeyword] = 4,
    _a[ast_1.SyntaxKind.EqualsEqualsToken] = 7,
    _a[ast_1.SyntaxKind.ExclamationEqualsToken] = 7,
    _a[ast_1.SyntaxKind.GreaterThanToken] = 7,
    _a[ast_1.SyntaxKind.GreaterThanEqualsToken] = 7,
    _a[ast_1.SyntaxKind.LessThanToken] = 7,
    _a[ast_1.SyntaxKind.LessThanEqualsToken] = 7,
    _a[ast_1.SyntaxKind.PlusToken] = 10,
    _a[ast_1.SyntaxKind.MinusToken] = 10,
    _a[ast_1.SyntaxKind.AsteriskToken] = 20,
    _a[ast_1.SyntaxKind.AsteriskAsteriskToken] = 20,
    _a[ast_1.SyntaxKind.SlashToken] = 20,
    _a[ast_1.SyntaxKind.PercentToken] = 20,
    _a
);
function parse(input) {
    function isToken(kind, peekDistance) {
        var token = input.peek(false, peekDistance);
        return token && token.kind == kind;
    }
    function expect(expect, name) {
        if (name === void 0) { name = 'token'; }
        if (!isToken(expect)) {
            var token = input.peek();
            var expectedText = ast_1.tokenToText[expect]
                ? ": \"" + ast_1.tokenToText[expect] + "\""
                : "";
            var but = token
                ? "got \"" + ast_1.tokenToText[token.kind] + "\""
                : "reached end of file";
            console.error(token);
            input.croak("Expected " + name + expectedText + ", but " + but);
        }
    }
    function consumeToken(token) {
        expect(token);
        return input.next();
    }
    function skipKeyword(kw) {
        expect(kw, 'keyword');
        input.next();
    }
    function unexpected() {
        var token = input.peek();
        console.error('token', token, typeof token);
        input.croak("Unexpected token: " + ast_1.tokenToText[token.kind]);
    }
    function isAssignment(token) {
        if (!token)
            return;
        return token.kind == ast_1.SyntaxKind.EqualsToken
            || token.kind == ast_1.SyntaxKind.PlusEqualsToken
            || token.kind == ast_1.SyntaxKind.MinusEqualsToken
            || token.kind == ast_1.SyntaxKind.AsteriskEqualsToken
            || token.kind == ast_1.SyntaxKind.AsteriskAsteriskEqualsToken
            || token.kind == ast_1.SyntaxKind.SlashEqualsToken
            || token.kind == ast_1.SyntaxKind.PercentEqualsToken;
    }
    function maybeParseOperator() {
        if (isAssignment(input.peek())
            || isToken(ast_1.SyntaxKind.EqualsEqualsToken)
            || isToken(ast_1.SyntaxKind.ExclamationEqualsToken)
            || isToken(ast_1.SyntaxKind.GreaterThanToken)
            || isToken(ast_1.SyntaxKind.GreaterThanEqualsToken)
            || isToken(ast_1.SyntaxKind.LessThanToken)
            || isToken(ast_1.SyntaxKind.LessThanEqualsToken)
            || isToken(ast_1.SyntaxKind.PlusToken)
            || isToken(ast_1.SyntaxKind.MinusToken)
            || isToken(ast_1.SyntaxKind.AsteriskToken)
            || isToken(ast_1.SyntaxKind.AsteriskAsteriskToken)
            || isToken(ast_1.SyntaxKind.SlashToken)
            || isToken(ast_1.SyntaxKind.PercentToken)
            || isToken(ast_1.SyntaxKind.AndKeyword)
            || isToken(ast_1.SyntaxKind.OrKeyword)
            || isToken(ast_1.SyntaxKind.NotKeyword)) {
            return input.peek();
        }
        return null;
    }
    function maybeBinary(left, myPrecedence) {
        var operator = maybeParseOperator();
        if (operator) {
            var hisPrecedence = PRECEDENCE[operator.kind];
            if (hisPrecedence === undefined) {
                throw "No PRECEDENCE for " + ast_1.tokenToText[operator.kind] + ": " + JSON.stringify(operator);
            }
            if (hisPrecedence > myPrecedence) {
                input.next();
                var e = void 0;
                var innerExpression = maybeBinary(parseAtom(), hisPrecedence);
                if (isAssignment(operator)) {
                    if (ast_1.isIdentifier(left) || ast_1.isMember(left)) {
                        var a = {
                            kind: ast_1.SyntaxKind.AssignmentExpression,
                            lhs: left,
                            token: operator,
                            rhs: innerExpression,
                        };
                        e = a;
                    }
                    else {
                        input.croak('Can only assign to an identifier');
                    }
                }
                else {
                    var a = {
                        kind: ast_1.SyntaxKind.BinaryExpression,
                        lhs: left,
                        operator: operator,
                        rhs: innerExpression,
                    };
                    e = a;
                }
                return maybeBinary(e, myPrecedence);
            }
        }
        return left;
    }
    function maybeMemberAccess(token) {
        if (isToken(ast_1.SyntaxKind.DotToken)) {
            input.next();
            expect(ast_1.SyntaxKind.Identifier, 'identifier');
            return {
                kind: ast_1.SyntaxKind.MemberAccess,
                object: token,
                member: maybeMemberAccess(maybeCall(input.next()))
            };
        }
        if (isToken(ast_1.SyntaxKind.OpenBracketToken)) {
            input.next();
            var index = parseExpression();
            consumeToken(ast_1.SyntaxKind.CloseBracketToken);
            return maybeMemberAccess(maybeCall({
                kind: ast_1.SyntaxKind.IndexAccess,
                object: token,
                index: index,
            }));
        }
        return token;
    }
    function delimited(start, stop, separator, parser) {
        if (typeof start === 'string')
            start = ast_1.textToToken[start];
        if (typeof stop === 'string')
            stop = ast_1.textToToken[stop];
        if (typeof separator === 'string')
            separator = ast_1.textToToken[separator];
        var a = [], first = true;
        consumeToken(start);
        while (!input.eof()) {
            if (isToken(stop))
                break;
            if (first)
                first = false;
            else {
                if (typeof separator === 'function')
                    separator();
                else
                    consumeToken(separator);
            }
            var part = void 0;
            while (!part) {
                if (isToken(stop))
                    break;
                part = parser();
            }
            if (part) {
                a.push(part);
            }
        }
        consumeToken(stop);
        return a;
    }
    function parseCall(fn) {
        return {
            kind: ast_1.SyntaxKind.CallExpression,
            func: fn,
            openParen: input.peek(),
            argumentList: delimited("(", ")", ",", parseExpression),
            closeParen: input.peek(),
        };
    }
    function parseTypeBound() {
        expect(ast_1.SyntaxKind.Identifier, 'identifier');
        var name = input.next();
        var parameters;
        if (isToken(ast_1.SyntaxKind.LessThanToken)) {
            parameters = delimited('<', '>', ',', parseTypeBound);
        }
        return {
            kind: ast_1.SyntaxKind.TypeBound,
            name: name,
            parameters: parameters,
        };
    }
    function parseVariableDeclaration() {
        var mutable = false;
        if (isToken(ast_1.SyntaxKind.MutKeyword)) {
            input.next();
            mutable = true;
        }
        expect(ast_1.SyntaxKind.Identifier, 'identifier');
        var declaration = {
            kind: ast_1.SyntaxKind.VariableDeclaration,
            identifier: input.next(),
            mutable: mutable,
        };
        if (isToken(ast_1.SyntaxKind.ColonToken)) {
            input.next();
            declaration.typeBound = parseTypeBound();
        }
        if (isToken(ast_1.SyntaxKind.EqualsToken)) {
            input.next();
            declaration.initializer = parseExpression();
        }
        return declaration;
    }
    function parseFunction() {
        var name;
        if (isToken(ast_1.SyntaxKind.Identifier)) {
            name = input.next();
        }
        var parameterList = delimited("(", ")", ",", function () { return parseVariableDeclaration(); });
        var returnType;
        if (isToken(ast_1.SyntaxKind.ColonToken)) {
            input.next();
            returnType = parseTypeBound();
        }
        var body;
        if (isToken(ast_1.SyntaxKind.OpenBraceToken)) {
            body = parseBlock();
        }
        else {
            skipKeyword(ast_1.SyntaxKind.ThenKeyword);
            body = {
                kind: ast_1.SyntaxKind.Block,
                block: [parseExpression()],
            };
        }
        return {
            kind: ast_1.SyntaxKind.Function,
            name: name,
            parameterList: parameterList,
            returnType: returnType,
            body: body,
        };
    }
    function parseIf() {
        skipKeyword(ast_1.SyntaxKind.IfKeyword);
        var condition = parseExpression();
        var _then;
        if (isToken(ast_1.SyntaxKind.OpenBraceToken)) {
            _then = parseBlock();
        }
        else {
            skipKeyword(ast_1.SyntaxKind.ThenKeyword);
            _then = {
                kind: ast_1.SyntaxKind.Block,
                block: [parseExpression()],
            };
        }
        var ret = {
            kind: ast_1.SyntaxKind.IfExpression,
            condition: condition,
            _then: _then,
        };
        if (isToken(ast_1.SyntaxKind.ElseKeyword)) {
            input.next();
            if (isToken(ast_1.SyntaxKind.OpenBraceToken)) {
                ret._else = parseBlock();
            }
            else {
                ret._else = {
                    kind: ast_1.SyntaxKind.Block,
                    block: [parseExpression()],
                };
            }
        }
        return ret;
    }
    function parseWhile() {
        skipKeyword(ast_1.SyntaxKind.WhileKeyword);
        var condition = parseExpression();
        var body;
        if (isToken(ast_1.SyntaxKind.OpenBraceToken)) {
            body = parseBlock();
        }
        else {
            skipKeyword(ast_1.SyntaxKind.ThenKeyword);
            body = {
                kind: ast_1.SyntaxKind.Block,
                block: [parseExpression()],
            };
        }
        return {
            kind: ast_1.SyntaxKind.WhileExpression,
            condition: condition,
            body: body,
        };
    }
    function parseArrayLiteral() {
        var members = delimited("[", "]", ",", parseExpression);
        return { kind: ast_1.SyntaxKind.ArrayLiteral, members: members };
    }
    function parseObjectLiteralMember() {
        var name = consumeToken(ast_1.SyntaxKind.Identifier);
        var value;
        if (isToken(ast_1.SyntaxKind.ColonToken)) {
            input.next();
            value = parseExpression();
        }
        else {
            value = name;
        }
        return {
            kind: ast_1.SyntaxKind.ObjectLiteralMember,
            name: name,
            value: value,
        };
    }
    function parseObjectLiteral() {
        var members = delimited("{", "}", ",", parseObjectLiteralMember);
        return { kind: ast_1.SyntaxKind.ObjectLiteral, members: members };
    }
    function maybeCall(expr) {
        return isToken(ast_1.SyntaxKind.OpenParenToken) ? parseCall(expr) : expr;
    }
    function parseAtom() {
        return maybeCall((function innerParseAtom() {
            if (isToken(ast_1.SyntaxKind.OpenParenToken)) {
                input.next();
                var exp = parseExpression();
                consumeToken(ast_1.SyntaxKind.CloseParenToken);
                return exp;
            }
            if (isToken(ast_1.SyntaxKind.OpenBracketToken))
                return parseArrayLiteral();
            if (isToken(ast_1.SyntaxKind.OpenBraceToken))
                return parseObjectLiteral();
            if (isToken(ast_1.SyntaxKind.IfKeyword))
                return parseIf();
            if (isToken(ast_1.SyntaxKind.WhileKeyword))
                return parseWhile();
            if (isToken(ast_1.SyntaxKind.FnKeyword)) {
                input.next();
                return parseFunction();
            }
            if (isToken(ast_1.SyntaxKind.LetKeyword)) {
                input.next();
                return parseVariableDeclaration();
            }
            if (isToken(ast_1.SyntaxKind.NotKeyword)
                || isToken(ast_1.SyntaxKind.MinusToken)
                || isToken(ast_1.SyntaxKind.PlusToken)) {
                return {
                    kind: ast_1.SyntaxKind.UnaryExpression,
                    operator: input.next(),
                    rhs: parseExpression(),
                };
            }
            if (isToken(ast_1.SyntaxKind.BreakKeyword)) {
                return input.next();
            }
            if (isToken(ast_1.SyntaxKind.ReturnKeyword)
                || isToken(ast_1.SyntaxKind.ThrowKeyword)) {
                var kind = input.next().kind;
                return {
                    kind: kind,
                    expression: parseExpression(),
                };
            }
            if (isToken(ast_1.SyntaxKind.TrueKeyword) ||
                isToken(ast_1.SyntaxKind.FalseKeyword)) {
                return maybeMemberAccess({
                    kind: ast_1.SyntaxKind.BooleanLiteral,
                    value: input.next().kind == ast_1.SyntaxKind.TrueKeyword,
                });
            }
            if (isToken(ast_1.SyntaxKind.NumberLiteral) ||
                isToken(ast_1.SyntaxKind.StringLiteral) ||
                isToken(ast_1.SyntaxKind.Identifier)) {
                return maybeMemberAccess(input.next());
            }
            unexpected();
        })());
    }
    function expectSeparator(kind) {
        if (!input.eof()) {
            var token = input.peek(true);
            if (token.kind == ast_1.SyntaxKind.NewlineToken
                || token.kind == ast_1.SyntaxKind.Comment) {
                input.next(true);
            }
            else {
                consumeToken(kind);
            }
        }
    }
    function parseToplevel() {
        var prog = [];
        while (!input.eof()) {
            var expression = parseExpression();
            if (expression) {
                prog.push(expression);
            }
            if (!input.eof())
                expectSeparator(ast_1.SyntaxKind.SemicolonToken);
        }
        return { kind: ast_1.SyntaxKind.Block, block: prog };
    }
    function parseBlock() {
        var block = delimited("{", "}", function () { return expectSeparator(ast_1.SyntaxKind.SemicolonToken); }, parseExpression);
        return { kind: ast_1.SyntaxKind.Block, block: block };
    }
    function parseExpression() {
        return maybeMemberAccess(maybeCall(maybeBinary(parseAtom(), 0)));
    }
    return parseToplevel();
}
exports.parse = parse;
var _a;
