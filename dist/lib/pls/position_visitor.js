'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PositionVisitor = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.walkModule = walkModule;
exports.walkTopLevelStatement = walkTopLevelStatement;
exports.walkBlockLevelStatement = walkBlockLevelStatement;
exports.walkExpression = walkExpression;
exports.walkEnumDeclaration = walkEnumDeclaration;
exports.walkEnumMember = walkEnumMember;
exports.walkImplDeclaration = walkImplDeclaration;
exports.walkImplShorthandDeclaration = walkImplShorthandDeclaration;
exports.walkMethodDeclaration = walkMethodDeclaration;
exports.walkTraitDeclaration = walkTraitDeclaration;
exports.walkTypeDeclaration = walkTypeDeclaration;
exports.walkExportDirective = walkExportDirective;
exports.walkImportDirective = walkImportDirective;
exports.walkObjectDestructure = walkObjectDestructure;
exports.walkObjectDestructureMember = walkObjectDestructureMember;
exports.walkBlock = walkBlock;
exports.walkReturnStatement = walkReturnStatement;
exports.walkWhileLoop = walkWhileLoop;
exports.walkFunctionDeclaration = walkFunctionDeclaration;
exports.walkVariableDeclaration = walkVariableDeclaration;
exports.walkAssignmentExpression = walkAssignmentExpression;
exports.walkBinaryExpression = walkBinaryExpression;
exports.walkCallExpression = walkCallExpression;
exports.walkIfExpression = walkIfExpression;
exports.walkIfLetExpression = walkIfLetExpression;
exports.walkMatchExpression = walkMatchExpression;
exports.walkMatchArm = walkMatchArm;
exports.walkTypePath = walkTypePath;
exports.walkTypePathExpression = walkTypePathExpression;
exports.walkUnaryExpression = walkUnaryExpression;
exports.walkIndexAccess = walkIndexAccess;
exports.walkMemberAccess = walkMemberAccess;
exports.walkUnknownAccess = walkUnknownAccess;
exports.walkUnknownIndexAccess = walkUnknownIndexAccess;
exports.walkListLiteral = walkListLiteral;
exports.walkBooleanLiteral = walkBooleanLiteral;
exports.walkNumberLiteral = walkNumberLiteral;
exports.walkRecordLiteral = walkRecordLiteral;
exports.walkRecordLiteralMember = walkRecordLiteralMember;
exports.walkStringLiteral = walkStringLiteral;
exports.walkStringLiteralPart = walkStringLiteralPart;
exports.walkTupleLiteral = walkTupleLiteral;
exports.walkPattern = walkPattern;
exports.walkIdentifierPattern = walkIdentifierPattern;
exports.walkRecordPattern = walkRecordPattern;
exports.walkTuplePattern = walkTuplePattern;
exports.walkTypeBound = walkTypeBound;
exports.walkFunctionTypeBound = walkFunctionTypeBound;
exports.walkNamedTypeBound = walkNamedTypeBound;
exports.walkRecordTypeBound = walkRecordTypeBound;
exports.walkRecordTypeBoundMember = walkRecordTypeBoundMember;
exports.walkTupleTypeBound = walkTupleTypeBound;
exports.walkTypeParameter = walkTypeParameter;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _ast = require('./../ast/ast');

var _span = require('./../ast/span');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var PositionVisitor = exports.PositionVisitor = {
  visitModule: function visitModule(m) {
    var self = this;
    walkModule(self, m);
  },
  visitTopLevelStatement: function visitTopLevelStatement(e) {
    var self = this;
    walkTopLevelStatement(self, e);
  },
  visitBlockLevelStatement: function visitBlockLevelStatement(e) {
    var self = this;
    walkBlockLevelStatement(self, e);
  },
  visitExpression: function visitExpression(e) {
    var self = this;
    walkExpression(self, e);
  },
  visitEnumDeclaration: function visitEnumDeclaration(e) {
    var self = this;
    walkEnumDeclaration(self, e);
  },
  visitEnumMember: function visitEnumMember(e) {
    var self = this;
    walkEnumMember(self, e);
  },
  visitImplDeclaration: function visitImplDeclaration(i) {
    var self = this;
    walkImplDeclaration(self, i);
  },
  visitImplShorthandDeclaration: function visitImplShorthandDeclaration(i) {
    var self = this;
    walkImplShorthandDeclaration(self, i);
  },
  visitMethodDeclaration: function visitMethodDeclaration(f) {
    var self = this;
    walkFunctionDeclaration(self, f);
  },
  visitTraitDeclaration: function visitTraitDeclaration(t) {
    var self = this;
    walkTraitDeclaration(self, t);
  },
  visitTypeDeclaration: function visitTypeDeclaration(t) {
    var self = this;
    walkTypeDeclaration(self, t);
  },
  visitExportDirective: function visitExportDirective(e) {
    var self = this;
    walkExportDirective(self, e);
  },
  visitImportDirective: function visitImportDirective(i) {
    var self = this;
    walkImportDirective(self, i);
  },
  visitObjectDestructure: function visitObjectDestructure(o) {
    var self = this;
    walkObjectDestructure(self, o);
  },
  visitObjectDestructureMember: function visitObjectDestructureMember(m) {
    var self = this;
    walkObjectDestructureMember(self, m);
  },
  visitBlock: function visitBlock(b) {
    var self = this;
    walkBlock(self, b);
  },
  visitBreakStatement: function visitBreakStatement(b) {},
  visitReturnStatement: function visitReturnStatement(r) {
    var self = this;
    walkReturnStatement(self, r);
  },
  visitWhileLoop: function visitWhileLoop(e) {
    var self = this;
    walkWhileLoop(self, e);
  },
  visitIdentifier: function visitIdentifier(i) {},
  visitFunctionDeclaration: function visitFunctionDeclaration(f) {
    var self = this;
    walkFunctionDeclaration(self, f);
  },
  visitVariableDeclaration: function visitVariableDeclaration(d) {
    var self = this;
    walkVariableDeclaration(self, d);
  },
  visitAssignmentExpression: function visitAssignmentExpression(e) {
    var self = this;
    walkAssignmentExpression(self, e);
  },
  visitBinaryExpression: function visitBinaryExpression(e) {
    var self = this;
    walkBinaryExpression(self, e);
  },
  visitCallExpression: function visitCallExpression(e) {
    var self = this;
    walkCallExpression(self, e);
  },
  visitIfExpression: function visitIfExpression(e) {
    var self = this;
    walkIfExpression(self, e);
  },
  visitIfLetExpression: function visitIfLetExpression(e) {
    var self = this;
    walkIfLetExpression(self, e);
  },
  visitMatchExpression: function visitMatchExpression(e) {
    var self = this;
    walkMatchExpression(self, e);
  },
  visitMatchArm: function visitMatchArm(e) {
    var self = this;
    walkMatchArm(self, e);
  },
  visitTypePath: function visitTypePath(e) {
    var self = this;
    walkTypePath(self, e);
  },
  visitTypePathExpression: function visitTypePathExpression(e) {
    var self = this;
    walkTypePathExpression(self, e);
  },
  visitUnaryExpression: function visitUnaryExpression(e) {
    var self = this;
    walkUnaryExpression(self, e);
  },
  visitIndexAccess: function visitIndexAccess(a) {
    var self = this;
    walkIndexAccess(self, a);
  },
  visitMemberAccess: function visitMemberAccess(a) {
    var self = this;
    walkMemberAccess(self, a);
  },
  visitUnknownAccess: function visitUnknownAccess(a) {
    var self = this;
    walkUnknownAccess(self, a);
  },
  visitUnknownIndexAccess: function visitUnknownIndexAccess(a) {
    var self = this;
    walkUnknownIndexAccess(self, a);
  },
  visitListLiteral: function visitListLiteral(l) {
    var self = this;
    walkListLiteral(self, l);
  },
  visitBooleanLiteral: function visitBooleanLiteral(l) {
    var self = this;
    walkBooleanLiteral(self, l);
  },
  visitNumberLiteral: function visitNumberLiteral(l) {
    var self = this;
    walkNumberLiteral(self, l);
  },
  visitRecordLiteral: function visitRecordLiteral(l) {
    var self = this;
    walkRecordLiteral(self, l);
  },
  visitRecordLiteralMember: function visitRecordLiteralMember(l) {
    var self = this;
    walkRecordLiteralMember(self, l);
  },
  visitStringLiteral: function visitStringLiteral(l) {
    var self = this;
    walkStringLiteral(self, l);
  },
  visitStringLiteralPart: function visitStringLiteralPart(l) {
    var self = this;
    walkStringLiteralPart(self, l);
  },
  visitTupleLiteral: function visitTupleLiteral(l) {
    var self = this;
    walkTupleLiteral(self, l);
  },
  visitPattern: function visitPattern(p) {
    var self = this;
    walkPattern(self, p);
  },
  visitIdentifierPattern: function visitIdentifierPattern(p) {
    var self = this;
    walkIdentifierPattern(self, p);
  },
  visitRecordPattern: function visitRecordPattern(p) {
    var self = this;
    walkRecordPattern(self, p);
  },
  visitRecordTypePattern: function visitRecordTypePattern(t, p) {
    var self = this;
    walkTypePath(self, t);
    walkRecordPattern(self, p);
  },
  visitTuplePattern: function visitTuplePattern(p) {
    var self = this;
    walkTuplePattern(self, p);
  },
  visitTupleTypePattern: function visitTupleTypePattern(t, p) {
    var self = this;
    walkTypePath(self, t);
    walkTuplePattern(self, p);
  },
  visitTypeBound: function visitTypeBound(t) {
    var self = this;
    walkTypeBound(self, t);
  },
  visitFunctionTypeBound: function visitFunctionTypeBound(t) {
    var self = this;
    walkFunctionTypeBound(self, t);
  },
  visitNamedTypeBound: function visitNamedTypeBound(t) {
    var self = this;
    walkNamedTypeBound(self, t);
  },
  visitRecordTypeBound: function visitRecordTypeBound(t) {
    var self = this;
    walkRecordTypeBound(self, t);
  },
  visitRecordTypeBoundMember: function visitRecordTypeBoundMember(t) {
    var self = this;
    walkRecordTypeBoundMember(self, t);
  },
  visitTupleTypeBound: function visitTupleTypeBound(t) {
    var self = this;
    walkTupleTypeBound(self, t);
  },
  visitTypeParameter: function visitTypeParameter(t) {
    var self = this;
    walkTypeParameter(self, t);
  }
};
function walkModule(visitor, m) {
  var __PUCK__value__1 = _core.List.binarySearchBy.call(m.statements, function (statement) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TopLevelStatement"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TopLevelStatement', value: statement, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__1).kind == "Ok") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        index = _$unwrapTraitObject$v[0];

    PositionVisitor[visitor.type].visitTopLevelStatement.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: m.statements, $isTraitObject: true }, index));
    return true;
  } else {
    return false;
  };
};
function walkTopLevelStatement(visitor, e) {
  var __PUCK__value__2 = e;
  var __PUCK__value__3 = __PUCK__value__2;
  if ($unwrapTraitObject(__PUCK__value__3).kind == "EnumDeclaration") {
    var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
        _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
        s = _$unwrapTraitObject2$[0];

    PositionVisitor[visitor.type].visitEnumDeclaration.call(visitor, s);
  } else {
    var __PUCK__value__4 = __PUCK__value__2;
    if ($unwrapTraitObject(__PUCK__value__4).kind == "ExportDirective") {
      var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__4),
          _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
          _s = _$unwrapTraitObject3$[0];

      PositionVisitor[visitor.type].visitExportDirective.call(visitor, _s);
    } else {
      var __PUCK__value__5 = __PUCK__value__2;
      if ($unwrapTraitObject(__PUCK__value__5).kind == "ImportDirective") {
        var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__5),
            _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
            _s2 = _$unwrapTraitObject4$[0];

        PositionVisitor[visitor.type].visitImportDirective.call(visitor, _s2);
      } else {
        var __PUCK__value__6 = __PUCK__value__2;
        if ($unwrapTraitObject(__PUCK__value__6).kind == "ImplDeclaration") {
          var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__6),
              _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
              _s3 = _$unwrapTraitObject5$[0];

          PositionVisitor[visitor.type].visitImplDeclaration.call(visitor, _s3);
        } else {
          var __PUCK__value__7 = __PUCK__value__2;
          if ($unwrapTraitObject(__PUCK__value__7).kind == "ImplShorthandDeclaration") {
            var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__7),
                _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                _s4 = _$unwrapTraitObject6$[0];

            PositionVisitor[visitor.type].visitImplShorthandDeclaration.call(visitor, _s4);
          } else {
            var __PUCK__value__8 = __PUCK__value__2;
            if ($unwrapTraitObject(__PUCK__value__8).kind == "TraitDeclaration") {
              var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__8),
                  _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                  _s5 = _$unwrapTraitObject7$[0];

              PositionVisitor[visitor.type].visitTraitDeclaration.call(visitor, _s5);
            } else {
              var __PUCK__value__9 = __PUCK__value__2;
              if ($unwrapTraitObject(__PUCK__value__9).kind == "TypeDeclaration") {
                var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__9),
                    _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
                    _s6 = _$unwrapTraitObject8$[0];

                PositionVisitor[visitor.type].visitTypeDeclaration.call(visitor, _s6);
              } else {
                var __PUCK__value__10 = __PUCK__value__2;
                if ($unwrapTraitObject(__PUCK__value__10).kind == "BlockLevelStatement") {
                  var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__10),
                      _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                      _s7 = _$unwrapTraitObject9$[0];

                  PositionVisitor[visitor.type].visitBlockLevelStatement.call(visitor, _s7);
                };
              };
            };
          };
        };
      };
    };
  };
};
function walkBlockLevelStatement(visitor, e) {
  var __PUCK__value__11 = e;
  var __PUCK__value__12 = __PUCK__value__11;
  if ($unwrapTraitObject(__PUCK__value__12).kind == "Block") {
    var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__12),
        _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
        _e = _$unwrapTraitObject11[0];

    PositionVisitor[visitor.type].visitBlock.call(visitor, _e);
  } else {
    var __PUCK__value__13 = __PUCK__value__11;
    if ($unwrapTraitObject(__PUCK__value__13).kind == "BreakStatement") {
      var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__13),
          _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
          _e2 = _$unwrapTraitObject13[0];

      PositionVisitor[visitor.type].visitBreakStatement.call(visitor, _e2);
    } else {
      var __PUCK__value__14 = __PUCK__value__11;
      if ($unwrapTraitObject(__PUCK__value__14).kind == "ReturnStatement") {
        var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__14),
            _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
            _e3 = _$unwrapTraitObject15[0];

        PositionVisitor[visitor.type].visitReturnStatement.call(visitor, _e3);
      } else {
        var __PUCK__value__15 = __PUCK__value__11;
        if ($unwrapTraitObject(__PUCK__value__15).kind == "WhileLoop") {
          var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__15),
              _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
              _e4 = _$unwrapTraitObject17[0];

          PositionVisitor[visitor.type].visitWhileLoop.call(visitor, _e4);
        } else {
          var __PUCK__value__16 = __PUCK__value__11;
          if ($unwrapTraitObject(__PUCK__value__16).kind == "Expression") {
            var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__16),
                _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
                _e5 = _$unwrapTraitObject19[0];

            walkExpression(visitor, _e5);
          };
        };
      };
    };
  };
};
function walkExpression(visitor, e) {
  var __PUCK__value__17 = e;
  var __PUCK__value__18 = __PUCK__value__17;
  if ($unwrapTraitObject(__PUCK__value__18).kind == "ThrowStatement") {
    var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__18),
        _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
        _e6 = _$unwrapTraitObject21[0];

    PositionVisitor[visitor.type].visitExpression.call(visitor, _e6.expression);
  } else {
    var __PUCK__value__19 = __PUCK__value__17;
    if ($unwrapTraitObject(__PUCK__value__19).kind == "Comment") {
      var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__19),
          _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
          __PUCK__value__20 = _$unwrapTraitObject23[0];
    } else {
      var __PUCK__value__21 = __PUCK__value__17;
      if ($unwrapTraitObject(__PUCK__value__21).kind == "Identifier") {
        var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__21),
            _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
            _e7 = _$unwrapTraitObject25[0];

        PositionVisitor[visitor.type].visitIdentifier.call(visitor, _e7);
      } else {
        var __PUCK__value__22 = __PUCK__value__17;
        if ($unwrapTraitObject(__PUCK__value__22).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__22),
              _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
              _e8 = _$unwrapTraitObject27[0];

          PositionVisitor[visitor.type].visitFunctionDeclaration.call(visitor, _e8);
        } else {
          var __PUCK__value__23 = __PUCK__value__17;
          if ($unwrapTraitObject(__PUCK__value__23).kind == "VariableDeclaration") {
            var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__23),
                _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
                _e9 = _$unwrapTraitObject29[0];

            PositionVisitor[visitor.type].visitVariableDeclaration.call(visitor, _e9);
          } else {
            var __PUCK__value__24 = __PUCK__value__17;
            if ($unwrapTraitObject(__PUCK__value__24).kind == "AssignmentExpression") {
              var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__24),
                  _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
                  _e10 = _$unwrapTraitObject31[0];

              PositionVisitor[visitor.type].visitAssignmentExpression.call(visitor, _e10);
            } else {
              var __PUCK__value__25 = __PUCK__value__17;
              if ($unwrapTraitObject(__PUCK__value__25).kind == "BinaryExpression") {
                var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__25),
                    _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
                    _e11 = _$unwrapTraitObject33[0];

                PositionVisitor[visitor.type].visitBinaryExpression.call(visitor, _e11);
              } else {
                var __PUCK__value__26 = __PUCK__value__17;
                if ($unwrapTraitObject(__PUCK__value__26).kind == "CallExpression") {
                  var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__26),
                      _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
                      _e12 = _$unwrapTraitObject35[0];

                  PositionVisitor[visitor.type].visitCallExpression.call(visitor, _e12);
                } else {
                  var __PUCK__value__27 = __PUCK__value__17;
                  if ($unwrapTraitObject(__PUCK__value__27).kind == "IfExpression") {
                    var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__27),
                        _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
                        _e13 = _$unwrapTraitObject37[0];

                    PositionVisitor[visitor.type].visitIfExpression.call(visitor, _e13);
                  } else {
                    var __PUCK__value__28 = __PUCK__value__17;
                    if ($unwrapTraitObject(__PUCK__value__28).kind == "IfLetExpression") {
                      var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__28),
                          _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
                          _e14 = _$unwrapTraitObject39[0];

                      PositionVisitor[visitor.type].visitIfLetExpression.call(visitor, _e14);
                    } else {
                      var __PUCK__value__29 = __PUCK__value__17;
                      if ($unwrapTraitObject(__PUCK__value__29).kind == "MatchExpression") {
                        var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__29),
                            _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
                            _e15 = _$unwrapTraitObject41[0];

                        PositionVisitor[visitor.type].visitMatchExpression.call(visitor, _e15);
                      } else {
                        var __PUCK__value__30 = __PUCK__value__17;
                        if ($unwrapTraitObject(__PUCK__value__30).kind == "TypePathExpression") {
                          var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__30),
                              _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                              _e16 = _$unwrapTraitObject43[0];

                          PositionVisitor[visitor.type].visitTypePathExpression.call(visitor, _e16);
                        } else {
                          var __PUCK__value__31 = __PUCK__value__17;
                          if ($unwrapTraitObject(__PUCK__value__31).kind == "UnaryExpression") {
                            var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__31),
                                _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
                                _e17 = _$unwrapTraitObject45[0];

                            PositionVisitor[visitor.type].visitUnaryExpression.call(visitor, _e17);
                          } else {
                            var __PUCK__value__32 = __PUCK__value__17;
                            if ($unwrapTraitObject(__PUCK__value__32).kind == "IndexAccess") {
                              var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__32),
                                  _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
                                  _e18 = _$unwrapTraitObject47[0];

                              PositionVisitor[visitor.type].visitIndexAccess.call(visitor, _e18);
                            } else {
                              var __PUCK__value__33 = __PUCK__value__17;
                              if ($unwrapTraitObject(__PUCK__value__33).kind == "MemberAccess") {
                                var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__33),
                                    _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 1),
                                    _e19 = _$unwrapTraitObject49[0];

                                PositionVisitor[visitor.type].visitMemberAccess.call(visitor, _e19);
                              } else {
                                var __PUCK__value__34 = __PUCK__value__17;
                                if ($unwrapTraitObject(__PUCK__value__34).kind == "UnknownAccess") {
                                  var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__34),
                                      _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 1),
                                      _e20 = _$unwrapTraitObject51[0];

                                  PositionVisitor[visitor.type].visitUnknownAccess.call(visitor, _e20);
                                } else {
                                  var __PUCK__value__35 = __PUCK__value__17;
                                  if ($unwrapTraitObject(__PUCK__value__35).kind == "UnknownIndexAccess") {
                                    var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__35),
                                        _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52.value, 1),
                                        _e21 = _$unwrapTraitObject53[0];

                                    PositionVisitor[visitor.type].visitUnknownIndexAccess.call(visitor, _e21);
                                  } else {
                                    var __PUCK__value__36 = __PUCK__value__17;
                                    if ($unwrapTraitObject(__PUCK__value__36).kind == "BooleanLiteral") {
                                      var _$unwrapTraitObject54 = $unwrapTraitObject(__PUCK__value__36),
                                          _$unwrapTraitObject55 = _slicedToArray(_$unwrapTraitObject54.value, 1),
                                          _e22 = _$unwrapTraitObject55[0];

                                      PositionVisitor[visitor.type].visitBooleanLiteral.call(visitor, _e22);
                                    } else {
                                      var __PUCK__value__37 = __PUCK__value__17;
                                      if ($unwrapTraitObject(__PUCK__value__37).kind == "ListLiteral") {
                                        var _$unwrapTraitObject56 = $unwrapTraitObject(__PUCK__value__37),
                                            _$unwrapTraitObject57 = _slicedToArray(_$unwrapTraitObject56.value, 1),
                                            _e23 = _$unwrapTraitObject57[0];

                                        PositionVisitor[visitor.type].visitListLiteral.call(visitor, _e23);
                                      } else {
                                        var __PUCK__value__38 = __PUCK__value__17;
                                        if ($unwrapTraitObject(__PUCK__value__38).kind == "NumberLiteral") {
                                          var _$unwrapTraitObject58 = $unwrapTraitObject(__PUCK__value__38),
                                              _$unwrapTraitObject59 = _slicedToArray(_$unwrapTraitObject58.value, 1),
                                              _e24 = _$unwrapTraitObject59[0];

                                          PositionVisitor[visitor.type].visitNumberLiteral.call(visitor, _e24);
                                        } else {
                                          var __PUCK__value__39 = __PUCK__value__17;
                                          if ($unwrapTraitObject(__PUCK__value__39).kind == "RecordLiteral") {
                                            var _$unwrapTraitObject60 = $unwrapTraitObject(__PUCK__value__39),
                                                _$unwrapTraitObject61 = _slicedToArray(_$unwrapTraitObject60.value, 1),
                                                _e25 = _$unwrapTraitObject61[0];

                                            PositionVisitor[visitor.type].visitRecordLiteral.call(visitor, _e25);
                                          } else {
                                            var __PUCK__value__40 = __PUCK__value__17;
                                            if ($unwrapTraitObject(__PUCK__value__40).kind == "StringLiteral") {
                                              var _$unwrapTraitObject62 = $unwrapTraitObject(__PUCK__value__40),
                                                  _$unwrapTraitObject63 = _slicedToArray(_$unwrapTraitObject62.value, 1),
                                                  _e26 = _$unwrapTraitObject63[0];

                                              PositionVisitor[visitor.type].visitStringLiteral.call(visitor, _e26);
                                            } else {
                                              var __PUCK__value__41 = __PUCK__value__17;
                                              if ($unwrapTraitObject(__PUCK__value__41).kind == "TupleLiteral") {
                                                var _$unwrapTraitObject64 = $unwrapTraitObject(__PUCK__value__41),
                                                    _$unwrapTraitObject65 = _slicedToArray(_$unwrapTraitObject64.value, 1),
                                                    _e27 = _$unwrapTraitObject65[0];

                                                PositionVisitor[visitor.type].visitTupleLiteral.call(visitor, _e27);
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
function walkEnumDeclaration(visitor, e) {
  return false;
};
function walkEnumMember(visitor, e) {};
function walkImplDeclaration(visitor, i) {
  var __PUCK__value__42 = _core.List.binarySearchBy.call(i.members, function (member) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__42).kind == "Ok") {
    var _$unwrapTraitObject66 = $unwrapTraitObject(__PUCK__value__42),
        _$unwrapTraitObject67 = _slicedToArray(_$unwrapTraitObject66.value, 1),
        index = _$unwrapTraitObject67[0];

    PositionVisitor[visitor.type].visitMethodDeclaration.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: i.members, $isTraitObject: true }, index));
    return true;
  } else {
    return false;
  };
};
function walkImplShorthandDeclaration(visitor, i) {
  var __PUCK__value__43 = _core.List.binarySearchBy.call(i.members, function (member) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__43).kind == "Ok") {
    var _$unwrapTraitObject68 = $unwrapTraitObject(__PUCK__value__43),
        _$unwrapTraitObject69 = _slicedToArray(_$unwrapTraitObject68.value, 1),
        index = _$unwrapTraitObject69[0];

    PositionVisitor[visitor.type].visitMethodDeclaration.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: i.members, $isTraitObject: true }, index));
    return true;
  } else {
    return false;
  };
};
function walkMethodDeclaration(visitor, f) {
  PositionVisitor[visitor.type].visitFunctionDeclaration.call(visitor, f);
};
function walkTraitDeclaration(visitor, t) {
  var __PUCK__value__44 = _core.List.binarySearchBy.call(t.members, function (member) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__44).kind == "Ok") {
    var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__44),
        _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70.value, 1),
        index = _$unwrapTraitObject71[0];

    PositionVisitor[visitor.type].visitMethodDeclaration.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: t.members, $isTraitObject: true }, index));
    return true;
  } else {
    return false;
  };
};
function walkTypeDeclaration(visitor, t) {};
function walkExportDirective(visitor, e) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportedStatement"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportedStatement', value: e.statement, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    var __PUCK__value__45 = e.statement;
    var __PUCK__value__46 = __PUCK__value__45;
    if ($unwrapTraitObject(__PUCK__value__46).kind == "EnumDeclaration") {
      var _$unwrapTraitObject72 = $unwrapTraitObject(__PUCK__value__46),
          _$unwrapTraitObject73 = _slicedToArray(_$unwrapTraitObject72.value, 1),
          d = _$unwrapTraitObject73[0];

      PositionVisitor[visitor.type].visitEnumDeclaration.call(visitor, d);
    } else {
      var __PUCK__value__47 = __PUCK__value__45;
      if ($unwrapTraitObject(__PUCK__value__47).kind == "TraitDeclaration") {
        var _$unwrapTraitObject74 = $unwrapTraitObject(__PUCK__value__47),
            _$unwrapTraitObject75 = _slicedToArray(_$unwrapTraitObject74.value, 1),
            _d = _$unwrapTraitObject75[0];

        PositionVisitor[visitor.type].visitTraitDeclaration.call(visitor, _d);
      } else {
        var __PUCK__value__48 = __PUCK__value__45;
        if ($unwrapTraitObject(__PUCK__value__48).kind == "TypeDeclaration") {
          var _$unwrapTraitObject76 = $unwrapTraitObject(__PUCK__value__48),
              _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76.value, 1),
              _d2 = _$unwrapTraitObject77[0];

          PositionVisitor[visitor.type].visitTypeDeclaration.call(visitor, _d2);
        } else {
          var __PUCK__value__49 = __PUCK__value__45;
          if ($unwrapTraitObject(__PUCK__value__49).kind == "FunctionDeclaration") {
            var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__49),
                _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
                _d3 = _$unwrapTraitObject79[0];

            PositionVisitor[visitor.type].visitFunctionDeclaration.call(visitor, _d3);
          } else {
            var __PUCK__value__50 = __PUCK__value__45;
            if ($unwrapTraitObject(__PUCK__value__50).kind == "VariableDeclaration") {
              var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__50),
                  _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
                  _d4 = _$unwrapTraitObject81[0];

              PositionVisitor[visitor.type].visitVariableDeclaration.call(visitor, _d4);
            };
          };
        };
      };
    };
  };
};
function walkImportDirective(visitor, i) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier', value: i.specifier, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    var __PUCK__value__51 = i.specifier;
    var __PUCK__value__52 = __PUCK__value__51;
    if ($unwrapTraitObject(__PUCK__value__52).kind == "ObjectDestructure") {
      var _$unwrapTraitObject82 = $unwrapTraitObject(__PUCK__value__52),
          _$unwrapTraitObject83 = _slicedToArray(_$unwrapTraitObject82.value, 1),
          s = _$unwrapTraitObject83[0];

      PositionVisitor[visitor.type].visitObjectDestructure.call(visitor, s);
    } else {
      var __PUCK__value__53 = __PUCK__value__51;
      if (true) {
        var __PUCK__value__54 = __PUCK__value__53;
      };
    };
  };
};
function walkObjectDestructure(visitor, o) {
  var __PUCK__value__55 = _core.List.binarySearchBy.call(o.members, function (member) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: member, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__55).kind == "Ok") {
    var _$unwrapTraitObject84 = $unwrapTraitObject(__PUCK__value__55),
        _$unwrapTraitObject85 = _slicedToArray(_$unwrapTraitObject84.value, 1),
        index = _$unwrapTraitObject85[0];

    PositionVisitor[visitor.type].visitObjectDestructureMember.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: o.members, $isTraitObject: true }, index));
    return true;
  } else {
    return false;
  };
};
function walkObjectDestructureMember(visitor, m) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.property, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitIdentifier.call(visitor, m.property);
  } else {
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      PositionVisitor[visitor.type].visitIdentifier.call(visitor, m.local);
    };
  };
};
function walkBlock(visitor, b) {
  var __PUCK__value__56 = _core.List.binarySearchBy.call(b.statements, function (statement) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: statement, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__56).kind == "Ok") {
    var _$unwrapTraitObject86 = $unwrapTraitObject(__PUCK__value__56),
        _$unwrapTraitObject87 = _slicedToArray(_$unwrapTraitObject86.value, 1),
        index = _$unwrapTraitObject87[0];

    PositionVisitor[visitor.type].visitBlockLevelStatement.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: b.statements, $isTraitObject: true }, index));
    return true;
  } else {
    return false;
  };
};
function walkReturnStatement(visitor, r) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: r.expression, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, r.expression);
  };
};
function walkWhileLoop(visitor, e) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e.body, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitBlock.call(visitor, e.body);
  } else {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.condition);
  };
};
function walkFunctionDeclaration(visitor, f) {
  var __PUCK__value__57 = f.body;
  if ($unwrapTraitObject(__PUCK__value__57).kind == "Some") {
    var _$unwrapTraitObject88 = $unwrapTraitObject(__PUCK__value__57),
        _$unwrapTraitObject89 = _slicedToArray(_$unwrapTraitObject88.value, 1),
        body = _$unwrapTraitObject89[0];

    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: body, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      return PositionVisitor[visitor.type].visitBlock.call(visitor, body);
    };
  };
};
function walkVariableDeclaration(visitor, d) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: d.pattern, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitPattern.call(visitor, d.pattern);
  } else {
    var __PUCK__value__58 = d.typeBound;
    if ($unwrapTraitObject(__PUCK__value__58).kind == "Some") {
      var _$unwrapTraitObject90 = $unwrapTraitObject(__PUCK__value__58),
          _$unwrapTraitObject91 = _slicedToArray(_$unwrapTraitObject90.value, 1),
          typeBound = _$unwrapTraitObject91[0];

      if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: typeBound, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
        return PositionVisitor[visitor.type].visitTypeBound.call(visitor, typeBound);
      };
    };
    var __PUCK__value__59 = d.initializer;
    if ($unwrapTraitObject(__PUCK__value__59).kind == "Some") {
      var _$unwrapTraitObject92 = $unwrapTraitObject(__PUCK__value__59),
          _$unwrapTraitObject93 = _slicedToArray(_$unwrapTraitObject92.value, 1),
          initializer = _$unwrapTraitObject93[0];

      if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: initializer, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
        return PositionVisitor[visitor.type].visitExpression.call(visitor, initializer);
      };
    };
  };
};
function walkAssignmentExpression(visitor, e) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.lhs, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.lhs);
  } else {
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.rhs, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, e.rhs);
    };
  };
};
function walkBinaryExpression(visitor, e) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.lhs, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.lhs);
  } else {
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.rhs, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, e.rhs);
    };
  };
};
function walkCallExpression(visitor, e) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.func, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.func);
  } else {
    var __PUCK__value__60 = _core.List.binarySearchBy.call(e.argumentList, function (arg) {
      return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: arg, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
    });
    if ($unwrapTraitObject(__PUCK__value__60).kind == "Ok") {
      var _$unwrapTraitObject94 = $unwrapTraitObject(__PUCK__value__60),
          _$unwrapTraitObject95 = _slicedToArray(_$unwrapTraitObject94.value, 1),
          index = _$unwrapTraitObject95[0];

      PositionVisitor[visitor.type].visitExpression.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: e.argumentList, $isTraitObject: true }, index));
    };
  };
};
function walkIfExpression(visitor, e) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e.then_, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitBlock.call(visitor, e.then_);
  } else {
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.condition, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, e.condition);
    } else {
      var __PUCK__value__61 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__61).kind == "Some") {
        var _$unwrapTraitObject96 = $unwrapTraitObject(__PUCK__value__61),
            _$unwrapTraitObject97 = _slicedToArray(_$unwrapTraitObject96.value, 1),
            else_ = _$unwrapTraitObject97[0];

        if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: else_, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
          return PositionVisitor[visitor.type].visitBlock.call(visitor, else_);
        };
      };
    };
  };
};
function walkIfLetExpression(visitor, e) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e.then_, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitBlock.call(visitor, e.then_);
  } else {
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: e.pattern, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      PositionVisitor[visitor.type].visitPattern.call(visitor, e.pattern);
    } else {
      if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
        PositionVisitor[visitor.type].visitExpression.call(visitor, e.expression);
      } else {
        var __PUCK__value__62 = e.else_;
        if ($unwrapTraitObject(__PUCK__value__62).kind == "Some") {
          var _$unwrapTraitObject98 = $unwrapTraitObject(__PUCK__value__62),
              _$unwrapTraitObject99 = _slicedToArray(_$unwrapTraitObject98.value, 1),
              else_ = _$unwrapTraitObject99[0];

          if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: else_, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
            return PositionVisitor[visitor.type].visitBlock.call(visitor, else_);
          };
        };
      };
    };
  };
};
function walkMatchExpression(visitor, e) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.expression);
  } else {
    var __PUCK__value__63 = _core.List.binarySearchBy.call(e.patterns, function (pattern) {
      return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: pattern, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
    });
    if ($unwrapTraitObject(__PUCK__value__63).kind == "Ok") {
      var _$unwrapTraitObject100 = $unwrapTraitObject(__PUCK__value__63),
          _$unwrapTraitObject101 = _slicedToArray(_$unwrapTraitObject100.value, 1),
          index = _$unwrapTraitObject101[0];

      PositionVisitor[visitor.type].visitMatchArm.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: e.patterns, $isTraitObject: true }, index));
    } else {
      return false;
    };
  };
  return true;
};
function walkMatchArm(visitor, e) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e.block, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitBlock.call(visitor, e.block);
  } else {
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: e.pattern, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      PositionVisitor[visitor.type].visitPattern.call(visitor, e.pattern);
    };
  };
};
function walkTypePath(visitor, e) {};
function walkTypePathExpression(visitor, e) {};
function walkUnaryExpression(visitor, e) {};
function walkIndexAccess(visitor, a) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, a.object);
  } else {
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.index, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, a.index);
    };
  };
};
function walkMemberAccess(visitor, a) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, a.object);
  } else {
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      PositionVisitor[visitor.type].visitIdentifier.call(visitor, a.member);
    };
  };
};
function walkUnknownAccess(visitor, a) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, a.object);
  } else {
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      PositionVisitor[visitor.type].visitIdentifier.call(visitor, a.member);
    };
  };
};
function walkUnknownIndexAccess(visitor, a) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, a.object);
  } else {
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.index, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, a.index);
    };
  };
};
function walkListLiteral(visitor, l) {
  var __PUCK__value__64 = _core.List.binarySearchBy.call(l.members, function (member) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: member, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__64).kind == "Ok") {
    var _$unwrapTraitObject102 = $unwrapTraitObject(__PUCK__value__64),
        _$unwrapTraitObject103 = _slicedToArray(_$unwrapTraitObject102.value, 1),
        index = _$unwrapTraitObject103[0];

    PositionVisitor[visitor.type].visitExpression.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: l.members, $isTraitObject: true }, index));
  };
};
function walkBooleanLiteral(visitor, l) {};
function walkNumberLiteral(visitor, l) {};
function walkRecordLiteral(visitor, l) {
  var __PUCK__value__65 = _core.List.binarySearchBy.call(l.members, function (member) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteralMember"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteralMember', value: member, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__65).kind == "Ok") {
    var _$unwrapTraitObject104 = $unwrapTraitObject(__PUCK__value__65),
        _$unwrapTraitObject105 = _slicedToArray(_$unwrapTraitObject104.value, 1),
        index = _$unwrapTraitObject105[0];

    PositionVisitor[visitor.type].visitRecordLiteralMember.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: l.members, $isTraitObject: true }, index));
  };
};
function walkRecordLiteralMember(visitor, l) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: l.value, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, l.value);
  };
};
function walkStringLiteral(visitor, l) {
  var __PUCK__value__66 = _core.List.binarySearchBy.call(l.parts, function (part) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart', value: part, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__66).kind == "Ok") {
    var _$unwrapTraitObject106 = $unwrapTraitObject(__PUCK__value__66),
        _$unwrapTraitObject107 = _slicedToArray(_$unwrapTraitObject106.value, 1),
        index = _$unwrapTraitObject107[0];

    PositionVisitor[visitor.type].visitStringLiteralPart.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: l.parts, $isTraitObject: true }, index));
  };
};
function walkStringLiteralPart(visitor, l) {
  var __PUCK__value__67 = l;
  var __PUCK__value__68 = __PUCK__value__67;
  if ($unwrapTraitObject(__PUCK__value__68).kind == "Literal") {
    var _undefined = $unwrapTraitObject(__PUCK__value__68);
  } else {
    var __PUCK__value__69 = __PUCK__value__67;
    if ($unwrapTraitObject(__PUCK__value__69).kind == "Identifier") {
      var _$unwrapTraitObject108 = $unwrapTraitObject(__PUCK__value__69),
          _$unwrapTraitObject109 = _slicedToArray(_$unwrapTraitObject108.value, 1),
          identifier = _$unwrapTraitObject109[0];

      PositionVisitor[visitor.type].visitIdentifier.call(visitor, identifier);
    };
  };
};
function walkTupleLiteral(visitor, l) {
  var __PUCK__value__70 = _core.List.binarySearchBy.call(l.expressions, function (member) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: member, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__70).kind == "Ok") {
    var _$unwrapTraitObject110 = $unwrapTraitObject(__PUCK__value__70),
        _$unwrapTraitObject111 = _slicedToArray(_$unwrapTraitObject110.value, 1),
        index = _$unwrapTraitObject111[0];

    PositionVisitor[visitor.type].visitExpression.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: l.expressions, $isTraitObject: true }, index));
  };
};
function walkPattern(visitor, p) {
  var __PUCK__value__71 = p;
  var __PUCK__value__72 = __PUCK__value__71;
  if ($unwrapTraitObject(__PUCK__value__72).kind == "CatchAll") {
    var _$unwrapTraitObject112 = $unwrapTraitObject(__PUCK__value__72),
        _$unwrapTraitObject113 = _slicedToArray(_$unwrapTraitObject112.value, 1),
        __PUCK__value__73 = _$unwrapTraitObject113[0];
  } else {
    var __PUCK__value__74 = __PUCK__value__71;
    if ($unwrapTraitObject(__PUCK__value__74).kind == "Identifier") {
      var _$unwrapTraitObject114 = $unwrapTraitObject(__PUCK__value__74),
          _$unwrapTraitObject115 = _slicedToArray(_$unwrapTraitObject114.value, 1),
          identifier = _$unwrapTraitObject115[0];

      PositionVisitor[visitor.type].visitIdentifierPattern.call(visitor, identifier);
    } else {
      var __PUCK__value__75 = __PUCK__value__71;
      if ($unwrapTraitObject(__PUCK__value__75).kind == "Record") {
        var _$unwrapTraitObject116 = $unwrapTraitObject(__PUCK__value__75),
            _$unwrapTraitObject117 = _slicedToArray(_$unwrapTraitObject116.value, 1),
            recordPattern = _$unwrapTraitObject117[0];

        PositionVisitor[visitor.type].visitRecordPattern.call(visitor, recordPattern);
      } else {
        var __PUCK__value__76 = __PUCK__value__71;
        if ($unwrapTraitObject(__PUCK__value__76).kind == "Tuple") {
          var _$unwrapTraitObject118 = $unwrapTraitObject(__PUCK__value__76),
              _$unwrapTraitObject119 = _slicedToArray(_$unwrapTraitObject118.value, 1),
              tuplePattern = _$unwrapTraitObject119[0];

          PositionVisitor[visitor.type].visitTuplePattern.call(visitor, tuplePattern);
        } else {
          var __PUCK__value__77 = __PUCK__value__71;
          if ($unwrapTraitObject(__PUCK__value__77).kind == "RecordType") {
            var _$unwrapTraitObject120 = $unwrapTraitObject(__PUCK__value__77),
                _$unwrapTraitObject121 = _slicedToArray(_$unwrapTraitObject120.value, 2),
                typePath = _$unwrapTraitObject121[0],
                _recordPattern = _$unwrapTraitObject121[1];

            PositionVisitor[visitor.type].visitRecordTypePattern.call(visitor, typePath, _recordPattern);
          } else {
            var __PUCK__value__78 = __PUCK__value__71;
            if ($unwrapTraitObject(__PUCK__value__78).kind == "TupleType") {
              var _$unwrapTraitObject122 = $unwrapTraitObject(__PUCK__value__78),
                  _$unwrapTraitObject123 = _slicedToArray(_$unwrapTraitObject122.value, 2),
                  _typePath = _$unwrapTraitObject123[0],
                  _tuplePattern = _$unwrapTraitObject123[1];

              PositionVisitor[visitor.type].visitTupleTypePattern.call(visitor, _typePath, _tuplePattern);
            } else {
              var __PUCK__value__79 = __PUCK__value__71;
              if ($unwrapTraitObject(__PUCK__value__79).kind == "UnitType") {
                var _$unwrapTraitObject124 = $unwrapTraitObject(__PUCK__value__79),
                    _$unwrapTraitObject125 = _slicedToArray(_$unwrapTraitObject124.value, 1),
                    _typePath2 = _$unwrapTraitObject125[0];

                PositionVisitor[visitor.type].visitTypePath.call(visitor, _typePath2);
              };
            };
          };
        };
      };
    };
  };
};
function walkIdentifierPattern(visitor, p) {};
function walkRecordPattern(visitor, p) {
  var __PUCK__value__80 = _core.List.binarySearchBy.call(p.properties, function (prop) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPatternMember"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPatternMember', value: prop, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__80).kind == "Ok") {
    var _$unwrapTraitObject126 = $unwrapTraitObject(__PUCK__value__80),
        _$unwrapTraitObject127 = _slicedToArray(_$unwrapTraitObject126.value, 1),
        index = _$unwrapTraitObject127[0];

    PositionVisitor[visitor.type].visitPattern.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: p.properties, $isTraitObject: true }, index).pattern);
  };
};
function walkTuplePattern(visitor, p) {
  var __PUCK__value__81 = _core.List.binarySearchBy.call(p.properties, function (prop) {
    return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: prop, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($unwrapTraitObject(__PUCK__value__81).kind == "Ok") {
    var _$unwrapTraitObject128 = $unwrapTraitObject(__PUCK__value__81),
        _$unwrapTraitObject129 = _slicedToArray(_$unwrapTraitObject128.value, 1),
        index = _$unwrapTraitObject129[0];

    PositionVisitor[visitor.type].visitPattern.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: p.properties, $isTraitObject: true }, index));
  };
};
function walkTypeBound(visitor, t) {
  var __PUCK__value__82 = t;
  var __PUCK__value__83 = __PUCK__value__82;
  if ($unwrapTraitObject(__PUCK__value__83).kind == "FunctionTypeBound") {
    var _$unwrapTraitObject130 = $unwrapTraitObject(__PUCK__value__83),
        _$unwrapTraitObject131 = _slicedToArray(_$unwrapTraitObject130.value, 1),
        _t = _$unwrapTraitObject131[0];

    PositionVisitor[visitor.type].visitFunctionTypeBound.call(visitor, _t);
  } else {
    var __PUCK__value__84 = __PUCK__value__82;
    if ($unwrapTraitObject(__PUCK__value__84).kind == "NamedTypeBound") {
      var _$unwrapTraitObject132 = $unwrapTraitObject(__PUCK__value__84),
          _$unwrapTraitObject133 = _slicedToArray(_$unwrapTraitObject132.value, 1),
          _t2 = _$unwrapTraitObject133[0];

      PositionVisitor[visitor.type].visitNamedTypeBound.call(visitor, _t2);
    } else {
      var __PUCK__value__85 = __PUCK__value__82;
      if ($unwrapTraitObject(__PUCK__value__85).kind == "RecordTypeBound") {
        var _$unwrapTraitObject134 = $unwrapTraitObject(__PUCK__value__85),
            _$unwrapTraitObject135 = _slicedToArray(_$unwrapTraitObject134.value, 1),
            _t3 = _$unwrapTraitObject135[0];

        PositionVisitor[visitor.type].visitRecordTypeBound.call(visitor, _t3);
      } else {
        var __PUCK__value__86 = __PUCK__value__82;
        if ($unwrapTraitObject(__PUCK__value__86).kind == "TupleTypeBound") {
          var _$unwrapTraitObject136 = $unwrapTraitObject(__PUCK__value__86),
              _$unwrapTraitObject137 = _slicedToArray(_$unwrapTraitObject136.value, 1),
              _t4 = _$unwrapTraitObject137[0];

          PositionVisitor[visitor.type].visitTupleTypeBound.call(visitor, _t4);
        };
      };
    };
  };
};
function walkFunctionTypeBound(visitor, t) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: t.parameters, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitTupleTypeBound.call(visitor, t.parameters);
  } else {
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t.returnType, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
      PositionVisitor[visitor.type].visitTypeBound.call(visitor, t.returnType);
    } else {
      var __PUCK__value__87 = _core.List.binarySearchBy.call(t.typeParameters, function (t) {
        return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
      });
      if ($unwrapTraitObject(__PUCK__value__87).kind == "Ok") {
        var _$unwrapTraitObject138 = $unwrapTraitObject(__PUCK__value__87),
            _$unwrapTraitObject139 = _slicedToArray(_$unwrapTraitObject138.value, 1),
            index = _$unwrapTraitObject139[0];

        PositionVisitor[visitor.type].visitTypeParameter.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: t.typeParameters, $isTraitObject: true }, index));
      };
    };
  };
};
function walkNamedTypeBound(visitor, t) {
  if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: t.path, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor)) == _core.Ordering.Equal) {
    PositionVisitor[visitor.type].visitTypePath.call(visitor, t.path);
  } else {
    var __PUCK__value__88 = _core.List.binarySearchBy.call(t.typeParameters, function (t) {
      return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t, $isTraitObject: true }), PositionVisitor[visitor.type].position.call(visitor));
    });
    if ($unwrapTraitObject(__PUCK__value__88).kind == "Ok") {
      var _$unwrapTraitObject140 = $unwrapTraitObject(__PUCK__value__88),
          _$unwrapTraitObject141 = _slicedToArray(_$unwrapTraitObject140.value, 1),
          index = _$unwrapTraitObject141[0];

      PositionVisitor[visitor.type].visitTypeBound.call(visitor, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: t.typeParameters, $isTraitObject: true }, index));
    };
  };
};
function walkRecordTypeBound(visitor, t) {};
function walkRecordTypeBoundMember(visitor, t) {};
function walkTupleTypeBound(visitor, t) {};
function walkTypeParameter(visitor, t) {}
