#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Visitor = undefined;
exports.walkExpression = walkExpression;
exports.walkBlock = walkBlock;
exports.walkFunction = walkFunction;
exports.walkIdentifier = walkIdentifier;
exports.walkObjectDestructure = walkObjectDestructure;
exports.walkTypeBound = walkTypeBound;
exports.walkVariableDeclaration = walkVariableDeclaration;
exports.walkExportDirective = walkExportDirective;
exports.walkImportDirective = walkImportDirective;
exports.walkAssignmentExpression = walkAssignmentExpression;
exports.walkBinaryExpression = walkBinaryExpression;
exports.walkCallExpression = walkCallExpression;
exports.walkForExpression = walkForExpression;
exports.walkIfExpression = walkIfExpression;
exports.walkLoopExpression = walkLoopExpression;
exports.walkUnaryExpression = walkUnaryExpression;
exports.walkWhileExpression = walkWhileExpression;
exports.walkIndexAccess = walkIndexAccess;
exports.walkMemberAccess = walkMemberAccess;
exports.walkBreak = walkBreak;
exports.walkReturn = walkReturn;
exports.walkArrayLiteral = walkArrayLiteral;
exports.walkBooleanLiteral = walkBooleanLiteral;
exports.walkNumberLiteral = walkNumberLiteral;
exports.walkObjectLiteral = walkObjectLiteral;
exports.walkStringLiteral = walkStringLiteral;

var _ast = require('./../compiler/ast.js');

var Visitor = exports.Visitor = {
  visitExpression: function visitExpression(e) {
    var self = this;
    return walkExpression(self, e);
  },
  visitBlock: function visitBlock(b) {
    var self = this;
    return walkBlock(self, b);
  },
  visitFunction: function visitFunction(f) {
    var self = this;
    return walkFunction(self, f);
  },
  visitIdentifier: function visitIdentifier(i) {
    var self = this;
    return walkIdentifier(self, i);
  },
  visitObjectDestructure: function visitObjectDestructure(o) {
    var self = this;
    return walkObjectDestructure(self, o);
  },
  visitTypeBound: function visitTypeBound(t) {
    var self = this;
    return walkTypeBound(self, t);
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
  visitLoopExpression: function visitLoopExpression(e) {
    var self = this;
    return walkLoopExpression(self, e);
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
  visitArrayLiteral: function visitArrayLiteral(l) {
    var self = this;
    return walkArrayLiteral(self, l);
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
  }
};
function walkExpression(visitor, e) {
  if (e.kind == _ast.SyntaxKind.Block) {
    return visitor.visitBlock(e);
  } else {
    if (e.kind == _ast.SyntaxKind.Function) {
      return visitor.visitFunction(e);
    } else {
      if (e.kind == _ast.SyntaxKind.Identifier) {
        return visitor.visitIdentifier(e);
      } else {
        if (e.kind == _ast.SyntaxKind.ObjectDestructure) {
          return visitor.visitObjectDestructure(e);
        } else {
          if (e.kind == _ast.SyntaxKind.TypeBound) {
            return visitor.visitTypeBound(e);
          } else {
            if (e.kind == _ast.SyntaxKind.VariableDeclaration) {
              return visitor.visitVariableDeclaration(e);
            } else {
              if (e.kind == _ast.SyntaxKind.ExportDirective) {
                return visitor.visitExportDirective(e);
              } else {
                if (e.kind == _ast.SyntaxKind.ImportDirective) {
                  return visitor.visitImportDirective(e);
                } else {
                  if (e.kind == _ast.SyntaxKind.AssignmentExpression) {
                    return visitor.visitAssignmentExpression(e);
                  } else {
                    if (e.kind == _ast.SyntaxKind.BinaryExpression) {
                      return visitor.visitBinaryExpression(e);
                    } else {
                      if (e.kind == _ast.SyntaxKind.CallExpression) {
                        return visitor.visitCallExpression(e);
                      } else {
                        if (e.kind == _ast.SyntaxKind.ForExpression) {
                          return visitor.visitForExpression(e);
                        } else {
                          if (e.kind == _ast.SyntaxKind.IfExpression) {
                            return visitor.visitIfExpression(e);
                          } else {
                            if (e.kind == _ast.SyntaxKind.LoopExpression) {
                              return visitor.visitLoopExpression(e);
                            } else {
                              if (e.kind == _ast.SyntaxKind.UnaryExpression) {
                                return visitor.visitUnaryExpression(e);
                              } else {
                                if (e.kind == _ast.SyntaxKind.WhileExpression) {
                                  return visitor.visitWhileExpression(e);
                                } else {
                                  if (e.kind == _ast.SyntaxKind.IndexAccess) {
                                    return visitor.visitIndexAccess(e);
                                  } else {
                                    if (e.kind == _ast.SyntaxKind.MemberAccess) {
                                      return visitor.visitMemberAccess(e);
                                    } else {
                                      if (e.kind == _ast.SyntaxKind.BreakKeyword) {
                                        return visitor.visitBreak(e);
                                      } else {
                                        if (e.kind == _ast.SyntaxKind.ReturnStatement) {
                                          return visitor.visitReturn(e);
                                        } else {
                                          if (e.kind == _ast.SyntaxKind.ArrayLiteral) {
                                            return visitor.visitArrayLiteral(e);
                                          } else {
                                            if (e.kind == _ast.SyntaxKind.BooleanLiteral) {
                                              return visitor.visitBooleanLiteral(e);
                                            } else {
                                              if (e.kind == _ast.SyntaxKind.NumberLiteral) {
                                                return visitor.visitNumberLiteral(e);
                                              } else {
                                                if (e.kind == _ast.SyntaxKind.ObjectLiteral) {
                                                  return visitor.visitObjectLiteral(e);
                                                } else {
                                                  if (e.kind == _ast.SyntaxKind.StringLiteral) {
                                                    return visitor.visitStringLiteral(e);
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
  return b.block.forEach(visitor.visitExpression.bind(visitor));
};
function walkFunction(visitor, f) {
  f.parameterList.forEach(visitor.visitVariableDeclaration.bind(visitor));
  if (f.returnType) {
    visitor.visitTypeBound(f.returnType);
  };
  return visitor.visitBlock(f.body);
};
function walkIdentifier(visitor, i) {};
function walkObjectDestructure(visitor, o) {
  return o.members.forEach(function (m) {
    visitor.visitIdentifier(m.property);
    return visitor.visitIdentifier(m.local);
  });
};
function walkTypeBound(visitor, t) {
  if (t.parameters) {
    return t.parameters.forEach(visitor.visitTypeBound.bind(visitor));
  };
};
function walkVariableDeclaration(visitor, d) {
  visitor.visitIdentifier(d.identifier);
  if (d.typeBound) {
    visitor.visitTypeBound(d.typeBound);
  };
  if (d.initializer) {
    return visitor.visitExpression(d.initializer);
  };
};
function walkExportDirective(visitor, e) {
  return visitor.visitExpression(e.expression);
};
function walkImportDirective(visitor, i) {
  if (i.specifier.kind == _ast.SyntaxKind.Identifier) {
    return visitor.visitIdentifier(i.specifier);
  } else {
    return visitor.visitObjectDestructure(i.specifier);
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
  return e.argumentList.forEach(visitor.visitExpression.bind(visitor));
};
function walkForExpression(visitor, e) {};
function walkIfExpression(visitor, e) {
  visitor.visitExpression(e.condition);
  visitor.visitBlock(e._then);
  if (e._else) {
    return visitor.visitBlock(e._else);
  };
};
function walkLoopExpression(visitor, e) {
  return visitor.visitBlock(e.body);
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
function walkArrayLiteral(visitor, l) {
  return l.members.forEach(visitor.visitExpression.bind(visitor));
};
function walkBooleanLiteral(visitor, l) {};
function walkNumberLiteral(visitor, l) {};
function walkObjectLiteral(visitor, l) {
  return l.members.forEach(function (m) {
    visitor.visitIdentifier(m.name);
    return visitor.visitExpression(m.value);
  });
};
function walkStringLiteral(visitor, l) {
  return l.parts.filter(function (p) {
    return p.kind == _ast.SyntaxKind.Identifier;
  }).forEach(visitor.visitIdentifier.bind(visitor));
}
