'use strict';
exports.Visit = exports.walkModule = exports.walkTopLevelStatement = exports.walkBlockLevelStatement = exports.walkExpression = exports.walkEnumDeclaration = exports.walkEnumMember = exports.walkImplDeclaration = exports.walkImplShorthandDeclaration = exports.walkTraitDeclaration = exports.walkTypeDeclaration = exports.walkExportDirective = exports.walkImportDirective = exports.walkObjectDestructure = exports.walkObjectDestructureMember = exports.walkBlock = exports.walkReturnStatement = exports.walkForLoop = exports.walkWhileLoop = exports.walkFunctionDeclaration = exports.walkVariableDeclaration = exports.walkAssignmentExpression = exports.walkBinaryExpression = exports.walkCallExpression = exports.walkIfExpression = exports.walkIfLetExpression = exports.walkMatchExpression = exports.walkMatchArm = exports.walkTypePath = exports.walkTypePathExpression = exports.walkUnaryExpression = exports.walkIndexAccess = exports.walkMemberAccess = exports.walkTupleIndexAccess = exports.walkUnknownAccess = exports.walkUnknownIndexAccess = exports.walkListLiteral = exports.walkRangeLiteral = exports.walkRecordLiteral = exports.walkRecordLiteralMember = exports.walkStringLiteral = exports.walkTupleLiteral = exports.walkPattern = exports.walkIdentifierPattern = exports.walkRecordPattern = exports.walkTuplePattern = exports.walkTypeBound = exports.walkFunctionTypeBound = exports.walkIntersectionTypeBound = exports.walkNamedTypeBound = exports.walkRecordTypeBound = exports.walkRecordTypeBoundMember = exports.walkTupleTypeBound = exports.walkTypeParameter = exports.walkTypeParameterBound = exports.walkWhereClause = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./ast");
const $puck_3 = require("./span");
var Visit = exports.Visit = {
visitModule: function (m) {
  let self = this;
  walkModule(self, m);
},
visitTopLevelStatement: function (e) {
  let self = this;
  walkTopLevelStatement(self, e);
},
visitBlockLevelStatement: function (e) {
  let self = this;
  walkBlockLevelStatement(self, e);
},
visitExpression: function (e) {
  let self = this;
  walkExpression(self, e);
},
visitEnumDeclaration: function (e) {
  let self = this;
  walkEnumDeclaration(self, e);
},
visitEnumMember: function (e) {
  let self = this;
  walkEnumMember(self, e);
},
visitImplDeclaration: function (i) {
  let self = this;
  walkImplDeclaration(self, i);
},
visitImplShorthandDeclaration: function (i) {
  let self = this;
  walkImplShorthandDeclaration(self, i);
},
visitMethodDeclaration: function (f) {
  let self = this;
  walkFunctionDeclaration(self, f);
},
visitTraitDeclaration: function (t) {
  let self = this;
  walkTraitDeclaration(self, t);
},
visitTypeDeclaration: function (t) {
  let self = this;
  walkTypeDeclaration(self, t);
},
visitExportDirective: function (e) {
  let self = this;
  walkExportDirective(self, e);
},
visitImportDirective: function (i) {
  let self = this;
  walkImportDirective(self, i);
},
visitObjectDestructure: function (o) {
  let self = this;
  walkObjectDestructure(self, o);
},
visitObjectDestructureMember: function (m) {
  let self = this;
  walkObjectDestructureMember(self, m);
},
visitBlock: function (b) {
  let self = this;
  walkBlock(self, b);
},
visitBreakStatement: function (b) {},
visitReturnStatement: function (r) {
  let self = this;
  walkReturnStatement(self, r);
},
visitForLoop: function (e) {
  let self = this;
  walkForLoop(self, e);
},
visitWhileLoop: function (e) {
  let self = this;
  walkWhileLoop(self, e);
},
visitIdentifier: function (i) {},
visitFunctionDeclaration: function (f) {
  let self = this;
  walkFunctionDeclaration(self, f);
},
visitVariableDeclaration: function (d) {
  let self = this;
  walkVariableDeclaration(self, d);
},
visitAssignmentExpression: function (e) {
  let self = this;
  walkAssignmentExpression(self, e);
},
visitBinaryExpression: function (e) {
  let self = this;
  walkBinaryExpression(self, e);
},
visitCallExpression: function (e) {
  let self = this;
  walkCallExpression(self, e);
},
visitIfExpression: function (e) {
  let self = this;
  walkIfExpression(self, e);
},
visitIfLetExpression: function (e) {
  let self = this;
  walkIfLetExpression(self, e);
},
visitMatchExpression: function (e) {
  let self = this;
  walkMatchExpression(self, e);
},
visitMatchArm: function (e) {
  let self = this;
  walkMatchArm(self, e);
},
visitTypePath: function (e) {
  let self = this;
  walkTypePath(self, e);
},
visitTypePathExpression: function (e) {
  let self = this;
  walkTypePathExpression(self, e);
},
visitUnaryExpression: function (e) {
  let self = this;
  walkUnaryExpression(self, e);
},
visitIndexAccess: function (a) {
  let self = this;
  walkIndexAccess(self, a);
},
visitMemberAccess: function (a) {
  let self = this;
  walkMemberAccess(self, a);
},
visitTupleIndexAccess: function (a) {
  let self = this;
  walkTupleIndexAccess(self, a);
},
visitUnknownAccess: function (a) {
  let self = this;
  walkUnknownAccess(self, a);
},
visitUnknownIndexAccess: function (a) {
  let self = this;
  walkUnknownIndexAccess(self, a);
},
visitListLiteral: function (l) {
  let self = this;
  walkListLiteral(self, l);
},
visitBooleanLiteral: function (l) {},
visitNumberLiteral: function (l) {},
visitRangeLiteral: function (l) {
  let self = this;
  walkRangeLiteral(self, l);
},
visitRecordLiteral: function (l) {
  let self = this;
  walkRecordLiteral(self, l);
},
visitRecordLiteralMember: function (l) {
  let self = this;
  walkRecordLiteralMember(self, l);
},
visitStringLiteral: function (l) {
  let self = this;
  walkStringLiteral(self, l);
},
visitStringLiteralPart: function (l) {},
visitTupleLiteral: function (l) {
  let self = this;
  walkTupleLiteral(self, l);
},
visitPattern: function (p) {
  let self = this;
  walkPattern(self, p);
},
visitIdentifierPattern: function (p, mutable) {
  let self = this;
  walkIdentifierPattern(self, p);
},
visitRecordPattern: function (p) {
  let self = this;
  walkRecordPattern(self, p);
},
visitTuplePattern: function (p) {
  let self = this;
  walkTuplePattern(self, p);
},
visitTypeBound: function (t) {
  let self = this;
  walkTypeBound(self, t);
},
visitFunctionTypeBound: function (t) {
  let self = this;
  walkFunctionTypeBound(self, t);
},
visitIntersectionTypeBound: function (t) {
  let self = this;
  walkIntersectionTypeBound(self, t);
},
visitNamedTypeBound: function (t) {
  let self = this;
  walkNamedTypeBound(self, t);
},
visitRecordTypeBound: function (t) {
  let self = this;
  walkRecordTypeBound(self, t);
},
visitRecordTypeBoundMember: function (t) {
  let self = this;
  walkRecordTypeBoundMember(self, t);
},
visitTupleTypeBound: function (t) {
  let self = this;
  walkTupleTypeBound(self, t);
},
visitTypeParameter: function (t) {
  let self = this;
  walkTypeParameter(self, t);
},
visitTypeParameterBound: function (t) {
  let self = this;
  walkTypeParameterBound(self, t);
},
visitWhereClause: function (t) {
  let self = this;
  walkWhereClause(self, t);
}
};
function walkModule(visitor, m) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
    return Visit[visitor.type].visitTopLevelStatement.call(visitor, s);
  });
};
exports.walkModule = walkModule;
function walkTopLevelStatement(visitor, s) {
  let $puck_4 = s;
  if ($puck_4.kind === "ExportDirective") {
    let {value: e} = $puck_4;
    return Visit[visitor.type].visitExportDirective.call(visitor, e);
  }
  else {
    if ($puck_4.kind === "ImportDirective") {
      let {value: e} = $puck_4;
      return Visit[visitor.type].visitImportDirective.call(visitor, e);
    }
    else {
      if ($puck_4.kind === "EnumDeclaration") {
        let {value: e} = $puck_4;
        return Visit[visitor.type].visitEnumDeclaration.call(visitor, e);
      }
      else {
        if ($puck_4.kind === "ImplDeclaration") {
          let {value: e} = $puck_4;
          return Visit[visitor.type].visitImplDeclaration.call(visitor, e);
        }
        else {
          if ($puck_4.kind === "ImplShorthandDeclaration") {
            let {value: e} = $puck_4;
            return Visit[visitor.type].visitImplShorthandDeclaration.call(visitor, e);
          }
          else {
            if ($puck_4.kind === "TraitDeclaration") {
              let {value: e} = $puck_4;
              return Visit[visitor.type].visitTraitDeclaration.call(visitor, e);
            }
            else {
              if ($puck_4.kind === "TypeDeclaration") {
                let {value: e} = $puck_4;
                return Visit[visitor.type].visitTypeDeclaration.call(visitor, e);
              }
              else {
                if ($puck_4.kind === "BlockLevelStatement") {
                  let {value: e} = $puck_4;
                  return walkBlockLevelStatement(visitor, e);
                };
              };
            };
          };
        };
      };
    };
  };
};
exports.walkTopLevelStatement = walkTopLevelStatement;
function walkBlockLevelStatement(visitor, s) {
  let $puck_5 = s;
  if ($puck_5.kind === "Block") {
    let {value: e} = $puck_5;
    return Visit[visitor.type].visitBlock.call(visitor, e);
  }
  else {
    if ($puck_5.kind === "BreakStatement") {
      let {value: e} = $puck_5;
      return Visit[visitor.type].visitBreakStatement.call(visitor, e);
    }
    else {
      if ($puck_5.kind === "ReturnStatement") {
        let {value: e} = $puck_5;
        return Visit[visitor.type].visitReturnStatement.call(visitor, e);
      }
      else {
        if ($puck_5.kind === "ForLoop") {
          let {value: e} = $puck_5;
          return Visit[visitor.type].visitForLoop.call(visitor, e);
        }
        else {
          if ($puck_5.kind === "WhileLoop") {
            let {value: e} = $puck_5;
            return Visit[visitor.type].visitWhileLoop.call(visitor, e);
          }
          else {
            if ($puck_5.kind === "Expression") {
              let {value: e} = $puck_5;
              return walkExpression(visitor, e);
            };
          };
        };
      };
    };
  };
};
exports.walkBlockLevelStatement = walkBlockLevelStatement;
function walkExpression(visitor, e) {
  let $puck_6 = e;
  if ($puck_6.kind === "Comment") {
    let $puck_7 = $puck_6;;
    return $puck_7;
  }
  else {
    if ($puck_6.kind === "Identifier") {
      let {value: e} = $puck_6;
      return Visit[visitor.type].visitIdentifier.call(visitor, e);
    }
    else {
      if ($puck_6.kind === "FunctionDeclaration") {
        let {value: e} = $puck_6;
        return Visit[visitor.type].visitFunctionDeclaration.call(visitor, e);
      }
      else {
        if ($puck_6.kind === "VariableDeclaration") {
          let {value: e} = $puck_6;
          return Visit[visitor.type].visitVariableDeclaration.call(visitor, e);
        }
        else {
          if ($puck_6.kind === "AssignmentExpression") {
            let {value: e} = $puck_6;
            return Visit[visitor.type].visitAssignmentExpression.call(visitor, e);
          }
          else {
            if ($puck_6.kind === "BinaryExpression") {
              let {value: e} = $puck_6;
              return Visit[visitor.type].visitBinaryExpression.call(visitor, e);
            }
            else {
              if ($puck_6.kind === "CallExpression") {
                let {value: e} = $puck_6;
                return Visit[visitor.type].visitCallExpression.call(visitor, e);
              }
              else {
                if ($puck_6.kind === "IfExpression") {
                  let {value: e} = $puck_6;
                  return Visit[visitor.type].visitIfExpression.call(visitor, e);
                }
                else {
                  if ($puck_6.kind === "IfLetExpression") {
                    let {value: e} = $puck_6;
                    return Visit[visitor.type].visitIfLetExpression.call(visitor, e);
                  }
                  else {
                    if ($puck_6.kind === "MatchExpression") {
                      let {value: e} = $puck_6;
                      return Visit[visitor.type].visitMatchExpression.call(visitor, e);
                    }
                    else {
                      if ($puck_6.kind === "TypePathExpression") {
                        let {value: e} = $puck_6;
                        return Visit[visitor.type].visitTypePathExpression.call(visitor, e);
                      }
                      else {
                        if ($puck_6.kind === "UnaryExpression") {
                          let {value: e} = $puck_6;
                          return Visit[visitor.type].visitUnaryExpression.call(visitor, e);
                        }
                        else {
                          if ($puck_6.kind === "IndexAccess") {
                            let {value: e} = $puck_6;
                            return Visit[visitor.type].visitIndexAccess.call(visitor, e);
                          }
                          else {
                            if ($puck_6.kind === "MemberAccess") {
                              let {value: e} = $puck_6;
                              return Visit[visitor.type].visitMemberAccess.call(visitor, e);
                            }
                            else {
                              if ($puck_6.kind === "TupleIndexAccess") {
                                let {value: e} = $puck_6;
                                return Visit[visitor.type].visitTupleIndexAccess.call(visitor, e);
                              }
                              else {
                                if ($puck_6.kind === "UnknownAccess") {
                                  let {value: e} = $puck_6;
                                  return Visit[visitor.type].visitUnknownAccess.call(visitor, e);
                                }
                                else {
                                  if ($puck_6.kind === "UnknownIndexAccess") {
                                    let {value: e} = $puck_6;
                                    return Visit[visitor.type].visitUnknownIndexAccess.call(visitor, e);
                                  }
                                  else {
                                    if ($puck_6.kind === "BooleanLiteral") {
                                      let {value: e} = $puck_6;
                                      return Visit[visitor.type].visitBooleanLiteral.call(visitor, e);
                                    }
                                    else {
                                      if ($puck_6.kind === "ListLiteral") {
                                        let {value: e} = $puck_6;
                                        return Visit[visitor.type].visitListLiteral.call(visitor, e);
                                      }
                                      else {
                                        if ($puck_6.kind === "NumberLiteral") {
                                          let {value: e} = $puck_6;
                                          return Visit[visitor.type].visitNumberLiteral.call(visitor, e);
                                        }
                                        else {
                                          if ($puck_6.kind === "RangeLiteral") {
                                            let {value: e} = $puck_6;
                                            return Visit[visitor.type].visitRangeLiteral.call(visitor, e);
                                          }
                                          else {
                                            if ($puck_6.kind === "RecordLiteral") {
                                              let {value: e} = $puck_6;
                                              return Visit[visitor.type].visitRecordLiteral.call(visitor, e);
                                            }
                                            else {
                                              if ($puck_6.kind === "StringLiteral") {
                                                let {value: e} = $puck_6;
                                                return Visit[visitor.type].visitStringLiteral.call(visitor, e);
                                              }
                                              else {
                                                if ($puck_6.kind === "TupleLiteral") {
                                                  let {value: e} = $puck_6;
                                                  return Visit[visitor.type].visitTupleLiteral.call(visitor, e);
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
exports.walkExpression = walkExpression;
function walkEnumDeclaration(visitor, e) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.typeParameters, $isTraitObject: true}, function (t) {
    return Visit[visitor.type].visitTypeParameter.call(visitor, t);
  });
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.members, $isTraitObject: true}, function (t) {
    return Visit[visitor.type].visitEnumMember.call(visitor, t);
  });
};
exports.walkEnumDeclaration = walkEnumDeclaration;
function walkEnumMember(visitor, e) {
  let $puck_8 = e.bound;
  if ($puck_8 !== undefined) {
    let typeBound = $puck_8;
    return Visit[visitor.type].visitTypeBound.call(visitor, typeBound);
  };
};
exports.walkEnumMember = walkEnumMember;
function walkImplDeclaration(visitor, i) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
    return Visit[visitor.type].visitTypeParameter.call(visitor, p);
  });
  Visit[visitor.type].visitNamedTypeBound.call(visitor, i.trait_);
  Visit[visitor.type].visitNamedTypeBound.call(visitor, i.type_);
  let $puck_9 = i.whereClause;
  if ($puck_9 !== undefined) {
    let whereClause = $puck_9;
    Visit[visitor.type].visitWhereClause.call(visitor, whereClause);
  };
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
    return Visit[visitor.type].visitMethodDeclaration.call(visitor, m);
  });
};
exports.walkImplDeclaration = walkImplDeclaration;
function walkImplShorthandDeclaration(visitor, i) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
    return Visit[visitor.type].visitTypeParameter.call(visitor, p);
  });
  Visit[visitor.type].visitNamedTypeBound.call(visitor, i.type_);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
    return Visit[visitor.type].visitMethodDeclaration.call(visitor, m);
  });
};
exports.walkImplShorthandDeclaration = walkImplShorthandDeclaration;
function walkTraitDeclaration(visitor, t) {
  if (t.typeParameters) {
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
      return Visit[visitor.type].visitTypeParameter.call(visitor, p);
    });
  };
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (t) {
    return Visit[visitor.type].visitMethodDeclaration.call(visitor, t);
  });
};
exports.walkTraitDeclaration = walkTraitDeclaration;
function walkTypeDeclaration(visitor, t) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (t) {
    return Visit[visitor.type].visitTypeParameter.call(visitor, t);
  });
  let $puck_10 = t.bound;
  if ($puck_10 !== undefined) {
    let typeBound = $puck_10;
    return Visit[visitor.type].visitTypeBound.call(visitor, typeBound);
  };
};
exports.walkTypeDeclaration = walkTypeDeclaration;
function walkExportDirective(visitor, e) {
  let $puck_11 = e.statement;
  if ($puck_11.kind === "EnumDeclaration") {
    let {value: d} = $puck_11;
    return Visit[visitor.type].visitEnumDeclaration.call(visitor, d);
  }
  else {
    if ($puck_11.kind === "FunctionDeclaration") {
      let {value: d} = $puck_11;
      return Visit[visitor.type].visitFunctionDeclaration.call(visitor, d);
    }
    else {
      if ($puck_11.kind === "Identifier") {
        let {value: d} = $puck_11;
        return Visit[visitor.type].visitIdentifier.call(visitor, d);
      }
      else {
        if ($puck_11.kind === "TraitDeclaration") {
          let {value: d} = $puck_11;
          return Visit[visitor.type].visitTraitDeclaration.call(visitor, d);
        }
        else {
          if ($puck_11.kind === "TypeDeclaration") {
            let {value: d} = $puck_11;
            return Visit[visitor.type].visitTypeDeclaration.call(visitor, d);
          }
          else {
            if ($puck_11.kind === "VariableDeclaration") {
              let {value: d} = $puck_11;
              return Visit[visitor.type].visitVariableDeclaration.call(visitor, d);
            };
          };
        };
      };
    };
  };
};
exports.walkExportDirective = walkExportDirective;
function walkImportDirective(visitor, i) {
  let $puck_12 = i.specifier;
  if ($puck_12.kind === "Identifier") {
    let {value: identifier} = $puck_12;
    return Visit[visitor.type].visitIdentifier.call(visitor, identifier);
  }
  else {
    if ($puck_12.kind === "ObjectDestructure") {
      let {value: d} = $puck_12;
      return Visit[visitor.type].visitObjectDestructure.call(visitor, d);
    }
    else {
      if ($puck_12.kind === "Asterisk") {
        let $puck_13 = $puck_12;;
        return $puck_13;
      };
    };
  };
};
exports.walkImportDirective = walkImportDirective;
function walkObjectDestructure(visitor, o) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true}, function (m) {
    return Visit[visitor.type].visitObjectDestructureMember.call(visitor, m);
  });
};
exports.walkObjectDestructure = walkObjectDestructure;
function walkObjectDestructureMember(visitor, m) {
  Visit[visitor.type].visitIdentifier.call(visitor, m.property);
  return Visit[visitor.type].visitIdentifier.call(visitor, m.local);
};
exports.walkObjectDestructureMember = walkObjectDestructureMember;
function walkBlock(visitor, b) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true}, function (s) {
    return Visit[visitor.type].visitBlockLevelStatement.call(visitor, s);
  });
};
exports.walkBlock = walkBlock;
function walkReturnStatement(visitor, r) {
  return Visit[visitor.type].visitExpression.call(visitor, r.expression);
};
exports.walkReturnStatement = walkReturnStatement;
function walkForLoop(visitor, e) {
  Visit[visitor.type].visitPattern.call(visitor, e.pattern);
  Visit[visitor.type].visitExpression.call(visitor, e.expression);
  return Visit[visitor.type].visitBlock.call(visitor, e.body);
};
exports.walkForLoop = walkForLoop;
function walkWhileLoop(visitor, e) {
  Visit[visitor.type].visitExpression.call(visitor, e.condition);
  return Visit[visitor.type].visitBlock.call(visitor, e.body);
};
exports.walkWhileLoop = walkWhileLoop;
function walkFunctionDeclaration(visitor, f) {
  if (f.typeParameters) {
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, function (p) {
      return Visit[visitor.type].visitTypeParameter.call(visitor, p);
    });
  };
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true}, function (p) {
    return Visit[visitor.type].visitVariableDeclaration.call(visitor, p);
  });
  let $puck_14 = f.returnType;
  if ($puck_14 !== undefined) {
    let returnType = $puck_14;
    Visit[visitor.type].visitTypeBound.call(visitor, returnType);
  };
  let $puck_15 = f.body;
  if ($puck_15 !== undefined) {
    let body = $puck_15;
    return Visit[visitor.type].visitBlock.call(visitor, body);
  };
};
exports.walkFunctionDeclaration = walkFunctionDeclaration;
function walkVariableDeclaration(visitor, d) {
  Visit[visitor.type].visitPattern.call(visitor, d.pattern);
  let $puck_16 = d.typeBound;
  if ($puck_16 !== undefined) {
    let typeBound = $puck_16;
    Visit[visitor.type].visitTypeBound.call(visitor, typeBound);
  };
  let $puck_17 = d.initializer;
  if ($puck_17 !== undefined) {
    let initializer = $puck_17;
    return Visit[visitor.type].visitExpression.call(visitor, initializer);
  };
};
exports.walkVariableDeclaration = walkVariableDeclaration;
function walkAssignmentExpression(visitor, e) {
  Visit[visitor.type].visitExpression.call(visitor, e.lhs);
  return Visit[visitor.type].visitExpression.call(visitor, e.rhs);
};
exports.walkAssignmentExpression = walkAssignmentExpression;
function walkBinaryExpression(visitor, e) {
  Visit[visitor.type].visitExpression.call(visitor, e.lhs);
  return Visit[visitor.type].visitExpression.call(visitor, e.rhs);
};
exports.walkBinaryExpression = walkBinaryExpression;
function walkCallExpression(visitor, e) {
  Visit[visitor.type].visitExpression.call(visitor, e.func);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true}, function (e) {
    return Visit[visitor.type].visitExpression.call(visitor, e);
  });
};
exports.walkCallExpression = walkCallExpression;
function walkIfExpression(visitor, e) {
  Visit[visitor.type].visitExpression.call(visitor, e.condition);
  Visit[visitor.type].visitBlock.call(visitor, e.then_);
  let $puck_18 = e.else_;
  if ($puck_18 !== undefined) {
    let else_ = $puck_18;
    return Visit[visitor.type].visitBlock.call(visitor, else_);
  };
};
exports.walkIfExpression = walkIfExpression;
function walkIfLetExpression(visitor, e) {
  Visit[visitor.type].visitPattern.call(visitor, e.pattern);
  Visit[visitor.type].visitExpression.call(visitor, e.expression);
  Visit[visitor.type].visitBlock.call(visitor, e.then_);
  let $puck_19 = e.else_;
  if ($puck_19 !== undefined) {
    let else_ = $puck_19;
    return Visit[visitor.type].visitBlock.call(visitor, else_);
  };
};
exports.walkIfLetExpression = walkIfLetExpression;
function walkMatchExpression(visitor, e) {
  Visit[visitor.type].visitExpression.call(visitor, e.expression);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (p) {
    return Visit[visitor.type].visitMatchArm.call(visitor, p);
  });
};
exports.walkMatchExpression = walkMatchExpression;
function walkMatchArm(visitor, e) {
  Visit[visitor.type].visitPattern.call(visitor, e.pattern);
  return Visit[visitor.type].visitBlock.call(visitor, e.block);
};
exports.walkMatchArm = walkMatchArm;
function walkTypePath(visitor, e) {
  let $puck_20 = e;
  if ($puck_20.kind === "_Object") {
    let {value: [, typePath]} = $puck_20;
    return Visit[visitor.type].visitTypePath.call(visitor, typePath);
  }
  else {
    if ($puck_20.kind === "Member") {
      let $puck_21 = $puck_20;;
      return $puck_21;
    };
  };
};
exports.walkTypePath = walkTypePath;
function walkTypePathExpression(visitor, e) {
  return Visit[visitor.type].visitTypePath.call(visitor, e.typePath);
};
exports.walkTypePathExpression = walkTypePathExpression;
function walkUnaryExpression(visitor, e) {
  return Visit[visitor.type].visitExpression.call(visitor, e.rhs);
};
exports.walkUnaryExpression = walkUnaryExpression;
function walkIndexAccess(visitor, a) {
  Visit[visitor.type].visitExpression.call(visitor, a.object);
  return Visit[visitor.type].visitExpression.call(visitor, a.index);
};
exports.walkIndexAccess = walkIndexAccess;
function walkMemberAccess(visitor, a) {
  return Visit[visitor.type].visitExpression.call(visitor, a.object);
};
exports.walkMemberAccess = walkMemberAccess;
function walkTupleIndexAccess(visitor, a) {
  return Visit[visitor.type].visitExpression.call(visitor, a.object);
};
exports.walkTupleIndexAccess = walkTupleIndexAccess;
function walkUnknownAccess(visitor, a) {
  return Visit[visitor.type].visitExpression.call(visitor, a.object);
};
exports.walkUnknownAccess = walkUnknownAccess;
function walkUnknownIndexAccess(visitor, a) {
  Visit[visitor.type].visitExpression.call(visitor, a.object);
  return Visit[visitor.type].visitExpression.call(visitor, a.index);
};
exports.walkUnknownIndexAccess = walkUnknownIndexAccess;
function walkListLiteral(visitor, l) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (e) {
    return Visit[visitor.type].visitExpression.call(visitor, e);
  });
};
exports.walkListLiteral = walkListLiteral;
function walkRangeLiteral(visitor, a) {
  Visit[visitor.type].visitExpression.call(visitor, a.start);
  return Visit[visitor.type].visitExpression.call(visitor, a.end);
};
exports.walkRangeLiteral = walkRangeLiteral;
function walkRecordLiteral(visitor, l) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
    return Visit[visitor.type].visitRecordLiteralMember.call(visitor, m);
  });
};
exports.walkRecordLiteral = walkRecordLiteral;
function walkRecordLiteralMember(visitor, l) {
  let $puck_22 = l;
  if ($puck_22.kind === "Property") {
    let {value: {name: name, value: value}} = $puck_22;
    return Visit[visitor.type].visitExpression.call(visitor, value);
  }
  else {
    if ($puck_22.kind === "Spread") {
      let {value: e} = $puck_22;
      return Visit[visitor.type].visitExpression.call(visitor, e);
    };
  };
};
exports.walkRecordLiteralMember = walkRecordLiteralMember;
function walkStringLiteral(visitor, l) {
  let $puck_23 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filterMap.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.parts, $isTraitObject: true}, function (p) {
    let $puck_24 = p;
    if ($puck_24.kind === "Identifier") {
      let {value: identifier} = $puck_24;
      return $puck_1.Some(identifier);
    }
    else {
      if (true) {
        $puck_24;
        return $puck_1.None;
      };
    };
  })
;
  return $puck_1.Iterable[$puck_23.type].forEach.call($puck_23, function (i) {
    return Visit[visitor.type].visitIdentifier.call(visitor, i);
  });
};
exports.walkStringLiteral = walkStringLiteral;
function walkTupleLiteral(visitor, l) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true}, function (e) {
    return Visit[visitor.type].visitExpression.call(visitor, e);
  });
};
exports.walkTupleLiteral = walkTupleLiteral;
function walkPattern(visitor, p) {
  let $puck_25 = p;
  if ($puck_25.kind === "CatchAll") {
    let $puck_26 = $puck_25;;
    return $puck_26;
  }
  else {
    if ($puck_25.kind === "Identifier") {
      let {value: {identifier: identifier, mutable: mutable}} = $puck_25;
      return Visit[visitor.type].visitIdentifierPattern.call(visitor, identifier, mutable);
    }
    else {
      if ($puck_25.kind === "Record") {
        let {value: record} = $puck_25;
        return Visit[visitor.type].visitRecordPattern.call(visitor, record);
      }
      else {
        if ($puck_25.kind === "RecordType") {
          let {value: [typePath, record]} = $puck_25;
          Visit[visitor.type].visitTypePath.call(visitor, typePath);
          return Visit[visitor.type].visitRecordPattern.call(visitor, record);
        }
        else {
          if ($puck_25.kind === "Tuple") {
            let {value: tuple} = $puck_25;
            return Visit[visitor.type].visitTuplePattern.call(visitor, tuple);
          }
          else {
            if ($puck_25.kind === "TupleType") {
              let {value: [typePath, tuple]} = $puck_25;
              Visit[visitor.type].visitTypePath.call(visitor, typePath);
              return Visit[visitor.type].visitTuplePattern.call(visitor, tuple);
            }
            else {
              if ($puck_25.kind === "UnitType") {
                let {value: typePath} = $puck_25;
                return Visit[visitor.type].visitTypePath.call(visitor, typePath);
              };
            };
          };
        };
      };
    };
  };
};
exports.walkPattern = walkPattern;
function walkIdentifierPattern(visitor, p) {};
exports.walkIdentifierPattern = walkIdentifierPattern;
function walkRecordPattern(visitor, p) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true}, function (p) {
    return Visit[visitor.type].visitPattern.call(visitor, p.pattern);
  });
};
exports.walkRecordPattern = walkRecordPattern;
function walkTuplePattern(visitor, p) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true}, function (p) {
    return Visit[visitor.type].visitPattern.call(visitor, p);
  });
};
exports.walkTuplePattern = walkTuplePattern;
function walkTypeBound(visitor, t) {
  let $puck_27 = t;
  if ($puck_27.kind === "FunctionTypeBound") {
    let {value: t} = $puck_27;
    return Visit[visitor.type].visitFunctionTypeBound.call(visitor, t);
  }
  else {
    if ($puck_27.kind === "IntersectionTypeBound") {
      let {value: t} = $puck_27;
      return Visit[visitor.type].visitIntersectionTypeBound.call(visitor, t);
    }
    else {
      if ($puck_27.kind === "NamedTypeBound") {
        let {value: t} = $puck_27;
        return Visit[visitor.type].visitNamedTypeBound.call(visitor, t);
      }
      else {
        if ($puck_27.kind === "RecordTypeBound") {
          let {value: t} = $puck_27;
          return Visit[visitor.type].visitRecordTypeBound.call(visitor, t);
        }
        else {
          if ($puck_27.kind === "TupleTypeBound") {
            let {value: t} = $puck_27;
            return Visit[visitor.type].visitTupleTypeBound.call(visitor, t);
          };
        };
      };
    };
  };
};
exports.walkTypeBound = walkTypeBound;
function walkFunctionTypeBound(visitor, t) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
    return Visit[visitor.type].visitTypeParameter.call(visitor, p);
  });
  Visit[visitor.type].visitTupleTypeBound.call(visitor, t.parameters);
  return Visit[visitor.type].visitTypeBound.call(visitor, t.returnType);
};
exports.walkFunctionTypeBound = walkFunctionTypeBound;
function walkIntersectionTypeBound(visitor, t) {
  Visit[visitor.type].visitTypeBound.call(visitor, t.baseType);
  return Visit[visitor.type].visitNamedTypeBound.call(visitor, t.traitBound);
};
exports.walkIntersectionTypeBound = walkIntersectionTypeBound;
function walkNamedTypeBound(visitor, t) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
    return Visit[visitor.type].visitTypeBound.call(visitor, p);
  });
};
exports.walkNamedTypeBound = walkNamedTypeBound;
function walkRecordTypeBound(visitor, t) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (t) {
    return Visit[visitor.type].visitRecordTypeBoundMember.call(visitor, t);
  });
};
exports.walkRecordTypeBound = walkRecordTypeBound;
function walkRecordTypeBoundMember(visitor, t) {
  let $puck_28 = t;
  if ($puck_28.kind === "Property") {
    let {value: {name: name, typeBound: typeBound}} = $puck_28;
    return Visit[visitor.type].visitTypeBound.call(visitor, typeBound);
  }
  else {
    if ($puck_28.kind === "Spread") {
      let {value: t} = $puck_28;
      return Visit[visitor.type].visitTypeBound.call(visitor, t);
    };
  };
};
exports.walkRecordTypeBoundMember = walkRecordTypeBoundMember;
function walkTupleTypeBound(visitor, t) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (p) {
    return Visit[visitor.type].visitTypeBound.call(visitor, p);
  });
};
exports.walkTupleTypeBound = walkTupleTypeBound;
function walkTypeParameter(visitor, t) {
  let $puck_29 = t.defaultValue;
  if ($puck_29 !== undefined) {
    let defaultValue = $puck_29;
    return Visit[visitor.type].visitTypeBound.call(visitor, defaultValue);
  };
};
exports.walkTypeParameter = walkTypeParameter;
function walkTypeParameterBound(visitor, t) {
  Visit[visitor.type].visitTypeBound.call(visitor, t.subType);
  return Visit[visitor.type].visitTypeBound.call(visitor, t.superType);
};
exports.walkTypeParameterBound = walkTypeParameterBound;
function walkWhereClause(visitor, w) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: w.bounds, $isTraitObject: true}, function (b) {
    return Visit[visitor.type].visitTypeParameterBound.call(visitor, b);
  });
};
exports.walkWhereClause = walkWhereClause
