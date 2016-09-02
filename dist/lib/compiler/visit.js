#!/usr/bin/env node

'use strict';

var Visitor = {
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
  visitTypeBound: function visitTypeBound(i) {
    var self = this;
    return walkTypeBound(self, t);
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
function walkExpression(e) {
  var self = this;
  if (e.kind == SyntaxKind.Block) {
    return visitor.visitBlock(e);
  } else {
    if (e.kind == SyntaxKind.Function) {
      return visitor.visitFunction(e);
    } else {
      if (e.kind == SyntaxKind.Identifier) {
        return visitor.visitIdentifier(e);
      } else {
        if (e.kind == SyntaxKind.TypeBound) {
          return visitor.visitTypeBound(e);
        } else {
          if (e.kind == SyntaxKind.VariableDeclaration) {
            return visitor.visitVariableDeclaration(e);
          } else {
            if (e.kind == SyntaxKind.AssignmentExpression) {
              return visitor.visitAssignmentExpression(e);
            } else {
              if (e.kind == SyntaxKind.BinaryExpression) {
                return visitor.visitBinaryExpression(e);
              } else {
                if (e.kind == SyntaxKind.CallExpression) {
                  return visitor.visitCallExpression(e);
                } else {
                  if (e.kind == SyntaxKind.ForExpression) {
                    return visitor.visitForExpression(e);
                  } else {
                    if (e.kind == SyntaxKind.IfExpression) {
                      return visitor.visitIfExpression(e);
                    } else {
                      if (e.kind == SyntaxKind.LoopExpression) {
                        return visitor.visitLoopExpression(e);
                      } else {
                        if (e.kind == SyntaxKind.UnaryExpression) {
                          return visitor.visitUnaryExpression(e);
                        } else {
                          if (e.kind == SyntaxKind.WhileExpression) {
                            return visitor.visitWhileExpression(e);
                          } else {
                            if (e.kind == SyntaxKind.IndexAccess) {
                              return visitor.visitIndexAccess(e);
                            } else {
                              if (e.kind == SyntaxKind.MemberAccess) {
                                return visitor.visitMemberAccess(e);
                              } else {
                                if (e.kind == SyntaxKind.BreakKeyword) {
                                  return visitor.visitBreak(e);
                                } else {
                                  if (e.kind == SyntaxKind.ReturnKeyword) {
                                    return visitor.visitReturn(e);
                                  } else {
                                    if (e.kind == SyntaxKind.ArrayLiteral) {
                                      return visitor.visitArrayLiteral(e);
                                    } else {
                                      if (e.kind == SyntaxKind.BooleanLiteral) {
                                        return visitor.visitBooleanLiteral(e);
                                      } else {
                                        if (e.kind == SyntaxKind.NumberLiteral) {
                                          return visitor.visitNumberLiteral(e);
                                        } else {
                                          if (e.kind == SyntaxKind.ObjectLiteral) {
                                            return visitor.visitObjectLiteral(e);
                                          } else {
                                            if (e.kind == SyntaxKind.StringLiteral) {
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
function walkBlock(visitor, b) {
  return b.block.forEach(visitor.visitExpression);
};
function walkFunction(visitor, f) {
  f.parameterList.forEach(visitor.visitVariableDeclaration);
  if (f.returnType) {
    visitor.visitTypeBound(f.returnType);
  };
  return visitor.visitBlock(f.body);
};
function walkIdentifier(visitor, i) {};
function walkTypeBound(visitor, t) {
  return t.parameters.forEach(visitor.visitTypeBound);
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
  return t.argumentList.forEach(visitor.visitExpression);
};
function walkForExpression(visitor, e) {};
function walkIfExpression(visitor, e) {
  visitor.visitExpression(e.condition);
  visitor.visitBody(e._then);
  if (e._else) {
    return visitor.visitBody(e._else);
  };
};
function walkLoopExpression(visitor, e) {
  return visitor.visitBody(e.body);
};
function walkUnaryExpression(visitor, e) {
  return visitor.visitExpression(e.rhs);
};
function walkWhileExpression(visitor, e) {
  visitor.visitExpression(e.condition);
  return visitor.visitBody(e.body);
};
function walkIndexAccess(visitor, a) {
  visitor.visitExpression(a.object);
  return visitor.visitExpression(a.index);
};
function walkMemberAccess(visitor, a) {
  visitor.visitExpression(a.object);
  return visitor.visitExpression(a.memebr);
};
function walkBreak(visitor, b) {};
function walkReturn(visitor, r) {
  return visitor.visitExpression(r.expression);
};
function walkArrayLiteral(visitor, l) {
  return l.members.forEach(visitor.visitExpression);
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
    return p.kind == SyntaxKind.Identifier;
  }).forEach(visitor.visitIdentifier);
}
