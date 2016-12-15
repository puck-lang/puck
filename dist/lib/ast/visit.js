#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyVisitor = exports.walkingVisitor = exports.Visitor = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.walkExpression = walkExpression;
exports.walkBlock = walkBlock;
exports.walkEnumDeclaration = walkEnumDeclaration;
exports.walkEnumMember = walkEnumMember;
exports.walkFunction = walkFunction;
exports.walkIdentifier = walkIdentifier;
exports.walkImplDeclaration = walkImplDeclaration;
exports.walkModule = walkModule;
exports.walkObjectDestructure = walkObjectDestructure;
exports.walkTraitDeclaration = walkTraitDeclaration;
exports.walkTypeBound = walkTypeBound;
exports.walkFunctionTypeBound = walkFunctionTypeBound;
exports.walkNamedTypeBound = walkNamedTypeBound;
exports.walkObjectTypeBound = walkObjectTypeBound;
exports.walkTupleTypeBound = walkTupleTypeBound;
exports.walkTypeDeclaration = walkTypeDeclaration;
exports.walkTypeParameter = walkTypeParameter;
exports.walkTypeProperty = walkTypeProperty;
exports.walkVariableDeclaration = walkVariableDeclaration;
exports.walkExportDirective = walkExportDirective;
exports.walkImportDirective = walkImportDirective;
exports.walkPattern = walkPattern;
exports.walkIdentifierPattern = walkIdentifierPattern;
exports.walkRecordPattern = walkRecordPattern;
exports.walkTuplePattern = walkTuplePattern;
exports.walkAssignmentExpression = walkAssignmentExpression;
exports.walkBinaryExpression = walkBinaryExpression;
exports.walkCallExpression = walkCallExpression;
exports.walkForExpression = walkForExpression;
exports.walkIfExpression = walkIfExpression;
exports.walkIfLetExpression = walkIfLetExpression;
exports.walkLoopExpression = walkLoopExpression;
exports.walkMatchExpression = walkMatchExpression;
exports.walkMatchArm = walkMatchArm;
exports.walkUnaryExpression = walkUnaryExpression;
exports.walkWhileExpression = walkWhileExpression;
exports.walkIndexAccess = walkIndexAccess;
exports.walkMemberAccess = walkMemberAccess;
exports.walkBreak = walkBreak;
exports.walkReturn = walkReturn;
exports.walkBooleanLiteral = walkBooleanLiteral;
exports.walkListLiteral = walkListLiteral;
exports.walkNumberLiteral = walkNumberLiteral;
exports.walkObjectLiteral = walkObjectLiteral;
exports.walkStringLiteral = walkStringLiteral;
exports.walkTupleLiteral = walkTupleLiteral;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _ast = require('./ast.js');

var _ast2 = require('./../compiler/ast.js');

var Visitor = exports.Visitor = function Visitor(object) {
  return object;
};
var walkingVisitor = exports.walkingVisitor = {
  visitExpression: function visitExpression(e) {
    var self = this;
    return walkExpression(self, e);
  },
  visitBlock: function visitBlock(b) {
    var self = this;
    return walkBlock(self, b);
  },
  visitEnumDeclaration: function visitEnumDeclaration(e) {
    var self = this;
    return walkEnumDeclaration(self, e);
  },
  visitEnumMember: function visitEnumMember(e) {
    var self = this;
    return walkEnumMember(self, e);
  },
  visitFunctionDeclaration: function visitFunctionDeclaration(f) {
    var self = this;
    return walkFunction(self, f);
  },
  visitIdentifier: function visitIdentifier(i) {
    var self = this;
    return walkIdentifier(self, i);
  },
  visitImplDeclaration: function visitImplDeclaration(i) {
    var self = this;
    return walkImplDeclaration(self, i);
  },
  visitModule: function visitModule(m) {
    var self = this;
    return walkModule(self, m);
  },
  visitObjectDestructure: function visitObjectDestructure(o) {
    var self = this;
    return walkObjectDestructure(self, o);
  },
  visitTraitDeclaration: function visitTraitDeclaration(t) {
    var self = this;
    return walkTraitDeclaration(self, t);
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
  visitObjectTypeBound: function visitObjectTypeBound(t) {
    var self = this;
    return walkObjectTypeBound(self, t);
  },
  visitTupleTypeBound: function visitTupleTypeBound(t) {
    var self = this;
    return walkTupleTypeBound(self, t);
  },
  visitTypeDeclaration: function visitTypeDeclaration(t) {
    var self = this;
    return walkTypeDeclaration(self, t);
  },
  visitTypeParameter: function visitTypeParameter(t) {
    var self = this;
    return walkTypeParameter(self, t);
  },
  visitTypeProperty: function visitTypeProperty(t) {
    var self = this;
    return walkTypeProperty(self, t);
  },
  visitVariableDeclaration: function visitVariableDeclaration(d) {
    var self = this;
    return walkVariableDeclaration(self, d);
  },
  visitExportDirective: function visitExportDirective(e) {
    var self = this;
    return walkExportDirective(self, e);
  },
  visitImportDirective: function visitImportDirective(i) {
    var self = this;
    return walkImportDirective(self, i);
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
  visitForExpression: function visitForExpression(e) {
    var self = this;
    return walkForExpression(self, e);
  },
  visitIfExpression: function visitIfExpression(e) {
    var self = this;
    return walkIfExpression(self, e);
  },
  visitIfLetExpression: function visitIfLetExpression(e) {
    var self = this;
    return walkIfLetExpression(self, e);
  },
  visitLoopExpression: function visitLoopExpression(e) {
    var self = this;
    return walkLoopExpression(self, e);
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
  visitWhileExpression: function visitWhileExpression(e) {
    var self = this;
    return walkWhileExpression(self, e);
  },
  visitIndexAccess: function visitIndexAccess(a) {
    var self = this;
    return walkIndexAccess(self, a);
  },
  visitMemberAccess: function visitMemberAccess(a) {
    var self = this;
    return walkMemberAccess(self, a);
  },
  visitBreak: function visitBreak(b) {
    var self = this;
    return walkBreak(self, b);
  },
  visitReturn: function visitReturn(r) {
    var self = this;
    return walkReturn(self, r);
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
  visitObjectLiteral: function visitObjectLiteral(l) {
    var self = this;
    return walkObjectLiteral(self, l);
  },
  visitStringLiteral: function visitStringLiteral(l) {
    var self = this;
    return walkStringLiteral(self, l);
  },
  visitTupleLiteral: function visitTupleLiteral(l) {
    var self = this;
    return walkTupleLiteral(self, l);
  }
};
var emptyVisitor = exports.emptyVisitor = {
  visitExpression: function visitExpression(e) {
    var self = this;
    return walkExpression(self, e);
  },
  visitBlock: function visitBlock() {},
  visitEnumDeclaration: function visitEnumDeclaration() {},
  visitEnumMember: function visitEnumMember() {},
  visitFunctionDeclaration: function visitFunctionDeclaration() {},
  visitIdentifier: function visitIdentifier() {},
  visitImplDeclaration: function visitImplDeclaration() {},
  visitModule: function visitModule() {},
  visitObjectDestructure: function visitObjectDestructure() {},
  visitTraitDeclaration: function visitTraitDeclaration() {},
  visitTypeBound: function visitTypeBound(t) {
    var self = this;
    return walkTypeBound(self, t);
  },
  visitFunctionTypeBound: function visitFunctionTypeBound() {},
  visitNamedTypeBound: function visitNamedTypeBound() {},
  visitObjectTypeBound: function visitObjectTypeBound() {},
  visitTupleTypeBound: function visitTupleTypeBound() {},
  visitTypeDeclaration: function visitTypeDeclaration() {},
  visitTypeParameter: function visitTypeParameter() {},
  visitTypePath: function visitTypePath() {},
  visitTypeProperty: function visitTypeProperty() {},
  visitVariableDeclaration: function visitVariableDeclaration() {},
  visitExportDirective: function visitExportDirective() {},
  visitImportDirective: function visitImportDirective() {},
  visitPattern: function visitPattern() {},
  visitIdentifierPattern: function visitIdentifierPattern() {},
  visitRecordPattern: function visitRecordPattern() {},
  visitTuplePattern: function visitTuplePattern() {},
  visitAssignmentExpression: function visitAssignmentExpression() {},
  visitBinaryExpression: function visitBinaryExpression() {},
  visitCallExpression: function visitCallExpression() {},
  visitForExpression: function visitForExpression() {},
  visitIfExpression: function visitIfExpression() {},
  visitIfLetExpression: function visitIfLetExpression() {},
  visitLoopExpression: function visitLoopExpression() {},
  visitMatchExpression: function visitMatchExpression() {},
  visitMatchArm: function visitMatchArm() {},
  visitTypePathExpression: function visitTypePathExpression() {},
  visitUnaryExpression: function visitUnaryExpression() {},
  visitWhileExpression: function visitWhileExpression() {},
  visitIndexAccess: function visitIndexAccess() {},
  visitMemberAccess: function visitMemberAccess() {},
  visitBreak: function visitBreak() {},
  visitReturn: function visitReturn() {},
  visitListLiteral: function visitListLiteral() {},
  visitBooleanLiteral: function visitBooleanLiteral() {},
  visitNumberLiteral: function visitNumberLiteral() {},
  visitObjectLiteral: function visitObjectLiteral() {},
  visitStringLiteral: function visitStringLiteral() {},
  visitTupleLiteral: function visitTupleLiteral() {}
};
function walkExpression(visitor, e) {
  if (e.kind == _ast2.SyntaxKind.Block) {
    return visitor.visitBlock(e);
  } else {
    if (e.kind == _ast2.SyntaxKind.EnumDeclaration) {
      return visitor.visitEnumDeclaration(e);
    } else {
      if (e.kind == _ast2.SyntaxKind.Function) {
        return visitor.visitFunctionDeclaration(e);
      } else {
        if (e.kind == _ast2.SyntaxKind.Identifier) {
          return visitor.visitIdentifier(e);
        } else {
          if (e.kind == _ast2.SyntaxKind.ImplDeclaration) {
            return visitor.visitImplDeclaration(e);
          } else {
            if (e.kind == _ast2.SyntaxKind.ObjectDestructure) {
              return visitor.visitObjectDestructure(e);
            } else {
              if (e.kind == _ast2.SyntaxKind.TraitDeclaration) {
                return visitor.visitTraitDeclaration(e);
              } else {
                if (e.kind == _ast2.SyntaxKind.FunctionTypeBound) {
                  return visitor.visitFunctionTypeBound(e);
                } else {
                  if (e.kind == _ast2.SyntaxKind.NamedTypeBound) {
                    return visitor.visitNamedTypeBound(e);
                  } else {
                    if (e.kind == _ast2.SyntaxKind.ObjectTypeBound) {
                      return visitor.visitObjectTypeBound(e);
                    } else {
                      if (e.kind == _ast2.SyntaxKind.TupleTypeBound) {
                        return visitor.visitTupleTypeBound(e);
                      } else {
                        if (e.kind == _ast2.SyntaxKind.TypeDeclaration) {
                          return visitor.visitTypeDeclaration(e);
                        } else {
                          if (e.kind == _ast2.SyntaxKind.TypeParameter) {
                            return visitor.visitTypeParameter(e);
                          } else {
                            if (e.kind == _ast2.SyntaxKind.TypeProperty) {
                              return visitor.visitTypeProperty(e);
                            } else {
                              if (e.kind == _ast2.SyntaxKind.VariableDeclaration) {
                                return visitor.visitVariableDeclaration(e);
                              } else {
                                if (e.kind == _ast2.SyntaxKind.ExportDirective) {
                                  return visitor.visitExportDirective(e);
                                } else {
                                  if (e.kind == _ast2.SyntaxKind.ImportDirective) {
                                    return visitor.visitImportDirective(e);
                                  } else {
                                    if (e.kind == _ast2.SyntaxKind.Pattern) {
                                      return visitor.visitPattern(e);
                                    } else {
                                      if (e.kind == _ast2.SyntaxKind.AssignmentExpression) {
                                        return visitor.visitAssignmentExpression(e);
                                      } else {
                                        if (e.kind == _ast2.SyntaxKind.BinaryExpression) {
                                          return visitor.visitBinaryExpression(e);
                                        } else {
                                          if (e.kind == _ast2.SyntaxKind.CallExpression) {
                                            return visitor.visitCallExpression(e);
                                          } else {
                                            if (e.kind == _ast2.SyntaxKind.ForExpression) {
                                              return visitor.visitForExpression(e);
                                            } else {
                                              if (e.kind == _ast2.SyntaxKind.IfExpression) {
                                                return visitor.visitIfExpression(e);
                                              } else {
                                                if (e.kind == _ast2.SyntaxKind.IfLetExpression) {
                                                  return visitor.visitIfLetExpression(e);
                                                } else {
                                                  if (e.kind == _ast2.SyntaxKind.LoopExpression) {
                                                    return visitor.visitLoopExpression(e);
                                                  } else {
                                                    if (e.kind == _ast2.SyntaxKind.MatchExpression) {
                                                      return visitor.visitMatchExpression(e);
                                                    } else {
                                                      if (e.kind == _ast2.SyntaxKind.TypePathExpression) {
                                                        return visitor.visitTypePathExpression(e);
                                                      } else {
                                                        if (e.kind == _ast2.SyntaxKind.UnaryExpression) {
                                                          return visitor.visitUnaryExpression(e);
                                                        } else {
                                                          if (e.kind == _ast2.SyntaxKind.WhileExpression) {
                                                            return visitor.visitWhileExpression(e);
                                                          } else {
                                                            if (e.kind == _ast2.SyntaxKind.IndexAccess) {
                                                              return visitor.visitIndexAccess(e);
                                                            } else {
                                                              if (e.kind == _ast2.SyntaxKind.MemberAccess) {
                                                                return visitor.visitMemberAccess(e);
                                                              } else {
                                                                if (e.kind == _ast2.SyntaxKind.BreakKeyword) {
                                                                  return visitor.visitBreak(e);
                                                                } else {
                                                                  if (e.kind == _ast2.SyntaxKind.ReturnStatement) {
                                                                    return visitor.visitReturn(e);
                                                                  } else {
                                                                    if (e.kind == _ast2.SyntaxKind.ListLiteral) {
                                                                      return visitor.visitListLiteral(e);
                                                                    } else {
                                                                      if (e.kind == _ast2.SyntaxKind.BooleanLiteral) {
                                                                        return visitor.visitBooleanLiteral(e);
                                                                      } else {
                                                                        if (e.kind == _ast2.SyntaxKind.NumberLiteral) {
                                                                          return visitor.visitNumberLiteral(e);
                                                                        } else {
                                                                          if (e.kind == _ast2.SyntaxKind.ObjectLiteral) {
                                                                            return visitor.visitObjectLiteral(e);
                                                                          } else {
                                                                            if (e.kind == _ast2.SyntaxKind.StringLiteral) {
                                                                              return visitor.visitStringLiteral(e);
                                                                            } else {
                                                                              if (e.kind == _ast2.SyntaxKind.TupleLiteral) {
                                                                                return visitor.visitTupleLiteral(e);
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
function walkBlock(visitor, b) {
  return b.expressions.forEach(visitor.visitExpression.bind(visitor));
};
function walkEnumDeclaration(visitor, e) {
  e.typeParameters.forEach(function (t) {
    return visitor.visitTypeParameter(t);
  });
  return e.members.forEach(function (t) {
    return visitor.visitEnumMember(t);
  });
};
function walkEnumMember(visitor, e) {
  var __PUCK__value__1 = e.bound;
  if (__PUCK__value__1.kind == "Some") {
    var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1);

    var typeBound = _PUCK__value__1$valu[0];

    return visitor.visitTypeBound(typeBound);
  };
};
function walkFunction(visitor, f) {
  if (f.typeParameters) {
    f.typeParameters.forEach(visitor.visitTypeParameter.bind(visitor));
  };
  f.parameterList.forEach(visitor.visitVariableDeclaration.bind(visitor));
  var __PUCK__value__2 = f.returnType;
  if (__PUCK__value__2.kind == "Some") {
    var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1);

    var returnType = _PUCK__value__2$valu[0];

    visitor.visitTypeBound(returnType);
  };
  var __PUCK__value__3 = f.body;
  if (__PUCK__value__3.kind == "Some") {
    var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1);

    var body = _PUCK__value__3$valu[0];

    return visitor.visitBlock(body);
  };
};
function walkIdentifier(visitor, i) {};
function walkImplDeclaration(visitor, i) {
  if (i.typeParameters) {
    i.typeParameters.forEach(visitor.visitTypeParameter.bind(visitor));
  };
  visitor.visitTypeBound(i.trait_);
  visitor.visitTypeBound(i.type_);
  return i.members.forEach(visitor.visitFunctionDeclaration.bind(visitor));
};
function walkModule(visitor, m) {
  return m.expressions.forEach(visitor.visitExpression.bind(visitor));
};
function walkObjectDestructure(visitor, o) {
  return o.members.forEach(function (m) {
    visitor.visitIdentifier(m.property);
    return visitor.visitIdentifier(m.local);
  });
};
function walkTraitDeclaration(visitor, t) {
  if (t.typeParameters) {
    t.typeParameters.forEach(visitor.visitTypeParameter.bind(visitor));
  };
  return t.members.forEach(function (t) {
    return visitor.visitFunctionDeclaration(t);
  });
};
function walkTypeBound(visitor, t) {
  if (t.kind == _ast2.SyntaxKind.FunctionTypeBound) {
    return visitor.visitFunctionTypeBound(t);
  } else {
    if (t.kind == _ast2.SyntaxKind.NamedTypeBound) {
      return visitor.visitNamedTypeBound(t);
    } else {
      if (t.kind == _ast2.SyntaxKind.ObjectTypeBound) {
        return visitor.visitObjectTypeBound(t);
      } else {
        if (t.kind == _ast2.SyntaxKind.TupleTypeBound) {
          return visitor.visitTupleTypeBound(t);
        } else {
          (0, _core.print)("Unknown typebound " + _ast2.SyntaxKind[t.kind], t);
          throw Error("Unknown typebound " + _ast2.SyntaxKind[t.kind]);
        };
      };
    };
  };
};
function walkFunctionTypeBound(visitor, t) {
  t.typeParameters.forEach(visitor.visitTypeParameter.bind(visitor));
  visitor.visitTypeBound(t._arguments);
  return visitor.visitTypeBound(t.returnType);
};
function walkNamedTypeBound(visitor, t) {
  return t.typeParameters.forEach(visitor.visitTypeBound.bind(visitor));
};
function walkObjectTypeBound(visitor, t) {
  return t.properties.forEach(function (t) {
    return visitor.visitTypeProperty(t);
  });
};
function walkTupleTypeBound(visitor, t) {
  return t.properties.forEach(visitor.visitTypeBound.bind(visitor));
};
function walkTypeDeclaration(visitor, t) {
  t.typeParameters.forEach(function (t) {
    return visitor.visitTypeParameter(t);
  });
  var __PUCK__value__4 = t.bound;
  if (__PUCK__value__4.kind == "Some") {
    var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1);

    var typeBound = _PUCK__value__4$valu[0];

    return visitor.visitTypeBound(typeBound);
  };
};
function walkTypeParameter(visitor, t) {
  var __PUCK__value__5 = t.defaultValue;
  if (__PUCK__value__5.kind == "Some") {
    var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1);

    var defaultValue = _PUCK__value__5$valu[0];

    return visitor.visitTypeBound(defaultValue);
  };
};
function walkTypeProperty(visitor, t) {
  return visitor.visitTypeBound(t.typeBound);
};
function walkVariableDeclaration(visitor, d) {
  visitor.visitPattern(d.pattern);
  var __PUCK__value__6 = d.typeBound;
  if (__PUCK__value__6.kind == "Some") {
    var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1);

    var typeBound = _PUCK__value__6$valu[0];

    visitor.visitTypeBound(typeBound);
  };
  var __PUCK__value__7 = d.initializer;
  if (__PUCK__value__7.kind == "Some") {
    var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1);

    var initializer = _PUCK__value__7$valu[0];

    return visitor.visitExpression(initializer);
  };
};
function walkExportDirective(visitor, e) {
  return visitor.visitExpression(e.expression);
};
function walkImportDirective(visitor, i) {
  if (i.specifier.kind == _ast2.SyntaxKind.Identifier) {
    return visitor.visitIdentifier(i.specifier);
  } else {
    if (i.specifier.kind == _ast2.SyntaxKind.ObjectDestructure) {
      return visitor.visitObjectDestructure(i.specifier);
    };
  };
};
function walkPattern(visitor, p) {
  if (p.kind == "Identifier") {
    return visitor.visitIdentifierPattern(p.value[0]);
  } else {
    if (p.kind == "Record") {
      return visitor.visitRecordPattern(p.value[0]);
    } else {
      if (p.kind == "RecordType") {
        visitor.visitTypePath(p.value[0]);
        return visitor.visitRecordPattern(p.value[1]);
      } else {
        if (p.kind == "Tuple") {
          return visitor.visitTuplePattern(p.value[0]);
        } else {
          if (p.kind == "TupleType") {
            visitor.visitTypePath(p.value[0]);
            return visitor.visitTuplePattern(p.value[1]);
          };
        };
      };
    };
  };
};
function walkIdentifierPattern(visitor, p) {
  return visitor.visitIdentifier(p);
};
function walkRecordPattern(visitor, p) {
  return p.properties.forEach(function (p) {
    visitor.visitIdentifier(p.property);
    return visitor.visitPattern(p.local);
  });
};
function walkTuplePattern(visitor, p) {
  return p.properties.forEach(function (p) {
    return visitor.visitPattern(p);
  });
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
  return e.argumentList.forEach(visitor.visitExpression.bind(visitor));
};
function walkForExpression(visitor, e) {};
function walkIfExpression(visitor, e) {
  visitor.visitExpression(e.condition);
  visitor.visitBlock(e.then_);
  var __PUCK__value__8 = e.else_;
  if (__PUCK__value__8.kind == "Some") {
    var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1);

    var else_ = _PUCK__value__8$valu[0];

    return visitor.visitBlock(else_);
  };
};
function walkIfLetExpression(visitor, e) {
  visitor.visitVariableDeclaration(e.variableDeclaration);
  visitor.visitBlock(e.then_);
  var __PUCK__value__9 = e.else_;
  if (__PUCK__value__9.kind == "Some") {
    var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1);

    var else_ = _PUCK__value__9$valu[0];

    return visitor.visitBlock(else_);
  };
};
function walkLoopExpression(visitor, e) {
  return visitor.visitBlock(e.body);
};
function walkMatchExpression(visitor, e) {
  visitor.visitExpression(e.expression);
  return e.patterns.forEach(function (p) {
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
function walkWhileExpression(visitor, e) {
  visitor.visitExpression(e.condition);
  return visitor.visitBlock(e.body);
};
function walkIndexAccess(visitor, a) {
  visitor.visitExpression(a.object);
  return visitor.visitExpression(a.index);
};
function walkMemberAccess(visitor, a) {
  visitor.visitExpression(a.object);
  return visitor.visitExpression(a.member);
};
function walkBreak(visitor, b) {};
function walkReturn(visitor, r) {
  return visitor.visitExpression(r.expression);
};
function walkBooleanLiteral(visitor, l) {};
function walkListLiteral(visitor, l) {
  return l.members.forEach(visitor.visitExpression.bind(visitor));
};
function walkNumberLiteral(visitor, l) {};
function walkObjectLiteral(visitor, l) {
  return l.members.forEach(function (m) {
    visitor.visitIdentifier(m.name);
    return visitor.visitExpression(m.value);
  });
};
function walkStringLiteral(visitor, l) {
  return l.parts.filter(function (p) {
    return p.kind == _ast2.SyntaxKind.Identifier;
  }).forEach(visitor.visitIdentifier.bind(visitor));
};
function walkTupleLiteral(visitor, l) {
  return l.expressions.forEach(visitor.visitExpression.bind(visitor));
}
