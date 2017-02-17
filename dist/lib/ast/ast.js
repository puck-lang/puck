'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeBound = exports.Pattern = exports.StringLiteralPart = exports.TypePath = exports.AttributeData = exports.ImportSpecifier = exports.ExportedStatement = exports.SimpleLiteral = exports.Expression = exports.BlockLevelStatement = exports.TopLevelStatement = exports.TypeParameter = exports.TupleTypeBound = exports.RecordTypeBoundMember = exports.RecordTypeBound = exports.NamedTypeBound = exports.FunctionTypeBound = exports.TuplePattern = exports.RecordPatternMember = exports.RecordPattern = exports.TupleLiteral = exports.SimpleStringLiteral = exports.StringLiteral = exports.RecordLiteralMember = exports.RecordLiteral = exports.NumberLiteral = exports.ListLiteral = exports.BooleanLiteral = exports.MemberAccess = exports.IndexAccess = exports.UnaryExpression = exports.TypePathExpression = exports.MatchArm = exports.MatchExpression = exports.IfLetExpression = exports.IfExpression = exports.CallExpression = exports.BinaryExpression = exports.AssignmentExpression = exports.VariableDeclaration = exports.FunctionDeclaration = exports.Identifier = exports.AttributeArgument = exports.Attribute = exports.Comment = exports.WhileLoop = exports.ReturnStatement = exports.BreakStatement = exports.Block = exports.ObjectDestructureMember = exports.ObjectDestructure = exports.ImportDirective = exports.ExportDirective = exports.TypeDeclaration = exports.TraitDeclaration = exports.ImplShorthandDeclaration = exports.ImplDeclaration = exports.EnumMember = exports.EnumDeclaration = exports.Module = exports.Token = exports.SyntaxKind = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var _entities = require('./../entities');

var _span3 = require('./span');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var SyntaxKind = exports.SyntaxKind = function SyntaxKind(object) {
  return object;
};
var Token = exports.Token = function Token(object) {
  return object;
};
var Module = exports.Module = function Module(object) {
  return object;
};
var EnumDeclaration = exports.EnumDeclaration = function EnumDeclaration(object) {
  return object;
};
var EnumMember = exports.EnumMember = function EnumMember(object) {
  return object;
};
var ImplDeclaration = exports.ImplDeclaration = function ImplDeclaration(object) {
  return object;
};
var ImplShorthandDeclaration = exports.ImplShorthandDeclaration = function ImplShorthandDeclaration(object) {
  return object;
};
var TraitDeclaration = exports.TraitDeclaration = function TraitDeclaration(object) {
  return object;
};
var TypeDeclaration = exports.TypeDeclaration = function TypeDeclaration(object) {
  return object;
};
var ExportDirective = exports.ExportDirective = function ExportDirective(object) {
  return object;
};
var ImportDirective = exports.ImportDirective = function ImportDirective(object) {
  return object;
};
var ObjectDestructure = exports.ObjectDestructure = function ObjectDestructure(object) {
  return object;
};
var ObjectDestructureMember = exports.ObjectDestructureMember = function ObjectDestructureMember(object) {
  return object;
};
var Block = exports.Block = function Block(object) {
  return object;
};
var BreakStatement = exports.BreakStatement = function BreakStatement(object) {
  return object;
};
var ReturnStatement = exports.ReturnStatement = function ReturnStatement(object) {
  return object;
};
var WhileLoop = exports.WhileLoop = function WhileLoop(object) {
  return object;
};
var Comment = exports.Comment = function Comment(object) {
  return object;
};
var Attribute = exports.Attribute = function Attribute(object) {
  return object;
};
var AttributeArgument = exports.AttributeArgument = function AttributeArgument(object) {
  return object;
};
var Identifier = exports.Identifier = function Identifier(object) {
  return object;
};
var FunctionDeclaration = exports.FunctionDeclaration = function FunctionDeclaration(object) {
  return object;
};
var VariableDeclaration = exports.VariableDeclaration = function VariableDeclaration(object) {
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
var IndexAccess = exports.IndexAccess = function IndexAccess(object) {
  return object;
};
var MemberAccess = exports.MemberAccess = function MemberAccess(object) {
  return object;
};
var BooleanLiteral = exports.BooleanLiteral = function BooleanLiteral(object) {
  return object;
};
var ListLiteral = exports.ListLiteral = function ListLiteral(object) {
  return object;
};
var NumberLiteral = exports.NumberLiteral = function NumberLiteral(object) {
  return object;
};
var RecordLiteral = exports.RecordLiteral = function RecordLiteral(object) {
  return object;
};
var RecordLiteralMember = exports.RecordLiteralMember = function RecordLiteralMember(object) {
  return object;
};
var StringLiteral = exports.StringLiteral = function StringLiteral(object) {
  return object;
};
var SimpleStringLiteral = exports.SimpleStringLiteral = function SimpleStringLiteral(object) {
  return object;
};
var TupleLiteral = exports.TupleLiteral = function TupleLiteral(object) {
  return object;
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
var FunctionTypeBound = exports.FunctionTypeBound = function FunctionTypeBound(object) {
  return object;
};
var NamedTypeBound = exports.NamedTypeBound = function NamedTypeBound(object) {
  return object;
};
var RecordTypeBound = exports.RecordTypeBound = function RecordTypeBound(object) {
  return object;
};
var RecordTypeBoundMember = exports.RecordTypeBoundMember = function RecordTypeBoundMember(object) {
  return object;
};
var TupleTypeBound = exports.TupleTypeBound = function TupleTypeBound(object) {
  return object;
};
var TypeParameter = exports.TypeParameter = function TypeParameter(object) {
  return object;
};
var TopLevelStatement = exports.TopLevelStatement = {
  ExportDirective: function ExportDirective() {
    for (var _len = arguments.length, members = Array(_len), _key = 0; _key < _len; _key++) {
      members[_key] = arguments[_key];
    }

    return { kind: 'ExportDirective', value: members };
  },
  ImportDirective: function ImportDirective() {
    for (var _len2 = arguments.length, members = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      members[_key2] = arguments[_key2];
    }

    return { kind: 'ImportDirective', value: members };
  },
  EnumDeclaration: function EnumDeclaration() {
    for (var _len3 = arguments.length, members = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      members[_key3] = arguments[_key3];
    }

    return { kind: 'EnumDeclaration', value: members };
  },
  ImplDeclaration: function ImplDeclaration() {
    for (var _len4 = arguments.length, members = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      members[_key4] = arguments[_key4];
    }

    return { kind: 'ImplDeclaration', value: members };
  },
  ImplShorthandDeclaration: function ImplShorthandDeclaration() {
    for (var _len5 = arguments.length, members = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      members[_key5] = arguments[_key5];
    }

    return { kind: 'ImplShorthandDeclaration', value: members };
  },
  TraitDeclaration: function TraitDeclaration() {
    for (var _len6 = arguments.length, members = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      members[_key6] = arguments[_key6];
    }

    return { kind: 'TraitDeclaration', value: members };
  },
  TypeDeclaration: function TypeDeclaration() {
    for (var _len7 = arguments.length, members = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      members[_key7] = arguments[_key7];
    }

    return { kind: 'TypeDeclaration', value: members };
  },
  BlockLevelStatement: function BlockLevelStatement() {
    for (var _len8 = arguments.length, members = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      members[_key8] = arguments[_key8];
    }

    return { kind: 'BlockLevelStatement', value: members };
  }
};
var BlockLevelStatement = exports.BlockLevelStatement = {
  Block: function Block() {
    for (var _len9 = arguments.length, members = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      members[_key9] = arguments[_key9];
    }

    return { kind: 'Block', value: members };
  },
  BreakStatement: function BreakStatement() {
    for (var _len10 = arguments.length, members = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
      members[_key10] = arguments[_key10];
    }

    return { kind: 'BreakStatement', value: members };
  },
  ReturnStatement: function ReturnStatement() {
    for (var _len11 = arguments.length, members = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      members[_key11] = arguments[_key11];
    }

    return { kind: 'ReturnStatement', value: members };
  },
  WhileLoop: function WhileLoop() {
    for (var _len12 = arguments.length, members = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
      members[_key12] = arguments[_key12];
    }

    return { kind: 'WhileLoop', value: members };
  },
  Expression: function Expression() {
    for (var _len13 = arguments.length, members = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
      members[_key13] = arguments[_key13];
    }

    return { kind: 'Expression', value: members };
  }
};
var Expression = exports.Expression = {
  ThrowStatement: function ThrowStatement() {
    for (var _len14 = arguments.length, members = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
      members[_key14] = arguments[_key14];
    }

    return { kind: 'ThrowStatement', value: members };
  },
  Comment: function Comment() {
    for (var _len15 = arguments.length, members = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
      members[_key15] = arguments[_key15];
    }

    return { kind: 'Comment', value: members };
  },
  Identifier: function Identifier() {
    for (var _len16 = arguments.length, members = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
      members[_key16] = arguments[_key16];
    }

    return { kind: 'Identifier', value: members };
  },
  FunctionDeclaration: function FunctionDeclaration() {
    for (var _len17 = arguments.length, members = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
      members[_key17] = arguments[_key17];
    }

    return { kind: 'FunctionDeclaration', value: members };
  },
  VariableDeclaration: function VariableDeclaration() {
    for (var _len18 = arguments.length, members = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
      members[_key18] = arguments[_key18];
    }

    return { kind: 'VariableDeclaration', value: members };
  },
  AssignmentExpression: function AssignmentExpression() {
    for (var _len19 = arguments.length, members = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
      members[_key19] = arguments[_key19];
    }

    return { kind: 'AssignmentExpression', value: members };
  },
  BinaryExpression: function BinaryExpression() {
    for (var _len20 = arguments.length, members = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
      members[_key20] = arguments[_key20];
    }

    return { kind: 'BinaryExpression', value: members };
  },
  CallExpression: function CallExpression() {
    for (var _len21 = arguments.length, members = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
      members[_key21] = arguments[_key21];
    }

    return { kind: 'CallExpression', value: members };
  },
  IfExpression: function IfExpression() {
    for (var _len22 = arguments.length, members = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
      members[_key22] = arguments[_key22];
    }

    return { kind: 'IfExpression', value: members };
  },
  IfLetExpression: function IfLetExpression() {
    for (var _len23 = arguments.length, members = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
      members[_key23] = arguments[_key23];
    }

    return { kind: 'IfLetExpression', value: members };
  },
  MatchExpression: function MatchExpression() {
    for (var _len24 = arguments.length, members = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
      members[_key24] = arguments[_key24];
    }

    return { kind: 'MatchExpression', value: members };
  },
  TypePathExpression: function TypePathExpression() {
    for (var _len25 = arguments.length, members = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
      members[_key25] = arguments[_key25];
    }

    return { kind: 'TypePathExpression', value: members };
  },
  UnaryExpression: function UnaryExpression() {
    for (var _len26 = arguments.length, members = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
      members[_key26] = arguments[_key26];
    }

    return { kind: 'UnaryExpression', value: members };
  },
  IndexAccess: function IndexAccess() {
    for (var _len27 = arguments.length, members = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
      members[_key27] = arguments[_key27];
    }

    return { kind: 'IndexAccess', value: members };
  },
  MemberAccess: function MemberAccess() {
    for (var _len28 = arguments.length, members = Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
      members[_key28] = arguments[_key28];
    }

    return { kind: 'MemberAccess', value: members };
  },
  BooleanLiteral: function BooleanLiteral() {
    for (var _len29 = arguments.length, members = Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
      members[_key29] = arguments[_key29];
    }

    return { kind: 'BooleanLiteral', value: members };
  },
  ListLiteral: function ListLiteral() {
    for (var _len30 = arguments.length, members = Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
      members[_key30] = arguments[_key30];
    }

    return { kind: 'ListLiteral', value: members };
  },
  NumberLiteral: function NumberLiteral() {
    for (var _len31 = arguments.length, members = Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
      members[_key31] = arguments[_key31];
    }

    return { kind: 'NumberLiteral', value: members };
  },
  RecordLiteral: function RecordLiteral() {
    for (var _len32 = arguments.length, members = Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
      members[_key32] = arguments[_key32];
    }

    return { kind: 'RecordLiteral', value: members };
  },
  StringLiteral: function StringLiteral() {
    for (var _len33 = arguments.length, members = Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
      members[_key33] = arguments[_key33];
    }

    return { kind: 'StringLiteral', value: members };
  },
  TupleLiteral: function TupleLiteral() {
    for (var _len34 = arguments.length, members = Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
      members[_key34] = arguments[_key34];
    }

    return { kind: 'TupleLiteral', value: members };
  }
};
var SimpleLiteral = exports.SimpleLiteral = {
  BooleanLiteral: function BooleanLiteral() {
    for (var _len35 = arguments.length, members = Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
      members[_key35] = arguments[_key35];
    }

    return { kind: 'BooleanLiteral', value: members };
  },
  NumberLiteral: function NumberLiteral() {
    for (var _len36 = arguments.length, members = Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
      members[_key36] = arguments[_key36];
    }

    return { kind: 'NumberLiteral', value: members };
  },
  StringLiteral: function StringLiteral() {
    for (var _len37 = arguments.length, members = Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
      members[_key37] = arguments[_key37];
    }

    return { kind: 'StringLiteral', value: members };
  }
};
var ExportedStatement = exports.ExportedStatement = {
  EnumDeclaration: function EnumDeclaration() {
    for (var _len38 = arguments.length, members = Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
      members[_key38] = arguments[_key38];
    }

    return { kind: 'EnumDeclaration', value: members };
  },
  TraitDeclaration: function TraitDeclaration() {
    for (var _len39 = arguments.length, members = Array(_len39), _key39 = 0; _key39 < _len39; _key39++) {
      members[_key39] = arguments[_key39];
    }

    return { kind: 'TraitDeclaration', value: members };
  },
  TypeDeclaration: function TypeDeclaration() {
    for (var _len40 = arguments.length, members = Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
      members[_key40] = arguments[_key40];
    }

    return { kind: 'TypeDeclaration', value: members };
  },
  FunctionDeclaration: function FunctionDeclaration() {
    for (var _len41 = arguments.length, members = Array(_len41), _key41 = 0; _key41 < _len41; _key41++) {
      members[_key41] = arguments[_key41];
    }

    return { kind: 'FunctionDeclaration', value: members };
  },
  VariableDeclaration: function VariableDeclaration() {
    for (var _len42 = arguments.length, members = Array(_len42), _key42 = 0; _key42 < _len42; _key42++) {
      members[_key42] = arguments[_key42];
    }

    return { kind: 'VariableDeclaration', value: members };
  }
};
var ImportSpecifier = exports.ImportSpecifier = {
  Asterisk: function Asterisk() {
    for (var _len43 = arguments.length, members = Array(_len43), _key43 = 0; _key43 < _len43; _key43++) {
      members[_key43] = arguments[_key43];
    }

    return { kind: 'Asterisk', value: members };
  },
  Identifier: function Identifier() {
    for (var _len44 = arguments.length, members = Array(_len44), _key44 = 0; _key44 < _len44; _key44++) {
      members[_key44] = arguments[_key44];
    }

    return { kind: 'Identifier', value: members };
  },
  ObjectDestructure: function ObjectDestructure() {
    for (var _len45 = arguments.length, members = Array(_len45), _key45 = 0; _key45 < _len45; _key45++) {
      members[_key45] = arguments[_key45];
    }

    return { kind: 'ObjectDestructure', value: members };
  }
};
var AttributeData = exports.AttributeData = {
  None: { kind: 'None', value: Symbol('None') },
  Value: function Value() {
    for (var _len46 = arguments.length, members = Array(_len46), _key46 = 0; _key46 < _len46; _key46++) {
      members[_key46] = arguments[_key46];
    }

    return { kind: 'Value', value: members };
  },
  Arguments: function Arguments() {
    for (var _len47 = arguments.length, members = Array(_len47), _key47 = 0; _key47 < _len47; _key47++) {
      members[_key47] = arguments[_key47];
    }

    return { kind: 'Arguments', value: members };
  }
};
var TypePath = exports.TypePath = {
  _Object: function _Object() {
    for (var _len48 = arguments.length, members = Array(_len48), _key48 = 0; _key48 < _len48; _key48++) {
      members[_key48] = arguments[_key48];
    }

    return { kind: '_Object', value: members };
  },
  Member: function Member() {
    for (var _len49 = arguments.length, members = Array(_len49), _key49 = 0; _key49 < _len49; _key49++) {
      members[_key49] = arguments[_key49];
    }

    return { kind: 'Member', value: members };
  }
};
var StringLiteralPart = exports.StringLiteralPart = {
  Literal: function Literal() {
    for (var _len50 = arguments.length, members = Array(_len50), _key50 = 0; _key50 < _len50; _key50++) {
      members[_key50] = arguments[_key50];
    }

    return { kind: 'Literal', value: members };
  },
  Identifier: function Identifier() {
    for (var _len51 = arguments.length, members = Array(_len51), _key51 = 0; _key51 < _len51; _key51++) {
      members[_key51] = arguments[_key51];
    }

    return { kind: 'Identifier', value: members };
  }
};
var Pattern = exports.Pattern = {
  CatchAll: function CatchAll() {
    for (var _len52 = arguments.length, members = Array(_len52), _key52 = 0; _key52 < _len52; _key52++) {
      members[_key52] = arguments[_key52];
    }

    return { kind: 'CatchAll', value: members };
  },
  Identifier: function Identifier() {
    for (var _len53 = arguments.length, members = Array(_len53), _key53 = 0; _key53 < _len53; _key53++) {
      members[_key53] = arguments[_key53];
    }

    return { kind: 'Identifier', value: members };
  },
  Record: function Record() {
    for (var _len54 = arguments.length, members = Array(_len54), _key54 = 0; _key54 < _len54; _key54++) {
      members[_key54] = arguments[_key54];
    }

    return { kind: 'Record', value: members };
  },
  Tuple: function Tuple() {
    for (var _len55 = arguments.length, members = Array(_len55), _key55 = 0; _key55 < _len55; _key55++) {
      members[_key55] = arguments[_key55];
    }

    return { kind: 'Tuple', value: members };
  },
  RecordType: function RecordType() {
    for (var _len56 = arguments.length, members = Array(_len56), _key56 = 0; _key56 < _len56; _key56++) {
      members[_key56] = arguments[_key56];
    }

    return { kind: 'RecordType', value: members };
  },
  TupleType: function TupleType() {
    for (var _len57 = arguments.length, members = Array(_len57), _key57 = 0; _key57 < _len57; _key57++) {
      members[_key57] = arguments[_key57];
    }

    return { kind: 'TupleType', value: members };
  },
  UnitType: function UnitType() {
    for (var _len58 = arguments.length, members = Array(_len58), _key58 = 0; _key58 < _len58; _key58++) {
      members[_key58] = arguments[_key58];
    }

    return { kind: 'UnitType', value: members };
  }
};
var TypeBound = exports.TypeBound = {
  FunctionTypeBound: function FunctionTypeBound() {
    for (var _len59 = arguments.length, members = Array(_len59), _key59 = 0; _key59 < _len59; _key59++) {
      members[_key59] = arguments[_key59];
    }

    return { kind: 'FunctionTypeBound', value: members };
  },
  NamedTypeBound: function NamedTypeBound() {
    for (var _len60 = arguments.length, members = Array(_len60), _key60 = 0; _key60 < _len60; _key60++) {
      members[_key60] = arguments[_key60];
    }

    return { kind: 'NamedTypeBound', value: members };
  },
  RecordTypeBound: function RecordTypeBound() {
    for (var _len61 = arguments.length, members = Array(_len61), _key61 = 0; _key61 < _len61; _key61++) {
      members[_key61] = arguments[_key61];
    }

    return { kind: 'RecordTypeBound', value: members };
  },
  TupleTypeBound: function TupleTypeBound() {
    for (var _len62 = arguments.length, members = Array(_len62), _key62 = 0; _key62 < _len62; _key62++) {
      members[_key62] = arguments[_key62];
    }

    return { kind: 'TupleTypeBound', value: members };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__1 = self;
    var __PUCK__value__2 = __PUCK__value__1;
    if ($unwrapTraitObject(__PUCK__value__2).kind == "Block") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          e = _$unwrapTraitObject$v[0];

      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e, $isTraitObject: true });
    } else {
      var __PUCK__value__3 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__3).kind == "BreakStatement") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            _e = _$unwrapTraitObject2$[0];

        return _e.span();
      } else {
        var __PUCK__value__4 = __PUCK__value__1;
        if ($unwrapTraitObject(__PUCK__value__4).kind == "ReturnStatement") {
          var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__4),
              _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
              _e2 = _$unwrapTraitObject3$[0];

          return _e2.span();
        } else {
          var __PUCK__value__5 = __PUCK__value__1;
          if ($unwrapTraitObject(__PUCK__value__5).kind == "WhileLoop") {
            var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__5),
                _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
                _e3 = _$unwrapTraitObject4$[0];

            return _e3.span();
          } else {
            var __PUCK__value__6 = __PUCK__value__1;
            if ($unwrapTraitObject(__PUCK__value__6).kind == "Expression") {
              var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__6),
                  _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
                  _e4 = _$unwrapTraitObject5$[0];

              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: _e4, $isTraitObject: true });
            };
          };
        };
      };
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__7 = self;
    var __PUCK__value__8 = __PUCK__value__7;
    if ($unwrapTraitObject(__PUCK__value__8).kind == "ThrowStatement") {
      var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__8),
          _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
          e = _$unwrapTraitObject6$[0];

      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true });
    } else {
      var __PUCK__value__9 = __PUCK__value__7;
      if ($unwrapTraitObject(__PUCK__value__9).kind == "Comment") {
        var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__9),
            _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
            __PUCK__value__10 = _$unwrapTraitObject7$[0];

        throw "No span for Comment";
      } else {
        var __PUCK__value__11 = __PUCK__value__7;
        if ($unwrapTraitObject(__PUCK__value__11).kind == "Identifier") {
          var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__11),
              _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
              _e5 = _$unwrapTraitObject8$[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: _e5, $isTraitObject: true });
        } else {
          var __PUCK__value__12 = __PUCK__value__7;
          if ($unwrapTraitObject(__PUCK__value__12).kind == "FunctionDeclaration") {
            var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__12),
                _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                _e6 = _$unwrapTraitObject9$[0];

            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: _e6, $isTraitObject: true });
          } else {
            var __PUCK__value__13 = __PUCK__value__7;
            if ($unwrapTraitObject(__PUCK__value__13).kind == "VariableDeclaration") {
              var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__13),
                  _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                  _e7 = _$unwrapTraitObject11[0];

              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: _e7, $isTraitObject: true });
            } else {
              var __PUCK__value__14 = __PUCK__value__7;
              if ($unwrapTraitObject(__PUCK__value__14).kind == "AssignmentExpression") {
                var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__14),
                    _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
                    _e8 = _$unwrapTraitObject13[0];

                return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: _e8, $isTraitObject: true });
              } else {
                var __PUCK__value__15 = __PUCK__value__7;
                if ($unwrapTraitObject(__PUCK__value__15).kind == "BinaryExpression") {
                  var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__15),
                      _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
                      _e9 = _$unwrapTraitObject15[0];

                  return _e9.span();
                } else {
                  var __PUCK__value__16 = __PUCK__value__7;
                  if ($unwrapTraitObject(__PUCK__value__16).kind == "CallExpression") {
                    var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__16),
                        _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
                        _e10 = _$unwrapTraitObject17[0];

                    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: _e10, $isTraitObject: true });
                  } else {
                    var __PUCK__value__17 = __PUCK__value__7;
                    if ($unwrapTraitObject(__PUCK__value__17).kind == "IfExpression") {
                      var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__17),
                          _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
                          _e11 = _$unwrapTraitObject19[0];

                      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: _e11, $isTraitObject: true });
                    } else {
                      var __PUCK__value__18 = __PUCK__value__7;
                      if ($unwrapTraitObject(__PUCK__value__18).kind == "IfLetExpression") {
                        var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__18),
                            _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
                            _e12 = _$unwrapTraitObject21[0];

                        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: _e12, $isTraitObject: true });
                      } else {
                        var __PUCK__value__19 = __PUCK__value__7;
                        if ($unwrapTraitObject(__PUCK__value__19).kind == "MatchExpression") {
                          var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__19),
                              _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
                              _e13 = _$unwrapTraitObject23[0];

                          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: _e13, $isTraitObject: true });
                        } else {
                          var __PUCK__value__20 = __PUCK__value__7;
                          if ($unwrapTraitObject(__PUCK__value__20).kind == "TypePathExpression") {
                            var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__20),
                                _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
                                _e14 = _$unwrapTraitObject25[0];

                            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression', value: _e14, $isTraitObject: true });
                          } else {
                            var __PUCK__value__21 = __PUCK__value__7;
                            if ($unwrapTraitObject(__PUCK__value__21).kind == "UnaryExpression") {
                              var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__21),
                                  _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
                                  _e15 = _$unwrapTraitObject27[0];

                              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: _e15, $isTraitObject: true });
                            } else {
                              var __PUCK__value__22 = __PUCK__value__7;
                              if ($unwrapTraitObject(__PUCK__value__22).kind == "IndexAccess") {
                                var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__22),
                                    _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
                                    _e16 = _$unwrapTraitObject29[0];

                                return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: _e16, $isTraitObject: true });
                              } else {
                                var __PUCK__value__23 = __PUCK__value__7;
                                if ($unwrapTraitObject(__PUCK__value__23).kind == "MemberAccess") {
                                  var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__23),
                                      _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
                                      _e17 = _$unwrapTraitObject31[0];

                                  return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: _e17, $isTraitObject: true });
                                } else {
                                  var __PUCK__value__24 = __PUCK__value__7;
                                  if ($unwrapTraitObject(__PUCK__value__24).kind == "BooleanLiteral") {
                                    var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__24),
                                        _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
                                        _e18 = _$unwrapTraitObject33[0];

                                    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: _e18, $isTraitObject: true });
                                  } else {
                                    var __PUCK__value__25 = __PUCK__value__7;
                                    if ($unwrapTraitObject(__PUCK__value__25).kind == "ListLiteral") {
                                      var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__25),
                                          _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
                                          _e19 = _$unwrapTraitObject35[0];

                                      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: _e19, $isTraitObject: true });
                                    } else {
                                      var __PUCK__value__26 = __PUCK__value__7;
                                      if ($unwrapTraitObject(__PUCK__value__26).kind == "NumberLiteral") {
                                        var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__26),
                                            _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
                                            _e20 = _$unwrapTraitObject37[0];

                                        return _e20.span;
                                      } else {
                                        var __PUCK__value__27 = __PUCK__value__7;
                                        if ($unwrapTraitObject(__PUCK__value__27).kind == "RecordLiteral") {
                                          var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__27),
                                              _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
                                              _e21 = _$unwrapTraitObject39[0];

                                          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral', value: _e21, $isTraitObject: true });
                                        } else {
                                          var __PUCK__value__28 = __PUCK__value__7;
                                          if ($unwrapTraitObject(__PUCK__value__28).kind == "StringLiteral") {
                                            var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__28),
                                                _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
                                                _e22 = _$unwrapTraitObject41[0];

                                            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: _e22, $isTraitObject: true });
                                          } else {
                                            var __PUCK__value__29 = __PUCK__value__7;
                                            if ($unwrapTraitObject(__PUCK__value__29).kind == "TupleLiteral") {
                                              var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__29),
                                                  _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                                                  _e23 = _$unwrapTraitObject43[0];

                                              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral', value: _e23, $isTraitObject: true });
                                            };
                                          };
                                        };
                                      };
                                    };
                                  };
                                };
                              };
                            };
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.keyword.span.start,
      end: self.value.closeBrace.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumMember"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.name.span.start,
      end: _core.Option.mapOr.call(self.value.bound, self.value.name.span, function (b) {
        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: b, $isTraitObject: true });
      }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.implKeyword.span.start,
      end: self.value.closeBrace.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.implKeyword.span.start,
      end: self.value.closeBrace.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.keyword.span.start,
      end: self.value.closeBrace.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.keyword.span.start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: _core.Option.unwrap.call(self.value.bound), $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.importKeyword.span.start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier', value: self.value.specifier, $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__30 = self;
    var __PUCK__value__31 = __PUCK__value__30;
    if ($unwrapTraitObject(__PUCK__value__31).kind == "Asterisk") {
      var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__31),
          _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
          token = _$unwrapTraitObject45[0];

      return token.span;
    } else {
      var __PUCK__value__32 = __PUCK__value__30;
      if ($unwrapTraitObject(__PUCK__value__32).kind == "Identifier") {
        var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__32),
            _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
            identifier = _$unwrapTraitObject47[0];

        return identifier.span;
      } else {
        var __PUCK__value__33 = __PUCK__value__30;
        if ($unwrapTraitObject(__PUCK__value__33).kind == "ObjectDestructure") {
          var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__33),
              _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 1),
              objectDestructure = _$unwrapTraitObject49[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructure"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructure', value: objectDestructure, $isTraitObject: true });
        };
      };
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructure"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openBrace.span.start,
      end: self.value.closeBrace.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.property.span.start,
      end: self.value.local.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"] = {
  span: function span() {
    var self = this;
    return {
      start: _core.Option.mapOrElse.call(self.value.openBrace, function () {
        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: _core.Option.unwrap.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.statements, $isTraitObject: true })), $isTraitObject: true });
      }, function (t) {
        return t.span;
      }).start,
      end: _core.Option.mapOrElse.call(self.value.closeBrace, function () {
        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: _core.Option.unwrap.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.statements, $isTraitObject: true })), $isTraitObject: true });
      }, function (t) {
        return t.span;
      }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.hash.span.start,
      end: self.value.closeBracket.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"] = {
  span: function span() {
    var self = this;
    return self.value.span;
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"] = {
  span: function span() {
    var self = this;
    return {
      start: _core.Option.mapOrElse.call(self.value.name, function () {
        return _core.Option.mapOrElse.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.typeParameters, $isTraitObject: true }), function () {
          return self.value.openParenOrBar.span;
        }, function (p) {
          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: p, $isTraitObject: true });
        });
      }, function (i) {
        return i.span;
      }).start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: _core.Option.unwrap.call(self.value.body), $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: self.value.pattern, $isTraitObject: true }).start,
      end: _core.Option.mapOrElse.call(self.value.initializer, function () {
        return _core.Option.mapOrElse.call(self.value.typeBound, function () {
          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: self.value.pattern, $isTraitObject: true });
        }, function (t) {
          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t, $isTraitObject: true });
        });
      }, function (i) {
        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: i, $isTraitObject: true });
      }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.lhs, $isTraitObject: true }).start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.rhs, $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.func, $isTraitObject: true }).start,
      end: self.value.closeParen.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.ifKeyword.span.start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: _core.Option.unwrapOr.call(self.value.else_, self.value.then_), $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.ifKeyword.span.start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: _core.Option.unwrapOr.call(self.value.else_, self.value.then_), $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.matchKeyword.span.start,
      end: self.value.closeBrace.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: self.value.pattern, $isTraitObject: true }).start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: self.value.block, $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.typePath, $isTraitObject: true }).start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.typePath, $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__34 = self;
    var __PUCK__value__35 = __PUCK__value__34;
    if ($unwrapTraitObject(__PUCK__value__35).kind == "_Object") {
      var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__35),
          _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 2),
          identifier = _$unwrapTraitObject51[0],
          typePath = _$unwrapTraitObject51[1];

      return {
        start: identifier.span.start,
        end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: typePath, $isTraitObject: true }).end
      };
    } else {
      var __PUCK__value__36 = __PUCK__value__34;
      if ($unwrapTraitObject(__PUCK__value__36).kind == "Member") {
        var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__36),
            _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52.value, 1),
            _identifier = _$unwrapTraitObject53[0];

        return _identifier.span;
      };
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.operator.span.start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.rhs, $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true }).start,
      end: self.value.closeBracket.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true }).start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: self.value.member, $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral"] = {
  span: function span() {
    var self = this;
    return self.value.keyword.span;
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openBracket.span.start,
      end: self.value.closeBracket.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral"] = {
  span: function span() {
    var self = this;
    return self.value.span;
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openBrace.span.start,
      end: self.value.closeBrace.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart', value: _core.Option.unwrap.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.parts, $isTraitObject: true })), $isTraitObject: true }).start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart', value: _core.Option.unwrap.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.parts, $isTraitObject: true })), $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__37 = self;
    var __PUCK__value__38 = __PUCK__value__37;
    if ($unwrapTraitObject(__PUCK__value__38).kind == "Literal") {
      var _$unwrapTraitObject54 = $unwrapTraitObject(__PUCK__value__38),
          _$unwrapTraitObject55 = _slicedToArray(_$unwrapTraitObject54.value, 1),
          _span = _$unwrapTraitObject55[0].span;

      return _span;
    } else {
      var __PUCK__value__39 = __PUCK__value__37;
      if ($unwrapTraitObject(__PUCK__value__39).kind == "Identifier") {
        var _$unwrapTraitObject56 = $unwrapTraitObject(__PUCK__value__39),
            _$unwrapTraitObject57 = _slicedToArray(_$unwrapTraitObject56.value, 1),
            _span2 = _$unwrapTraitObject57[0].span;

        return _span2;
      };
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openParen.span.start,
      end: self.value.closeParen.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__40 = self;
    var __PUCK__value__41 = __PUCK__value__40;
    if ($unwrapTraitObject(__PUCK__value__41).kind == "CatchAll") {
      var _$unwrapTraitObject58 = $unwrapTraitObject(__PUCK__value__41),
          _$unwrapTraitObject59 = _slicedToArray(_$unwrapTraitObject58.value, 1),
          token = _$unwrapTraitObject59[0];

      return token.span;
    } else {
      var __PUCK__value__42 = __PUCK__value__40;
      if ($unwrapTraitObject(__PUCK__value__42).kind == "Identifier") {
        var _$unwrapTraitObject60 = $unwrapTraitObject(__PUCK__value__42),
            _$unwrapTraitObject61 = _slicedToArray(_$unwrapTraitObject60.value, 1),
            identifier = _$unwrapTraitObject61[0];

        return identifier.span;
      } else {
        var __PUCK__value__43 = __PUCK__value__40;
        if ($unwrapTraitObject(__PUCK__value__43).kind == "Record") {
          var _$unwrapTraitObject62 = $unwrapTraitObject(__PUCK__value__43),
              _$unwrapTraitObject63 = _slicedToArray(_$unwrapTraitObject62.value, 1),
              recordPattern = _$unwrapTraitObject63[0];

          return {
            start: recordPattern.openBrace.span.start,
            end: recordPattern.closeBrace.span.end
          };
        } else {
          var __PUCK__value__44 = __PUCK__value__40;
          if ($unwrapTraitObject(__PUCK__value__44).kind == "Tuple") {
            var _$unwrapTraitObject64 = $unwrapTraitObject(__PUCK__value__44),
                _$unwrapTraitObject65 = _slicedToArray(_$unwrapTraitObject64.value, 1),
                tuplePattern = _$unwrapTraitObject65[0];

            return {
              start: tuplePattern.openParen.span.start,
              end: tuplePattern.closeParen.span.end
            };
          } else {
            var __PUCK__value__45 = __PUCK__value__40;
            if ($unwrapTraitObject(__PUCK__value__45).kind == "RecordType") {
              var _$unwrapTraitObject66 = $unwrapTraitObject(__PUCK__value__45),
                  _$unwrapTraitObject67 = _slicedToArray(_$unwrapTraitObject66.value, 2),
                  typePath = _$unwrapTraitObject67[0],
                  _recordPattern = _$unwrapTraitObject67[1];

              return {
                start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: typePath, $isTraitObject: true }).start,
                end: _recordPattern.closeBrace.span.end
              };
            } else {
              var __PUCK__value__46 = __PUCK__value__40;
              if ($unwrapTraitObject(__PUCK__value__46).kind == "TupleType") {
                var _$unwrapTraitObject68 = $unwrapTraitObject(__PUCK__value__46),
                    _$unwrapTraitObject69 = _slicedToArray(_$unwrapTraitObject68.value, 2),
                    _typePath = _$unwrapTraitObject69[0],
                    _tuplePattern = _$unwrapTraitObject69[1];

                return {
                  start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: _typePath, $isTraitObject: true }).start,
                  end: _tuplePattern.closeParen.span.end
                };
              } else {
                var __PUCK__value__47 = __PUCK__value__40;
                if ($unwrapTraitObject(__PUCK__value__47).kind == "UnitType") {
                  var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__47),
                      _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70.value, 1),
                      _typePath2 = _$unwrapTraitObject71[0];

                  return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: _typePath2, $isTraitObject: true });
                };
              };
            };
          };
        };
      };
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__48 = self;
    var __PUCK__value__49 = __PUCK__value__48;
    if ($unwrapTraitObject(__PUCK__value__49).kind == "FunctionTypeBound") {
      var _$unwrapTraitObject72 = $unwrapTraitObject(__PUCK__value__49),
          _$unwrapTraitObject73 = _slicedToArray(_$unwrapTraitObject72.value, 1),
          t = _$unwrapTraitObject73[0];

      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound', value: t, $isTraitObject: true });
    } else {
      var __PUCK__value__50 = __PUCK__value__48;
      if ($unwrapTraitObject(__PUCK__value__50).kind == "NamedTypeBound") {
        var _$unwrapTraitObject74 = $unwrapTraitObject(__PUCK__value__50),
            _$unwrapTraitObject75 = _slicedToArray(_$unwrapTraitObject74.value, 1),
            _t = _$unwrapTraitObject75[0];

        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: _t, $isTraitObject: true });
      } else {
        var __PUCK__value__51 = __PUCK__value__48;
        if ($unwrapTraitObject(__PUCK__value__51).kind == "RecordTypeBound") {
          var _$unwrapTraitObject76 = $unwrapTraitObject(__PUCK__value__51),
              _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76.value, 1),
              _t2 = _$unwrapTraitObject77[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound', value: _t2, $isTraitObject: true });
        } else {
          var __PUCK__value__52 = __PUCK__value__48;
          if ($unwrapTraitObject(__PUCK__value__52).kind == "TupleTypeBound") {
            var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__52),
                _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
                _t3 = _$unwrapTraitObject79[0];

            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: _t3, $isTraitObject: true });
          };
        };
      };
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound"] = {
  span: function span() {
    var self = this;
    return {
      start: _core.Option.mapOrElse.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.typeParameters, $isTraitObject: true }), function () {
        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: self.value.parameters, $isTraitObject: true });
      }, function (p) {
        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: p, $isTraitObject: true });
      }).start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: self.value.returnType, $isTraitObject: true }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.path, $isTraitObject: true }).start,
      end: _core.Option.mapOr.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.typeParameters, $isTraitObject: true }), _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.path, $isTraitObject: true }), function (p) {
        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: p, $isTraitObject: true });
      }).end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openBrace.span.start,
      end: self.value.closeBrace.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openParen.span.start,
      end: self.value.closeParen.span.end
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.name.span.start,
      end: self.value.name.span.end
    };
  }
};
TopLevelStatement.getType = function getType() {
  var self = this;
  var __PUCK__value__53 = self;
  var __PUCK__value__54 = __PUCK__value__53;
  if ($unwrapTraitObject(__PUCK__value__54).kind == "ExportDirective") {
    var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__54),
        _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
        e = _$unwrapTraitObject81[0];

    throw "type on export";
  } else {
    var __PUCK__value__55 = __PUCK__value__53;
    if ($unwrapTraitObject(__PUCK__value__55).kind == "ImportDirective") {
      var _$unwrapTraitObject82 = $unwrapTraitObject(__PUCK__value__55),
          _$unwrapTraitObject83 = _slicedToArray(_$unwrapTraitObject82.value, 1),
          _e24 = _$unwrapTraitObject83[0];

      throw "type on import";
    } else {
      var __PUCK__value__56 = __PUCK__value__53;
      if ($unwrapTraitObject(__PUCK__value__56).kind == "EnumDeclaration") {
        var _$unwrapTraitObject84 = $unwrapTraitObject(__PUCK__value__56),
            _$unwrapTraitObject85 = _slicedToArray(_$unwrapTraitObject84.value, 1),
            _e25 = _$unwrapTraitObject85[0];

        return _e25.type_;
      } else {
        var __PUCK__value__57 = __PUCK__value__53;
        if ($unwrapTraitObject(__PUCK__value__57).kind == "ImplDeclaration") {
          var _$unwrapTraitObject86 = $unwrapTraitObject(__PUCK__value__57),
              _$unwrapTraitObject87 = _slicedToArray(_$unwrapTraitObject86.value, 1),
              _e26 = _$unwrapTraitObject87[0];

          return _e26.type_;
        } else {
          var __PUCK__value__58 = __PUCK__value__53;
          if ($unwrapTraitObject(__PUCK__value__58).kind == "ImplShorthandDeclaration") {
            var _$unwrapTraitObject88 = $unwrapTraitObject(__PUCK__value__58),
                _$unwrapTraitObject89 = _slicedToArray(_$unwrapTraitObject88.value, 1),
                _e27 = _$unwrapTraitObject89[0];

            return _e27.type_;
          } else {
            var __PUCK__value__59 = __PUCK__value__53;
            if ($unwrapTraitObject(__PUCK__value__59).kind == "TraitDeclaration") {
              var _$unwrapTraitObject90 = $unwrapTraitObject(__PUCK__value__59),
                  _$unwrapTraitObject91 = _slicedToArray(_$unwrapTraitObject90.value, 1),
                  _e28 = _$unwrapTraitObject91[0];

              return _e28.type_;
            } else {
              var __PUCK__value__60 = __PUCK__value__53;
              if ($unwrapTraitObject(__PUCK__value__60).kind == "TypeDeclaration") {
                var _$unwrapTraitObject92 = $unwrapTraitObject(__PUCK__value__60),
                    _$unwrapTraitObject93 = _slicedToArray(_$unwrapTraitObject92.value, 1),
                    _e29 = _$unwrapTraitObject93[0];

                return _e29.type_;
              } else {
                var __PUCK__value__61 = __PUCK__value__53;
                if ($unwrapTraitObject(__PUCK__value__61).kind == "BlockLevelStatement") {
                  var _$unwrapTraitObject94 = $unwrapTraitObject(__PUCK__value__61),
                      _$unwrapTraitObject95 = _slicedToArray(_$unwrapTraitObject94.value, 1),
                      _e30 = _$unwrapTraitObject95[0];

                  return BlockLevelStatement.getType.call(_e30);
                };
              };
            };
          };
        };
      };
    };
  };
};
BlockLevelStatement.getType = function getType() {
  var self = this;
  var __PUCK__value__62 = self;
  var __PUCK__value__63 = __PUCK__value__62;
  if ($unwrapTraitObject(__PUCK__value__63).kind == "Block") {
    var _$unwrapTraitObject96 = $unwrapTraitObject(__PUCK__value__63),
        _$unwrapTraitObject97 = _slicedToArray(_$unwrapTraitObject96.value, 1),
        e = _$unwrapTraitObject97[0];

    return e.type_;
  } else {
    var __PUCK__value__64 = __PUCK__value__62;
    if ($unwrapTraitObject(__PUCK__value__64).kind == "BreakStatement") {
      var _$unwrapTraitObject98 = $unwrapTraitObject(__PUCK__value__64),
          _$unwrapTraitObject99 = _slicedToArray(_$unwrapTraitObject98.value, 1),
          _e31 = _$unwrapTraitObject99[0];

      return _e31.type_;
    } else {
      var __PUCK__value__65 = __PUCK__value__62;
      if ($unwrapTraitObject(__PUCK__value__65).kind == "ReturnStatement") {
        var _$unwrapTraitObject100 = $unwrapTraitObject(__PUCK__value__65),
            _$unwrapTraitObject101 = _slicedToArray(_$unwrapTraitObject100.value, 1),
            _e32 = _$unwrapTraitObject101[0];

        return _e32.type_;
      } else {
        var __PUCK__value__66 = __PUCK__value__62;
        if ($unwrapTraitObject(__PUCK__value__66).kind == "WhileLoop") {
          var _$unwrapTraitObject102 = $unwrapTraitObject(__PUCK__value__66),
              _$unwrapTraitObject103 = _slicedToArray(_$unwrapTraitObject102.value, 1),
              _e33 = _$unwrapTraitObject103[0];

          return _e33.type_;
        } else {
          var __PUCK__value__67 = __PUCK__value__62;
          if ($unwrapTraitObject(__PUCK__value__67).kind == "Expression") {
            var _$unwrapTraitObject104 = $unwrapTraitObject(__PUCK__value__67),
                _$unwrapTraitObject105 = _slicedToArray(_$unwrapTraitObject104.value, 1),
                _e34 = _$unwrapTraitObject105[0];

            return Expression.getType.call(_e34);
          };
        };
      };
    };
  };
};
Expression.getType = function getType() {
  var self = this;
  var __PUCK__value__68 = self;
  var __PUCK__value__69 = __PUCK__value__68;
  if ($unwrapTraitObject(__PUCK__value__69).kind == "ThrowStatement") {
    var _$unwrapTraitObject106 = $unwrapTraitObject(__PUCK__value__69),
        _$unwrapTraitObject107 = _slicedToArray(_$unwrapTraitObject106.value, 1),
        e = _$unwrapTraitObject107[0];

    return e.type_;
  } else {
    var __PUCK__value__70 = __PUCK__value__68;
    if ($unwrapTraitObject(__PUCK__value__70).kind == "Comment") {
      var __PUCK__value__71 = $unwrapTraitObject(__PUCK__value__70);;

      var _PUCK__value__71$val = _slicedToArray(__PUCK__value__71.value, 1),
          __PUCK__value__72 = _PUCK__value__71$val[0];

      ;
      return __PUCK__value__71;
    } else {
      var __PUCK__value__73 = __PUCK__value__68;
      if ($unwrapTraitObject(__PUCK__value__73).kind == "Identifier") {
        var _$unwrapTraitObject108 = $unwrapTraitObject(__PUCK__value__73),
            _$unwrapTraitObject109 = _slicedToArray(_$unwrapTraitObject108.value, 1),
            _e35 = _$unwrapTraitObject109[0];

        return _e35.type_;
      } else {
        var __PUCK__value__74 = __PUCK__value__68;
        if ($unwrapTraitObject(__PUCK__value__74).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject110 = $unwrapTraitObject(__PUCK__value__74),
              _$unwrapTraitObject111 = _slicedToArray(_$unwrapTraitObject110.value, 1),
              _e36 = _$unwrapTraitObject111[0];

          return _e36.type_;
        } else {
          var __PUCK__value__75 = __PUCK__value__68;
          if ($unwrapTraitObject(__PUCK__value__75).kind == "VariableDeclaration") {
            var _$unwrapTraitObject112 = $unwrapTraitObject(__PUCK__value__75),
                _$unwrapTraitObject113 = _slicedToArray(_$unwrapTraitObject112.value, 1),
                _e37 = _$unwrapTraitObject113[0];

            return _e37.type_;
          } else {
            var __PUCK__value__76 = __PUCK__value__68;
            if ($unwrapTraitObject(__PUCK__value__76).kind == "AssignmentExpression") {
              var _$unwrapTraitObject114 = $unwrapTraitObject(__PUCK__value__76),
                  _$unwrapTraitObject115 = _slicedToArray(_$unwrapTraitObject114.value, 1),
                  _e38 = _$unwrapTraitObject115[0];

              return _e38.type_;
            } else {
              var __PUCK__value__77 = __PUCK__value__68;
              if ($unwrapTraitObject(__PUCK__value__77).kind == "BinaryExpression") {
                var _$unwrapTraitObject116 = $unwrapTraitObject(__PUCK__value__77),
                    _$unwrapTraitObject117 = _slicedToArray(_$unwrapTraitObject116.value, 1),
                    _e39 = _$unwrapTraitObject117[0];

                return _e39.type_;
              } else {
                var __PUCK__value__78 = __PUCK__value__68;
                if ($unwrapTraitObject(__PUCK__value__78).kind == "CallExpression") {
                  var _$unwrapTraitObject118 = $unwrapTraitObject(__PUCK__value__78),
                      _$unwrapTraitObject119 = _slicedToArray(_$unwrapTraitObject118.value, 1),
                      _e40 = _$unwrapTraitObject119[0];

                  return _e40.type_;
                } else {
                  var __PUCK__value__79 = __PUCK__value__68;
                  if ($unwrapTraitObject(__PUCK__value__79).kind == "IfExpression") {
                    var _$unwrapTraitObject120 = $unwrapTraitObject(__PUCK__value__79),
                        _$unwrapTraitObject121 = _slicedToArray(_$unwrapTraitObject120.value, 1),
                        _e41 = _$unwrapTraitObject121[0];

                    return _e41.type_;
                  } else {
                    var __PUCK__value__80 = __PUCK__value__68;
                    if ($unwrapTraitObject(__PUCK__value__80).kind == "IfLetExpression") {
                      var _$unwrapTraitObject122 = $unwrapTraitObject(__PUCK__value__80),
                          _$unwrapTraitObject123 = _slicedToArray(_$unwrapTraitObject122.value, 1),
                          _e42 = _$unwrapTraitObject123[0];

                      return _e42.type_;
                    } else {
                      var __PUCK__value__81 = __PUCK__value__68;
                      if ($unwrapTraitObject(__PUCK__value__81).kind == "MatchExpression") {
                        var _$unwrapTraitObject124 = $unwrapTraitObject(__PUCK__value__81),
                            _$unwrapTraitObject125 = _slicedToArray(_$unwrapTraitObject124.value, 1),
                            _e43 = _$unwrapTraitObject125[0];

                        return _e43.type_;
                      } else {
                        var __PUCK__value__82 = __PUCK__value__68;
                        if ($unwrapTraitObject(__PUCK__value__82).kind == "TypePathExpression") {
                          var _$unwrapTraitObject126 = $unwrapTraitObject(__PUCK__value__82),
                              _$unwrapTraitObject127 = _slicedToArray(_$unwrapTraitObject126.value, 1),
                              _e44 = _$unwrapTraitObject127[0];

                          return _e44.type_;
                        } else {
                          var __PUCK__value__83 = __PUCK__value__68;
                          if ($unwrapTraitObject(__PUCK__value__83).kind == "UnaryExpression") {
                            var _$unwrapTraitObject128 = $unwrapTraitObject(__PUCK__value__83),
                                _$unwrapTraitObject129 = _slicedToArray(_$unwrapTraitObject128.value, 1),
                                _e45 = _$unwrapTraitObject129[0];

                            return _e45.type_;
                          } else {
                            var __PUCK__value__84 = __PUCK__value__68;
                            if ($unwrapTraitObject(__PUCK__value__84).kind == "IndexAccess") {
                              var _$unwrapTraitObject130 = $unwrapTraitObject(__PUCK__value__84),
                                  _$unwrapTraitObject131 = _slicedToArray(_$unwrapTraitObject130.value, 1),
                                  _e46 = _$unwrapTraitObject131[0];

                              return _e46.type_;
                            } else {
                              var __PUCK__value__85 = __PUCK__value__68;
                              if ($unwrapTraitObject(__PUCK__value__85).kind == "MemberAccess") {
                                var _$unwrapTraitObject132 = $unwrapTraitObject(__PUCK__value__85),
                                    _$unwrapTraitObject133 = _slicedToArray(_$unwrapTraitObject132.value, 1),
                                    _e47 = _$unwrapTraitObject133[0];

                                return _e47.type_;
                              } else {
                                var __PUCK__value__86 = __PUCK__value__68;
                                if ($unwrapTraitObject(__PUCK__value__86).kind == "BooleanLiteral") {
                                  var _$unwrapTraitObject134 = $unwrapTraitObject(__PUCK__value__86),
                                      _$unwrapTraitObject135 = _slicedToArray(_$unwrapTraitObject134.value, 1),
                                      _e48 = _$unwrapTraitObject135[0];

                                  return _e48.type_;
                                } else {
                                  var __PUCK__value__87 = __PUCK__value__68;
                                  if ($unwrapTraitObject(__PUCK__value__87).kind == "ListLiteral") {
                                    var _$unwrapTraitObject136 = $unwrapTraitObject(__PUCK__value__87),
                                        _$unwrapTraitObject137 = _slicedToArray(_$unwrapTraitObject136.value, 1),
                                        _e49 = _$unwrapTraitObject137[0];

                                    return _e49.type_;
                                  } else {
                                    var __PUCK__value__88 = __PUCK__value__68;
                                    if ($unwrapTraitObject(__PUCK__value__88).kind == "NumberLiteral") {
                                      var _$unwrapTraitObject138 = $unwrapTraitObject(__PUCK__value__88),
                                          _$unwrapTraitObject139 = _slicedToArray(_$unwrapTraitObject138.value, 1),
                                          _e50 = _$unwrapTraitObject139[0];

                                      return _e50.type_;
                                    } else {
                                      var __PUCK__value__89 = __PUCK__value__68;
                                      if ($unwrapTraitObject(__PUCK__value__89).kind == "RecordLiteral") {
                                        var _$unwrapTraitObject140 = $unwrapTraitObject(__PUCK__value__89),
                                            _$unwrapTraitObject141 = _slicedToArray(_$unwrapTraitObject140.value, 1),
                                            _e51 = _$unwrapTraitObject141[0];

                                        return _e51.type_;
                                      } else {
                                        var __PUCK__value__90 = __PUCK__value__68;
                                        if ($unwrapTraitObject(__PUCK__value__90).kind == "StringLiteral") {
                                          var _$unwrapTraitObject142 = $unwrapTraitObject(__PUCK__value__90),
                                              _$unwrapTraitObject143 = _slicedToArray(_$unwrapTraitObject142.value, 1),
                                              _e52 = _$unwrapTraitObject143[0];

                                          return _e52.type_;
                                        } else {
                                          var __PUCK__value__91 = __PUCK__value__68;
                                          if ($unwrapTraitObject(__PUCK__value__91).kind == "TupleLiteral") {
                                            var _$unwrapTraitObject144 = $unwrapTraitObject(__PUCK__value__91),
                                                _$unwrapTraitObject145 = _slicedToArray(_$unwrapTraitObject144.value, 1),
                                                _e53 = _$unwrapTraitObject145[0];

                                            return _e53.type_;
                                          };
                                        };
                                      };
                                    };
                                  };
                                };
                              };
                            };
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};
Pattern.displayName = function displayName() {
  var self = this;
  var __PUCK__value__92 = self;
  var __PUCK__value__93 = __PUCK__value__92;
  if ($unwrapTraitObject(__PUCK__value__93).kind == "CatchAll") {
    var _$unwrapTraitObject146 = $unwrapTraitObject(__PUCK__value__93),
        _$unwrapTraitObject147 = _slicedToArray(_$unwrapTraitObject146.value, 1),
        __PUCK__value__94 = _$unwrapTraitObject147[0];

    return "_";
  } else {
    var __PUCK__value__95 = __PUCK__value__92;
    if ($unwrapTraitObject(__PUCK__value__95).kind == "Identifier") {
      var _$unwrapTraitObject148 = $unwrapTraitObject(__PUCK__value__95),
          _$unwrapTraitObject149 = _slicedToArray(_$unwrapTraitObject148.value, 1),
          identifier = _$unwrapTraitObject149[0];

      return identifier.name;
    } else {
      var __PUCK__value__96 = __PUCK__value__92;
      if ($unwrapTraitObject(__PUCK__value__96).kind == "Record") {
        var _$unwrapTraitObject150 = $unwrapTraitObject(__PUCK__value__96),
            _$unwrapTraitObject151 = _slicedToArray(_$unwrapTraitObject150.value, 1),
            recordPattern = _$unwrapTraitObject151[0];

        return RecordPattern.displayName.call(recordPattern);
      } else {
        var __PUCK__value__97 = __PUCK__value__92;
        if ($unwrapTraitObject(__PUCK__value__97).kind == "Tuple") {
          var _$unwrapTraitObject152 = $unwrapTraitObject(__PUCK__value__97),
              _$unwrapTraitObject153 = _slicedToArray(_$unwrapTraitObject152.value, 1),
              tuplePattern = _$unwrapTraitObject153[0];

          return TuplePattern.displayName.call(tuplePattern);
        } else {
          var __PUCK__value__98 = __PUCK__value__92;
          if ($unwrapTraitObject(__PUCK__value__98).kind == "RecordType") {
            var _$unwrapTraitObject154 = $unwrapTraitObject(__PUCK__value__98),
                _$unwrapTraitObject155 = _slicedToArray(_$unwrapTraitObject154.value, 2),
                __PUCK__value__99 = _$unwrapTraitObject155[0],
                _recordPattern2 = _$unwrapTraitObject155[1];

            return RecordPattern.displayName.call(_recordPattern2);
          } else {
            var __PUCK__value__100 = __PUCK__value__92;
            if ($unwrapTraitObject(__PUCK__value__100).kind == "TupleType") {
              var _$unwrapTraitObject156 = $unwrapTraitObject(__PUCK__value__100),
                  _$unwrapTraitObject157 = _slicedToArray(_$unwrapTraitObject156.value, 2),
                  __PUCK__value__101 = _$unwrapTraitObject157[0],
                  _tuplePattern2 = _$unwrapTraitObject157[1];

              return TuplePattern.displayName.call(_tuplePattern2);
            } else {
              var __PUCK__value__102 = __PUCK__value__92;
              if ($unwrapTraitObject(__PUCK__value__102).kind == "UnitType") {
                var _$unwrapTraitObject158 = $unwrapTraitObject(__PUCK__value__102),
                    _$unwrapTraitObject159 = _slicedToArray(_$unwrapTraitObject158.value, 1),
                    __PUCK__value__103 = _$unwrapTraitObject159[0];

                return "";
              };
            };
          };
        };
      };
    };
  };
};
RecordPattern.displayName = function displayName() {
  var self = this;
  return "{" + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.properties, $isTraitObject: true }, function (p) {
    var __PUCK__value__104 = p.pattern;
    var __PUCK__value__105 = void 0;
    if ($unwrapTraitObject(__PUCK__value__104).kind == "Identifier") {
      var _$unwrapTraitObject160 = $unwrapTraitObject(__PUCK__value__104),
          _$unwrapTraitObject161 = _slicedToArray(_$unwrapTraitObject160.value, 1),
          name = _$unwrapTraitObject161[0].name;

      __PUCK__value__105 = name == p.property.name;
    } else {
      __PUCK__value__105 = false;
    };
    var shorthand = __PUCK__value__105;
    if (shorthand) {
      return p.property.name;
    } else {
      return p.property.name + ": " + Pattern.displayName.call(p.pattern);
    };
  }).value.join(", ") + "}";
};
TuplePattern.displayName = function displayName() {
  var self = this;
  return "(" + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.properties, $isTraitObject: true }, function (p) {
    return Pattern.displayName.call(p);
  }).value.join(", ") + ")";
};
TypeBound.getType = function getType() {
  var self = this;
  var __PUCK__value__106 = self;
  var __PUCK__value__107 = __PUCK__value__106;
  if ($unwrapTraitObject(__PUCK__value__107).kind == "FunctionTypeBound") {
    var _$unwrapTraitObject162 = $unwrapTraitObject(__PUCK__value__107),
        _$unwrapTraitObject163 = _slicedToArray(_$unwrapTraitObject162.value, 1),
        t = _$unwrapTraitObject163[0];

    return t.type_;
  } else {
    var __PUCK__value__108 = __PUCK__value__106;
    if ($unwrapTraitObject(__PUCK__value__108).kind == "NamedTypeBound") {
      var _$unwrapTraitObject164 = $unwrapTraitObject(__PUCK__value__108),
          _$unwrapTraitObject165 = _slicedToArray(_$unwrapTraitObject164.value, 1),
          _t4 = _$unwrapTraitObject165[0];

      return _t4.type_;
    } else {
      var __PUCK__value__109 = __PUCK__value__106;
      if ($unwrapTraitObject(__PUCK__value__109).kind == "RecordTypeBound") {
        var _$unwrapTraitObject166 = $unwrapTraitObject(__PUCK__value__109),
            _$unwrapTraitObject167 = _slicedToArray(_$unwrapTraitObject166.value, 1),
            _t5 = _$unwrapTraitObject167[0];

        return _t5.type_;
      } else {
        var __PUCK__value__110 = __PUCK__value__106;
        if ($unwrapTraitObject(__PUCK__value__110).kind == "TupleTypeBound") {
          var _$unwrapTraitObject168 = $unwrapTraitObject(__PUCK__value__110),
              _$unwrapTraitObject169 = _slicedToArray(_$unwrapTraitObject168.value, 1),
              _t6 = _$unwrapTraitObject169[0];

          return _t6.type_;
        };
      };
    };
  };
};
TypeBound.getRecordTypeBound = function getRecordTypeBound() {
  var self = this;
  var __PUCK__value__111 = self;
  var __PUCK__value__112 = __PUCK__value__111;
  if ($unwrapTraitObject(__PUCK__value__112).kind == "RecordTypeBound") {
    var _$unwrapTraitObject170 = $unwrapTraitObject(__PUCK__value__112),
        _$unwrapTraitObject171 = _slicedToArray(_$unwrapTraitObject170.value, 1),
        record = _$unwrapTraitObject171[0];

    return record;
  } else {
    var __PUCK__value__113 = __PUCK__value__111;
    if (true) {
      var __PUCK__value__114 = __PUCK__value__113;
      throw "TypeBound is not a RecordTypeBound";
    };
  };
};
TypeBound.getTupleTypeBound = function getTupleTypeBound() {
  var self = this;
  var __PUCK__value__115 = self;
  var __PUCK__value__116 = __PUCK__value__115;
  if ($unwrapTraitObject(__PUCK__value__116).kind == "TupleTypeBound") {
    var _$unwrapTraitObject172 = $unwrapTraitObject(__PUCK__value__116),
        _$unwrapTraitObject173 = _slicedToArray(_$unwrapTraitObject172.value, 1),
        tuple = _$unwrapTraitObject173[0];

    return tuple;
  } else {
    var __PUCK__value__117 = __PUCK__value__115;
    if (true) {
      var __PUCK__value__118 = __PUCK__value__117;
      throw "TypeBound is not a TupleTypeBound";
    };
  };
};
