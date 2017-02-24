'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyVisitor = exports.walkingVisitor = undefined;

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
    return $unwrapTraitObject(visitor).visitTopLevelStatement(s);
  });
};
function walkTopLevelStatement(visitor, s) {
  var __PUCK__value__1 = s;
  if ($unwrapTraitObject(__PUCK__value__1).kind == "ExportDirective") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        e = _$unwrapTraitObject$v[0];

    return $unwrapTraitObject(visitor).visitExportDirective(e);
  } else {
    if ($unwrapTraitObject(__PUCK__value__1).kind == "ImportDirective") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          _e = _$unwrapTraitObject2$[0];

      return $unwrapTraitObject(visitor).visitImportDirective(_e);
    } else {
      if ($unwrapTraitObject(__PUCK__value__1).kind == "EnumDeclaration") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__1),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            _e2 = _$unwrapTraitObject3$[0];

        return $unwrapTraitObject(visitor).visitEnumDeclaration(_e2);
      } else {
        if ($unwrapTraitObject(__PUCK__value__1).kind == "ImplDeclaration") {
          var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__1),
              _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
              _e3 = _$unwrapTraitObject4$[0];

          return $unwrapTraitObject(visitor).visitImplDeclaration(_e3);
        } else {
          if ($unwrapTraitObject(__PUCK__value__1).kind == "ImplShorthandDeclaration") {
            var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__1),
                _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
                _e4 = _$unwrapTraitObject5$[0];

            return $unwrapTraitObject(visitor).visitImplShorthandDeclaration(_e4);
          } else {
            if ($unwrapTraitObject(__PUCK__value__1).kind == "TraitDeclaration") {
              var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__1),
                  _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                  _e5 = _$unwrapTraitObject6$[0];

              return $unwrapTraitObject(visitor).visitTraitDeclaration(_e5);
            } else {
              if ($unwrapTraitObject(__PUCK__value__1).kind == "TypeDeclaration") {
                var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__1),
                    _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                    _e6 = _$unwrapTraitObject7$[0];

                return $unwrapTraitObject(visitor).visitTypeDeclaration(_e6);
              } else {
                if ($unwrapTraitObject(__PUCK__value__1).kind == "BlockLevelStatement") {
                  var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__1),
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
  var __PUCK__value__2 = s;
  if ($unwrapTraitObject(__PUCK__value__2).kind == "Block") {
    var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__2),
        _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
        e = _$unwrapTraitObject9$[0];

    return $unwrapTraitObject(visitor).visitBlock(e);
  } else {
    if ($unwrapTraitObject(__PUCK__value__2).kind == "BreakStatement") {
      var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__2),
          _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
          _e8 = _$unwrapTraitObject11[0];

      return $unwrapTraitObject(visitor).visitBreak(_e8);
    } else {
      if ($unwrapTraitObject(__PUCK__value__2).kind == "ReturnStatement") {
        var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__2),
            _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
            _e9 = _$unwrapTraitObject13[0];

        return $unwrapTraitObject(visitor).visitReturn(_e9);
      } else {
        if ($unwrapTraitObject(__PUCK__value__2).kind == "WhileLoop") {
          var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__2),
              _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
              _e10 = _$unwrapTraitObject15[0];

          return $unwrapTraitObject(visitor).visitWhileLoop(_e10);
        } else {
          if ($unwrapTraitObject(__PUCK__value__2).kind == "Expression") {
            var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__2),
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
  var __PUCK__value__3 = e;
  if ($unwrapTraitObject(__PUCK__value__3).kind == "ThrowStatement") {
    var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__3),
        _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
        _e12 = _$unwrapTraitObject19[0];

    return $unwrapTraitObject(visitor).visitExpression(_e12.expression);
  } else {
    if ($unwrapTraitObject(__PUCK__value__3).kind == "Comment") {
      var __PUCK__value__4 = $unwrapTraitObject(__PUCK__value__3);;

      var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
          __PUCK__value__5 = _PUCK__value__4$valu[0];

      ;
      return __PUCK__value__4;
    } else {
      if ($unwrapTraitObject(__PUCK__value__3).kind == "Identifier") {
        var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__3),
            _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
            _e13 = _$unwrapTraitObject21[0];

        return $unwrapTraitObject(visitor).visitIdentifier(_e13);
      } else {
        if ($unwrapTraitObject(__PUCK__value__3).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__3),
              _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
              _e14 = _$unwrapTraitObject23[0];

          return $unwrapTraitObject(visitor).visitFunctionDeclaration(_e14);
        } else {
          if ($unwrapTraitObject(__PUCK__value__3).kind == "VariableDeclaration") {
            var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__3),
                _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
                _e15 = _$unwrapTraitObject25[0];

            return $unwrapTraitObject(visitor).visitVariableDeclaration(_e15);
          } else {
            if ($unwrapTraitObject(__PUCK__value__3).kind == "AssignmentExpression") {
              var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__3),
                  _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
                  _e16 = _$unwrapTraitObject27[0];

              return $unwrapTraitObject(visitor).visitAssignmentExpression(_e16);
            } else {
              if ($unwrapTraitObject(__PUCK__value__3).kind == "BinaryExpression") {
                var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__3),
                    _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
                    _e17 = _$unwrapTraitObject29[0];

                return $unwrapTraitObject(visitor).visitBinaryExpression(_e17);
              } else {
                if ($unwrapTraitObject(__PUCK__value__3).kind == "CallExpression") {
                  var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__3),
                      _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
                      _e18 = _$unwrapTraitObject31[0];

                  return $unwrapTraitObject(visitor).visitCallExpression(_e18);
                } else {
                  if ($unwrapTraitObject(__PUCK__value__3).kind == "IfExpression") {
                    var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__3),
                        _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
                        _e19 = _$unwrapTraitObject33[0];

                    return $unwrapTraitObject(visitor).visitIfExpression(_e19);
                  } else {
                    if ($unwrapTraitObject(__PUCK__value__3).kind == "IfLetExpression") {
                      var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__3),
                          _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
                          _e20 = _$unwrapTraitObject35[0];

                      return $unwrapTraitObject(visitor).visitIfLetExpression(_e20);
                    } else {
                      if ($unwrapTraitObject(__PUCK__value__3).kind == "MatchExpression") {
                        var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__3),
                            _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
                            _e21 = _$unwrapTraitObject37[0];

                        return $unwrapTraitObject(visitor).visitMatchExpression(_e21);
                      } else {
                        if ($unwrapTraitObject(__PUCK__value__3).kind == "TypePathExpression") {
                          var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__3),
                              _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
                              _e22 = _$unwrapTraitObject39[0];

                          return $unwrapTraitObject(visitor).visitTypePathExpression(_e22);
                        } else {
                          if ($unwrapTraitObject(__PUCK__value__3).kind == "UnaryExpression") {
                            var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__3),
                                _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
                                _e23 = _$unwrapTraitObject41[0];

                            return $unwrapTraitObject(visitor).visitUnaryExpression(_e23);
                          } else {
                            if ($unwrapTraitObject(__PUCK__value__3).kind == "IndexAccess") {
                              var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__3),
                                  _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                                  _e24 = _$unwrapTraitObject43[0];

                              return $unwrapTraitObject(visitor).visitIndexAccess(_e24);
                            } else {
                              if ($unwrapTraitObject(__PUCK__value__3).kind == "MemberAccess") {
                                var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__3),
                                    _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
                                    _e25 = _$unwrapTraitObject45[0];

                                return $unwrapTraitObject(visitor).visitMemberAccess(_e25);
                              } else {
                                if ($unwrapTraitObject(__PUCK__value__3).kind == "UnknownAccess") {
                                  var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__3),
                                      _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
                                      _e26 = _$unwrapTraitObject47[0];

                                  return $unwrapTraitObject(visitor).visitUnknownAccess(_e26);
                                } else {
                                  if ($unwrapTraitObject(__PUCK__value__3).kind == "UnknownIndexAccess") {
                                    var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__3),
                                        _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 1),
                                        _e27 = _$unwrapTraitObject49[0];

                                    return $unwrapTraitObject(visitor).visitUnknownIndexAccess(_e27);
                                  } else {
                                    if ($unwrapTraitObject(__PUCK__value__3).kind == "BooleanLiteral") {
                                      var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__3),
                                          _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 1),
                                          _e28 = _$unwrapTraitObject51[0];

                                      return $unwrapTraitObject(visitor).visitBooleanLiteral(_e28);
                                    } else {
                                      if ($unwrapTraitObject(__PUCK__value__3).kind == "ListLiteral") {
                                        var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__3),
                                            _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52.value, 1),
                                            _e29 = _$unwrapTraitObject53[0];

                                        return $unwrapTraitObject(visitor).visitListLiteral(_e29);
                                      } else {
                                        if ($unwrapTraitObject(__PUCK__value__3).kind == "NumberLiteral") {
                                          var _$unwrapTraitObject54 = $unwrapTraitObject(__PUCK__value__3),
                                              _$unwrapTraitObject55 = _slicedToArray(_$unwrapTraitObject54.value, 1),
                                              _e30 = _$unwrapTraitObject55[0];

                                          return $unwrapTraitObject(visitor).visitNumberLiteral(_e30);
                                        } else {
                                          if ($unwrapTraitObject(__PUCK__value__3).kind == "RecordLiteral") {
                                            var _$unwrapTraitObject56 = $unwrapTraitObject(__PUCK__value__3),
                                                _$unwrapTraitObject57 = _slicedToArray(_$unwrapTraitObject56.value, 1),
                                                _e31 = _$unwrapTraitObject57[0];

                                            return $unwrapTraitObject(visitor).visitRecordLiteral(_e31);
                                          } else {
                                            if ($unwrapTraitObject(__PUCK__value__3).kind == "StringLiteral") {
                                              var _$unwrapTraitObject58 = $unwrapTraitObject(__PUCK__value__3),
                                                  _$unwrapTraitObject59 = _slicedToArray(_$unwrapTraitObject58.value, 1),
                                                  _e32 = _$unwrapTraitObject59[0];

                                              return $unwrapTraitObject(visitor).visitStringLiteral(_e32);
                                            } else {
                                              if ($unwrapTraitObject(__PUCK__value__3).kind == "TupleLiteral") {
                                                var _$unwrapTraitObject60 = $unwrapTraitObject(__PUCK__value__3),
                                                    _$unwrapTraitObject61 = _slicedToArray(_$unwrapTraitObject60.value, 1),
                                                    _e33 = _$unwrapTraitObject61[0];

                                                return $unwrapTraitObject(visitor).visitTupleLiteral(_e33);
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
    return $unwrapTraitObject(visitor).visitTypeParameter(t);
  });
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.members, $isTraitObject: true }, function (t) {
    return $unwrapTraitObject(visitor).visitEnumMember(t);
  });
};
function walkEnumMember(visitor, e) {
  var __PUCK__value__6 = e.bound;
  if (__PUCK__value__6.kind == "Some") {
    var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1),
        typeBound = _PUCK__value__6$valu[0];

    return $unwrapTraitObject(visitor).visitTypeBound(typeBound);
  };
};
function walkImplDeclaration(visitor, i) {
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeParameter).bind(visitor));
  $unwrapTraitObject(visitor).visitTypeBound(i.trait_);
  $unwrapTraitObject(visitor).visitTypeBound(i.type_);
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(visitor).visitFunctionDeclaration).bind(visitor));
};
function walkImplShorthandDeclaration(visitor, i) {
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeParameter).bind(visitor));
  $unwrapTraitObject(visitor).visitTypeBound(i.type_);
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(visitor).visitFunctionDeclaration).bind(visitor));
};
function walkTraitDeclaration(visitor, t) {
  if (t.typeParameters) {
    _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeParameter).bind(visitor));
  };
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true }, function (t) {
    return $unwrapTraitObject(visitor).visitFunctionDeclaration(t);
  });
};
function walkTypeDeclaration(visitor, t) {
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, function (t) {
    return $unwrapTraitObject(visitor).visitTypeParameter(t);
  });
  var __PUCK__value__7 = t.bound;
  if (__PUCK__value__7.kind == "Some") {
    var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1),
        typeBound = _PUCK__value__7$valu[0];

    return $unwrapTraitObject(visitor).visitTypeBound(typeBound);
  };
};
function walkExportDirective(visitor, e) {
  var __PUCK__value__8 = e.statement;
  if ($unwrapTraitObject(__PUCK__value__8).kind == "EnumDeclaration") {
    var _$unwrapTraitObject62 = $unwrapTraitObject(__PUCK__value__8),
        _$unwrapTraitObject63 = _slicedToArray(_$unwrapTraitObject62.value, 1),
        d = _$unwrapTraitObject63[0];

    return $unwrapTraitObject(visitor).visitEnumDeclaration(d);
  } else {
    if ($unwrapTraitObject(__PUCK__value__8).kind == "FunctionDeclaration") {
      var _$unwrapTraitObject64 = $unwrapTraitObject(__PUCK__value__8),
          _$unwrapTraitObject65 = _slicedToArray(_$unwrapTraitObject64.value, 1),
          _d = _$unwrapTraitObject65[0];

      return $unwrapTraitObject(visitor).visitFunctionDeclaration(_d);
    } else {
      if ($unwrapTraitObject(__PUCK__value__8).kind == "TraitDeclaration") {
        var _$unwrapTraitObject66 = $unwrapTraitObject(__PUCK__value__8),
            _$unwrapTraitObject67 = _slicedToArray(_$unwrapTraitObject66.value, 1),
            _d2 = _$unwrapTraitObject67[0];

        return $unwrapTraitObject(visitor).visitTraitDeclaration(_d2);
      } else {
        if ($unwrapTraitObject(__PUCK__value__8).kind == "TypeDeclaration") {
          var _$unwrapTraitObject68 = $unwrapTraitObject(__PUCK__value__8),
              _$unwrapTraitObject69 = _slicedToArray(_$unwrapTraitObject68.value, 1),
              _d3 = _$unwrapTraitObject69[0];

          return $unwrapTraitObject(visitor).visitTypeDeclaration(_d3);
        } else {
          if ($unwrapTraitObject(__PUCK__value__8).kind == "VariableDeclaration") {
            var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__8),
                _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70.value, 1),
                _d4 = _$unwrapTraitObject71[0];

            return $unwrapTraitObject(visitor).visitVariableDeclaration(_d4);
          };
        };
      };
    };
  };
};
function walkImportDirective(visitor, i) {
  var __PUCK__value__9 = i.specifier;
  if ($unwrapTraitObject(__PUCK__value__9).kind == "Identifier") {
    var _$unwrapTraitObject72 = $unwrapTraitObject(__PUCK__value__9),
        _$unwrapTraitObject73 = _slicedToArray(_$unwrapTraitObject72.value, 1),
        identifier = _$unwrapTraitObject73[0];

    return $unwrapTraitObject(visitor).visitIdentifier(identifier);
  } else {
    if ($unwrapTraitObject(__PUCK__value__9).kind == "ObjectDestructure") {
      var _$unwrapTraitObject74 = $unwrapTraitObject(__PUCK__value__9),
          _$unwrapTraitObject75 = _slicedToArray(_$unwrapTraitObject74.value, 1),
          d = _$unwrapTraitObject75[0];

      return $unwrapTraitObject(visitor).visitObjectDestructure(d);
    } else {
      if ($unwrapTraitObject(__PUCK__value__9).kind == "Asterisk") {
        var __PUCK__value__10 = $unwrapTraitObject(__PUCK__value__9);;
        var _undefined = __PUCK__value__10;;
        return __PUCK__value__10;
      };
    };
  };
};
function walkObjectDestructure(visitor, o) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true }, function (m) {
    $unwrapTraitObject(visitor).visitIdentifier(m.property);
    return $unwrapTraitObject(visitor).visitIdentifier(m.local);
  });
};
function walkBlock(visitor, b) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true }, function (s) {
    return $unwrapTraitObject(visitor).visitBlockLevelStatement(s);
  });
};
function walkReturn(visitor, r) {
  return $unwrapTraitObject(visitor).visitExpression(r.expression);
};
function walkWhileLoop(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.condition);
  return $unwrapTraitObject(visitor).visitBlock(e.body);
};
function walkIdentifier(visitor, i) {};
function walkFunctionDeclaration(visitor, f) {
  if (f.typeParameters) {
    _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeParameter).bind(visitor));
  };
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(visitor).visitVariableDeclaration).bind(visitor));
  var __PUCK__value__11 = f.returnType;
  if (__PUCK__value__11.kind == "Some") {
    var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
        returnType = _PUCK__value__11$val[0];

    $unwrapTraitObject(visitor).visitTypeBound(returnType);
  };
  var __PUCK__value__12 = f.body;
  if (__PUCK__value__12.kind == "Some") {
    var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1),
        body = _PUCK__value__12$val[0];

    return $unwrapTraitObject(visitor).visitBlock(body);
  };
};
function walkVariableDeclaration(visitor, d) {
  $unwrapTraitObject(visitor).visitPattern(d.pattern);
  var __PUCK__value__13 = d.typeBound;
  if (__PUCK__value__13.kind == "Some") {
    var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1),
        typeBound = _PUCK__value__13$val[0];

    $unwrapTraitObject(visitor).visitTypeBound(typeBound);
  };
  var __PUCK__value__14 = d.initializer;
  if (__PUCK__value__14.kind == "Some") {
    var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
        initializer = _PUCK__value__14$val[0];

    return $unwrapTraitObject(visitor).visitExpression(initializer);
  };
};
function walkAssignmentExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.lhs);
  return $unwrapTraitObject(visitor).visitExpression(e.rhs);
};
function walkBinaryExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.lhs);
  return $unwrapTraitObject(visitor).visitExpression(e.rhs);
};
function walkCallExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.func);
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true }, function (e) {
    return $unwrapTraitObject(visitor).visitExpression(e);
  });
};
function walkIfExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.condition);
  $unwrapTraitObject(visitor).visitBlock(e.then_);
  var __PUCK__value__15 = e.else_;
  if (__PUCK__value__15.kind == "Some") {
    var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
        else_ = _PUCK__value__15$val[0];

    return $unwrapTraitObject(visitor).visitBlock(else_);
  };
};
function walkIfLetExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitPattern(e.pattern);
  $unwrapTraitObject(visitor).visitExpression(e.expression);
  $unwrapTraitObject(visitor).visitBlock(e.then_);
  var __PUCK__value__16 = e.else_;
  if (__PUCK__value__16.kind == "Some") {
    var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 1),
        else_ = _PUCK__value__16$val[0];

    return $unwrapTraitObject(visitor).visitBlock(else_);
  };
};
function walkMatchExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.expression);
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (p) {
    return $unwrapTraitObject(visitor).visitMatchArm(p);
  });
};
function walkMatchArm(visitor, e) {
  $unwrapTraitObject(visitor).visitPattern(e.pattern);
  return $unwrapTraitObject(visitor).visitBlock(e.block);
};
function walkUnaryExpression(visitor, e) {
  return $unwrapTraitObject(visitor).visitExpression(e.rhs);
};
function walkIndexAccess(visitor, a) {
  $unwrapTraitObject(visitor).visitExpression(a.object);
  return $unwrapTraitObject(visitor).visitExpression(a.index);
};
function walkMemberAccess(visitor, a) {
  $unwrapTraitObject(visitor).visitExpression(a.object);
  return $unwrapTraitObject(visitor).visitExpression(a.member);
};
function walkUnknownAccess(visitor, a) {
  $unwrapTraitObject(visitor).visitExpression(a.object);
  return $unwrapTraitObject(visitor).visitExpression(a.member);
};
function walkUnknownIndexAccess(visitor, a) {
  $unwrapTraitObject(visitor).visitExpression(a.object);
  return $unwrapTraitObject(visitor).visitExpression(a.index);
};
function walkBooleanLiteral(visitor, l) {};
function walkListLiteral(visitor, l) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, function (e) {
    return $unwrapTraitObject(visitor).visitExpression(e);
  });
};
function walkNumberLiteral(visitor, l) {};
function walkRecordLiteral(visitor, l) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, function (m) {
    $unwrapTraitObject(visitor).visitIdentifier(m.name);
    return $unwrapTraitObject(visitor).visitExpression(m.value);
  });
};
function walkStringLiteral(visitor, l) {
  var __PUCK__value__17 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filterMap.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.parts, $isTraitObject: true }, function (p) {
    var __PUCK__value__18 = p;
    if ($unwrapTraitObject(__PUCK__value__18).kind == "Identifier") {
      var _$unwrapTraitObject76 = $unwrapTraitObject(__PUCK__value__18),
          _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76.value, 1),
          identifier = _$unwrapTraitObject77[0];

      return (0, _core.Some)(identifier);
    } else {
      if (true) {
        var __PUCK__value__19 = __PUCK__value__18;
        return _core.None;
      };
    };
  });
  return _core.Iterable[__PUCK__value__17.type].forEach.call(__PUCK__value__17, function (i) {
    return $unwrapTraitObject(visitor).visitIdentifier(i);
  });
};
function walkTupleLiteral(visitor, l) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true }, function (e) {
    return $unwrapTraitObject(visitor).visitExpression(e);
  });
};
function walkPattern(visitor, p) {
  var __PUCK__value__20 = p;
  if ($unwrapTraitObject(__PUCK__value__20).kind == "CatchAll") {
    var __PUCK__value__21 = $unwrapTraitObject(__PUCK__value__20);;
    var _undefined2 = __PUCK__value__21;;
    return __PUCK__value__21;
  } else {
    if ($unwrapTraitObject(__PUCK__value__20).kind == "Identifier") {
      var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__20),
          _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
          identifier = _$unwrapTraitObject79[0];

      return $unwrapTraitObject(visitor).visitIdentifierPattern(identifier);
    } else {
      if ($unwrapTraitObject(__PUCK__value__20).kind == "Record") {
        var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__20),
            _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
            record = _$unwrapTraitObject81[0];

        return $unwrapTraitObject(visitor).visitRecordPattern(record);
      } else {
        if ($unwrapTraitObject(__PUCK__value__20).kind == "RecordType") {
          var _$unwrapTraitObject82 = $unwrapTraitObject(__PUCK__value__20),
              _$unwrapTraitObject83 = _slicedToArray(_$unwrapTraitObject82.value, 2),
              typePath = _$unwrapTraitObject83[0],
              _record = _$unwrapTraitObject83[1];

          $unwrapTraitObject(visitor).visitTypePath(typePath);
          return $unwrapTraitObject(visitor).visitRecordPattern(_record);
        } else {
          if ($unwrapTraitObject(__PUCK__value__20).kind == "Tuple") {
            var _$unwrapTraitObject84 = $unwrapTraitObject(__PUCK__value__20),
                _$unwrapTraitObject85 = _slicedToArray(_$unwrapTraitObject84.value, 1),
                tuple = _$unwrapTraitObject85[0];

            return $unwrapTraitObject(visitor).visitTuplePattern(tuple);
          } else {
            if ($unwrapTraitObject(__PUCK__value__20).kind == "TupleType") {
              var _$unwrapTraitObject86 = $unwrapTraitObject(__PUCK__value__20),
                  _$unwrapTraitObject87 = _slicedToArray(_$unwrapTraitObject86.value, 2),
                  _typePath = _$unwrapTraitObject87[0],
                  _tuple = _$unwrapTraitObject87[1];

              $unwrapTraitObject(visitor).visitTypePath(_typePath);
              return $unwrapTraitObject(visitor).visitTuplePattern(_tuple);
            } else {
              if ($unwrapTraitObject(__PUCK__value__20).kind == "UnitType") {
                var _$unwrapTraitObject88 = $unwrapTraitObject(__PUCK__value__20),
                    _$unwrapTraitObject89 = _slicedToArray(_$unwrapTraitObject88.value, 1),
                    _typePath2 = _$unwrapTraitObject89[0];

                return $unwrapTraitObject(visitor).visitTypePath(_typePath2);
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
    return $unwrapTraitObject(visitor).visitPattern(p.pattern);
  });
};
function walkTuplePattern(visitor, p) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true }, function (p) {
    return $unwrapTraitObject(visitor).visitPattern(p);
  });
};
function walkTypeBound(visitor, t) {
  var __PUCK__value__22 = t;
  if ($unwrapTraitObject(__PUCK__value__22).kind == "FunctionTypeBound") {
    var _$unwrapTraitObject90 = $unwrapTraitObject(__PUCK__value__22),
        _$unwrapTraitObject91 = _slicedToArray(_$unwrapTraitObject90.value, 1),
        _t = _$unwrapTraitObject91[0];

    return $unwrapTraitObject(visitor).visitFunctionTypeBound(_t);
  } else {
    if ($unwrapTraitObject(__PUCK__value__22).kind == "NamedTypeBound") {
      var _$unwrapTraitObject92 = $unwrapTraitObject(__PUCK__value__22),
          _$unwrapTraitObject93 = _slicedToArray(_$unwrapTraitObject92.value, 1),
          _t2 = _$unwrapTraitObject93[0];

      return $unwrapTraitObject(visitor).visitNamedTypeBound(_t2);
    } else {
      if ($unwrapTraitObject(__PUCK__value__22).kind == "RecordTypeBound") {
        var _$unwrapTraitObject94 = $unwrapTraitObject(__PUCK__value__22),
            _$unwrapTraitObject95 = _slicedToArray(_$unwrapTraitObject94.value, 1),
            _t3 = _$unwrapTraitObject95[0];

        return $unwrapTraitObject(visitor).visitRecordTypeBound(_t3);
      } else {
        if ($unwrapTraitObject(__PUCK__value__22).kind == "TupleTypeBound") {
          var _$unwrapTraitObject96 = $unwrapTraitObject(__PUCK__value__22),
              _$unwrapTraitObject97 = _slicedToArray(_$unwrapTraitObject96.value, 1),
              _t4 = _$unwrapTraitObject97[0];

          return $unwrapTraitObject(visitor).visitTupleTypeBound(_t4);
        };
      };
    };
  };
};
function walkFunctionTypeBound(visitor, t) {
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeParameter).bind(visitor));
  $unwrapTraitObject(visitor).visitTupleTypeBound(t.parameters);
  return $unwrapTraitObject(visitor).visitTypeBound(t.returnType);
};
function walkNamedTypeBound(visitor, t) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeBound).bind(visitor));
};
function walkRecordTypeBound(visitor, t) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true }, function (t) {
    return $unwrapTraitObject(visitor).visitRecordTypeBoundMember(t);
  });
};
function walkRecordTypeBoundMember(visitor, t) {
  return $unwrapTraitObject(visitor).visitTypeBound(t.typeBound);
};
function walkTupleTypeBound(visitor, t) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeBound).bind(visitor));
};
function walkTypeParameter(visitor, t) {
  var __PUCK__value__23 = t.defaultValue;
  if (__PUCK__value__23.kind == "Some") {
    var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1),
        defaultValue = _PUCK__value__23$val[0];

    return $unwrapTraitObject(visitor).visitTypeBound(defaultValue);
  };
}
