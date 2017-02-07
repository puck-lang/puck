'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeBound = exports.Pattern = exports.TypePath = exports.ImportSpecifier = exports.ExportedStatement = exports.Expression = exports.BlockLevelStatement = exports.TopLevelStatement = exports.TypeParameter = exports.TupleTypeBound = exports.RecordTypeBoundMember = exports.RecordTypeBound = exports.NamedTypeBound = exports.FunctionTypeBound = exports.TuplePattern = exports.RecordPatternMember = exports.RecordPattern = exports.TupleLiteral = exports.StringLiteralPart = exports.StringLiteral = exports.RecordLiteralMember = exports.RecordLiteral = exports.NumberLiteral = exports.ListLiteral = exports.BooleanLiteral = exports.MemberAccess = exports.IndexAccess = exports.UnaryExpression = exports.TypePathExpression = exports.MatchArm = exports.MatchExpression = exports.IfLetExpression = exports.IfExpression = exports.CallExpression = exports.BinaryExpression = exports.AssignmentExpression = exports.VariableDeclaration = exports.FunctionDeclaration = exports.Identifier = exports.Comment = exports.WhileLoop = exports.ReturnStatement = exports.BreakStatement = exports.Block = exports.ObjectDestructureMember = exports.ObjectDestructure = exports.ImportDirective = exports.ExportDirective = exports.TypeDeclaration = exports.TraitDeclaration = exports.ImplShorthandDeclaration = exports.ImplDeclaration = exports.EnumMember = exports.EnumDeclaration = exports.Module = exports.Token = exports.SyntaxKind = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var _entities = require('./../entities');

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
var StringLiteralPart = exports.StringLiteralPart = function StringLiteralPart(object) {
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
var ExportedStatement = exports.ExportedStatement = {
  EnumDeclaration: function EnumDeclaration() {
    for (var _len35 = arguments.length, members = Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
      members[_key35] = arguments[_key35];
    }

    return { kind: 'EnumDeclaration', value: members };
  },
  TraitDeclaration: function TraitDeclaration() {
    for (var _len36 = arguments.length, members = Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
      members[_key36] = arguments[_key36];
    }

    return { kind: 'TraitDeclaration', value: members };
  },
  TypeDeclaration: function TypeDeclaration() {
    for (var _len37 = arguments.length, members = Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
      members[_key37] = arguments[_key37];
    }

    return { kind: 'TypeDeclaration', value: members };
  },
  FunctionDeclaration: function FunctionDeclaration() {
    for (var _len38 = arguments.length, members = Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
      members[_key38] = arguments[_key38];
    }

    return { kind: 'FunctionDeclaration', value: members };
  },
  VariableDeclaration: function VariableDeclaration() {
    for (var _len39 = arguments.length, members = Array(_len39), _key39 = 0; _key39 < _len39; _key39++) {
      members[_key39] = arguments[_key39];
    }

    return { kind: 'VariableDeclaration', value: members };
  }
};
var ImportSpecifier = exports.ImportSpecifier = {
  Asterisk: function Asterisk() {
    for (var _len40 = arguments.length, members = Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
      members[_key40] = arguments[_key40];
    }

    return { kind: 'Asterisk', value: members };
  },
  Identifier: function Identifier() {
    for (var _len41 = arguments.length, members = Array(_len41), _key41 = 0; _key41 < _len41; _key41++) {
      members[_key41] = arguments[_key41];
    }

    return { kind: 'Identifier', value: members };
  },
  ObjectDestructure: function ObjectDestructure() {
    for (var _len42 = arguments.length, members = Array(_len42), _key42 = 0; _key42 < _len42; _key42++) {
      members[_key42] = arguments[_key42];
    }

    return { kind: 'ObjectDestructure', value: members };
  }
};
var TypePath = exports.TypePath = {
  _Object: function _Object() {
    for (var _len43 = arguments.length, members = Array(_len43), _key43 = 0; _key43 < _len43; _key43++) {
      members[_key43] = arguments[_key43];
    }

    return { kind: '_Object', value: members };
  },
  Member: function Member() {
    for (var _len44 = arguments.length, members = Array(_len44), _key44 = 0; _key44 < _len44; _key44++) {
      members[_key44] = arguments[_key44];
    }

    return { kind: 'Member', value: members };
  }
};
var Pattern = exports.Pattern = {
  CatchAll: { kind: 'CatchAll', value: Symbol('CatchAll') },
  Identifier: function Identifier() {
    for (var _len45 = arguments.length, members = Array(_len45), _key45 = 0; _key45 < _len45; _key45++) {
      members[_key45] = arguments[_key45];
    }

    return { kind: 'Identifier', value: members };
  },
  Record: function Record() {
    for (var _len46 = arguments.length, members = Array(_len46), _key46 = 0; _key46 < _len46; _key46++) {
      members[_key46] = arguments[_key46];
    }

    return { kind: 'Record', value: members };
  },
  Tuple: function Tuple() {
    for (var _len47 = arguments.length, members = Array(_len47), _key47 = 0; _key47 < _len47; _key47++) {
      members[_key47] = arguments[_key47];
    }

    return { kind: 'Tuple', value: members };
  },
  RecordType: function RecordType() {
    for (var _len48 = arguments.length, members = Array(_len48), _key48 = 0; _key48 < _len48; _key48++) {
      members[_key48] = arguments[_key48];
    }

    return { kind: 'RecordType', value: members };
  },
  TupleType: function TupleType() {
    for (var _len49 = arguments.length, members = Array(_len49), _key49 = 0; _key49 < _len49; _key49++) {
      members[_key49] = arguments[_key49];
    }

    return { kind: 'TupleType', value: members };
  },
  UnitType: function UnitType() {
    for (var _len50 = arguments.length, members = Array(_len50), _key50 = 0; _key50 < _len50; _key50++) {
      members[_key50] = arguments[_key50];
    }

    return { kind: 'UnitType', value: members };
  }
};
var TypeBound = exports.TypeBound = {
  FunctionTypeBound: function FunctionTypeBound() {
    for (var _len51 = arguments.length, members = Array(_len51), _key51 = 0; _key51 < _len51; _key51++) {
      members[_key51] = arguments[_key51];
    }

    return { kind: 'FunctionTypeBound', value: members };
  },
  NamedTypeBound: function NamedTypeBound() {
    for (var _len52 = arguments.length, members = Array(_len52), _key52 = 0; _key52 < _len52; _key52++) {
      members[_key52] = arguments[_key52];
    }

    return { kind: 'NamedTypeBound', value: members };
  },
  RecordTypeBound: function RecordTypeBound() {
    for (var _len53 = arguments.length, members = Array(_len53), _key53 = 0; _key53 < _len53; _key53++) {
      members[_key53] = arguments[_key53];
    }

    return { kind: 'RecordTypeBound', value: members };
  },
  TupleTypeBound: function TupleTypeBound() {
    for (var _len54 = arguments.length, members = Array(_len54), _key54 = 0; _key54 < _len54; _key54++) {
      members[_key54] = arguments[_key54];
    }

    return { kind: 'TupleTypeBound', value: members };
  }
};
TopLevelStatement.getType = function getType() {
  var self = this;
  var __PUCK__value__1 = self;
  var __PUCK__value__2 = __PUCK__value__1;
  if ($unwrapTraitObject(__PUCK__value__2).kind == "ExportDirective") {
    var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
        e = _PUCK__value__2$valu[0];

    throw "type on export";
  } else {
    var __PUCK__value__3 = __PUCK__value__1;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "ImportDirective") {
      var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
          _e = _PUCK__value__3$valu[0];

      throw "type on import";
    } else {
      var __PUCK__value__4 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__4).kind == "EnumDeclaration") {
        var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
            _e2 = _PUCK__value__4$valu[0];

        return _e2.type_;
      } else {
        var __PUCK__value__5 = __PUCK__value__1;
        if ($unwrapTraitObject(__PUCK__value__5).kind == "ImplDeclaration") {
          var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
              _e3 = _PUCK__value__5$valu[0];

          return _e3.type_;
        } else {
          var __PUCK__value__6 = __PUCK__value__1;
          if ($unwrapTraitObject(__PUCK__value__6).kind == "ImplShorthandDeclaration") {
            var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1),
                _e4 = _PUCK__value__6$valu[0];

            return _e4.type_;
          } else {
            var __PUCK__value__7 = __PUCK__value__1;
            if ($unwrapTraitObject(__PUCK__value__7).kind == "TraitDeclaration") {
              var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1),
                  _e5 = _PUCK__value__7$valu[0];

              return _e5.type_;
            } else {
              var __PUCK__value__8 = __PUCK__value__1;
              if ($unwrapTraitObject(__PUCK__value__8).kind == "TypeDeclaration") {
                var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1),
                    _e6 = _PUCK__value__8$valu[0];

                return _e6.type_;
              } else {
                var __PUCK__value__9 = __PUCK__value__1;
                if ($unwrapTraitObject(__PUCK__value__9).kind == "BlockLevelStatement") {
                  var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
                      _e7 = _PUCK__value__9$valu[0];

                  return BlockLevelStatement.getType.call(_e7);
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
  var __PUCK__value__10 = self;
  var __PUCK__value__11 = __PUCK__value__10;
  if ($unwrapTraitObject(__PUCK__value__11).kind == "Block") {
    var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
        e = _PUCK__value__11$val[0];

    return e.type_;
  } else {
    var __PUCK__value__12 = __PUCK__value__10;
    if ($unwrapTraitObject(__PUCK__value__12).kind == "BreakStatement") {
      var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1),
          _e8 = _PUCK__value__12$val[0];

      return _e8.type_;
    } else {
      var __PUCK__value__13 = __PUCK__value__10;
      if ($unwrapTraitObject(__PUCK__value__13).kind == "ReturnStatement") {
        var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1),
            _e9 = _PUCK__value__13$val[0];

        return _e9.type_;
      } else {
        var __PUCK__value__14 = __PUCK__value__10;
        if ($unwrapTraitObject(__PUCK__value__14).kind == "WhileLoop") {
          var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
              _e10 = _PUCK__value__14$val[0];

          return _e10.type_;
        } else {
          var __PUCK__value__15 = __PUCK__value__10;
          if ($unwrapTraitObject(__PUCK__value__15).kind == "Expression") {
            var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
                _e11 = _PUCK__value__15$val[0];

            return Expression.getType.call(_e11);
          };
        };
      };
    };
  };
};
Expression.getType = function getType() {
  var self = this;
  var __PUCK__value__16 = self;
  var __PUCK__value__17 = __PUCK__value__16;
  if ($unwrapTraitObject(__PUCK__value__17).kind == "ThrowStatement") {
    var _PUCK__value__17$val = _slicedToArray(__PUCK__value__17.value, 1),
        e = _PUCK__value__17$val[0];

    return e.type_;
  } else {
    var __PUCK__value__18 = __PUCK__value__16;
    if ($unwrapTraitObject(__PUCK__value__18).kind == "Comment") {
      var __PUCK__value__19 = __PUCK__value__18;;

      var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1),
          __PUCK__value__20 = _PUCK__value__19$val[0];

      ;
      return __PUCK__value__19;
    } else {
      var __PUCK__value__21 = __PUCK__value__16;
      if ($unwrapTraitObject(__PUCK__value__21).kind == "Identifier") {
        var _PUCK__value__21$val = _slicedToArray(__PUCK__value__21.value, 1),
            _e12 = _PUCK__value__21$val[0];

        return _e12.type_;
      } else {
        var __PUCK__value__22 = __PUCK__value__16;
        if ($unwrapTraitObject(__PUCK__value__22).kind == "FunctionDeclaration") {
          var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1),
              _e13 = _PUCK__value__22$val[0];

          return _e13.type_;
        } else {
          var __PUCK__value__23 = __PUCK__value__16;
          if ($unwrapTraitObject(__PUCK__value__23).kind == "VariableDeclaration") {
            var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1),
                _e14 = _PUCK__value__23$val[0];

            return _e14.type_;
          } else {
            var __PUCK__value__24 = __PUCK__value__16;
            if ($unwrapTraitObject(__PUCK__value__24).kind == "AssignmentExpression") {
              var _PUCK__value__24$val = _slicedToArray(__PUCK__value__24.value, 1),
                  _e15 = _PUCK__value__24$val[0];

              return _e15.type_;
            } else {
              var __PUCK__value__25 = __PUCK__value__16;
              if ($unwrapTraitObject(__PUCK__value__25).kind == "BinaryExpression") {
                var _PUCK__value__25$val = _slicedToArray(__PUCK__value__25.value, 1),
                    _e16 = _PUCK__value__25$val[0];

                return _e16.type_;
              } else {
                var __PUCK__value__26 = __PUCK__value__16;
                if ($unwrapTraitObject(__PUCK__value__26).kind == "CallExpression") {
                  var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
                      _e17 = _PUCK__value__26$val[0];

                  return _e17.type_;
                } else {
                  var __PUCK__value__27 = __PUCK__value__16;
                  if ($unwrapTraitObject(__PUCK__value__27).kind == "IfExpression") {
                    var _PUCK__value__27$val = _slicedToArray(__PUCK__value__27.value, 1),
                        _e18 = _PUCK__value__27$val[0];

                    return _e18.type_;
                  } else {
                    var __PUCK__value__28 = __PUCK__value__16;
                    if ($unwrapTraitObject(__PUCK__value__28).kind == "IfLetExpression") {
                      var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
                          _e19 = _PUCK__value__28$val[0];

                      return _e19.type_;
                    } else {
                      var __PUCK__value__29 = __PUCK__value__16;
                      if ($unwrapTraitObject(__PUCK__value__29).kind == "MatchExpression") {
                        var _PUCK__value__29$val = _slicedToArray(__PUCK__value__29.value, 1),
                            _e20 = _PUCK__value__29$val[0];

                        return _e20.type_;
                      } else {
                        var __PUCK__value__30 = __PUCK__value__16;
                        if ($unwrapTraitObject(__PUCK__value__30).kind == "TypePathExpression") {
                          var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1),
                              _e21 = _PUCK__value__30$val[0];

                          return _e21.type_;
                        } else {
                          var __PUCK__value__31 = __PUCK__value__16;
                          if ($unwrapTraitObject(__PUCK__value__31).kind == "UnaryExpression") {
                            var _PUCK__value__31$val = _slicedToArray(__PUCK__value__31.value, 1),
                                _e22 = _PUCK__value__31$val[0];

                            return _e22.type_;
                          } else {
                            var __PUCK__value__32 = __PUCK__value__16;
                            if ($unwrapTraitObject(__PUCK__value__32).kind == "IndexAccess") {
                              var _PUCK__value__32$val = _slicedToArray(__PUCK__value__32.value, 1),
                                  _e23 = _PUCK__value__32$val[0];

                              return _e23.type_;
                            } else {
                              var __PUCK__value__33 = __PUCK__value__16;
                              if ($unwrapTraitObject(__PUCK__value__33).kind == "MemberAccess") {
                                var _PUCK__value__33$val = _slicedToArray(__PUCK__value__33.value, 1),
                                    _e24 = _PUCK__value__33$val[0];

                                return _e24.type_;
                              } else {
                                var __PUCK__value__34 = __PUCK__value__16;
                                if ($unwrapTraitObject(__PUCK__value__34).kind == "BooleanLiteral") {
                                  var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1),
                                      _e25 = _PUCK__value__34$val[0];

                                  return _e25.type_;
                                } else {
                                  var __PUCK__value__35 = __PUCK__value__16;
                                  if ($unwrapTraitObject(__PUCK__value__35).kind == "ListLiteral") {
                                    var _PUCK__value__35$val = _slicedToArray(__PUCK__value__35.value, 1),
                                        _e26 = _PUCK__value__35$val[0];

                                    return _e26.type_;
                                  } else {
                                    var __PUCK__value__36 = __PUCK__value__16;
                                    if ($unwrapTraitObject(__PUCK__value__36).kind == "NumberLiteral") {
                                      var _PUCK__value__36$val = _slicedToArray(__PUCK__value__36.value, 1),
                                          _e27 = _PUCK__value__36$val[0];

                                      return _e27.type_;
                                    } else {
                                      var __PUCK__value__37 = __PUCK__value__16;
                                      if ($unwrapTraitObject(__PUCK__value__37).kind == "RecordLiteral") {
                                        var _PUCK__value__37$val = _slicedToArray(__PUCK__value__37.value, 1),
                                            _e28 = _PUCK__value__37$val[0];

                                        return _e28.type_;
                                      } else {
                                        var __PUCK__value__38 = __PUCK__value__16;
                                        if ($unwrapTraitObject(__PUCK__value__38).kind == "StringLiteral") {
                                          var _PUCK__value__38$val = _slicedToArray(__PUCK__value__38.value, 1),
                                              _e29 = _PUCK__value__38$val[0];

                                          return _e29.type_;
                                        } else {
                                          var __PUCK__value__39 = __PUCK__value__16;
                                          if ($unwrapTraitObject(__PUCK__value__39).kind == "TupleLiteral") {
                                            var _PUCK__value__39$val = _slicedToArray(__PUCK__value__39.value, 1),
                                                _e30 = _PUCK__value__39$val[0];

                                            return _e30.type_;
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
TypeBound.getType = function getType() {
  var self = this;
  var __PUCK__value__40 = self;
  var __PUCK__value__41 = __PUCK__value__40;
  if ($unwrapTraitObject(__PUCK__value__41).kind == "FunctionTypeBound") {
    var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 1),
        t = _PUCK__value__41$val[0];

    return t.type_;
  } else {
    var __PUCK__value__42 = __PUCK__value__40;
    if ($unwrapTraitObject(__PUCK__value__42).kind == "NamedTypeBound") {
      var _PUCK__value__42$val = _slicedToArray(__PUCK__value__42.value, 1),
          _t = _PUCK__value__42$val[0];

      return _t.type_;
    } else {
      var __PUCK__value__43 = __PUCK__value__40;
      if ($unwrapTraitObject(__PUCK__value__43).kind == "RecordTypeBound") {
        var _PUCK__value__43$val = _slicedToArray(__PUCK__value__43.value, 1),
            _t2 = _PUCK__value__43$val[0];

        return _t2.type_;
      } else {
        var __PUCK__value__44 = __PUCK__value__40;
        if ($unwrapTraitObject(__PUCK__value__44).kind == "TupleTypeBound") {
          var _PUCK__value__44$val = _slicedToArray(__PUCK__value__44.value, 1),
              _t3 = _PUCK__value__44$val[0];

          return _t3.type_;
        };
      };
    };
  };
};
TypeBound.getRecordTypeBound = function getRecordTypeBound() {
  var self = this;
  var __PUCK__value__45 = self;
  var __PUCK__value__46 = __PUCK__value__45;
  if ($unwrapTraitObject(__PUCK__value__46).kind == "RecordTypeBound") {
    var _PUCK__value__46$val = _slicedToArray(__PUCK__value__46.value, 1),
        record = _PUCK__value__46$val[0];

    return record;
  } else {
    var __PUCK__value__47 = __PUCK__value__45;
    if (true) {
      var __PUCK__value__48 = __PUCK__value__47;
      throw "TypeBound is not a RecordTypeBound";
    };
  };
};
TypeBound.getTupleTypeBound = function getTupleTypeBound() {
  var self = this;
  var __PUCK__value__49 = self;
  var __PUCK__value__50 = __PUCK__value__49;
  if ($unwrapTraitObject(__PUCK__value__50).kind == "TupleTypeBound") {
    var _PUCK__value__50$val = _slicedToArray(__PUCK__value__50.value, 1),
        tuple = _PUCK__value__50$val[0];

    return tuple;
  } else {
    var __PUCK__value__51 = __PUCK__value__49;
    if (true) {
      var __PUCK__value__52 = __PUCK__value__51;
      throw "TypeBound is not a TupleTypeBound";
    };
  };
};
