#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TupleLiteral = exports.StringLiteral = exports.StringLiteralPart = exports.ObjectLiteralMember = exports.ObjectLiteral = exports.NumberLiteral = exports.BooleanLiteral = exports.ListLiteral = exports.ReturnStatement = exports.BreakStatement = exports.Pattern = exports.TuplePattern = exports.RecordPatternMember = exports.RecordPattern = exports.TypePath = exports.MemberAccess = exports.IndexAccess = exports.WhileLoop = exports.UnaryExpression = exports.TypePathExpression = exports.MatchArm = exports.MatchExpression = exports.IfLetExpression = exports.IfExpression = exports.ForExpression = exports.CallExpression = exports.BinaryExpression = exports.AssignmentExpression = exports.ImportDirective = exports.ExportDirective = exports.VariableDeclaration = exports.TypeProperty = exports.TypeParameter = exports.TypeDeclaration = exports.TupleTypeBound = exports.ObjectTypeBound = exports.NamedTypeBound = exports.FunctionTypeBound = exports.TypeBound = exports.TraitDeclaration = exports.SimpleIdentifier = exports.ObjectDestructureMember = exports.ObjectDestructure = exports.Module = exports.ImplDeclaration = exports.Identifier = exports.FunctionDeclaration = exports.EnumMember = exports.EnumDeclaration = exports.Block = exports.CommentNode = exports.Expression = exports.Token = exports.SyntaxKind = undefined;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _entities = require('./../entities.js');

var SyntaxKind = exports.SyntaxKind = function SyntaxKind(object) {
  return object;
};
var Token = exports.Token = function Token(object) {
  return object;
};
var Expression = exports.Expression = function Expression(object) {
  return object;
};
var CommentNode = exports.CommentNode = function CommentNode(object) {
  return object;
};
var Block = exports.Block = function Block(object) {
  return object;
};
var EnumDeclaration = exports.EnumDeclaration = function EnumDeclaration(object) {
  return object;
};
var EnumMember = exports.EnumMember = function EnumMember(object) {
  return object;
};
var FunctionDeclaration = exports.FunctionDeclaration = function FunctionDeclaration(object) {
  return object;
};
var Identifier = exports.Identifier = function Identifier(object) {
  return object;
};
var ImplDeclaration = exports.ImplDeclaration = function ImplDeclaration(object) {
  return object;
};
var Module = exports.Module = function Module(object) {
  return object;
};
var ObjectDestructure = exports.ObjectDestructure = function ObjectDestructure(object) {
  return object;
};
var ObjectDestructureMember = exports.ObjectDestructureMember = function ObjectDestructureMember(object) {
  return object;
};
var SimpleIdentifier = exports.SimpleIdentifier = function SimpleIdentifier(object) {
  return object;
};
var TraitDeclaration = exports.TraitDeclaration = function TraitDeclaration(object) {
  return object;
};
var TypeBound = exports.TypeBound = function TypeBound(object) {
  return object;
};
var FunctionTypeBound = exports.FunctionTypeBound = function FunctionTypeBound(object) {
  return object;
};
var NamedTypeBound = exports.NamedTypeBound = function NamedTypeBound(object) {
  return object;
};
var ObjectTypeBound = exports.ObjectTypeBound = function ObjectTypeBound(object) {
  return object;
};
var TupleTypeBound = exports.TupleTypeBound = function TupleTypeBound(object) {
  return object;
};
var TypeDeclaration = exports.TypeDeclaration = function TypeDeclaration(object) {
  return object;
};
var TypeParameter = exports.TypeParameter = function TypeParameter(object) {
  return object;
};
var TypeProperty = exports.TypeProperty = function TypeProperty(object) {
  return object;
};
var VariableDeclaration = exports.VariableDeclaration = function VariableDeclaration(object) {
  return object;
};
var ExportDirective = exports.ExportDirective = function ExportDirective(object) {
  return object;
};
var ImportDirective = exports.ImportDirective = function ImportDirective(object) {
  return object;
};
var AssignmentExpression = exports.AssignmentExpression = function AssignmentExpression(object) {
  return object;
};
var BinaryExpression = exports.BinaryExpression = function BinaryExpression(object) {
  return object;
};
var CallExpression = exports.CallExpression = function CallExpression(object) {
  return object;
};
var ForExpression = exports.ForExpression = function ForExpression(object) {
  return object;
};
var IfExpression = exports.IfExpression = function IfExpression(object) {
  return object;
};
var IfLetExpression = exports.IfLetExpression = function IfLetExpression(object) {
  return object;
};
var MatchExpression = exports.MatchExpression = function MatchExpression(object) {
  return object;
};
var MatchArm = exports.MatchArm = function MatchArm(object) {
  return object;
};
var TypePathExpression = exports.TypePathExpression = function TypePathExpression(object) {
  return object;
};
var UnaryExpression = exports.UnaryExpression = function UnaryExpression(object) {
  return object;
};
var WhileLoop = exports.WhileLoop = function WhileLoop(object) {
  return object;
};
var IndexAccess = exports.IndexAccess = function IndexAccess(object) {
  return object;
};
var MemberAccess = exports.MemberAccess = function MemberAccess(object) {
  return object;
};
var TypePath = exports.TypePath = {
  _Object: function _Object() {
    for (var _len = arguments.length, members = Array(_len), _key = 0; _key < _len; _key++) {
      members[_key] = arguments[_key];
    }

    return { kind: '_Object', value: members };
  },
  Member: function Member() {
    for (var _len2 = arguments.length, members = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      members[_key2] = arguments[_key2];
    }

    return { kind: 'Member', value: members };
  }
};
var RecordPattern = exports.RecordPattern = function RecordPattern(object) {
  return object;
};
var RecordPatternMember = exports.RecordPatternMember = function RecordPatternMember(object) {
  return object;
};
var TuplePattern = exports.TuplePattern = function TuplePattern(object) {
  return object;
};
var Pattern = exports.Pattern = {
  CatchAll: { kind: 'CatchAll', value: Symbol('CatchAll') },
  Identifier: function Identifier() {
    for (var _len3 = arguments.length, members = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      members[_key3] = arguments[_key3];
    }

    return { kind: 'Identifier', value: members };
  },
  Record: function Record() {
    for (var _len4 = arguments.length, members = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      members[_key4] = arguments[_key4];
    }

    return { kind: 'Record', value: members };
  },
  Tuple: function Tuple() {
    for (var _len5 = arguments.length, members = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      members[_key5] = arguments[_key5];
    }

    return { kind: 'Tuple', value: members };
  },
  RecordType: function RecordType() {
    for (var _len6 = arguments.length, members = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      members[_key6] = arguments[_key6];
    }

    return { kind: 'RecordType', value: members };
  },
  TupleType: function TupleType() {
    for (var _len7 = arguments.length, members = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      members[_key7] = arguments[_key7];
    }

    return { kind: 'TupleType', value: members };
  },
  UnitType: function UnitType() {
    for (var _len8 = arguments.length, members = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      members[_key8] = arguments[_key8];
    }

    return { kind: 'UnitType', value: members };
  }
};
var BreakStatement = exports.BreakStatement = function BreakStatement(object) {
  return object;
};
var ReturnStatement = exports.ReturnStatement = function ReturnStatement(object) {
  return object;
};
var ListLiteral = exports.ListLiteral = function ListLiteral(object) {
  return object;
};
var BooleanLiteral = exports.BooleanLiteral = function BooleanLiteral(object) {
  return object;
};
var NumberLiteral = exports.NumberLiteral = function NumberLiteral(object) {
  return object;
};
var ObjectLiteral = exports.ObjectLiteral = function ObjectLiteral(object) {
  return object;
};
var ObjectLiteralMember = exports.ObjectLiteralMember = function ObjectLiteralMember(object) {
  return object;
};
var StringLiteralPart = exports.StringLiteralPart = function StringLiteralPart(object) {
  return object;
};
var StringLiteral = exports.StringLiteral = function StringLiteral(object) {
  return object;
};
var TupleLiteral = exports.TupleLiteral = function TupleLiteral(object) {
  return object;
};
