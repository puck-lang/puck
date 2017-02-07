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
  visitTypePathExpression: function visitTypePathExpression() {},
  visitUnaryExpression: function visitUnaryExpression() {},
  visitIndexAccess: function visitIndexAccess() {},
  visitMemberAccess: function visitMemberAccess() {},
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
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: m.statements, $isTraitObject: true }, function (s) {
    return visitor.visitTopLevelStatement(s);
  });
};
function walkTopLevelStatement(visitor, s) {
  var __PUCK__value__1 = s;
  var __PUCK__value__2 = __PUCK__value__1;
  if ($unwrapTraitObject(__PUCK__value__2).kind == "ExportDirective") {
    var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
        e = _PUCK__value__2$valu[0];

    return visitor.visitExportDirective(e);
  } else {
    var __PUCK__value__3 = __PUCK__value__1;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "ImportDirective") {
      var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
          _e = _PUCK__value__3$valu[0];

      return visitor.visitImportDirective(_e);
    } else {
      var __PUCK__value__4 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__4).kind == "EnumDeclaration") {
        var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
            _e2 = _PUCK__value__4$valu[0];

        return visitor.visitEnumDeclaration(_e2);
      } else {
        var __PUCK__value__5 = __PUCK__value__1;
        if ($unwrapTraitObject(__PUCK__value__5).kind == "ImplDeclaration") {
          var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
              _e3 = _PUCK__value__5$valu[0];

          return visitor.visitImplDeclaration(_e3);
        } else {
          var __PUCK__value__6 = __PUCK__value__1;
          if ($unwrapTraitObject(__PUCK__value__6).kind == "ImplShorthandDeclaration") {
            var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1),
                _e4 = _PUCK__value__6$valu[0];

            return visitor.visitImplShorthandDeclaration(_e4);
          } else {
            var __PUCK__value__7 = __PUCK__value__1;
            if ($unwrapTraitObject(__PUCK__value__7).kind == "TraitDeclaration") {
              var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1),
                  _e5 = _PUCK__value__7$valu[0];

              return visitor.visitTraitDeclaration(_e5);
            } else {
              var __PUCK__value__8 = __PUCK__value__1;
              if ($unwrapTraitObject(__PUCK__value__8).kind == "TypeDeclaration") {
                var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1),
                    _e6 = _PUCK__value__8$valu[0];

                return visitor.visitTypeDeclaration(_e6);
              } else {
                var __PUCK__value__9 = __PUCK__value__1;
                if ($unwrapTraitObject(__PUCK__value__9).kind == "BlockLevelStatement") {
                  var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
                      _e7 = _PUCK__value__9$valu[0];

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
    var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
        e = _PUCK__value__11$val[0];

    return visitor.visitBlock(e);
  } else {
    var __PUCK__value__12 = __PUCK__value__10;
    if ($unwrapTraitObject(__PUCK__value__12).kind == "BreakStatement") {
      var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1),
          _e8 = _PUCK__value__12$val[0];

      return visitor.visitBreak(_e8);
    } else {
      var __PUCK__value__13 = __PUCK__value__10;
      if ($unwrapTraitObject(__PUCK__value__13).kind == "ReturnStatement") {
        var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1),
            _e9 = _PUCK__value__13$val[0];

        return visitor.visitReturn(_e9);
      } else {
        var __PUCK__value__14 = __PUCK__value__10;
        if ($unwrapTraitObject(__PUCK__value__14).kind == "WhileLoop") {
          var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
              _e10 = _PUCK__value__14$val[0];

          return visitor.visitWhileLoop(_e10);
        } else {
          var __PUCK__value__15 = __PUCK__value__10;
          if ($unwrapTraitObject(__PUCK__value__15).kind == "Expression") {
            var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
                _e11 = _PUCK__value__15$val[0];

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
    var _PUCK__value__17$val = _slicedToArray(__PUCK__value__17.value, 1),
        _e12 = _PUCK__value__17$val[0];

    return visitor.visitExpression(_e12.expression);
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
            _e13 = _PUCK__value__21$val[0];

        return visitor.visitIdentifier(_e13);
      } else {
        var __PUCK__value__22 = __PUCK__value__16;
        if ($unwrapTraitObject(__PUCK__value__22).kind == "FunctionDeclaration") {
          var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1),
              _e14 = _PUCK__value__22$val[0];

          return visitor.visitFunctionDeclaration(_e14);
        } else {
          var __PUCK__value__23 = __PUCK__value__16;
          if ($unwrapTraitObject(__PUCK__value__23).kind == "VariableDeclaration") {
            var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1),
                _e15 = _PUCK__value__23$val[0];

            return visitor.visitVariableDeclaration(_e15);
          } else {
            var __PUCK__value__24 = __PUCK__value__16;
            if ($unwrapTraitObject(__PUCK__value__24).kind == "AssignmentExpression") {
              var _PUCK__value__24$val = _slicedToArray(__PUCK__value__24.value, 1),
                  _e16 = _PUCK__value__24$val[0];

              return visitor.visitAssignmentExpression(_e16);
            } else {
              var __PUCK__value__25 = __PUCK__value__16;
              if ($unwrapTraitObject(__PUCK__value__25).kind == "BinaryExpression") {
                var _PUCK__value__25$val = _slicedToArray(__PUCK__value__25.value, 1),
                    _e17 = _PUCK__value__25$val[0];

                return visitor.visitBinaryExpression(_e17);
              } else {
                var __PUCK__value__26 = __PUCK__value__16;
                if ($unwrapTraitObject(__PUCK__value__26).kind == "CallExpression") {
                  var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
                      _e18 = _PUCK__value__26$val[0];

                  return visitor.visitCallExpression(_e18);
                } else {
                  var __PUCK__value__27 = __PUCK__value__16;
                  if ($unwrapTraitObject(__PUCK__value__27).kind == "IfExpression") {
                    var _PUCK__value__27$val = _slicedToArray(__PUCK__value__27.value, 1),
                        _e19 = _PUCK__value__27$val[0];

                    return visitor.visitIfExpression(_e19);
                  } else {
                    var __PUCK__value__28 = __PUCK__value__16;
                    if ($unwrapTraitObject(__PUCK__value__28).kind == "IfLetExpression") {
                      var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
                          _e20 = _PUCK__value__28$val[0];

                      return visitor.visitIfLetExpression(_e20);
                    } else {
                      var __PUCK__value__29 = __PUCK__value__16;
                      if ($unwrapTraitObject(__PUCK__value__29).kind == "MatchExpression") {
                        var _PUCK__value__29$val = _slicedToArray(__PUCK__value__29.value, 1),
                            _e21 = _PUCK__value__29$val[0];

                        return visitor.visitMatchExpression(_e21);
                      } else {
                        var __PUCK__value__30 = __PUCK__value__16;
                        if ($unwrapTraitObject(__PUCK__value__30).kind == "TypePathExpression") {
                          var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1),
                              _e22 = _PUCK__value__30$val[0];

                          return visitor.visitTypePathExpression(_e22);
                        } else {
                          var __PUCK__value__31 = __PUCK__value__16;
                          if ($unwrapTraitObject(__PUCK__value__31).kind == "UnaryExpression") {
                            var _PUCK__value__31$val = _slicedToArray(__PUCK__value__31.value, 1),
                                _e23 = _PUCK__value__31$val[0];

                            return visitor.visitUnaryExpression(_e23);
                          } else {
                            var __PUCK__value__32 = __PUCK__value__16;
                            if ($unwrapTraitObject(__PUCK__value__32).kind == "IndexAccess") {
                              var _PUCK__value__32$val = _slicedToArray(__PUCK__value__32.value, 1),
                                  _e24 = _PUCK__value__32$val[0];

                              return visitor.visitIndexAccess(_e24);
                            } else {
                              var __PUCK__value__33 = __PUCK__value__16;
                              if ($unwrapTraitObject(__PUCK__value__33).kind == "MemberAccess") {
                                var _PUCK__value__33$val = _slicedToArray(__PUCK__value__33.value, 1),
                                    _e25 = _PUCK__value__33$val[0];

                                return visitor.visitMemberAccess(_e25);
                              } else {
                                var __PUCK__value__34 = __PUCK__value__16;
                                if ($unwrapTraitObject(__PUCK__value__34).kind == "BooleanLiteral") {
                                  var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1),
                                      _e26 = _PUCK__value__34$val[0];

                                  return visitor.visitBooleanLiteral(_e26);
                                } else {
                                  var __PUCK__value__35 = __PUCK__value__16;
                                  if ($unwrapTraitObject(__PUCK__value__35).kind == "ListLiteral") {
                                    var _PUCK__value__35$val = _slicedToArray(__PUCK__value__35.value, 1),
                                        _e27 = _PUCK__value__35$val[0];

                                    return visitor.visitListLiteral(_e27);
                                  } else {
                                    var __PUCK__value__36 = __PUCK__value__16;
                                    if ($unwrapTraitObject(__PUCK__value__36).kind == "NumberLiteral") {
                                      var _PUCK__value__36$val = _slicedToArray(__PUCK__value__36.value, 1),
                                          _e28 = _PUCK__value__36$val[0];

                                      return visitor.visitNumberLiteral(_e28);
                                    } else {
                                      var __PUCK__value__37 = __PUCK__value__16;
                                      if ($unwrapTraitObject(__PUCK__value__37).kind == "RecordLiteral") {
                                        var _PUCK__value__37$val = _slicedToArray(__PUCK__value__37.value, 1),
                                            _e29 = _PUCK__value__37$val[0];

                                        return visitor.visitRecordLiteral(_e29);
                                      } else {
                                        var __PUCK__value__38 = __PUCK__value__16;
                                        if ($unwrapTraitObject(__PUCK__value__38).kind == "StringLiteral") {
                                          var _PUCK__value__38$val = _slicedToArray(__PUCK__value__38.value, 1),
                                              _e30 = _PUCK__value__38$val[0];

                                          return visitor.visitStringLiteral(_e30);
                                        } else {
                                          var __PUCK__value__39 = __PUCK__value__16;
                                          if ($unwrapTraitObject(__PUCK__value__39).kind == "TupleLiteral") {
                                            var _PUCK__value__39$val = _slicedToArray(__PUCK__value__39.value, 1),
                                                _e31 = _PUCK__value__39$val[0];

                                            return visitor.visitTupleLiteral(_e31);
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
  _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: e.typeParameters, $isTraitObject: true }, function (t) {
    return visitor.visitTypeParameter(t);
  });
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: e.members, $isTraitObject: true }, function (t) {
    return visitor.visitEnumMember(t);
  });
};
function walkEnumMember(visitor, e) {
  var __PUCK__value__40 = e.bound;
  if ($unwrapTraitObject(__PUCK__value__40).kind == "Some") {
    var _PUCK__value__40$val = _slicedToArray(__PUCK__value__40.value, 1),
        typeBound = _PUCK__value__40$val[0];

    return visitor.visitTypeBound(typeBound);
  };
};
function walkImplDeclaration(visitor, i) {
  _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeParameter).bind(visitor));
  visitor.visitTypeBound(i.trait_);
  visitor.visitTypeBound(i.type_);
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, $unwrapTraitObject(visitor.visitFunctionDeclaration).bind(visitor));
};
function walkImplShorthandDeclaration(visitor, i) {
  _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeParameter).bind(visitor));
  visitor.visitTypeBound(i.type_);
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, $unwrapTraitObject(visitor.visitFunctionDeclaration).bind(visitor));
};
function walkTraitDeclaration(visitor, t) {
  if (t.typeParameters) {
    _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeParameter).bind(visitor));
  };
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.members, $isTraitObject: true }, function (t) {
    return visitor.visitFunctionDeclaration(t);
  });
};
function walkTypeDeclaration(visitor, t) {
  _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.typeParameters, $isTraitObject: true }, function (t) {
    return visitor.visitTypeParameter(t);
  });
  var __PUCK__value__41 = t.bound;
  if ($unwrapTraitObject(__PUCK__value__41).kind == "Some") {
    var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 1),
        typeBound = _PUCK__value__41$val[0];

    return visitor.visitTypeBound(typeBound);
  };
};
function walkExportDirective(visitor, e) {
  var __PUCK__value__42 = e.statement;
  var __PUCK__value__43 = __PUCK__value__42;
  if ($unwrapTraitObject(__PUCK__value__43).kind == "EnumDeclaration") {
    var _PUCK__value__43$val = _slicedToArray(__PUCK__value__43.value, 1),
        d = _PUCK__value__43$val[0];

    return visitor.visitEnumDeclaration(d);
  } else {
    var __PUCK__value__44 = __PUCK__value__42;
    if ($unwrapTraitObject(__PUCK__value__44).kind == "FunctionDeclaration") {
      var _PUCK__value__44$val = _slicedToArray(__PUCK__value__44.value, 1),
          _d = _PUCK__value__44$val[0];

      return visitor.visitFunctionDeclaration(_d);
    } else {
      var __PUCK__value__45 = __PUCK__value__42;
      if ($unwrapTraitObject(__PUCK__value__45).kind == "TraitDeclaration") {
        var _PUCK__value__45$val = _slicedToArray(__PUCK__value__45.value, 1),
            _d2 = _PUCK__value__45$val[0];

        return visitor.visitTraitDeclaration(_d2);
      } else {
        var __PUCK__value__46 = __PUCK__value__42;
        if ($unwrapTraitObject(__PUCK__value__46).kind == "TypeDeclaration") {
          var _PUCK__value__46$val = _slicedToArray(__PUCK__value__46.value, 1),
              _d3 = _PUCK__value__46$val[0];

          return visitor.visitTypeDeclaration(_d3);
        } else {
          var __PUCK__value__47 = __PUCK__value__42;
          if ($unwrapTraitObject(__PUCK__value__47).kind == "VariableDeclaration") {
            var _PUCK__value__47$val = _slicedToArray(__PUCK__value__47.value, 1),
                _d4 = _PUCK__value__47$val[0];

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
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: o.members, $isTraitObject: true }, function (m) {
    visitor.visitIdentifier(m.property);
    return visitor.visitIdentifier(m.local);
  });
};
function walkBlock(visitor, b) {
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: b.statements, $isTraitObject: true }, function (s) {
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
    _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: f.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeParameter).bind(visitor));
  };
  _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: f.parameterList, $isTraitObject: true }, $unwrapTraitObject(visitor.visitVariableDeclaration).bind(visitor));
  var __PUCK__value__48 = f.returnType;
  if ($unwrapTraitObject(__PUCK__value__48).kind == "Some") {
    var _PUCK__value__48$val = _slicedToArray(__PUCK__value__48.value, 1),
        returnType = _PUCK__value__48$val[0];

    visitor.visitTypeBound(returnType);
  };
  var __PUCK__value__49 = f.body;
  if ($unwrapTraitObject(__PUCK__value__49).kind == "Some") {
    var _PUCK__value__49$val = _slicedToArray(__PUCK__value__49.value, 1),
        body = _PUCK__value__49$val[0];

    return visitor.visitBlock(body);
  };
};
function walkVariableDeclaration(visitor, d) {
  visitor.visitPattern(d.pattern);
  var __PUCK__value__50 = d.typeBound;
  if ($unwrapTraitObject(__PUCK__value__50).kind == "Some") {
    var _PUCK__value__50$val = _slicedToArray(__PUCK__value__50.value, 1),
        typeBound = _PUCK__value__50$val[0];

    visitor.visitTypeBound(typeBound);
  };
  var __PUCK__value__51 = d.initializer;
  if ($unwrapTraitObject(__PUCK__value__51).kind == "Some") {
    var _PUCK__value__51$val = _slicedToArray(__PUCK__value__51.value, 1),
        initializer = _PUCK__value__51$val[0];

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
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: e.argumentList, $isTraitObject: true }, $unwrapTraitObject(visitor.visitExpression).bind(visitor));
};
function walkIfExpression(visitor, e) {
  visitor.visitExpression(e.condition);
  visitor.visitBlock(e.then_);
  var __PUCK__value__52 = e.else_;
  if ($unwrapTraitObject(__PUCK__value__52).kind == "Some") {
    var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1),
        else_ = _PUCK__value__52$val[0];

    return visitor.visitBlock(else_);
  };
};
function walkIfLetExpression(visitor, e) {
  visitor.visitPattern(e.pattern);
  visitor.visitExpression(e.expression);
  visitor.visitBlock(e.then_);
  var __PUCK__value__53 = e.else_;
  if ($unwrapTraitObject(__PUCK__value__53).kind == "Some") {
    var _PUCK__value__53$val = _slicedToArray(__PUCK__value__53.value, 1),
        else_ = _PUCK__value__53$val[0];

    return visitor.visitBlock(else_);
  };
};
function walkMatchExpression(visitor, e) {
  visitor.visitExpression(e.expression);
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true }, function (p) {
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
function walkBooleanLiteral(visitor, l) {};
function walkListLiteral(visitor, l) {
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: l.members, $isTraitObject: true }, $unwrapTraitObject(visitor.visitExpression).bind(visitor));
};
function walkNumberLiteral(visitor, l) {};
function walkRecordLiteral(visitor, l) {
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: l.members, $isTraitObject: true }, function (m) {
    visitor.visitIdentifier(m.name);
    return visitor.visitExpression(m.value);
  });
};
function walkStringLiteral(visitor, l) {
  return $unwrapTraitObject($unwrapTraitObject(l.parts).filter(function (p) {
    return $unwrapTraitObject(p).kind == $unwrapTraitObject(_ast2.SyntaxKind).Identifier;
  })).forEach($unwrapTraitObject(visitor.visitIdentifier).bind(visitor));
};
function walkTupleLiteral(visitor, l) {
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: l.expressions, $isTraitObject: true }, $unwrapTraitObject(visitor.visitExpression).bind(visitor));
};
function walkPattern(visitor, p) {
  var __PUCK__value__54 = p;
  var __PUCK__value__55 = __PUCK__value__54;
  if ($unwrapTraitObject(__PUCK__value__55).kind == "CatchAll") {
    var __PUCK__value__56 = __PUCK__value__55;;
    var _undefined = __PUCK__value__56;;
    return __PUCK__value__56;
  } else {
    var __PUCK__value__57 = __PUCK__value__54;
    if ($unwrapTraitObject(__PUCK__value__57).kind == "Identifier") {
      var _PUCK__value__57$val = _slicedToArray(__PUCK__value__57.value, 1),
          identifier = _PUCK__value__57$val[0];

      return visitor.visitIdentifierPattern(identifier);
    } else {
      var __PUCK__value__58 = __PUCK__value__54;
      if ($unwrapTraitObject(__PUCK__value__58).kind == "Record") {
        var _PUCK__value__58$val = _slicedToArray(__PUCK__value__58.value, 1),
            record = _PUCK__value__58$val[0];

        return visitor.visitRecordPattern(record);
      } else {
        var __PUCK__value__59 = __PUCK__value__54;
        if ($unwrapTraitObject(__PUCK__value__59).kind == "RecordType") {
          var _PUCK__value__59$val = _slicedToArray(__PUCK__value__59.value, 2),
              typePath = _PUCK__value__59$val[0],
              _record = _PUCK__value__59$val[1];

          return visitor.visitRecordPattern(_record);
        } else {
          var __PUCK__value__60 = __PUCK__value__54;
          if ($unwrapTraitObject(__PUCK__value__60).kind == "Tuple") {
            var _PUCK__value__60$val = _slicedToArray(__PUCK__value__60.value, 1),
                tuple = _PUCK__value__60$val[0];

            return visitor.visitTuplePattern(tuple);
          } else {
            var __PUCK__value__61 = __PUCK__value__54;
            if ($unwrapTraitObject(__PUCK__value__61).kind == "TupleType") {
              var _PUCK__value__61$val = _slicedToArray(__PUCK__value__61.value, 2),
                  _typePath = _PUCK__value__61$val[0],
                  _tuple = _PUCK__value__61$val[1];

              return visitor.visitTuplePattern(_tuple);
            } else {
              var __PUCK__value__62 = __PUCK__value__54;
              if ($unwrapTraitObject(__PUCK__value__62).kind == "UnitType") {
                var __PUCK__value__63 = __PUCK__value__62;;
                var _undefined2 = __PUCK__value__63;;
                return __PUCK__value__63;
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
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: p.properties, $isTraitObject: true }, function (p) {
    if (p.local) {
      return visitor.visitPattern(p.local);
    };
  });
};
function walkTuplePattern(visitor, p) {
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: p.properties, $isTraitObject: true }, function (p) {
    return visitor.visitPattern(p);
  });
};
function walkTypeBound(visitor, t) {
  var __PUCK__value__64 = t;
  var __PUCK__value__65 = __PUCK__value__64;
  if ($unwrapTraitObject(__PUCK__value__65).kind == "FunctionTypeBound") {
    var _PUCK__value__65$val = _slicedToArray(__PUCK__value__65.value, 1),
        _t = _PUCK__value__65$val[0];

    return visitor.visitFunctionTypeBound(_t);
  } else {
    var __PUCK__value__66 = __PUCK__value__64;
    if ($unwrapTraitObject(__PUCK__value__66).kind == "NamedTypeBound") {
      var _PUCK__value__66$val = _slicedToArray(__PUCK__value__66.value, 1),
          _t2 = _PUCK__value__66$val[0];

      return visitor.visitNamedTypeBound(_t2);
    } else {
      var __PUCK__value__67 = __PUCK__value__64;
      if ($unwrapTraitObject(__PUCK__value__67).kind == "RecordTypeBound") {
        var _PUCK__value__67$val = _slicedToArray(__PUCK__value__67.value, 1),
            _t3 = _PUCK__value__67$val[0];

        return visitor.visitRecordTypeBound(_t3);
      } else {
        var __PUCK__value__68 = __PUCK__value__64;
        if ($unwrapTraitObject(__PUCK__value__68).kind == "TupleTypeBound") {
          var _PUCK__value__68$val = _slicedToArray(__PUCK__value__68.value, 1),
              _t4 = _PUCK__value__68$val[0];

          return visitor.visitTupleTypeBound(_t4);
        };
      };
    };
  };
};
function walkFunctionTypeBound(visitor, t) {
  _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeParameter).bind(visitor));
  visitor.visitTupleTypeBound(t.parameters);
  return visitor.visitTypeBound(t.returnType);
};
function walkNamedTypeBound(visitor, t) {
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.typeParameters, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeBound).bind(visitor));
};
function walkRecordTypeBound(visitor, t) {
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.properties, $isTraitObject: true }, function (t) {
    return visitor.visitRecordTypeBoundMember(t);
  });
};
function walkRecordTypeBoundMember(visitor, t) {
  return visitor.visitTypeBound(t.typeBound);
};
function walkTupleTypeBound(visitor, t) {
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.properties, $isTraitObject: true }, $unwrapTraitObject(visitor.visitTypeBound).bind(visitor));
};
function walkTypeParameter(visitor, t) {
  var __PUCK__value__69 = t.defaultValue;
  if ($unwrapTraitObject(__PUCK__value__69).kind == "Some") {
    var _PUCK__value__69$val = _slicedToArray(__PUCK__value__69.value, 1),
        defaultValue = _PUCK__value__69$val[0];

    return visitor.visitTypeBound(defaultValue);
  };
}
