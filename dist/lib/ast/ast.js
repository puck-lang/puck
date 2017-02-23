'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeBound = exports.Pattern = exports.StringLiteralPart = exports.TypePath = exports.AttributeData = exports.ImportSpecifier = exports.ExportedStatement = exports.SimpleLiteral = exports.Expression = exports.BlockLevelStatement = exports.TopLevelStatement = exports.TypeParameter = exports.TupleTypeBound = exports.RecordTypeBoundMember = exports.RecordTypeBound = exports.NamedTypeBound = exports.FunctionTypeBound = exports.TuplePattern = exports.RecordPatternMember = exports.RecordPattern = exports.TupleLiteral = exports.SimpleStringLiteral = exports.StringLiteral = exports.RecordLiteralMember = exports.RecordLiteral = exports.NumberLiteral = exports.ListLiteral = exports.BooleanLiteral = exports.UnknownIndexAccess = exports.UnknownAccess = exports.MemberAccess = exports.IndexAccess = exports.UnaryExpression = exports.TypePathExpression = exports.MatchArm = exports.MatchExpression = exports.IfLetExpression = exports.IfExpression = exports.CallExpression = exports.BinaryExpression = exports.AssignmentExpression = exports.VariableDeclaration = exports.FunctionDeclaration = exports.Identifier = exports.AttributeArgument = exports.Attribute = exports.Comment = exports.WhileLoop = exports.ReturnStatement = exports.BreakStatement = exports.Block = exports.ObjectDestructureMember = exports.ObjectDestructure = exports.ImportDirective = exports.ExportDirective = exports.TypeDeclaration = exports.TraitDeclaration = exports.ImplShorthandDeclaration = exports.ImplDeclaration = exports.EnumMember = exports.EnumDeclaration = exports.Module = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var _entities = require('./../entities');

var _span3 = require('./span');

var _token = require('./token');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
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
var UnknownAccess = exports.UnknownAccess = function UnknownAccess(object) {
  return object;
};
var UnknownIndexAccess = exports.UnknownIndexAccess = function UnknownIndexAccess(object) {
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
  UnknownAccess: function UnknownAccess() {
    for (var _len29 = arguments.length, members = Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
      members[_key29] = arguments[_key29];
    }

    return { kind: 'UnknownAccess', value: members };
  },
  UnknownIndexAccess: function UnknownIndexAccess() {
    for (var _len30 = arguments.length, members = Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
      members[_key30] = arguments[_key30];
    }

    return { kind: 'UnknownIndexAccess', value: members };
  },
  BooleanLiteral: function BooleanLiteral() {
    for (var _len31 = arguments.length, members = Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
      members[_key31] = arguments[_key31];
    }

    return { kind: 'BooleanLiteral', value: members };
  },
  ListLiteral: function ListLiteral() {
    for (var _len32 = arguments.length, members = Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
      members[_key32] = arguments[_key32];
    }

    return { kind: 'ListLiteral', value: members };
  },
  NumberLiteral: function NumberLiteral() {
    for (var _len33 = arguments.length, members = Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
      members[_key33] = arguments[_key33];
    }

    return { kind: 'NumberLiteral', value: members };
  },
  RecordLiteral: function RecordLiteral() {
    for (var _len34 = arguments.length, members = Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
      members[_key34] = arguments[_key34];
    }

    return { kind: 'RecordLiteral', value: members };
  },
  StringLiteral: function StringLiteral() {
    for (var _len35 = arguments.length, members = Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
      members[_key35] = arguments[_key35];
    }

    return { kind: 'StringLiteral', value: members };
  },
  TupleLiteral: function TupleLiteral() {
    for (var _len36 = arguments.length, members = Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
      members[_key36] = arguments[_key36];
    }

    return { kind: 'TupleLiteral', value: members };
  }
};
var SimpleLiteral = exports.SimpleLiteral = {
  BooleanLiteral: function BooleanLiteral() {
    for (var _len37 = arguments.length, members = Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
      members[_key37] = arguments[_key37];
    }

    return { kind: 'BooleanLiteral', value: members };
  },
  NumberLiteral: function NumberLiteral() {
    for (var _len38 = arguments.length, members = Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
      members[_key38] = arguments[_key38];
    }

    return { kind: 'NumberLiteral', value: members };
  },
  StringLiteral: function StringLiteral() {
    for (var _len39 = arguments.length, members = Array(_len39), _key39 = 0; _key39 < _len39; _key39++) {
      members[_key39] = arguments[_key39];
    }

    return { kind: 'StringLiteral', value: members };
  }
};
var ExportedStatement = exports.ExportedStatement = {
  EnumDeclaration: function EnumDeclaration() {
    for (var _len40 = arguments.length, members = Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
      members[_key40] = arguments[_key40];
    }

    return { kind: 'EnumDeclaration', value: members };
  },
  TraitDeclaration: function TraitDeclaration() {
    for (var _len41 = arguments.length, members = Array(_len41), _key41 = 0; _key41 < _len41; _key41++) {
      members[_key41] = arguments[_key41];
    }

    return { kind: 'TraitDeclaration', value: members };
  },
  TypeDeclaration: function TypeDeclaration() {
    for (var _len42 = arguments.length, members = Array(_len42), _key42 = 0; _key42 < _len42; _key42++) {
      members[_key42] = arguments[_key42];
    }

    return { kind: 'TypeDeclaration', value: members };
  },
  FunctionDeclaration: function FunctionDeclaration() {
    for (var _len43 = arguments.length, members = Array(_len43), _key43 = 0; _key43 < _len43; _key43++) {
      members[_key43] = arguments[_key43];
    }

    return { kind: 'FunctionDeclaration', value: members };
  },
  VariableDeclaration: function VariableDeclaration() {
    for (var _len44 = arguments.length, members = Array(_len44), _key44 = 0; _key44 < _len44; _key44++) {
      members[_key44] = arguments[_key44];
    }

    return { kind: 'VariableDeclaration', value: members };
  }
};
var ImportSpecifier = exports.ImportSpecifier = {
  Asterisk: function Asterisk() {
    for (var _len45 = arguments.length, members = Array(_len45), _key45 = 0; _key45 < _len45; _key45++) {
      members[_key45] = arguments[_key45];
    }

    return { kind: 'Asterisk', value: members };
  },
  Identifier: function Identifier() {
    for (var _len46 = arguments.length, members = Array(_len46), _key46 = 0; _key46 < _len46; _key46++) {
      members[_key46] = arguments[_key46];
    }

    return { kind: 'Identifier', value: members };
  },
  ObjectDestructure: function ObjectDestructure() {
    for (var _len47 = arguments.length, members = Array(_len47), _key47 = 0; _key47 < _len47; _key47++) {
      members[_key47] = arguments[_key47];
    }

    return { kind: 'ObjectDestructure', value: members };
  }
};
var AttributeData = exports.AttributeData = {
  None: { kind: 'None', value: Symbol('None') },
  Value: function Value() {
    for (var _len48 = arguments.length, members = Array(_len48), _key48 = 0; _key48 < _len48; _key48++) {
      members[_key48] = arguments[_key48];
    }

    return { kind: 'Value', value: members };
  },
  Arguments: function Arguments() {
    for (var _len49 = arguments.length, members = Array(_len49), _key49 = 0; _key49 < _len49; _key49++) {
      members[_key49] = arguments[_key49];
    }

    return { kind: 'Arguments', value: members };
  }
};
var TypePath = exports.TypePath = {
  _Object: function _Object() {
    for (var _len50 = arguments.length, members = Array(_len50), _key50 = 0; _key50 < _len50; _key50++) {
      members[_key50] = arguments[_key50];
    }

    return { kind: '_Object', value: members };
  },
  Member: function Member() {
    for (var _len51 = arguments.length, members = Array(_len51), _key51 = 0; _key51 < _len51; _key51++) {
      members[_key51] = arguments[_key51];
    }

    return { kind: 'Member', value: members };
  }
};
var StringLiteralPart = exports.StringLiteralPart = {
  Literal: function Literal() {
    for (var _len52 = arguments.length, members = Array(_len52), _key52 = 0; _key52 < _len52; _key52++) {
      members[_key52] = arguments[_key52];
    }

    return { kind: 'Literal', value: members };
  },
  Identifier: function Identifier() {
    for (var _len53 = arguments.length, members = Array(_len53), _key53 = 0; _key53 < _len53; _key53++) {
      members[_key53] = arguments[_key53];
    }

    return { kind: 'Identifier', value: members };
  }
};
var Pattern = exports.Pattern = {
  CatchAll: function CatchAll() {
    for (var _len54 = arguments.length, members = Array(_len54), _key54 = 0; _key54 < _len54; _key54++) {
      members[_key54] = arguments[_key54];
    }

    return { kind: 'CatchAll', value: members };
  },
  Identifier: function Identifier() {
    for (var _len55 = arguments.length, members = Array(_len55), _key55 = 0; _key55 < _len55; _key55++) {
      members[_key55] = arguments[_key55];
    }

    return { kind: 'Identifier', value: members };
  },
  Record: function Record() {
    for (var _len56 = arguments.length, members = Array(_len56), _key56 = 0; _key56 < _len56; _key56++) {
      members[_key56] = arguments[_key56];
    }

    return { kind: 'Record', value: members };
  },
  Tuple: function Tuple() {
    for (var _len57 = arguments.length, members = Array(_len57), _key57 = 0; _key57 < _len57; _key57++) {
      members[_key57] = arguments[_key57];
    }

    return { kind: 'Tuple', value: members };
  },
  RecordType: function RecordType() {
    for (var _len58 = arguments.length, members = Array(_len58), _key58 = 0; _key58 < _len58; _key58++) {
      members[_key58] = arguments[_key58];
    }

    return { kind: 'RecordType', value: members };
  },
  TupleType: function TupleType() {
    for (var _len59 = arguments.length, members = Array(_len59), _key59 = 0; _key59 < _len59; _key59++) {
      members[_key59] = arguments[_key59];
    }

    return { kind: 'TupleType', value: members };
  },
  UnitType: function UnitType() {
    for (var _len60 = arguments.length, members = Array(_len60), _key60 = 0; _key60 < _len60; _key60++) {
      members[_key60] = arguments[_key60];
    }

    return { kind: 'UnitType', value: members };
  }
};
var TypeBound = exports.TypeBound = {
  FunctionTypeBound: function FunctionTypeBound() {
    for (var _len61 = arguments.length, members = Array(_len61), _key61 = 0; _key61 < _len61; _key61++) {
      members[_key61] = arguments[_key61];
    }

    return { kind: 'FunctionTypeBound', value: members };
  },
  NamedTypeBound: function NamedTypeBound() {
    for (var _len62 = arguments.length, members = Array(_len62), _key62 = 0; _key62 < _len62; _key62++) {
      members[_key62] = arguments[_key62];
    }

    return { kind: 'NamedTypeBound', value: members };
  },
  RecordTypeBound: function RecordTypeBound() {
    for (var _len63 = arguments.length, members = Array(_len63), _key63 = 0; _key63 < _len63; _key63++) {
      members[_key63] = arguments[_key63];
    }

    return { kind: 'RecordTypeBound', value: members };
  },
  TupleTypeBound: function TupleTypeBound() {
    for (var _len64 = arguments.length, members = Array(_len64), _key64 = 0; _key64 < _len64; _key64++) {
      members[_key64] = arguments[_key64];
    }

    return { kind: 'TupleTypeBound', value: members };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TopLevelStatement"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    var __PUCK__value__1 = self;
    if ($unwrapTraitObject(__PUCK__value__1).kind == "ExportDirective") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          e = _$unwrapTraitObject$v[0];

      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective', value: e, $isTraitObject: true });
    } else {
      if ($unwrapTraitObject(__PUCK__value__1).kind == "ImportDirective") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__1),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            _e = _$unwrapTraitObject2$[0];

        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: _e, $isTraitObject: true });
      } else {
        if ($unwrapTraitObject(__PUCK__value__1).kind == "EnumDeclaration") {
          var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__1),
              _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
              _e2 = _$unwrapTraitObject3$[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: _e2, $isTraitObject: true });
        } else {
          if ($unwrapTraitObject(__PUCK__value__1).kind == "ImplDeclaration") {
            var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__1),
                _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
                _e3 = _$unwrapTraitObject4$[0];

            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: _e3, $isTraitObject: true });
          } else {
            if ($unwrapTraitObject(__PUCK__value__1).kind == "ImplShorthandDeclaration") {
              var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__1),
                  _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
                  _e4 = _$unwrapTraitObject5$[0];

              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration', value: _e4, $isTraitObject: true });
            } else {
              if ($unwrapTraitObject(__PUCK__value__1).kind == "TraitDeclaration") {
                var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__1),
                    _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                    _e5 = _$unwrapTraitObject6$[0];

                return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: _e5, $isTraitObject: true });
              } else {
                if ($unwrapTraitObject(__PUCK__value__1).kind == "TypeDeclaration") {
                  var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__1),
                      _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                      _e6 = _$unwrapTraitObject7$[0];

                  return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: _e6, $isTraitObject: true });
                } else {
                  if ($unwrapTraitObject(__PUCK__value__1).kind == "BlockLevelStatement") {
                    var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__1),
                        _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
                        _e7 = _$unwrapTraitObject8$[0];

                    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: _e7, $isTraitObject: true });
                  };
                };
              };
            };
          };
        };
      };
    };
  },
  end: function end() {
    var self = this;
    var __PUCK__value__2 = self;
    if ($unwrapTraitObject(__PUCK__value__2).kind == "ExportDirective") {
      var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__2),
          _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
          e = _$unwrapTraitObject9$[0];

      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective', value: e, $isTraitObject: true });
    } else {
      if ($unwrapTraitObject(__PUCK__value__2).kind == "ImportDirective") {
        var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__2),
            _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
            _e8 = _$unwrapTraitObject11[0];

        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: _e8, $isTraitObject: true });
      } else {
        if ($unwrapTraitObject(__PUCK__value__2).kind == "EnumDeclaration") {
          var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__2),
              _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
              _e9 = _$unwrapTraitObject13[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: _e9, $isTraitObject: true });
        } else {
          if ($unwrapTraitObject(__PUCK__value__2).kind == "ImplDeclaration") {
            var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__2),
                _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
                _e10 = _$unwrapTraitObject15[0];

            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: _e10, $isTraitObject: true });
          } else {
            if ($unwrapTraitObject(__PUCK__value__2).kind == "ImplShorthandDeclaration") {
              var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__2),
                  _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
                  _e11 = _$unwrapTraitObject17[0];

              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration', value: _e11, $isTraitObject: true });
            } else {
              if ($unwrapTraitObject(__PUCK__value__2).kind == "TraitDeclaration") {
                var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__2),
                    _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
                    _e12 = _$unwrapTraitObject19[0];

                return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: _e12, $isTraitObject: true });
              } else {
                if ($unwrapTraitObject(__PUCK__value__2).kind == "TypeDeclaration") {
                  var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__2),
                      _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
                      _e13 = _$unwrapTraitObject21[0];

                  return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: _e13, $isTraitObject: true });
                } else {
                  if ($unwrapTraitObject(__PUCK__value__2).kind == "BlockLevelStatement") {
                    var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__2),
                        _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
                        _e14 = _$unwrapTraitObject23[0];

                    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: _e14, $isTraitObject: true });
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
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    var __PUCK__value__3 = self;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "Block") {
      var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__3),
          _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
          e = _$unwrapTraitObject25[0];

      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e, $isTraitObject: true });
    } else {
      if ($unwrapTraitObject(__PUCK__value__3).kind == "BreakStatement") {
        var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__3),
            _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
            _e15 = _$unwrapTraitObject27[0];

        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement', value: _e15, $isTraitObject: true });
      } else {
        if ($unwrapTraitObject(__PUCK__value__3).kind == "ReturnStatement") {
          var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__3),
              _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
              _e16 = _$unwrapTraitObject29[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement', value: _e16, $isTraitObject: true });
        } else {
          if ($unwrapTraitObject(__PUCK__value__3).kind == "WhileLoop") {
            var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__3),
                _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
                _e17 = _$unwrapTraitObject31[0];

            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop', value: _e17, $isTraitObject: true });
          } else {
            if ($unwrapTraitObject(__PUCK__value__3).kind == "Expression") {
              var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__3),
                  _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
                  _e18 = _$unwrapTraitObject33[0];

              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: _e18, $isTraitObject: true });
            };
          };
        };
      };
    };
  },
  end: function end() {
    var self = this;
    var __PUCK__value__4 = self;
    if ($unwrapTraitObject(__PUCK__value__4).kind == "Block") {
      var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__4),
          _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
          e = _$unwrapTraitObject35[0];

      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e, $isTraitObject: true });
    } else {
      if ($unwrapTraitObject(__PUCK__value__4).kind == "BreakStatement") {
        var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__4),
            _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
            _e19 = _$unwrapTraitObject37[0];

        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement', value: _e19, $isTraitObject: true });
      } else {
        if ($unwrapTraitObject(__PUCK__value__4).kind == "ReturnStatement") {
          var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__4),
              _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
              _e20 = _$unwrapTraitObject39[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement', value: _e20, $isTraitObject: true });
        } else {
          if ($unwrapTraitObject(__PUCK__value__4).kind == "WhileLoop") {
            var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__4),
                _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
                _e21 = _$unwrapTraitObject41[0];

            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop', value: _e21, $isTraitObject: true });
          } else {
            if ($unwrapTraitObject(__PUCK__value__4).kind == "Expression") {
              var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__4),
                  _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                  _e22 = _$unwrapTraitObject43[0];

              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: _e22, $isTraitObject: true });
            };
          };
        };
      };
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    var __PUCK__value__5 = self;
    if ($unwrapTraitObject(__PUCK__value__5).kind == "ThrowStatement") {
      var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__5),
          _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
          e = _$unwrapTraitObject45[0];

      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true });
    } else {
      if ($unwrapTraitObject(__PUCK__value__5).kind == "Comment") {
        var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__5),
            _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
            __PUCK__value__6 = _$unwrapTraitObject47[0];

        throw "No span for Comment";
      } else {
        if ($unwrapTraitObject(__PUCK__value__5).kind == "Identifier") {
          var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__5),
              _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 1),
              _e23 = _$unwrapTraitObject49[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: _e23, $isTraitObject: true });
        } else {
          if ($unwrapTraitObject(__PUCK__value__5).kind == "FunctionDeclaration") {
            var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__5),
                _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 1),
                _e24 = _$unwrapTraitObject51[0];

            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: _e24, $isTraitObject: true });
          } else {
            if ($unwrapTraitObject(__PUCK__value__5).kind == "VariableDeclaration") {
              var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__5),
                  _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52.value, 1),
                  _e25 = _$unwrapTraitObject53[0];

              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: _e25, $isTraitObject: true });
            } else {
              if ($unwrapTraitObject(__PUCK__value__5).kind == "AssignmentExpression") {
                var _$unwrapTraitObject54 = $unwrapTraitObject(__PUCK__value__5),
                    _$unwrapTraitObject55 = _slicedToArray(_$unwrapTraitObject54.value, 1),
                    _e26 = _$unwrapTraitObject55[0];

                return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: _e26, $isTraitObject: true });
              } else {
                if ($unwrapTraitObject(__PUCK__value__5).kind == "BinaryExpression") {
                  var _$unwrapTraitObject56 = $unwrapTraitObject(__PUCK__value__5),
                      _$unwrapTraitObject57 = _slicedToArray(_$unwrapTraitObject56.value, 1),
                      _e27 = _$unwrapTraitObject57[0];

                  return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression', value: _e27, $isTraitObject: true });
                } else {
                  if ($unwrapTraitObject(__PUCK__value__5).kind == "CallExpression") {
                    var _$unwrapTraitObject58 = $unwrapTraitObject(__PUCK__value__5),
                        _$unwrapTraitObject59 = _slicedToArray(_$unwrapTraitObject58.value, 1),
                        _e28 = _$unwrapTraitObject59[0];

                    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: _e28, $isTraitObject: true });
                  } else {
                    if ($unwrapTraitObject(__PUCK__value__5).kind == "IfExpression") {
                      var _$unwrapTraitObject60 = $unwrapTraitObject(__PUCK__value__5),
                          _$unwrapTraitObject61 = _slicedToArray(_$unwrapTraitObject60.value, 1),
                          _e29 = _$unwrapTraitObject61[0];

                      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: _e29, $isTraitObject: true });
                    } else {
                      if ($unwrapTraitObject(__PUCK__value__5).kind == "IfLetExpression") {
                        var _$unwrapTraitObject62 = $unwrapTraitObject(__PUCK__value__5),
                            _$unwrapTraitObject63 = _slicedToArray(_$unwrapTraitObject62.value, 1),
                            _e30 = _$unwrapTraitObject63[0];

                        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: _e30, $isTraitObject: true });
                      } else {
                        if ($unwrapTraitObject(__PUCK__value__5).kind == "MatchExpression") {
                          var _$unwrapTraitObject64 = $unwrapTraitObject(__PUCK__value__5),
                              _$unwrapTraitObject65 = _slicedToArray(_$unwrapTraitObject64.value, 1),
                              _e31 = _$unwrapTraitObject65[0];

                          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: _e31, $isTraitObject: true });
                        } else {
                          if ($unwrapTraitObject(__PUCK__value__5).kind == "TypePathExpression") {
                            var _$unwrapTraitObject66 = $unwrapTraitObject(__PUCK__value__5),
                                _$unwrapTraitObject67 = _slicedToArray(_$unwrapTraitObject66.value, 1),
                                _e32 = _$unwrapTraitObject67[0];

                            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression', value: _e32, $isTraitObject: true });
                          } else {
                            if ($unwrapTraitObject(__PUCK__value__5).kind == "UnaryExpression") {
                              var _$unwrapTraitObject68 = $unwrapTraitObject(__PUCK__value__5),
                                  _$unwrapTraitObject69 = _slicedToArray(_$unwrapTraitObject68.value, 1),
                                  _e33 = _$unwrapTraitObject69[0];

                              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: _e33, $isTraitObject: true });
                            } else {
                              if ($unwrapTraitObject(__PUCK__value__5).kind == "IndexAccess") {
                                var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__5),
                                    _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70.value, 1),
                                    _e34 = _$unwrapTraitObject71[0];

                                return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: _e34, $isTraitObject: true });
                              } else {
                                if ($unwrapTraitObject(__PUCK__value__5).kind == "MemberAccess") {
                                  var _$unwrapTraitObject72 = $unwrapTraitObject(__PUCK__value__5),
                                      _$unwrapTraitObject73 = _slicedToArray(_$unwrapTraitObject72.value, 1),
                                      _e35 = _$unwrapTraitObject73[0];

                                  return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: _e35, $isTraitObject: true });
                                } else {
                                  if ($unwrapTraitObject(__PUCK__value__5).kind == "UnknownAccess") {
                                    var _$unwrapTraitObject74 = $unwrapTraitObject(__PUCK__value__5),
                                        _$unwrapTraitObject75 = _slicedToArray(_$unwrapTraitObject74.value, 1),
                                        _e36 = _$unwrapTraitObject75[0];

                                    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: _e36, $isTraitObject: true });
                                  } else {
                                    if ($unwrapTraitObject(__PUCK__value__5).kind == "UnknownIndexAccess") {
                                      var _$unwrapTraitObject76 = $unwrapTraitObject(__PUCK__value__5),
                                          _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76.value, 1),
                                          _e37 = _$unwrapTraitObject77[0];

                                      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: _e37, $isTraitObject: true });
                                    } else {
                                      if ($unwrapTraitObject(__PUCK__value__5).kind == "BooleanLiteral") {
                                        var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__5),
                                            _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
                                            _e38 = _$unwrapTraitObject79[0];

                                        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: _e38, $isTraitObject: true });
                                      } else {
                                        if ($unwrapTraitObject(__PUCK__value__5).kind == "ListLiteral") {
                                          var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__5),
                                              _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
                                              _e39 = _$unwrapTraitObject81[0];

                                          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: _e39, $isTraitObject: true });
                                        } else {
                                          if ($unwrapTraitObject(__PUCK__value__5).kind == "NumberLiteral") {
                                            var _$unwrapTraitObject82 = $unwrapTraitObject(__PUCK__value__5),
                                                _$unwrapTraitObject83 = _slicedToArray(_$unwrapTraitObject82.value, 1),
                                                _e40 = _$unwrapTraitObject83[0];

                                            return _e40.span.start;
                                          } else {
                                            if ($unwrapTraitObject(__PUCK__value__5).kind == "RecordLiteral") {
                                              var _$unwrapTraitObject84 = $unwrapTraitObject(__PUCK__value__5),
                                                  _$unwrapTraitObject85 = _slicedToArray(_$unwrapTraitObject84.value, 1),
                                                  _e41 = _$unwrapTraitObject85[0];

                                              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral', value: _e41, $isTraitObject: true });
                                            } else {
                                              if ($unwrapTraitObject(__PUCK__value__5).kind == "StringLiteral") {
                                                var _$unwrapTraitObject86 = $unwrapTraitObject(__PUCK__value__5),
                                                    _$unwrapTraitObject87 = _slicedToArray(_$unwrapTraitObject86.value, 1),
                                                    _e42 = _$unwrapTraitObject87[0];

                                                return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: _e42, $isTraitObject: true });
                                              } else {
                                                if ($unwrapTraitObject(__PUCK__value__5).kind == "TupleLiteral") {
                                                  var _$unwrapTraitObject88 = $unwrapTraitObject(__PUCK__value__5),
                                                      _$unwrapTraitObject89 = _slicedToArray(_$unwrapTraitObject88.value, 1),
                                                      _e43 = _$unwrapTraitObject89[0];

                                                  return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral', value: _e43, $isTraitObject: true });
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
    };
  },
  end: function end() {
    var self = this;
    var __PUCK__value__7 = self;
    if ($unwrapTraitObject(__PUCK__value__7).kind == "ThrowStatement") {
      var _$unwrapTraitObject90 = $unwrapTraitObject(__PUCK__value__7),
          _$unwrapTraitObject91 = _slicedToArray(_$unwrapTraitObject90.value, 1),
          e = _$unwrapTraitObject91[0];

      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true });
    } else {
      if ($unwrapTraitObject(__PUCK__value__7).kind == "Comment") {
        var _$unwrapTraitObject92 = $unwrapTraitObject(__PUCK__value__7),
            _$unwrapTraitObject93 = _slicedToArray(_$unwrapTraitObject92.value, 1),
            __PUCK__value__8 = _$unwrapTraitObject93[0];

        throw "No span for Comment";
      } else {
        if ($unwrapTraitObject(__PUCK__value__7).kind == "Identifier") {
          var _$unwrapTraitObject94 = $unwrapTraitObject(__PUCK__value__7),
              _$unwrapTraitObject95 = _slicedToArray(_$unwrapTraitObject94.value, 1),
              _e44 = _$unwrapTraitObject95[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: _e44, $isTraitObject: true });
        } else {
          if ($unwrapTraitObject(__PUCK__value__7).kind == "FunctionDeclaration") {
            var _$unwrapTraitObject96 = $unwrapTraitObject(__PUCK__value__7),
                _$unwrapTraitObject97 = _slicedToArray(_$unwrapTraitObject96.value, 1),
                _e45 = _$unwrapTraitObject97[0];

            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: _e45, $isTraitObject: true });
          } else {
            if ($unwrapTraitObject(__PUCK__value__7).kind == "VariableDeclaration") {
              var _$unwrapTraitObject98 = $unwrapTraitObject(__PUCK__value__7),
                  _$unwrapTraitObject99 = _slicedToArray(_$unwrapTraitObject98.value, 1),
                  _e46 = _$unwrapTraitObject99[0];

              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: _e46, $isTraitObject: true });
            } else {
              if ($unwrapTraitObject(__PUCK__value__7).kind == "AssignmentExpression") {
                var _$unwrapTraitObject100 = $unwrapTraitObject(__PUCK__value__7),
                    _$unwrapTraitObject101 = _slicedToArray(_$unwrapTraitObject100.value, 1),
                    _e47 = _$unwrapTraitObject101[0];

                return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: _e47, $isTraitObject: true });
              } else {
                if ($unwrapTraitObject(__PUCK__value__7).kind == "BinaryExpression") {
                  var _$unwrapTraitObject102 = $unwrapTraitObject(__PUCK__value__7),
                      _$unwrapTraitObject103 = _slicedToArray(_$unwrapTraitObject102.value, 1),
                      _e48 = _$unwrapTraitObject103[0];

                  return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression', value: _e48, $isTraitObject: true });
                } else {
                  if ($unwrapTraitObject(__PUCK__value__7).kind == "CallExpression") {
                    var _$unwrapTraitObject104 = $unwrapTraitObject(__PUCK__value__7),
                        _$unwrapTraitObject105 = _slicedToArray(_$unwrapTraitObject104.value, 1),
                        _e49 = _$unwrapTraitObject105[0];

                    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: _e49, $isTraitObject: true });
                  } else {
                    if ($unwrapTraitObject(__PUCK__value__7).kind == "IfExpression") {
                      var _$unwrapTraitObject106 = $unwrapTraitObject(__PUCK__value__7),
                          _$unwrapTraitObject107 = _slicedToArray(_$unwrapTraitObject106.value, 1),
                          _e50 = _$unwrapTraitObject107[0];

                      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: _e50, $isTraitObject: true });
                    } else {
                      if ($unwrapTraitObject(__PUCK__value__7).kind == "IfLetExpression") {
                        var _$unwrapTraitObject108 = $unwrapTraitObject(__PUCK__value__7),
                            _$unwrapTraitObject109 = _slicedToArray(_$unwrapTraitObject108.value, 1),
                            _e51 = _$unwrapTraitObject109[0];

                        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: _e51, $isTraitObject: true });
                      } else {
                        if ($unwrapTraitObject(__PUCK__value__7).kind == "MatchExpression") {
                          var _$unwrapTraitObject110 = $unwrapTraitObject(__PUCK__value__7),
                              _$unwrapTraitObject111 = _slicedToArray(_$unwrapTraitObject110.value, 1),
                              _e52 = _$unwrapTraitObject111[0];

                          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: _e52, $isTraitObject: true });
                        } else {
                          if ($unwrapTraitObject(__PUCK__value__7).kind == "TypePathExpression") {
                            var _$unwrapTraitObject112 = $unwrapTraitObject(__PUCK__value__7),
                                _$unwrapTraitObject113 = _slicedToArray(_$unwrapTraitObject112.value, 1),
                                _e53 = _$unwrapTraitObject113[0];

                            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression', value: _e53, $isTraitObject: true });
                          } else {
                            if ($unwrapTraitObject(__PUCK__value__7).kind == "UnaryExpression") {
                              var _$unwrapTraitObject114 = $unwrapTraitObject(__PUCK__value__7),
                                  _$unwrapTraitObject115 = _slicedToArray(_$unwrapTraitObject114.value, 1),
                                  _e54 = _$unwrapTraitObject115[0];

                              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: _e54, $isTraitObject: true });
                            } else {
                              if ($unwrapTraitObject(__PUCK__value__7).kind == "IndexAccess") {
                                var _$unwrapTraitObject116 = $unwrapTraitObject(__PUCK__value__7),
                                    _$unwrapTraitObject117 = _slicedToArray(_$unwrapTraitObject116.value, 1),
                                    _e55 = _$unwrapTraitObject117[0];

                                return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: _e55, $isTraitObject: true });
                              } else {
                                if ($unwrapTraitObject(__PUCK__value__7).kind == "MemberAccess") {
                                  var _$unwrapTraitObject118 = $unwrapTraitObject(__PUCK__value__7),
                                      _$unwrapTraitObject119 = _slicedToArray(_$unwrapTraitObject118.value, 1),
                                      _e56 = _$unwrapTraitObject119[0];

                                  return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: _e56, $isTraitObject: true });
                                } else {
                                  if ($unwrapTraitObject(__PUCK__value__7).kind == "UnknownAccess") {
                                    var _$unwrapTraitObject120 = $unwrapTraitObject(__PUCK__value__7),
                                        _$unwrapTraitObject121 = _slicedToArray(_$unwrapTraitObject120.value, 1),
                                        _e57 = _$unwrapTraitObject121[0];

                                    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: _e57, $isTraitObject: true });
                                  } else {
                                    if ($unwrapTraitObject(__PUCK__value__7).kind == "UnknownIndexAccess") {
                                      var _$unwrapTraitObject122 = $unwrapTraitObject(__PUCK__value__7),
                                          _$unwrapTraitObject123 = _slicedToArray(_$unwrapTraitObject122.value, 1),
                                          _e58 = _$unwrapTraitObject123[0];

                                      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: _e58, $isTraitObject: true });
                                    } else {
                                      if ($unwrapTraitObject(__PUCK__value__7).kind == "BooleanLiteral") {
                                        var _$unwrapTraitObject124 = $unwrapTraitObject(__PUCK__value__7),
                                            _$unwrapTraitObject125 = _slicedToArray(_$unwrapTraitObject124.value, 1),
                                            _e59 = _$unwrapTraitObject125[0];

                                        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: _e59, $isTraitObject: true });
                                      } else {
                                        if ($unwrapTraitObject(__PUCK__value__7).kind == "ListLiteral") {
                                          var _$unwrapTraitObject126 = $unwrapTraitObject(__PUCK__value__7),
                                              _$unwrapTraitObject127 = _slicedToArray(_$unwrapTraitObject126.value, 1),
                                              _e60 = _$unwrapTraitObject127[0];

                                          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: _e60, $isTraitObject: true });
                                        } else {
                                          if ($unwrapTraitObject(__PUCK__value__7).kind == "NumberLiteral") {
                                            var _$unwrapTraitObject128 = $unwrapTraitObject(__PUCK__value__7),
                                                _$unwrapTraitObject129 = _slicedToArray(_$unwrapTraitObject128.value, 1),
                                                _e61 = _$unwrapTraitObject129[0];

                                            return _e61.span.end;
                                          } else {
                                            if ($unwrapTraitObject(__PUCK__value__7).kind == "RecordLiteral") {
                                              var _$unwrapTraitObject130 = $unwrapTraitObject(__PUCK__value__7),
                                                  _$unwrapTraitObject131 = _slicedToArray(_$unwrapTraitObject130.value, 1),
                                                  _e62 = _$unwrapTraitObject131[0];

                                              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral', value: _e62, $isTraitObject: true });
                                            } else {
                                              if ($unwrapTraitObject(__PUCK__value__7).kind == "StringLiteral") {
                                                var _$unwrapTraitObject132 = $unwrapTraitObject(__PUCK__value__7),
                                                    _$unwrapTraitObject133 = _slicedToArray(_$unwrapTraitObject132.value, 1),
                                                    _e63 = _$unwrapTraitObject133[0];

                                                return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: _e63, $isTraitObject: true });
                                              } else {
                                                if ($unwrapTraitObject(__PUCK__value__7).kind == "TupleLiteral") {
                                                  var _$unwrapTraitObject134 = $unwrapTraitObject(__PUCK__value__7),
                                                      _$unwrapTraitObject135 = _slicedToArray(_$unwrapTraitObject134.value, 1),
                                                      _e64 = _$unwrapTraitObject135[0];

                                                  return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral', value: _e64, $isTraitObject: true });
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
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
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
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.implKeyword.span.start,
      end: self.value.closeBrace.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.implKeyword.span.start,
      end: self.value.closeBrace.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.keyword.span.start,
      end: self.value.closeBrace.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.keyword.span.start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: _core.Option.unwrap.call(self.value.bound), $isTraitObject: true })
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.keyword.span.start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportedStatement"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportedStatement', value: self.value.statement, $isTraitObject: true })
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportedStatement"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__9 = self;
    if ($unwrapTraitObject(__PUCK__value__9).kind == "EnumDeclaration") {
      var _$unwrapTraitObject136 = $unwrapTraitObject(__PUCK__value__9),
          _$unwrapTraitObject137 = _slicedToArray(_$unwrapTraitObject136.value, 1),
          d = _$unwrapTraitObject137[0];

      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: d, $isTraitObject: true });
    } else {
      if ($unwrapTraitObject(__PUCK__value__9).kind == "TraitDeclaration") {
        var _$unwrapTraitObject138 = $unwrapTraitObject(__PUCK__value__9),
            _$unwrapTraitObject139 = _slicedToArray(_$unwrapTraitObject138.value, 1),
            _d = _$unwrapTraitObject139[0];

        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: _d, $isTraitObject: true });
      } else {
        if ($unwrapTraitObject(__PUCK__value__9).kind == "TypeDeclaration") {
          var _$unwrapTraitObject140 = $unwrapTraitObject(__PUCK__value__9),
              _$unwrapTraitObject141 = _slicedToArray(_$unwrapTraitObject140.value, 1),
              _d2 = _$unwrapTraitObject141[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: _d2, $isTraitObject: true });
        } else {
          if ($unwrapTraitObject(__PUCK__value__9).kind == "FunctionDeclaration") {
            var _$unwrapTraitObject142 = $unwrapTraitObject(__PUCK__value__9),
                _$unwrapTraitObject143 = _slicedToArray(_$unwrapTraitObject142.value, 1),
                _d3 = _$unwrapTraitObject143[0];

            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: _d3, $isTraitObject: true });
          } else {
            if ($unwrapTraitObject(__PUCK__value__9).kind == "VariableDeclaration") {
              var _$unwrapTraitObject144 = $unwrapTraitObject(__PUCK__value__9),
                  _$unwrapTraitObject145 = _slicedToArray(_$unwrapTraitObject144.value, 1),
                  _d4 = _$unwrapTraitObject145[0];

              return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: _d4, $isTraitObject: true });
            };
          };
        };
      };
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.importKeyword.span.start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier', value: self.value.specifier, $isTraitObject: true })
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__10 = self;
    if ($unwrapTraitObject(__PUCK__value__10).kind == "Asterisk") {
      var _$unwrapTraitObject146 = $unwrapTraitObject(__PUCK__value__10),
          _$unwrapTraitObject147 = _slicedToArray(_$unwrapTraitObject146.value, 1),
          token = _$unwrapTraitObject147[0];

      return token.span;
    } else {
      if ($unwrapTraitObject(__PUCK__value__10).kind == "Identifier") {
        var _$unwrapTraitObject148 = $unwrapTraitObject(__PUCK__value__10),
            _$unwrapTraitObject149 = _slicedToArray(_$unwrapTraitObject148.value, 1),
            identifier = _$unwrapTraitObject149[0];

        return identifier.span;
      } else {
        if ($unwrapTraitObject(__PUCK__value__10).kind == "ObjectDestructure") {
          var _$unwrapTraitObject150 = $unwrapTraitObject(__PUCK__value__10),
              _$unwrapTraitObject151 = _slicedToArray(_$unwrapTraitObject150.value, 1),
              objectDestructure = _$unwrapTraitObject151[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructure"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructure', value: objectDestructure, $isTraitObject: true });
        };
      };
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructure"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openBrace.span.start,
      end: self.value.closeBrace.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.property.span.start,
      end: self.value.local.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    var __PUCK__value__11 = self.value.openBrace;
    if (__PUCK__value__11.kind == "Some") {
      var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
          openBrace = _PUCK__value__11$val[0];

      return openBrace.span.start;
    } else {
      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: _core.Option.unwrap.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.statements, $isTraitObject: true })), $isTraitObject: true });
    };
  },
  end: function end() {
    var self = this;
    var __PUCK__value__12 = self.value.closeBrace;
    if (__PUCK__value__12.kind == "Some") {
      var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1),
          closeBrace = _PUCK__value__12$val[0];

      return closeBrace.span.end;
    } else {
      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: _core.Option.unwrap.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.statements, $isTraitObject: true })), $isTraitObject: true });
    };
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement"] = {
  span: function span() {
    var self = this;
    return self.value.keyword.span;
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.keyword.span.start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.expression, $isTraitObject: true })
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.condition, $isTraitObject: true }),
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: self.value.body, $isTraitObject: true })
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.hash.span.start,
      end: self.value.closeBracket.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"] = {
  span: function span() {
    var self = this;
    return self.value.span;
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return _core.Option.mapOrElse.call(self.value.name, function () {
      return _core.Option.mapOrElse.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.typeParameters, $isTraitObject: true }), function () {
        return self.value.openParenOrBar.span.start;
      }, function (p) {
        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: p, $isTraitObject: true });
      });
    }, function (i) {
      return i.span.start;
    });
  },
  end: function end() {
    var self = this;
    return _core.Option.mapOrElse.call(self.value.body, function () {
      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: _core.Option.unwrap.call(self.value.returnType), $isTraitObject: true });
    }, function (b) {
      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: b, $isTraitObject: true });
    });
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: self.value.pattern, $isTraitObject: true });
  },
  end: function end() {
    var self = this;
    return _core.Option.mapOrElse.call(self.value.initializer, function () {
      return _core.Option.mapOrElse.call(self.value.typeBound, function () {
        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: self.value.pattern, $isTraitObject: true });
      }, function (t) {
        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t, $isTraitObject: true });
      });
    }, function (i) {
      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: i, $isTraitObject: true });
    });
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.lhs, $isTraitObject: true });
  },
  end: function end() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.rhs, $isTraitObject: true });
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.lhs, $isTraitObject: true });
  },
  end: function end() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.rhs, $isTraitObject: true });
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.func, $isTraitObject: true });
  },
  end: function end() {
    var self = this;
    return self.value.closeParen.span.end;
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return self.value.ifKeyword.span.start;
  },
  end: function end() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: _core.Option.unwrapOr.call(self.value.else_, self.value.then_), $isTraitObject: true });
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return self.value.ifKeyword.span.start;
  },
  end: function end() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: _core.Option.unwrapOr.call(self.value.else_, self.value.then_), $isTraitObject: true });
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return self.value.matchKeyword.span.start;
  },
  end: function end() {
    var self = this;
    return self.value.closeBrace.span.end;
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: self.value.pattern, $isTraitObject: true });
  },
  end: function end() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: self.value.block, $isTraitObject: true });
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.typePath, $isTraitObject: true }),
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.typePath, $isTraitObject: true })
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__13 = self;
    if ($unwrapTraitObject(__PUCK__value__13).kind == "_Object") {
      var _$unwrapTraitObject152 = $unwrapTraitObject(__PUCK__value__13),
          _$unwrapTraitObject153 = _slicedToArray(_$unwrapTraitObject152.value, 2),
          identifier = _$unwrapTraitObject153[0],
          typePath = _$unwrapTraitObject153[1];

      return {
        start: identifier.span.start,
        end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: typePath, $isTraitObject: true })
      };
    } else {
      if ($unwrapTraitObject(__PUCK__value__13).kind == "Member") {
        var _$unwrapTraitObject154 = $unwrapTraitObject(__PUCK__value__13),
            _$unwrapTraitObject155 = _slicedToArray(_$unwrapTraitObject154.value, 1),
            _identifier = _$unwrapTraitObject155[0];

        return _identifier.span;
      };
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.operator.span.start,
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.rhs, $isTraitObject: true })
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true }),
      end: self.value.closeBracket.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true });
  },
  end: function end() {
    var self = this;
    return self.value.member.span.end;
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true });
  },
  end: function end() {
    var self = this;
    return self.value.member.span.end;
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true }),
      end: self.value.closeBracket.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral"] = {
  span: function span() {
    var self = this;
    return self.value.keyword.span;
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openBracket.span.start,
      end: self.value.closeBracket.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral"] = {
  span: function span() {
    var self = this;
    return self.value.span;
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openBrace.span.start,
      end: self.value.closeBrace.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteralMember"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return self.value.name.span.start;
  },
  end: function end() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.value, $isTraitObject: true });
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart', value: _core.Option.unwrap.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.parts, $isTraitObject: true })), $isTraitObject: true });
  },
  end: function end() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart', value: _core.Option.unwrap.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.parts, $isTraitObject: true })), $isTraitObject: true });
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__14 = self;
    if ($unwrapTraitObject(__PUCK__value__14).kind == "Literal") {
      var _$unwrapTraitObject156 = $unwrapTraitObject(__PUCK__value__14),
          _$unwrapTraitObject157 = _slicedToArray(_$unwrapTraitObject156.value, 1),
          _span = _$unwrapTraitObject157[0].span;

      return _span;
    } else {
      if ($unwrapTraitObject(__PUCK__value__14).kind == "Identifier") {
        var _$unwrapTraitObject158 = $unwrapTraitObject(__PUCK__value__14),
            _$unwrapTraitObject159 = _slicedToArray(_$unwrapTraitObject158.value, 1),
            _span2 = _$unwrapTraitObject159[0].span;

        return _span2;
      };
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openParen.span.start,
      end: self.value.closeParen.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__15 = self;
    if ($unwrapTraitObject(__PUCK__value__15).kind == "CatchAll") {
      var _$unwrapTraitObject160 = $unwrapTraitObject(__PUCK__value__15),
          _$unwrapTraitObject161 = _slicedToArray(_$unwrapTraitObject160.value, 1),
          token = _$unwrapTraitObject161[0];

      return token.span;
    } else {
      if ($unwrapTraitObject(__PUCK__value__15).kind == "Identifier") {
        var _$unwrapTraitObject162 = $unwrapTraitObject(__PUCK__value__15),
            _$unwrapTraitObject163 = _slicedToArray(_$unwrapTraitObject162.value, 1),
            identifier = _$unwrapTraitObject163[0];

        return identifier.span;
      } else {
        if ($unwrapTraitObject(__PUCK__value__15).kind == "Record") {
          var _$unwrapTraitObject164 = $unwrapTraitObject(__PUCK__value__15),
              _$unwrapTraitObject165 = _slicedToArray(_$unwrapTraitObject164.value, 1),
              recordPattern = _$unwrapTraitObject165[0];

          return {
            start: recordPattern.openBrace.span.start,
            end: recordPattern.closeBrace.span.end
          };
        } else {
          if ($unwrapTraitObject(__PUCK__value__15).kind == "Tuple") {
            var _$unwrapTraitObject166 = $unwrapTraitObject(__PUCK__value__15),
                _$unwrapTraitObject167 = _slicedToArray(_$unwrapTraitObject166.value, 1),
                tuplePattern = _$unwrapTraitObject167[0];

            return {
              start: tuplePattern.openParen.span.start,
              end: tuplePattern.closeParen.span.end
            };
          } else {
            if ($unwrapTraitObject(__PUCK__value__15).kind == "RecordType") {
              var _$unwrapTraitObject168 = $unwrapTraitObject(__PUCK__value__15),
                  _$unwrapTraitObject169 = _slicedToArray(_$unwrapTraitObject168.value, 2),
                  typePath = _$unwrapTraitObject169[0],
                  _recordPattern = _$unwrapTraitObject169[1];

              return {
                start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: typePath, $isTraitObject: true }),
                end: _recordPattern.closeBrace.span.end
              };
            } else {
              if ($unwrapTraitObject(__PUCK__value__15).kind == "TupleType") {
                var _$unwrapTraitObject170 = $unwrapTraitObject(__PUCK__value__15),
                    _$unwrapTraitObject171 = _slicedToArray(_$unwrapTraitObject170.value, 2),
                    _typePath = _$unwrapTraitObject171[0],
                    _tuplePattern = _$unwrapTraitObject171[1];

                return {
                  start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: _typePath, $isTraitObject: true }),
                  end: _tuplePattern.closeParen.span.end
                };
              } else {
                if ($unwrapTraitObject(__PUCK__value__15).kind == "UnitType") {
                  var _$unwrapTraitObject172 = $unwrapTraitObject(__PUCK__value__15),
                      _$unwrapTraitObject173 = _slicedToArray(_$unwrapTraitObject172.value, 1),
                      _typePath2 = _$unwrapTraitObject173[0];

                  return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: _typePath2, $isTraitObject: true });
                };
              };
            };
          };
        };
      };
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPatternMember"] = {
  span: _span3.ToSpan.span,
  start: function start() {
    var self = this;
    return self.value.property.span.start;
  },
  end: function end() {
    var self = this;
    return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: self.value.pattern, $isTraitObject: true });
  }
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"] = {
  span: function span() {
    var self = this;
    var __PUCK__value__16 = self;
    if ($unwrapTraitObject(__PUCK__value__16).kind == "FunctionTypeBound") {
      var _$unwrapTraitObject174 = $unwrapTraitObject(__PUCK__value__16),
          _$unwrapTraitObject175 = _slicedToArray(_$unwrapTraitObject174.value, 1),
          t = _$unwrapTraitObject175[0];

      return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound', value: t, $isTraitObject: true });
    } else {
      if ($unwrapTraitObject(__PUCK__value__16).kind == "NamedTypeBound") {
        var _$unwrapTraitObject176 = $unwrapTraitObject(__PUCK__value__16),
            _$unwrapTraitObject177 = _slicedToArray(_$unwrapTraitObject176.value, 1),
            _t = _$unwrapTraitObject177[0];

        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: _t, $isTraitObject: true });
      } else {
        if ($unwrapTraitObject(__PUCK__value__16).kind == "RecordTypeBound") {
          var _$unwrapTraitObject178 = $unwrapTraitObject(__PUCK__value__16),
              _$unwrapTraitObject179 = _slicedToArray(_$unwrapTraitObject178.value, 1),
              _t2 = _$unwrapTraitObject179[0];

          return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound', value: _t2, $isTraitObject: true });
        } else {
          if ($unwrapTraitObject(__PUCK__value__16).kind == "TupleTypeBound") {
            var _$unwrapTraitObject180 = $unwrapTraitObject(__PUCK__value__16),
                _$unwrapTraitObject181 = _slicedToArray(_$unwrapTraitObject180.value, 1),
                _t3 = _$unwrapTraitObject181[0];

            return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: _t3, $isTraitObject: true });
          };
        };
      };
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
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
      end: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: self.value.returnType, $isTraitObject: true })
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"] = {
  span: function span() {
    var self = this;
    return {
      start: _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].start.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.path, $isTraitObject: true }),
      end: _core.Option.mapOr.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.typeParameters, $isTraitObject: true }), _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.path, $isTraitObject: true }), function (p) {
        return _span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: p, $isTraitObject: true });
      }).end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openBrace.span.start,
      end: self.value.closeBrace.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.openParen.span.start,
      end: self.value.closeParen.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
_span3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"] = {
  span: function span() {
    var self = this;
    return {
      start: self.value.name.span.start,
      end: self.value.name.span.end
    };
  },
  start: _span3.ToSpan.start,
  end: _span3.ToSpan.end
};
TopLevelStatement.getType = function getType() {
  var self = this;
  var __PUCK__value__17 = self;
  if ($unwrapTraitObject(__PUCK__value__17).kind == "ExportDirective") {
    var _$unwrapTraitObject182 = $unwrapTraitObject(__PUCK__value__17),
        _$unwrapTraitObject183 = _slicedToArray(_$unwrapTraitObject182.value, 1),
        e = _$unwrapTraitObject183[0];

    throw "type on export";
  } else {
    if ($unwrapTraitObject(__PUCK__value__17).kind == "ImportDirective") {
      var _$unwrapTraitObject184 = $unwrapTraitObject(__PUCK__value__17),
          _$unwrapTraitObject185 = _slicedToArray(_$unwrapTraitObject184.value, 1),
          _e65 = _$unwrapTraitObject185[0];

      throw "type on import";
    } else {
      if ($unwrapTraitObject(__PUCK__value__17).kind == "EnumDeclaration") {
        var _$unwrapTraitObject186 = $unwrapTraitObject(__PUCK__value__17),
            _$unwrapTraitObject187 = _slicedToArray(_$unwrapTraitObject186.value, 1),
            _e66 = _$unwrapTraitObject187[0];

        return _e66.type_;
      } else {
        if ($unwrapTraitObject(__PUCK__value__17).kind == "ImplDeclaration") {
          var _$unwrapTraitObject188 = $unwrapTraitObject(__PUCK__value__17),
              _$unwrapTraitObject189 = _slicedToArray(_$unwrapTraitObject188.value, 1),
              _e67 = _$unwrapTraitObject189[0];

          return _e67.type_;
        } else {
          if ($unwrapTraitObject(__PUCK__value__17).kind == "ImplShorthandDeclaration") {
            var _$unwrapTraitObject190 = $unwrapTraitObject(__PUCK__value__17),
                _$unwrapTraitObject191 = _slicedToArray(_$unwrapTraitObject190.value, 1),
                _e68 = _$unwrapTraitObject191[0];

            return _e68.type_;
          } else {
            if ($unwrapTraitObject(__PUCK__value__17).kind == "TraitDeclaration") {
              var _$unwrapTraitObject192 = $unwrapTraitObject(__PUCK__value__17),
                  _$unwrapTraitObject193 = _slicedToArray(_$unwrapTraitObject192.value, 1),
                  _e69 = _$unwrapTraitObject193[0];

              return _e69.type_;
            } else {
              if ($unwrapTraitObject(__PUCK__value__17).kind == "TypeDeclaration") {
                var _$unwrapTraitObject194 = $unwrapTraitObject(__PUCK__value__17),
                    _$unwrapTraitObject195 = _slicedToArray(_$unwrapTraitObject194.value, 1),
                    _e70 = _$unwrapTraitObject195[0];

                return _e70.type_;
              } else {
                if ($unwrapTraitObject(__PUCK__value__17).kind == "BlockLevelStatement") {
                  var _$unwrapTraitObject196 = $unwrapTraitObject(__PUCK__value__17),
                      _$unwrapTraitObject197 = _slicedToArray(_$unwrapTraitObject196.value, 1),
                      _e71 = _$unwrapTraitObject197[0];

                  return BlockLevelStatement.getType.call(_e71);
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
  var __PUCK__value__18 = self;
  if ($unwrapTraitObject(__PUCK__value__18).kind == "Block") {
    var _$unwrapTraitObject198 = $unwrapTraitObject(__PUCK__value__18),
        _$unwrapTraitObject199 = _slicedToArray(_$unwrapTraitObject198.value, 1),
        e = _$unwrapTraitObject199[0];

    return e.type_;
  } else {
    if ($unwrapTraitObject(__PUCK__value__18).kind == "BreakStatement") {
      var _$unwrapTraitObject200 = $unwrapTraitObject(__PUCK__value__18),
          _$unwrapTraitObject201 = _slicedToArray(_$unwrapTraitObject200.value, 1),
          _e72 = _$unwrapTraitObject201[0];

      return _e72.type_;
    } else {
      if ($unwrapTraitObject(__PUCK__value__18).kind == "ReturnStatement") {
        var _$unwrapTraitObject202 = $unwrapTraitObject(__PUCK__value__18),
            _$unwrapTraitObject203 = _slicedToArray(_$unwrapTraitObject202.value, 1),
            _e73 = _$unwrapTraitObject203[0];

        return _e73.type_;
      } else {
        if ($unwrapTraitObject(__PUCK__value__18).kind == "WhileLoop") {
          var _$unwrapTraitObject204 = $unwrapTraitObject(__PUCK__value__18),
              _$unwrapTraitObject205 = _slicedToArray(_$unwrapTraitObject204.value, 1),
              _e74 = _$unwrapTraitObject205[0];

          return _e74.type_;
        } else {
          if ($unwrapTraitObject(__PUCK__value__18).kind == "Expression") {
            var _$unwrapTraitObject206 = $unwrapTraitObject(__PUCK__value__18),
                _$unwrapTraitObject207 = _slicedToArray(_$unwrapTraitObject206.value, 1),
                _e75 = _$unwrapTraitObject207[0];

            return Expression.getType.call(_e75);
          };
        };
      };
    };
  };
};
Expression.getType = function getType() {
  var self = this;
  var __PUCK__value__19 = self;
  if ($unwrapTraitObject(__PUCK__value__19).kind == "ThrowStatement") {
    var _$unwrapTraitObject208 = $unwrapTraitObject(__PUCK__value__19),
        _$unwrapTraitObject209 = _slicedToArray(_$unwrapTraitObject208.value, 1),
        e = _$unwrapTraitObject209[0];

    return e.type_;
  } else {
    if ($unwrapTraitObject(__PUCK__value__19).kind == "Comment") {
      var __PUCK__value__20 = $unwrapTraitObject(__PUCK__value__19);;

      var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1),
          __PUCK__value__21 = _PUCK__value__20$val[0];

      ;
      return __PUCK__value__20;
    } else {
      if ($unwrapTraitObject(__PUCK__value__19).kind == "Identifier") {
        var _$unwrapTraitObject210 = $unwrapTraitObject(__PUCK__value__19),
            _$unwrapTraitObject211 = _slicedToArray(_$unwrapTraitObject210.value, 1),
            _e76 = _$unwrapTraitObject211[0];

        return _e76.type_;
      } else {
        if ($unwrapTraitObject(__PUCK__value__19).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject212 = $unwrapTraitObject(__PUCK__value__19),
              _$unwrapTraitObject213 = _slicedToArray(_$unwrapTraitObject212.value, 1),
              _e77 = _$unwrapTraitObject213[0];

          return _e77.type_;
        } else {
          if ($unwrapTraitObject(__PUCK__value__19).kind == "VariableDeclaration") {
            var _$unwrapTraitObject214 = $unwrapTraitObject(__PUCK__value__19),
                _$unwrapTraitObject215 = _slicedToArray(_$unwrapTraitObject214.value, 1),
                _e78 = _$unwrapTraitObject215[0];

            return _e78.type_;
          } else {
            if ($unwrapTraitObject(__PUCK__value__19).kind == "AssignmentExpression") {
              var _$unwrapTraitObject216 = $unwrapTraitObject(__PUCK__value__19),
                  _$unwrapTraitObject217 = _slicedToArray(_$unwrapTraitObject216.value, 1),
                  _e79 = _$unwrapTraitObject217[0];

              return _e79.type_;
            } else {
              if ($unwrapTraitObject(__PUCK__value__19).kind == "BinaryExpression") {
                var _$unwrapTraitObject218 = $unwrapTraitObject(__PUCK__value__19),
                    _$unwrapTraitObject219 = _slicedToArray(_$unwrapTraitObject218.value, 1),
                    _e80 = _$unwrapTraitObject219[0];

                return _e80.type_;
              } else {
                if ($unwrapTraitObject(__PUCK__value__19).kind == "CallExpression") {
                  var _$unwrapTraitObject220 = $unwrapTraitObject(__PUCK__value__19),
                      _$unwrapTraitObject221 = _slicedToArray(_$unwrapTraitObject220.value, 1),
                      _e81 = _$unwrapTraitObject221[0];

                  return _e81.type_;
                } else {
                  if ($unwrapTraitObject(__PUCK__value__19).kind == "IfExpression") {
                    var _$unwrapTraitObject222 = $unwrapTraitObject(__PUCK__value__19),
                        _$unwrapTraitObject223 = _slicedToArray(_$unwrapTraitObject222.value, 1),
                        _e82 = _$unwrapTraitObject223[0];

                    return _e82.type_;
                  } else {
                    if ($unwrapTraitObject(__PUCK__value__19).kind == "IfLetExpression") {
                      var _$unwrapTraitObject224 = $unwrapTraitObject(__PUCK__value__19),
                          _$unwrapTraitObject225 = _slicedToArray(_$unwrapTraitObject224.value, 1),
                          _e83 = _$unwrapTraitObject225[0];

                      return _e83.type_;
                    } else {
                      if ($unwrapTraitObject(__PUCK__value__19).kind == "MatchExpression") {
                        var _$unwrapTraitObject226 = $unwrapTraitObject(__PUCK__value__19),
                            _$unwrapTraitObject227 = _slicedToArray(_$unwrapTraitObject226.value, 1),
                            _e84 = _$unwrapTraitObject227[0];

                        return _e84.type_;
                      } else {
                        if ($unwrapTraitObject(__PUCK__value__19).kind == "TypePathExpression") {
                          var _$unwrapTraitObject228 = $unwrapTraitObject(__PUCK__value__19),
                              _$unwrapTraitObject229 = _slicedToArray(_$unwrapTraitObject228.value, 1),
                              _e85 = _$unwrapTraitObject229[0];

                          return _e85.type_;
                        } else {
                          if ($unwrapTraitObject(__PUCK__value__19).kind == "UnaryExpression") {
                            var _$unwrapTraitObject230 = $unwrapTraitObject(__PUCK__value__19),
                                _$unwrapTraitObject231 = _slicedToArray(_$unwrapTraitObject230.value, 1),
                                _e86 = _$unwrapTraitObject231[0];

                            return _e86.type_;
                          } else {
                            if ($unwrapTraitObject(__PUCK__value__19).kind == "IndexAccess") {
                              var _$unwrapTraitObject232 = $unwrapTraitObject(__PUCK__value__19),
                                  _$unwrapTraitObject233 = _slicedToArray(_$unwrapTraitObject232.value, 1),
                                  _e87 = _$unwrapTraitObject233[0];

                              return _e87.type_;
                            } else {
                              if ($unwrapTraitObject(__PUCK__value__19).kind == "MemberAccess") {
                                var _$unwrapTraitObject234 = $unwrapTraitObject(__PUCK__value__19),
                                    _$unwrapTraitObject235 = _slicedToArray(_$unwrapTraitObject234.value, 1),
                                    _e88 = _$unwrapTraitObject235[0];

                                return _e88.type_;
                              } else {
                                if ($unwrapTraitObject(__PUCK__value__19).kind == "UnknownAccess") {
                                  var _$unwrapTraitObject236 = $unwrapTraitObject(__PUCK__value__19),
                                      _$unwrapTraitObject237 = _slicedToArray(_$unwrapTraitObject236.value, 1),
                                      _e89 = _$unwrapTraitObject237[0];

                                  return _e89.type_;
                                } else {
                                  if ($unwrapTraitObject(__PUCK__value__19).kind == "UnknownIndexAccess") {
                                    var _$unwrapTraitObject238 = $unwrapTraitObject(__PUCK__value__19),
                                        _$unwrapTraitObject239 = _slicedToArray(_$unwrapTraitObject238.value, 1),
                                        _e90 = _$unwrapTraitObject239[0];

                                    return _e90.type_;
                                  } else {
                                    if ($unwrapTraitObject(__PUCK__value__19).kind == "BooleanLiteral") {
                                      var _$unwrapTraitObject240 = $unwrapTraitObject(__PUCK__value__19),
                                          _$unwrapTraitObject241 = _slicedToArray(_$unwrapTraitObject240.value, 1),
                                          _e91 = _$unwrapTraitObject241[0];

                                      return _e91.type_;
                                    } else {
                                      if ($unwrapTraitObject(__PUCK__value__19).kind == "ListLiteral") {
                                        var _$unwrapTraitObject242 = $unwrapTraitObject(__PUCK__value__19),
                                            _$unwrapTraitObject243 = _slicedToArray(_$unwrapTraitObject242.value, 1),
                                            _e92 = _$unwrapTraitObject243[0];

                                        return _e92.type_;
                                      } else {
                                        if ($unwrapTraitObject(__PUCK__value__19).kind == "NumberLiteral") {
                                          var _$unwrapTraitObject244 = $unwrapTraitObject(__PUCK__value__19),
                                              _$unwrapTraitObject245 = _slicedToArray(_$unwrapTraitObject244.value, 1),
                                              _e93 = _$unwrapTraitObject245[0];

                                          return _e93.type_;
                                        } else {
                                          if ($unwrapTraitObject(__PUCK__value__19).kind == "RecordLiteral") {
                                            var _$unwrapTraitObject246 = $unwrapTraitObject(__PUCK__value__19),
                                                _$unwrapTraitObject247 = _slicedToArray(_$unwrapTraitObject246.value, 1),
                                                _e94 = _$unwrapTraitObject247[0];

                                            return _e94.type_;
                                          } else {
                                            if ($unwrapTraitObject(__PUCK__value__19).kind == "StringLiteral") {
                                              var _$unwrapTraitObject248 = $unwrapTraitObject(__PUCK__value__19),
                                                  _$unwrapTraitObject249 = _slicedToArray(_$unwrapTraitObject248.value, 1),
                                                  _e95 = _$unwrapTraitObject249[0];

                                              return _e95.type_;
                                            } else {
                                              if ($unwrapTraitObject(__PUCK__value__19).kind == "TupleLiteral") {
                                                var _$unwrapTraitObject250 = $unwrapTraitObject(__PUCK__value__19),
                                                    _$unwrapTraitObject251 = _slicedToArray(_$unwrapTraitObject250.value, 1),
                                                    _e96 = _$unwrapTraitObject251[0];

                                                return _e96.type_;
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
  };
};
ExportDirective.getType = function getType() {
  var self = this;
  var __PUCK__value__22 = self.statement;
  if ($unwrapTraitObject(__PUCK__value__22).kind == "EnumDeclaration") {
    var _$unwrapTraitObject252 = $unwrapTraitObject(__PUCK__value__22),
        _$unwrapTraitObject253 = _slicedToArray(_$unwrapTraitObject252.value, 1),
        d = _$unwrapTraitObject253[0];

    return d.type_;
  } else {
    if ($unwrapTraitObject(__PUCK__value__22).kind == "TraitDeclaration") {
      var _$unwrapTraitObject254 = $unwrapTraitObject(__PUCK__value__22),
          _$unwrapTraitObject255 = _slicedToArray(_$unwrapTraitObject254.value, 1),
          _d5 = _$unwrapTraitObject255[0];

      return _d5.type_;
    } else {
      if ($unwrapTraitObject(__PUCK__value__22).kind == "TypeDeclaration") {
        var _$unwrapTraitObject256 = $unwrapTraitObject(__PUCK__value__22),
            _$unwrapTraitObject257 = _slicedToArray(_$unwrapTraitObject256.value, 1),
            _d6 = _$unwrapTraitObject257[0];

        return _d6.type_;
      } else {
        if ($unwrapTraitObject(__PUCK__value__22).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject258 = $unwrapTraitObject(__PUCK__value__22),
              _$unwrapTraitObject259 = _slicedToArray(_$unwrapTraitObject258.value, 1),
              _d7 = _$unwrapTraitObject259[0];

          return _d7.type_;
        } else {
          if ($unwrapTraitObject(__PUCK__value__22).kind == "VariableDeclaration") {
            var _$unwrapTraitObject260 = $unwrapTraitObject(__PUCK__value__22),
                _$unwrapTraitObject261 = _slicedToArray(_$unwrapTraitObject260.value, 1),
                _d8 = _$unwrapTraitObject261[0];

            return _d8.type_;
          };
        };
      };
    };
  };
};
Pattern.displayName = function displayName() {
  var self = this;
  var __PUCK__value__23 = self;
  if ($unwrapTraitObject(__PUCK__value__23).kind == "CatchAll") {
    var _$unwrapTraitObject262 = $unwrapTraitObject(__PUCK__value__23),
        _$unwrapTraitObject263 = _slicedToArray(_$unwrapTraitObject262.value, 1),
        __PUCK__value__24 = _$unwrapTraitObject263[0];

    return "_";
  } else {
    if ($unwrapTraitObject(__PUCK__value__23).kind == "Identifier") {
      var _$unwrapTraitObject264 = $unwrapTraitObject(__PUCK__value__23),
          _$unwrapTraitObject265 = _slicedToArray(_$unwrapTraitObject264.value, 1),
          identifier = _$unwrapTraitObject265[0];

      return identifier.name;
    } else {
      if ($unwrapTraitObject(__PUCK__value__23).kind == "Record") {
        var _$unwrapTraitObject266 = $unwrapTraitObject(__PUCK__value__23),
            _$unwrapTraitObject267 = _slicedToArray(_$unwrapTraitObject266.value, 1),
            recordPattern = _$unwrapTraitObject267[0];

        return RecordPattern.displayName.call(recordPattern);
      } else {
        if ($unwrapTraitObject(__PUCK__value__23).kind == "Tuple") {
          var _$unwrapTraitObject268 = $unwrapTraitObject(__PUCK__value__23),
              _$unwrapTraitObject269 = _slicedToArray(_$unwrapTraitObject268.value, 1),
              tuplePattern = _$unwrapTraitObject269[0];

          return TuplePattern.displayName.call(tuplePattern);
        } else {
          if ($unwrapTraitObject(__PUCK__value__23).kind == "RecordType") {
            var _$unwrapTraitObject270 = $unwrapTraitObject(__PUCK__value__23),
                _$unwrapTraitObject271 = _slicedToArray(_$unwrapTraitObject270.value, 2),
                __PUCK__value__25 = _$unwrapTraitObject271[0],
                _recordPattern2 = _$unwrapTraitObject271[1];

            return RecordPattern.displayName.call(_recordPattern2);
          } else {
            if ($unwrapTraitObject(__PUCK__value__23).kind == "TupleType") {
              var _$unwrapTraitObject272 = $unwrapTraitObject(__PUCK__value__23),
                  _$unwrapTraitObject273 = _slicedToArray(_$unwrapTraitObject272.value, 2),
                  __PUCK__value__26 = _$unwrapTraitObject273[0],
                  _tuplePattern2 = _$unwrapTraitObject273[1];

              return TuplePattern.displayName.call(_tuplePattern2);
            } else {
              if ($unwrapTraitObject(__PUCK__value__23).kind == "UnitType") {
                var _$unwrapTraitObject274 = $unwrapTraitObject(__PUCK__value__23),
                    _$unwrapTraitObject275 = _slicedToArray(_$unwrapTraitObject274.value, 1),
                    __PUCK__value__27 = _$unwrapTraitObject275[0];

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
    var __PUCK__value__28 = p.pattern;
    var __PUCK__value__29 = void 0;
    if (__PUCK__value__28.kind == "Identifier") {
      var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
          name = _PUCK__value__28$val[0].name;

      __PUCK__value__29 = name == p.property.name;
    } else {
      __PUCK__value__29 = false;
    };
    var shorthand = __PUCK__value__29;
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
  var __PUCK__value__30 = self;
  if ($unwrapTraitObject(__PUCK__value__30).kind == "FunctionTypeBound") {
    var _$unwrapTraitObject276 = $unwrapTraitObject(__PUCK__value__30),
        _$unwrapTraitObject277 = _slicedToArray(_$unwrapTraitObject276.value, 1),
        t = _$unwrapTraitObject277[0];

    return t.type_;
  } else {
    if ($unwrapTraitObject(__PUCK__value__30).kind == "NamedTypeBound") {
      var _$unwrapTraitObject278 = $unwrapTraitObject(__PUCK__value__30),
          _$unwrapTraitObject279 = _slicedToArray(_$unwrapTraitObject278.value, 1),
          _t4 = _$unwrapTraitObject279[0];

      return _t4.type_;
    } else {
      if ($unwrapTraitObject(__PUCK__value__30).kind == "RecordTypeBound") {
        var _$unwrapTraitObject280 = $unwrapTraitObject(__PUCK__value__30),
            _$unwrapTraitObject281 = _slicedToArray(_$unwrapTraitObject280.value, 1),
            _t5 = _$unwrapTraitObject281[0];

        return _t5.type_;
      } else {
        if ($unwrapTraitObject(__PUCK__value__30).kind == "TupleTypeBound") {
          var _$unwrapTraitObject282 = $unwrapTraitObject(__PUCK__value__30),
              _$unwrapTraitObject283 = _slicedToArray(_$unwrapTraitObject282.value, 1),
              _t6 = _$unwrapTraitObject283[0];

          return _t6.type_;
        };
      };
    };
  };
};
TypeBound.getRecordTypeBound = function getRecordTypeBound() {
  var self = this;
  var __PUCK__value__31 = self;
  if ($unwrapTraitObject(__PUCK__value__31).kind == "RecordTypeBound") {
    var _$unwrapTraitObject284 = $unwrapTraitObject(__PUCK__value__31),
        _$unwrapTraitObject285 = _slicedToArray(_$unwrapTraitObject284.value, 1),
        record = _$unwrapTraitObject285[0];

    return record;
  } else {
    if (true) {
      var __PUCK__value__32 = __PUCK__value__31;
      throw "TypeBound is not a RecordTypeBound";
    };
  };
};
TypeBound.getTupleTypeBound = function getTupleTypeBound() {
  var self = this;
  var __PUCK__value__33 = self;
  if ($unwrapTraitObject(__PUCK__value__33).kind == "TupleTypeBound") {
    var _$unwrapTraitObject286 = $unwrapTraitObject(__PUCK__value__33),
        _$unwrapTraitObject287 = _slicedToArray(_$unwrapTraitObject286.value, 1),
        tuple = _$unwrapTraitObject287[0];

    return tuple;
  } else {
    if (true) {
      var __PUCK__value__34 = __PUCK__value__33;
      throw "TypeBound is not a TupleTypeBound";
    };
  };
};
