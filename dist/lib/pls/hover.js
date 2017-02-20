'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoverVisitor = exports.Hover = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var _ast = require('./../ast/ast');

var _span = require('./../ast/span');

var _entities = require('./../entities');

var _position_visitor = require('./position_visitor');

var visit = _interopRequireWildcard(_position_visitor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var Hover = exports.Hover = function Hover(object) {
  return object;
};
var HoverVisitor = exports.HoverVisitor = function HoverVisitor(object) {
  return object;
};
_position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"] = {
  position: function position() {
    var self = this;
    return self.value.position;
  },
  visitModule: _position_visitor.PositionVisitor.visitModule,
  visitTopLevelStatement: _position_visitor.PositionVisitor.visitTopLevelStatement,
  visitBlockLevelStatement: _position_visitor.PositionVisitor.visitBlockLevelStatement,
  visitExpression: _position_visitor.PositionVisitor.visitExpression,
  visitEnumDeclaration: _position_visitor.PositionVisitor.visitEnumDeclaration,
  visitEnumMember: _position_visitor.PositionVisitor.visitEnumMember,
  visitImplDeclaration: _position_visitor.PositionVisitor.visitImplDeclaration,
  visitImplShorthandDeclaration: _position_visitor.PositionVisitor.visitImplShorthandDeclaration,
  visitMethodDeclaration: _position_visitor.PositionVisitor.visitMethodDeclaration,
  visitTraitDeclaration: _position_visitor.PositionVisitor.visitTraitDeclaration,
  visitTypeDeclaration: _position_visitor.PositionVisitor.visitTypeDeclaration,
  visitExportDirective: _position_visitor.PositionVisitor.visitExportDirective,
  visitImportDirective: _position_visitor.PositionVisitor.visitImportDirective,
  visitObjectDestructure: _position_visitor.PositionVisitor.visitObjectDestructure,
  visitObjectDestructureMember: _position_visitor.PositionVisitor.visitObjectDestructureMember,
  visitBlock: _position_visitor.PositionVisitor.visitBlock,
  visitBreakStatement: _position_visitor.PositionVisitor.visitBreakStatement,
  visitReturnStatement: _position_visitor.PositionVisitor.visitReturnStatement,
  visitWhileLoop: _position_visitor.PositionVisitor.visitWhileLoop,
  visitIdentifier: function visitIdentifier(i) {
    var self = this;
    (0, _core.print)("onHover visitIdentifier");
    if (i.type_) {
      var type_ = i.type_;
      self.value.hover = (0, _core.Some)({
        contents: getTypeContents(type_),
        span: _span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: i, $isTraitObject: true })
      });
    };
  },
  visitFunctionDeclaration: function visitFunctionDeclaration(f) {
    var self = this;
    var __PUCK__value__1 = f.name;
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          name = _$unwrapTraitObject$v[0];

      if (_span.Span.cmp.call(name.span, _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self)) == _core.Ordering.Equal) {
        if (f.type_) {
          var type_ = f.type_;
          self.value.hover = (0, _core.Some)({
            contents: getTypeContents(type_),
            span: name.span
          });
          return [];
        };
      };
    };
    visit.walkFunctionDeclaration(self, f);
  },
  visitVariableDeclaration: function visitVariableDeclaration(d) {
    var self = this;
    var parent = self.value.patternType;
    var __PUCK__value__2 = void 0;
    if (d.type_) {
      __PUCK__value__2 = (0, _core.Some)(d.type_);
    } else {
      __PUCK__value__2 = _core.None;
    };
    self.value.patternType = __PUCK__value__2;
    visit.walkVariableDeclaration(self, d);
    self.value.patternType = parent;
  },
  visitAssignmentExpression: _position_visitor.PositionVisitor.visitAssignmentExpression,
  visitBinaryExpression: _position_visitor.PositionVisitor.visitBinaryExpression,
  visitCallExpression: _position_visitor.PositionVisitor.visitCallExpression,
  visitIfExpression: _position_visitor.PositionVisitor.visitIfExpression,
  visitIfLetExpression: function visitIfLetExpression(e) {
    var self = this;
    var parent = self.value.patternType;
    var expressionType = _ast.Expression.getType.call(e.expression);
    var __PUCK__value__3 = void 0;
    if (expressionType) {
      __PUCK__value__3 = (0, _core.Some)(expressionType);
    } else {
      __PUCK__value__3 = _core.None;
    };
    self.value.patternType = __PUCK__value__3;
    visit.walkIfLetExpression(self, e);
    self.value.patternType = parent;
  },
  visitMatchExpression: function visitMatchExpression(e) {
    var self = this;
    var parent = self.value.patternType;
    var expressionType = _ast.Expression.getType.call(e.expression);
    var __PUCK__value__4 = void 0;
    if (expressionType) {
      __PUCK__value__4 = (0, _core.Some)(expressionType);
    } else {
      __PUCK__value__4 = _core.None;
    };
    self.value.patternType = __PUCK__value__4;
    visit.walkMatchExpression(self, e);
    self.value.patternType = parent;
  },
  visitMatchArm: _position_visitor.PositionVisitor.visitMatchArm,
  visitTypePath: _position_visitor.PositionVisitor.visitTypePath,
  visitTypePathExpression: _position_visitor.PositionVisitor.visitTypePathExpression,
  visitUnaryExpression: _position_visitor.PositionVisitor.visitUnaryExpression,
  visitIndexAccess: _position_visitor.PositionVisitor.visitIndexAccess,
  visitMemberAccess: function visitMemberAccess(a) {
    var self = this;
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true }), _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self)) == _core.Ordering.Equal) {
      (0, _core.print)("onHover visitMemberAccess");
      if (a.type_) {
        var type_ = a.type_;
        self.value.hover = (0, _core.Some)({
          contents: getTypeContents(type_),
          span: _span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true })
        });
      };
    } else {
      visit.walkMemberAccess(self, a);
    };
  },
  visitListLiteral: _position_visitor.PositionVisitor.visitListLiteral,
  visitBooleanLiteral: _position_visitor.PositionVisitor.visitBooleanLiteral,
  visitNumberLiteral: _position_visitor.PositionVisitor.visitNumberLiteral,
  visitRecordLiteral: function visitRecordLiteral(l) {
    var self = this;
    var parent = self.value.literalType;
    var __PUCK__value__5 = void 0;
    if (l.type_) {
      __PUCK__value__5 = (0, _core.Some)(l.type_);
    } else {
      __PUCK__value__5 = _core.None;
    };
    self.value.literalType = __PUCK__value__5;
    visit.walkRecordLiteral(self, l);
    self.value.literalType = parent;
  },
  visitRecordLiteralMember: function visitRecordLiteralMember(l) {
    var self = this;
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: l.name, $isTraitObject: true }), _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self)) == _core.Ordering.Equal) {
      (0, _core.print)("onHover visitRecordLiteralMember");
      self.value.hover = _core.Option.map.call(_core.Option.andThen.call(self.value.literalType, function (t) {
        return getPropertyType(t, l.name.name);
      }), function (type_) {
        return {
          contents: getTypeContents(type_),
          span: _span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: l.name, $isTraitObject: true })
        };
      });
    } else {
      visit.walkRecordLiteralMember(self, l);
    };
  },
  visitStringLiteral: _position_visitor.PositionVisitor.visitStringLiteral,
  visitStringLiteralPart: _position_visitor.PositionVisitor.visitStringLiteralPart,
  visitTupleLiteral: _position_visitor.PositionVisitor.visitTupleLiteral,
  visitPattern: _position_visitor.PositionVisitor.visitPattern,
  visitIdentifierPattern: function visitIdentifierPattern(p) {
    var self = this;
    (0, _core.print)("onHover visitIdentifierPattern?");
    var __PUCK__value__6 = self.value.patternType;
    if ($unwrapTraitObject(__PUCK__value__6).kind == "Some") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__6),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          type_ = _$unwrapTraitObject2$[0];

      (0, _core.print)("onHover visitIdentifierPattern");
      self.value.hover = (0, _core.Some)({
        contents: getTypeContents(type_),
        span: _span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: p, $isTraitObject: true })
      });
    };
  },
  visitRecordPattern: function visitRecordPattern(p) {
    var self = this;
    var __PUCK__value__7 = _core.List.binarySearchBy.call(p.properties, function (prop) {
      return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPatternMember"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPatternMember', value: prop, $isTraitObject: true }), _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self));
    });
    if ($unwrapTraitObject(__PUCK__value__7).kind == "Ok") {
      (function () {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__7),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            index = _$unwrapTraitObject3$[0];

        self.value.patternType = _core.Option.andThen.call(self.value.patternType, function (t) {
          return getPropertyType(t, $unwrapTraitObject($unwrapTraitObject(p.properties[index]).property).name);
        });
        _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitPattern.call(self, $unwrapTraitObject(p.properties[index]).pattern);
      })();
    };
  },
  visitRecordTypePattern: function visitRecordTypePattern(t, p) {
    var self = this;
    var type_ = t.type_;
    var __PUCK__value__8 = void 0;
    if (type_) {
      __PUCK__value__8 = _core.Option.orValue.call(_core.Option.orValue.call(_core.Option.andThen.call(type_.enumMember, function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            member = _ref2[0],
            __PUCK__value__9 = _ref2[1];

        return _core.Option.andThen.call(self.value.patternType, function (t) {
          return getEnumMember(t, member);
        });
      }), type_.providesType), (0, _core.Some)(type_));
    } else {
      __PUCK__value__8 = _core.None;
    };
    self.value.patternType = __PUCK__value__8;
    visit.walkTypePath(self, t);
    _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitRecordPattern.call(self, p);
  },
  visitTuplePattern: function visitTuplePattern(p) {
    var self = this;
    var __PUCK__value__10 = _core.List.binarySearchBy.call(p.properties, function (prop) {
      return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: prop, $isTraitObject: true }), _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self));
    });
    if ($unwrapTraitObject(__PUCK__value__10).kind == "Ok") {
      (function () {
        var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__10),
            _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
            index = _$unwrapTraitObject4$[0];

        self.value.patternType = _core.Option.andThen.call(self.value.patternType, function (t) {
          return getTupleType(t, index);
        });
        _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitPattern.call(self, p.properties[index]);
      })();
    };
  },
  visitTupleTypePattern: function visitTupleTypePattern(t, p) {
    var self = this;
    var type_ = t.type_;
    var __PUCK__value__11 = void 0;
    if (type_) {
      __PUCK__value__11 = _core.Option.orValue.call(_core.Option.orValue.call(_core.Option.andThen.call(type_.enumMember, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            member = _ref4[0],
            __PUCK__value__12 = _ref4[1];

        return _core.Option.andThen.call(self.value.patternType, function (t) {
          return getEnumMember(t, member);
        });
      }), type_.providesType), (0, _core.Some)(type_));
    } else {
      __PUCK__value__11 = _core.None;
    };
    self.value.patternType = __PUCK__value__11;
    visit.walkTypePath(self, t);
    _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitTuplePattern.call(self, p);
  },
  visitTypeBound: _position_visitor.PositionVisitor.visitTypeBound,
  visitFunctionTypeBound: _position_visitor.PositionVisitor.visitFunctionTypeBound,
  visitNamedTypeBound: _position_visitor.PositionVisitor.visitNamedTypeBound,
  visitRecordTypeBound: _position_visitor.PositionVisitor.visitRecordTypeBound,
  visitRecordTypeBoundMember: _position_visitor.PositionVisitor.visitRecordTypeBoundMember,
  visitTupleTypeBound: _position_visitor.PositionVisitor.visitTupleTypeBound,
  visitTypeParameter: _position_visitor.PositionVisitor.visitTypeParameter
};
Hover.empty = function empty() {
  return {
    contents: [],
    span: _span.Span.empty()
  };
};
HoverVisitor._new = function _new(position) {
  return {
    position: position,
    hover: _core.None,
    patternType: _core.None,
    literalType: _core.None
  };
};
function getTypeContents(type_) {
  var detailsl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var __PUCK__value__13 = type_.kind;
  var __PUCK__value__14 = __PUCK__value__13;
  var __PUCK__value__15 = void 0;
  if ($unwrapTraitObject(__PUCK__value__14).kind == "Function") {
    var _undefined = $unwrapTraitObject(__PUCK__value__14);
    __PUCK__value__15 = _entities.Type.verboseName.call(type_);
  } else {
    var __PUCK__value__16 = __PUCK__value__13;
    var __PUCK__value__17 = void 0;
    if (true) {
      var __PUCK__value__18 = __PUCK__value__16;
      __PUCK__value__17 = _entities.Type.displayName.call(type_);
    };
    __PUCK__value__15 = __PUCK__value__17;
  };
  var name = __PUCK__value__15;
  return [{
    language: "puck",
    value: name
  }];
};
function getEnumMember(type_, member) {
  var __PUCK__value__19 = type_.kind;
  var __PUCK__value__20 = __PUCK__value__19;
  if ($unwrapTraitObject(__PUCK__value__20).kind == "Enum") {
    var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__20),
        _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
        enum_ = _$unwrapTraitObject5$[0];

    return _core.ObjectMap.get.call(enum_.members, member);
  } else {
    var __PUCK__value__21 = __PUCK__value__19;
    if (true) {
      var __PUCK__value__22 = __PUCK__value__21;
      return _core.None;
    };
  };
};
function getPropertyType(type_, property) {
  var __PUCK__value__23 = type_.kind;
  var __PUCK__value__24 = __PUCK__value__23;
  if ($unwrapTraitObject(__PUCK__value__24).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__24).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
    var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__24),
        _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
        _$unwrapTraitObject6$2 = _slicedToArray(_$unwrapTraitObject6$[0].kind.value, 1),
        record = _$unwrapTraitObject6$2[0];

    return _core.ObjectMap.get.call(record.properties, property);
  } else {
    var __PUCK__value__25 = __PUCK__value__23;
    if (true) {
      var __PUCK__value__26 = __PUCK__value__25;
      return _core.None;
    };
  };
};
function getTupleType(type_, index) {
  var __PUCK__value__27 = type_.kind;
  var __PUCK__value__28 = __PUCK__value__27;
  if ($unwrapTraitObject(__PUCK__value__28).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__28).value)[$unwrapTraitObject(0)]).kind).kind == "Tuple") {
    var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__28),
        _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
        _$unwrapTraitObject7$2 = _slicedToArray(_$unwrapTraitObject7$[0].kind.value, 1),
        tuple = _$unwrapTraitObject7$2[0];

    return _core.List.get.call(tuple.properties, index);
  } else {
    var __PUCK__value__29 = __PUCK__value__27;
    if (true) {
      var __PUCK__value__30 = __PUCK__value__29;
      return _core.None;
    };
  };
}
