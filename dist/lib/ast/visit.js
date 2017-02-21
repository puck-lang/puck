'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyVisitor = exports.walkingVisitor = exports.Visitor = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.walkModule = walkModule;
exports.walkTopLevelStatement = walkTopLevelStatement;
exports.walkBlockLevelStatement = walkBlockLevelStatement;
exports.walkExpression = walkExpression;
exports.walkEnumDeclaration = walkEnumDeclaration;
exports.walkEnumMember = walkEnumMember;
exports.walkImplDeclaration = walkImplDeclaration;
exports.walkImplShorthandDeclaration = walkImplShorthandDeclaration;
exports.walkTraitDeclaration = walkTraitDeclaration;
exports.walkTypeDeclaration = walkTypeDeclaration;
exports.walkExportDirective = walkExportDirective;
exports.walkImportDirective = walkImportDirective;
exports.walkObjectDestructure = walkObjectDestructure;
exports.walkBlock = walkBlock;
exports.walkReturn = walkReturn;
exports.walkWhileLoop = walkWhileLoop;
exports.walkIdentifier = walkIdentifier;
exports.walkFunctionDeclaration = walkFunctionDeclaration;
exports.walkVariableDeclaration = walkVariableDeclaration;
exports.walkAssignmentExpression = walkAssignmentExpression;
exports.walkBinaryExpression = walkBinaryExpression;
exports.walkCallExpression = walkCallExpression;
exports.walkIfExpression = walkIfExpression;
exports.walkIfLetExpression = walkIfLetExpression;
exports.walkMatchExpression = walkMatchExpression;
exports.walkMatchArm = walkMatchArm;
exports.walkUnaryExpression = walkUnaryExpression;
exports.walkIndexAccess = walkIndexAccess;
exports.walkMemberAccess = walkMemberAccess;
exports.walkUnknownAccess = walkUnknownAccess;
exports.walkUnknownIndexAccess = walkUnknownIndexAccess;
exports.walkBooleanLiteral = walkBooleanLiteral;
exports.walkListLiteral = walkListLiteral;
exports.walkNumberLiteral = walkNumberLiteral;
exports.walkRecordLiteral = walkRecordLiteral;
exports.walkStringLiteral = walkStringLiteral;
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

var _ast = require('./ast');

var _ast2 = require('./../compiler/ast');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var Visitor = exports.Visitor = function Visitor(object) {
  return object;
};
var walkingVisitor = exports.walkingVisitor = {
  visitModule: function visitModule(m) {
    var self = this;
    return walkModule(self, m);
  },
  visitTopLevelStatement: function visitTopLevelStatement(e) {
    var self = this;
    return walkTopLevelStatement(self, e);
  },
  visitBlockLevelStatement: function visitBlockLevelStatement(e) {
    var self = this;
    return walkBlockLevelStatement(self, e);
  },
  visitExpression: function visitExpression(e) {
    var self = this;
    return walkExpression(self, e);
  },
  visitEnumDeclaration: function visitEnumDeclaration(e) {
    var self = this;
    return walkEnumDeclaration(self, e);
  },
  visitEnumMember: function visitEnumMember(e) {
    var self = this;
    return walkEnumMember(self, e);
  },
  visitImplDeclaration: function visitImplDeclaration(i) {
    var self = this;
    return walkImplDeclaration(self, i);
  },
  visitImplShorthandDeclaration: function visitImplShorthandDeclaration(i) {
    var self = this;
    return walkImplShorthandDeclaration(self, i);
  },
  visitMethodDeclaration: function visitMethodDeclaration(f) {
    var self = this;
    return walkFunctionDeclaration(self, f);
  },
  visitTraitDeclaration: function visitTraitDeclaration(t) {
    var self = this;
    return walkTraitDeclaration(self, t);
  },
  visitTypeDeclaration: function visitTypeDeclaration(t) {
    var self = this;
    return walkTypeDeclaration(self, t);
  },
  visitExportDirective: function visitExportDirective(e) {
    var self = this;
    return walkExportDirective(self, e);
  },
  visitImportDirective: function visitImportDirective(i) {
    var self = this;
    return walkImportDirective(self, i);
  },
  visitObjectDestructure: function visitObjectDestructure(o) {
    var self = this;
    return walkObjectDestructure(self, o);
  },
  visitBlock: function visitBlock(b) {
    var self = this;
    return walkBlock(self, b);
  },
  visitBreak: function visitBreak() {},
  visitReturn: function visitReturn(r) {
    var self = this;
    return walkReturn(self, r);
  },
  visitWhileLoop: function visitWhileLoop(e) {
    var self = this;
    return walkWhileLoop(self, e);
  },
  visitIdentifier: function visitIdentifier(i) {
    var self = this;
    return walkIdentifier(self, i);
  },
  visitFunctionDeclaration: function visitFunctionDeclaration(f) {
    var self = this;
    return walkFunctionDeclaration(self, f);
  },
  visitVariableDeclaration: function visitVariableDeclaration(d) {
    var self = this;
    return walkVariableDeclaration(self, d);
  },
  visitAssignmentExpression: function visitAssignmentExpression(e) {
    var self = this;
    return walkAssignmentExpression(self, e);
  },
  visitBinaryExpression: function visitBinaryExpression(e) {
    var self = this;
    return walkBinaryExpression(self, e);
  },
  visitCallExpression: function visitCallExpression(e) {
    var self = this;
    return walkCallExpression(self, e);
  },
  visitIfExpression: function visitIfExpression(e) {
    var self = this;
    return walkIfExpression(self, e);
  },
  visitIfLetExpression: function visitIfLetExpression(e) {
    var self = this;
    return walkIfLetExpression(self, e);
  },
  visitMatchExpression: function visitMatchExpression(e) {
    var self = this;
    return walkMatchExpression(self, e);
  },
  visitMatchArm: function visitMatchArm(e) {
    var self = this;
    return walkMatchArm(self, e);
  },
  visitUnaryExpression: function visitUnaryExpression(e) {
    var self = this;
    return walkUnaryExpression(self, e);
  },
  visitIndexAccess: function visitIndexAccess(a) {
    var self = this;
    return walkIndexAccess(self, a);
  },
  visitMemberAccess: function visitMemberAccess(a) {
    var self = this;
    return walkMemberAccess(self, a);
  },
  visitUnknownAccess: function visitUnknownAccess(a) {
    var self = this;
    return walkUnknownAccess(self, a);
  },
  visitUnknownIndexAccess: function visitUnknownIndexAccess(a) {
    var self = this;
    return walkUnknownIndexAccess(self, a);
  },
  visitListLiteral: function visitListLiteral(l) {
    var self = this;
    return walkListLiteral(self, l);
  },
  visitBooleanLiteral: function visitBooleanLiteral(l) {
    var self = this;
    return walkBooleanLiteral(self, l);
  },
  visitNumberLiteral: function visitNumberLiteral(l) {
    var self = this;
    return walkNumberLiteral(self, l);
  },
  visitRecordLiteral: function visitRecordLiteral(l) {
    var self = this;
    return walkRecordLiteral(self, l);
  },
  visitStringLiteral: function visitStringLiteral(l) {
    var self = this;
    return walkStringLiteral(self, l);
  },
  visitTupleLiteral: function visitTupleLiteral(l) {
    var self = this;
    return walkTupleLiteral(self, l);
  },
  visitPattern: function visitPattern(p) {
    var self = this;
    return walkPattern(self, p);
  },
  visitIdentifierPattern: function visitIdentifierPattern(p) {
    var self = this;
    return walkIdentifierPattern(self, p);
  },
  visitRecordPattern: function visitRecordPattern(p) {
    var self = this;
    return walkRecordPattern(self, p);
  },
  visitTuplePattern: function visitTuplePattern(p) {
    var self = this;
    return walkTuplePattern(self, p);
  },
  visitTypeBound: function visitTypeBound(t) {
    var self = this;
    return walkTypeBound(self, t);
  },
  visitFunctionTypeBound: function visitFunctionTypeBound(t) {
    var self = this;
    return walkFunctionTypeBound(self, t);
  },
  visitNamedTypeBound: function visitNamedTypeBound(t) {
    var self = this;
    return walkNamedTypeBound(self, t);
  },
  visitRecordTypeBound: function visitRecordTypeBound(t) {
    var self = this;
    return walkRecordTypeBound(self, t);
  },
  visitRecordTypeBoundMember: function visitRecordTypeBoundMember(t) {
    var self = this;
    return walkRecordTypeBoundMember(self, t);
  },
  visitTupleTypeBound: function visitTupleTypeBound(t) {
    var self = this;
    return walkTupleTypeBound(self, t);
  },
  visitTypeParameter: function visitTypeParameter(t) {
    var self = this;
    return walkTypeParameter(self, t);
  }
};
var emptyVisitor = exports.emptyVisitor = {
  visitModule: function visitModule() {},
  visitTopLevelStatement: function visitTopLevelStatement(e) {
    var self = this;
    return walkTopLevelStatement(self, e);
  },
  visitBlockLevelStatement: function visitBlockLevelStatement(e) {
    var self = this;
    return walkBlockLevelStatement(self, e);
  },
  visitExpression: function visitExpression(e) {
    var self = this;
    return walkExpression(self, e);
  },
  visitEnumDeclaration: function visitEnumDeclaration() {},
  visitEnumMember: function visitEnumMember() {},
  visitMethodDeclaration: function visitMethodDeclaration() {},
  visitImplDeclaration: function visitImplDeclaration() {},
  visitImplShorthandDeclaration: function visitImplShorthandDeclaration() {},
  visitTraitDeclaration: function visitTraitDeclaration() {},
  visitTypeDeclaration: function visitTypeDeclaration() {},
  visitExportDirective: function visitExportDirective() {},
  visitImportDirective: function visitImportDirective() {},
  visitObjectDestructure: function visitObjectDestructure() {},
  visitBlock: function visitBlock() {},
  visitBreak: function visitBreak() {},
  visitReturn: function visitReturn() {},
  visitWhileLoop: function visitWhileLoop() {},
  visitIdentifier: function visitIdentifier() {},
  visitFunctionDeclaration: function visitFunctionDeclaration() {},
  visitVariableDeclaration: function visitVariableDeclaration() {},
  visitAssignmentExpression: function visitAssignmentExpression() {},
  visitBinaryExpression: function visitBinaryExpression() {},
  visitCallExpression: function visitCallExpression() {},
  visitIfExpression: function visitIfExpression() {},
  visitIfLetExpression: function visitIfLetExpression() {},
  visitMatchExpression: function visitMatchExpression() {},
  visitMatchArm: function visitMatchArm() {},
  visitTypePath: function visitTypePath() {},
  visitTypePathExpression: function visitTypePathExpression() {},
  visitUnaryExpression: function visitUnaryExpression() {},
  visitIndexAccess: function visitIndexAccess() {},
  visitMemberAccess: function visitMemberAccess() {},
  visitUnknownAccess: function visitUnknownAccess() {},
  visitUnknownIndexAccess: function visitUnknownIndexAccess() {},
  visitBooleanLiteral: function visitBooleanLiteral() {},
  visitListLiteral: function visitListLiteral() {},
  visitNumberLiteral: function visitNumberLiteral() {},
  visitRecordLiteral: function visitRecordLiteral() {},
  visitStringLiteral: function visitStringLiteral() {},
  visitTupleLiteral: function visitTupleLiteral() {},
  visitPattern: function visitPattern() {},
  visitIdentifierPattern: function visitIdentifierPattern() {},
  visitRecordPattern: function visitRecordPattern() {},
  visitTuplePattern: function visitTuplePattern() {},
  visitTypeParameter: function visitTypeParameter() {},
  visitTypeBound: function visitTypeBound(t) {
    var self = this;
    return walkTypeBound(self, t);
  },
  visitFunctionTypeBound: function visitFunctionTypeBound() {},
  visitNamedTypeBound: function visitNamedTypeBound() {},
  visitRecordTypeBound: function visitRecordTypeBound() {},
  visitRecordTypeBoundMember: function visitRecordTypeBoundMember() {},
  visitTupleTypeBound: function visitTupleTypeBound() {}
};
function walkModule(visitor, m) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true }, function (s) {
    return visitor.visitTopLevelStatement(s);
  });
};
function walkTopLevelStatement(visitor, s) {
  var __PUCK__value__1 = s;
  var __PUCK__value__2 = __PUCK__value__1;
  if ($unwrapTraitObject(__PUCK__value__2).kind == "ExportDirective") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        e = _$unwrapTraitObject$v[0];

    return visitor.visitExportDirective(e);
  } else {
    var __PUCK__value__3 = __PUCK__value__1;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "ImportDirective") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          _e = _$unwrapTraitObject2$[0];

      return visitor.visitImportDirective(_e);
    } else {
      var __PUCK__value__4 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__4).kind == "EnumDeclaration") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__4),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            _e2 = _$unwrapTraitObject3$[0];

        return visitor.visitEnumDeclaration(_e2);
      } else {
        var __PUCK__value__5 = __PUCK__value__1;
        if ($unwrapTraitObject(__PUCK__value__5).kind == "ImplDeclaration") {
          var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__5),
              _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
              _e3 = _$unwrapTraitObject4$[0];

          return visitor.visitImplDeclaration(_e3);
        } else {
          var __PUCK__value__6 = __PUCK__value__1;
          if ($unwrapTraitObject(__PUCK__value__6).kind == "ImplShorthandDeclaration") {
            var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__6),
                _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
                _e4 = _$unwrapTraitObject5$[0];

            return visitor.visitImplShorthandDeclaration(_e4);
          } else {
            var __PUCK__value__7 = __PUCK__value__1;
            if ($unwrapTraitObject(__PUCK__value__7).kind == "TraitDeclaration") {
              var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__7),
                  _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                  _e5 = _$unwrapTraitObject6$[0];

              return visitor.visitTraitDeclaration(_e5);
            } else {
              var __PUCK__value__8 = __PUCK__value__1;
              if ($unwrapTraitObject(__PUCK__value__8).kind == "TypeDeclaration") {
                var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__8),
                    _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                    _e6 = _$unwrapTraitObject7$[0];

                return visitor.visitTypeDeclaration(_e6);
              } else {
                var __PUCK__value__9 = __PUCK__value__1;
                if ($unwrapTraitObject(__PUCK__value__9).kind == "BlockLevelStatement") {
                  var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__9),
                      _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
                      _e7 = _$unwrapTraitObject8$[0];

                  return walkBlockLevelStatement(visitor, _e7);
                };
              };
            };
          };
        };
      };
    };
  };
};
function walkBlockLevelStatement(visitor, s) {
  var __PUCK__value__10 = s;
  var __PUCK__value__11 = __PUCK__value__10;
  if ($unwrapTraitObject(__PUCK__value__11).kind == "Block") {
    var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__11),
        _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
        e = _$unwrapTraitObject9$[0];

    return visitor.visitBlock(e);
  } else {
    var __PUCK__value__12 = __PUCK__value__10;
    if ($unwrapTraitObject(__PUCK__value__12).kind == "BreakStatement") {
      var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__12),
          _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
          _e8 = _$unwrapTraitObject11[0];

      return visitor.visitBreak(_e8);
    } else {
      var __PUCK__value__13 = __PUCK__value__10;
      if ($unwrapTraitObject(__PUCK__value__13).kind == "ReturnStatement") {
        var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__13),
            _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
            _e9 = _$unwrapTraitObject13[0];

        return visitor.visitReturn(_e9);
      } else {
        var __PUCK__value__14 = __PUCK__value__10;
        if ($unwrapTraitObject(__PUCK__value__14).kind == "WhileLoop") {
          var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__14),
              _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
              _e10 = _$unwrapTraitObject15[0];

          return visitor.visitWhileLoop(_e10);
        } else {
          var __PUCK__value__15 = __PUCK__value__10;
          if ($unwrapTraitObject(__PUCK__value__15).kind == "Expression") {
            var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__15),
                _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
                _e11 = _$unwrapTraitObject17[0];

            return walkExpression(visitor, _e11);
          };
        };
      };
    };
  };
};
function walkExpression(visitor, e) {
  var __PUCK__value__16 = e;
  var __PUCK__value__17 = __PUCK__value__16;
  if ($unwrapTraitObject(__PUCK__value__17).kind == "ThrowStatement") {
    var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__17),
        _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
        _e12 = _$unwrapTraitObject19[0];

    return visitor.visitExpression(_e12.expression);
  } else {
    var __PUCK__value__18 = __PUCK__value__16;
    if ($unwrapTraitObject(__PUCK__value__18).kind == "Comment") {
      var __PUCK__value__19 = $unwrapTraitObject(__PUCK__value__18);;

      var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1),
          __PUCK__value__20 = _PUCK__value__19$val[0];

      ;
      return __PUCK__value__19;
    } else {
      var __PUCK__value__21 = __PUCK__value__16;
      if ($unwrapTraitObject(__PUCK__value__21).kind == "Identifier") {
        var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__21),
            _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
            _e13 = _$unwrapTraitObject21[0];

        return visitor.visitIdentifier(_e13);
      } else {
        var __PUCK__value__22 = __PUCK__value__16;
        if ($unwrapTraitObject(__PUCK__value__22).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__22),
              _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
              _e14 = _$unwrapTraitObject23[0];

          return visitor.visitFunctionDeclaration(_e14);
        } else {
          var __PUCK__value__23 = __PUCK__value__16;
          if ($unwrapTraitObject(__PUCK__value__23).kind == "VariableDeclaration") {
            var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__23),
                _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
                _e15 = _$unwrapTraitObject25[0];

            return visitor.visitVariableDeclaration(_e15);
          } else {
            var __PUCK__value__24 = __PUCK__value__16;
            if ($unwrapTraitObject(__PUCK__value__24).kind == "AssignmentExpression") {
              var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__24),
                  _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
                  _e16 = _$unwrapTraitObject27[0];

              return visitor.visitAssignmentExpression(_e16);
            } else {
              var __PUCK__value__25 = __PUCK__value__16;
              if ($unwrapTraitObject(__PUCK__value__25).kind == "BinaryExpression") {
                var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__25),
                    _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
                    _e17 = _$unwrapTraitObject29[0];

                return visitor.visitBinaryExpression(_e17);
              } else {
                var __PUCK__value__26 = __PUCK__value__16;
                if ($unwrapTraitObject(__PUCK__value__26).kind == "CallExpression") {
                  var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__26),
                      _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
                      _e18 = _$unwrapTraitObject31[0];

                  return visitor.visitCallExpression(_e18);
                } else {
                  var __PUCK__value__27 = __PUCK__value__16;
                  if ($unwrapTraitObject(__PUCK__value__27).kind == "IfExpression") {
                    var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__27),
                        _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
                        _e19 = _$unwrapTraitObject33[0];

                    return visitor.visitIfExpression(_e19);
                  } else {
                    var __PUCK__value__28 = __PUCK__value__16;
                    if ($unwrapTraitObject(__PUCK__value__28).kind == "IfLetExpression") {
                      var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__28),
                          _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
                          _e20 = _$unwrapTraitObject35[0];

                      return visitor.visitIfLetExpression(_e20);
                    } else {
                      var __PUCK__value__29 = __PUCK__value__16;
                      if ($unwrapTraitObject(__PUCK__value__29).kind == "MatchExpression") {
                        var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__29),
                            _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
                            _e21 = _$unwrapTraitObject37[0];

                        return visitor.visitMatchExpression(_e21);
                      } else {
                        var __PUCK__value__30 = __PUCK__value__16;
                        if ($unwrapTraitObject(__PUCK__value__30).kind == "TypePathExpression") {
                          var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__30),
                              _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
                              _e22 = _$unwrapTraitObject39[0];

                          return visitor.visitTypePathExpression(_e22);
                        } else {
                          var __PUCK__value__31 = __PUCK__value__16;
                          if ($unwrapTraitObject(__PUCK__value__31).kind == "UnaryExpression") {
                            var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__31),
                                _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
                                _e23 = _$unwrapTraitObject41[0];

                            return visitor.visitUnaryExpression(_e23);
                          } else {
                            var __PUCK__value__32 = __PUCK__value__16;
                            if ($unwrapTraitObject(__PUCK__value__32).kind == "IndexAccess") {
                              var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__32),
                                  _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                                  _e24 = _$unwrapTraitObject43[0];

                              return visitor.visitIndexAccess(_e24);
                            } else {
                              var __PUCK__value__33 = __PUCK__value__16;
                              if ($unwrapTraitObject(__PUCK__value__33).kind == "MemberAccess") {
                                var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__33),
                                    _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
                                    _e25 = _$unwrapTraitObject45[0];

                                return visitor.visitMemberAccess(_e25);
                              } else {
                                var __PUCK__value__34 = __PUCK__value__16;
                                if ($unwrapTraitObject(__PUCK__value__34).kind == "UnknownAccess") {
                                  var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__34),
                                      _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
                                      _e26 = _$unwrapTraitObject47[0];

                                  return visitor.visitUnknownAccess(_e26);
                                } else {
                                  var __PUCK__value__35 = __PUCK__value__16;
                                  if ($unwrapTraitObject(__PUCK__value__35).kind == "UnknownIndexAccess") {
                                    var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__35),
                                        _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 1),
                                        _e27 = _$unwrapTraitObject49[0];

                                    return visitor.visitUnknownIndexAccess(_e27);
                                  } else {
                                    var __PUCK__value__36 = __PUCK__value__16;
                                    if ($unwrapTraitObject(__PUCK__value__36).kind == "BooleanLiteral") {
                                      var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__36),
                                          _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 1),
                                          _e28 = _$unwrapTraitObject51[0];

                                      return visitor.visitBooleanLiteral(_e28);
                                    } else {
                                      var __PUCK__value__37 = __PUCK__value__16;
                                      if ($unwrapTraitObject(__PUCK__value__37).kind == "ListLiteral") {
                                        var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__37),
                                            _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52.value, 1),
                                            _e29 = _$unwrapTraitObject53[0];

                                        return visitor.visitListLiteral(_e29);
                                      } else {
                                        var __PUCK__value__38 = __PUCK__value__16;
                                        if ($unwrapTraitObject(__PUCK__value__38).kind == "NumberLiteral") {
                                          var _$unwrapTraitObject54 = $unwrapTraitObject(__PUCK__value__38),
                                              _$unwrapTraitObject55 = _slicedToArray(_$unwrapTraitObject54.value, 1),
                                              _e30 = _$unwrapTraitObject55[0];

                                          return visitor.visitNumberLiteral(_e30);
                                        } else {
                                          var __PUCK__value__39 = __PUCK__value__16;
                                          if ($unwrapTraitObject(__PUCK__value__39).kind == "RecordLiteral") {
                                            var _$unwrapTraitObject56 = $unwrapTraitObject(__PUCK__value__39),
                                                _$unwrapTraitObject57 = _slicedToArray(_$unwrapTraitObject56.value, 1),
                                                _e31 = _$unwrapTraitObject57[0];

                                            return visitor.visitRecordLiteral(_e31);
                                          } else {
                                            var __PUCK__value__40 = __PUCK__value__16;
                                            if ($unwrapTraitObject(__PUCK__value__40).kind == "StringLiteral") {
                                              var _$unwrapTraitObject58 = $unwrapTraitObject(__PUCK__value__40),
                                                  _$unwrapTraitObject59 = _slicedToArray(_$unwrapTraitObject58.value, 1),
                                                  _e32 = _$unwrapTraitObject59[0];

                                              return visitor.visitStringLiteral(_e32);
                                            } else {
                                              var __PUCK__value__41 = __PUCK__value__16;
                                              if ($unwrapTraitObject(__PUCK__value__41).kind == "TupleLiteral") {
                                                var _$unwrapTraitObject60 = $unwrapTraitObject(__PUCK__value__41),
                                                    _$unwrapTraitObject61 = _slicedToArray(_$unwrapTraitObject60.value, 1),
                                                    _e33 = _$unwrapTraitObject61[0];

                                                return visitor.visitTupleLiteral(_e33);
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
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.typeParameters, $isTraitObject: true }, function (t) {
    return visitor.visitTypeParameter(t);
  });
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.members, $isTraitObject: true }, function (t) {
    return visitor.visitEnumMember(t);
  });
};
function walkEnumMember(visitor, e) {
  var __PUCK__value__42 = e.bound;
  if ($unwrapTraitObject(__PUCK__value__42).kind == "Some") {
    var _$unwrapTraitObject62 = $unwrapTraitObject(__PUCK__value__42),
        _$unwrapTraitObject63 = _slicedToArray(_$unwrapTraitObject62.value, 1),
        typeBound = _$unwrapTraitObject63[0];

    return visitor.visitTypeBound(typeBound);
  };
};
function walkImplDeclaration(visitor, i) {
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeParameter).bind(visitor));
  visitor.visitTypeBound(i.trait_);
  visitor.visitTypeBound(i.type_);
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, $unwrapTraitObject(visitor.visitFunctionDeclaration).bind(visitor));
};
function walkImplShorthandDeclaration(visitor, i) {
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeParameter).bind(visitor));
  visitor.visitTypeBound(i.type_);
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, $unwrapTraitObject(visitor.visitFunctionDeclaration).bind(visitor));
};
function walkTraitDeclaration(visitor, t) {
  if (t.typeParameters) {
    _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeParameter).bind(visitor));
  };
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true }, function (t) {
    return visitor.visitFunctionDeclaration(t);
  });
};
function walkTypeDeclaration(visitor, t) {
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, function (t) {
    return visitor.visitTypeParameter(t);
  });
  var __PUCK__value__43 = t.bound;
  if ($unwrapTraitObject(__PUCK__value__43).kind == "Some") {
    var _$unwrapTraitObject64 = $unwrapTraitObject(__PUCK__value__43),
        _$unwrapTraitObject65 = _slicedToArray(_$unwrapTraitObject64.value, 1),
        typeBound = _$unwrapTraitObject65[0];

    return visitor.visitTypeBound(typeBound);
  };
};
function walkExportDirective(visitor, e) {
  var __PUCK__value__44 = e.statement;
  var __PUCK__value__45 = __PUCK__value__44;
  if ($unwrapTraitObject(__PUCK__value__45).kind == "EnumDeclaration") {
    var _$unwrapTraitObject66 = $unwrapTraitObject(__PUCK__value__45),
        _$unwrapTraitObject67 = _slicedToArray(_$unwrapTraitObject66.value, 1),
        d = _$unwrapTraitObject67[0];

    return visitor.visitEnumDeclaration(d);
  } else {
    var __PUCK__value__46 = __PUCK__value__44;
    if ($unwrapTraitObject(__PUCK__value__46).kind == "FunctionDeclaration") {
      var _$unwrapTraitObject68 = $unwrapTraitObject(__PUCK__value__46),
          _$unwrapTraitObject69 = _slicedToArray(_$unwrapTraitObject68.value, 1),
          _d = _$unwrapTraitObject69[0];

      return visitor.visitFunctionDeclaration(_d);
    } else {
      var __PUCK__value__47 = __PUCK__value__44;
      if ($unwrapTraitObject(__PUCK__value__47).kind == "TraitDeclaration") {
        var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__47),
            _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70.value, 1),
            _d2 = _$unwrapTraitObject71[0];

        return visitor.visitTraitDeclaration(_d2);
      } else {
        var __PUCK__value__48 = __PUCK__value__44;
        if ($unwrapTraitObject(__PUCK__value__48).kind == "TypeDeclaration") {
          var _$unwrapTraitObject72 = $unwrapTraitObject(__PUCK__value__48),
              _$unwrapTraitObject73 = _slicedToArray(_$unwrapTraitObject72.value, 1),
              _d3 = _$unwrapTraitObject73[0];

          return visitor.visitTypeDeclaration(_d3);
        } else {
          var __PUCK__value__49 = __PUCK__value__44;
          if ($unwrapTraitObject(__PUCK__value__49).kind == "VariableDeclaration") {
            var _$unwrapTraitObject74 = $unwrapTraitObject(__PUCK__value__49),
                _$unwrapTraitObject75 = _slicedToArray(_$unwrapTraitObject74.value, 1),
                _d4 = _$unwrapTraitObject75[0];

            return visitor.visitVariableDeclaration(_d4);
          };
        };
      };
    };
  };
};
function walkImportDirective(visitor, i) {
  if (i.specifier.kind == $unwrapTraitObject(_ast2.SyntaxKind).Identifier) {
    return visitor.visitIdentifier(i.specifier);
  } else {
    if (i.specifier.kind == $unwrapTraitObject(_ast2.SyntaxKind).ObjectDestructure) {
      return visitor.visitObjectDestructure(i.specifier);
    };
  };
};
function walkObjectDestructure(visitor, o) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true }, function (m) {
    visitor.visitIdentifier(m.property);
    return visitor.visitIdentifier(m.local);
  });
};
function walkBlock(visitor, b) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true }, function (s) {
    return visitor.visitBlockLevelStatement(s);
  });
};
function walkReturn(visitor, r) {
  return visitor.visitExpression(r.expression);
};
function walkWhileLoop(visitor, e) {
  visitor.visitExpression(e.condition);
  return visitor.visitBlock(e.body);
};
function walkIdentifier(visitor, i) {};
function walkFunctionDeclaration(visitor, f) {
  if (f.typeParameters) {
    _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeParameter).bind(visitor));
  };
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true }, $unwrapTraitObject(visitor.visitVariableDeclaration).bind(visitor));
  var __PUCK__value__50 = f.returnType;
  if ($unwrapTraitObject(__PUCK__value__50).kind == "Some") {
    var _$unwrapTraitObject76 = $unwrapTraitObject(__PUCK__value__50),
        _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76.value, 1),
        returnType = _$unwrapTraitObject77[0];

    visitor.visitTypeBound(returnType);
  };
  var __PUCK__value__51 = f.body;
  if ($unwrapTraitObject(__PUCK__value__51).kind == "Some") {
    var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__51),
        _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
        body = _$unwrapTraitObject79[0];

    return visitor.visitBlock(body);
  };
};
function walkVariableDeclaration(visitor, d) {
  visitor.visitPattern(d.pattern);
  var __PUCK__value__52 = d.typeBound;
  if ($unwrapTraitObject(__PUCK__value__52).kind == "Some") {
    var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__52),
        _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
        typeBound = _$unwrapTraitObject81[0];

    visitor.visitTypeBound(typeBound);
  };
  var __PUCK__value__53 = d.initializer;
  if ($unwrapTraitObject(__PUCK__value__53).kind == "Some") {
    var _$unwrapTraitObject82 = $unwrapTraitObject(__PUCK__value__53),
        _$unwrapTraitObject83 = _slicedToArray(_$unwrapTraitObject82.value, 1),
        initializer = _$unwrapTraitObject83[0];

    return visitor.visitExpression(initializer);
  };
};
function walkAssignmentExpression(visitor, e) {
  visitor.visitExpression(e.lhs);
  return visitor.visitExpression(e.rhs);
};
function walkBinaryExpression(visitor, e) {
  visitor.visitExpression(e.lhs);
  return visitor.visitExpression(e.rhs);
};
function walkCallExpression(visitor, e) {
  visitor.visitExpression(e.func);
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true }, $unwrapTraitObject(visitor.visitExpression).bind(visitor));
};
function walkIfExpression(visitor, e) {
  visitor.visitExpression(e.condition);
  visitor.visitBlock(e.then_);
  var __PUCK__value__54 = e.else_;
  if ($unwrapTraitObject(__PUCK__value__54).kind == "Some") {
    var _$unwrapTraitObject84 = $unwrapTraitObject(__PUCK__value__54),
        _$unwrapTraitObject85 = _slicedToArray(_$unwrapTraitObject84.value, 1),
        else_ = _$unwrapTraitObject85[0];

    return visitor.visitBlock(else_);
  };
};
function walkIfLetExpression(visitor, e) {
  visitor.visitPattern(e.pattern);
  visitor.visitExpression(e.expression);
  visitor.visitBlock(e.then_);
  var __PUCK__value__55 = e.else_;
  if ($unwrapTraitObject(__PUCK__value__55).kind == "Some") {
    var _$unwrapTraitObject86 = $unwrapTraitObject(__PUCK__value__55),
        _$unwrapTraitObject87 = _slicedToArray(_$unwrapTraitObject86.value, 1),
        else_ = _$unwrapTraitObject87[0];

    return visitor.visitBlock(else_);
  };
};
function walkMatchExpression(visitor, e) {
  visitor.visitExpression(e.expression);
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (p) {
    return visitor.visitMatchArm(p);
  });
};
function walkMatchArm(visitor, e) {
  visitor.visitPattern(e.pattern);
  return visitor.visitBlock(e.block);
};
function walkUnaryExpression(visitor, e) {
  return visitor.visitExpression(e.rhs);
};
function walkIndexAccess(visitor, a) {
  visitor.visitExpression(a.object);
  return visitor.visitExpression(a.index);
};
function walkMemberAccess(visitor, a) {
  visitor.visitExpression(a.object);
  return visitor.visitExpression(a.member);
};
function walkUnknownAccess(visitor, a) {
  visitor.visitExpression(a.object);
  return visitor.visitExpression(a.member);
};
function walkUnknownIndexAccess(visitor, a) {
  visitor.visitExpression(a.object);
  return visitor.visitExpression(a.index);
};
function walkBooleanLiteral(visitor, l) {};
function walkListLiteral(visitor, l) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, $unwrapTraitObject(visitor.visitExpression).bind(visitor));
};
function walkNumberLiteral(visitor, l) {};
function walkRecordLiteral(visitor, l) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, function (m) {
    visitor.visitIdentifier(m.name);
    return visitor.visitExpression(m.value);
  });
};
function walkStringLiteral(visitor, l) {
  var __PUCK__value__56 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filterMap.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.parts, $isTraitObject: true }, function (p) {
    var __PUCK__value__57 = p;
    var __PUCK__value__58 = __PUCK__value__57;
    if ($unwrapTraitObject(__PUCK__value__58).kind == "Identifier") {
      var _$unwrapTraitObject88 = $unwrapTraitObject(__PUCK__value__58),
          _$unwrapTraitObject89 = _slicedToArray(_$unwrapTraitObject88.value, 1),
          identifier = _$unwrapTraitObject89[0];

      return (0, _core.Some)(identifier);
    } else {
      var __PUCK__value__59 = __PUCK__value__57;
      if (true) {
        var __PUCK__value__60 = __PUCK__value__59;
        return _core.None;
      };
    };
  });
  return _core.Iterable[__PUCK__value__56.type].forEach.call(__PUCK__value__56, function (i) {
    return visitor.visitIdentifier(i);
  });
};
function walkTupleLiteral(visitor, l) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true }, $unwrapTraitObject(visitor.visitExpression).bind(visitor));
};
function walkPattern(visitor, p) {
  var __PUCK__value__61 = p;
  var __PUCK__value__62 = __PUCK__value__61;
  if ($unwrapTraitObject(__PUCK__value__62).kind == "CatchAll") {
    var __PUCK__value__63 = $unwrapTraitObject(__PUCK__value__62);;
    var _undefined = __PUCK__value__63;;
    return __PUCK__value__63;
  } else {
    var __PUCK__value__64 = __PUCK__value__61;
    if ($unwrapTraitObject(__PUCK__value__64).kind == "Identifier") {
      var _$unwrapTraitObject90 = $unwrapTraitObject(__PUCK__value__64),
          _$unwrapTraitObject91 = _slicedToArray(_$unwrapTraitObject90.value, 1),
          identifier = _$unwrapTraitObject91[0];

      return visitor.visitIdentifierPattern(identifier);
    } else {
      var __PUCK__value__65 = __PUCK__value__61;
      if ($unwrapTraitObject(__PUCK__value__65).kind == "Record") {
        var _$unwrapTraitObject92 = $unwrapTraitObject(__PUCK__value__65),
            _$unwrapTraitObject93 = _slicedToArray(_$unwrapTraitObject92.value, 1),
            record = _$unwrapTraitObject93[0];

        return visitor.visitRecordPattern(record);
      } else {
        var __PUCK__value__66 = __PUCK__value__61;
        if ($unwrapTraitObject(__PUCK__value__66).kind == "RecordType") {
          var _$unwrapTraitObject94 = $unwrapTraitObject(__PUCK__value__66),
              _$unwrapTraitObject95 = _slicedToArray(_$unwrapTraitObject94.value, 2),
              typePath = _$unwrapTraitObject95[0],
              _record = _$unwrapTraitObject95[1];

          visitor.visitTypePath(typePath);
          return visitor.visitRecordPattern(_record);
        } else {
          var __PUCK__value__67 = __PUCK__value__61;
          if ($unwrapTraitObject(__PUCK__value__67).kind == "Tuple") {
            var _$unwrapTraitObject96 = $unwrapTraitObject(__PUCK__value__67),
                _$unwrapTraitObject97 = _slicedToArray(_$unwrapTraitObject96.value, 1),
                tuple = _$unwrapTraitObject97[0];

            return visitor.visitTuplePattern(tuple);
          } else {
            var __PUCK__value__68 = __PUCK__value__61;
            if ($unwrapTraitObject(__PUCK__value__68).kind == "TupleType") {
              var _$unwrapTraitObject98 = $unwrapTraitObject(__PUCK__value__68),
                  _$unwrapTraitObject99 = _slicedToArray(_$unwrapTraitObject98.value, 2),
                  _typePath = _$unwrapTraitObject99[0],
                  _tuple = _$unwrapTraitObject99[1];

              visitor.visitTypePath(_typePath);
              return visitor.visitTuplePattern(_tuple);
            } else {
              var __PUCK__value__69 = __PUCK__value__61;
              if ($unwrapTraitObject(__PUCK__value__69).kind == "UnitType") {
                var _$unwrapTraitObject100 = $unwrapTraitObject(__PUCK__value__69),
                    _$unwrapTraitObject101 = _slicedToArray(_$unwrapTraitObject100.value, 1),
                    _typePath2 = _$unwrapTraitObject101[0];

                return visitor.visitTypePath(_typePath2);
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
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true }, function (p) {
    return visitor.visitPattern(p.pattern);
  });
};
function walkTuplePattern(visitor, p) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true }, function (p) {
    return visitor.visitPattern(p);
  });
};
function walkTypeBound(visitor, t) {
  var __PUCK__value__70 = t;
  var __PUCK__value__71 = __PUCK__value__70;
  if ($unwrapTraitObject(__PUCK__value__71).kind == "FunctionTypeBound") {
    var _$unwrapTraitObject102 = $unwrapTraitObject(__PUCK__value__71),
        _$unwrapTraitObject103 = _slicedToArray(_$unwrapTraitObject102.value, 1),
        _t = _$unwrapTraitObject103[0];

    return visitor.visitFunctionTypeBound(_t);
  } else {
    var __PUCK__value__72 = __PUCK__value__70;
    if ($unwrapTraitObject(__PUCK__value__72).kind == "NamedTypeBound") {
      var _$unwrapTraitObject104 = $unwrapTraitObject(__PUCK__value__72),
          _$unwrapTraitObject105 = _slicedToArray(_$unwrapTraitObject104.value, 1),
          _t2 = _$unwrapTraitObject105[0];

      return visitor.visitNamedTypeBound(_t2);
    } else {
      var __PUCK__value__73 = __PUCK__value__70;
      if ($unwrapTraitObject(__PUCK__value__73).kind == "RecordTypeBound") {
        var _$unwrapTraitObject106 = $unwrapTraitObject(__PUCK__value__73),
            _$unwrapTraitObject107 = _slicedToArray(_$unwrapTraitObject106.value, 1),
            _t3 = _$unwrapTraitObject107[0];

        return visitor.visitRecordTypeBound(_t3);
      } else {
        var __PUCK__value__74 = __PUCK__value__70;
        if ($unwrapTraitObject(__PUCK__value__74).kind == "TupleTypeBound") {
          var _$unwrapTraitObject108 = $unwrapTraitObject(__PUCK__value__74),
              _$unwrapTraitObject109 = _slicedToArray(_$unwrapTraitObject108.value, 1),
              _t4 = _$unwrapTraitObject109[0];

          return visitor.visitTupleTypeBound(_t4);
        };
      };
    };
  };
};
function walkFunctionTypeBound(visitor, t) {
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeParameter).bind(visitor));
  visitor.visitTupleTypeBound(t.parameters);
  return visitor.visitTypeBound(t.returnType);
};
function walkNamedTypeBound(visitor, t) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeBound).bind(visitor));
};
function walkRecordTypeBound(visitor, t) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true }, function (t) {
    return visitor.visitRecordTypeBoundMember(t);
  });
};
function walkRecordTypeBoundMember(visitor, t) {
  return visitor.visitTypeBound(t.typeBound);
};
function walkTupleTypeBound(visitor, t) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeBound).bind(visitor));
};
function walkTypeParameter(visitor, t) {
  var __PUCK__value__75 = t.defaultValue;
  if ($unwrapTraitObject(__PUCK__value__75).kind == "Some") {
    var _$unwrapTraitObject110 = $unwrapTraitObject(__PUCK__value__75),
        _$unwrapTraitObject111 = _slicedToArray(_$unwrapTraitObject110.value, 1),
        defaultValue = _$unwrapTraitObject111[0];

    return visitor.visitTypeBound(defaultValue);
  };
}
