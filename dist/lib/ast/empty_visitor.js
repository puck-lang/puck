'use strict';
exports.EmptyVisitor = exports.walkModule = exports.walkTopLevelStatement = exports.walkBlockLevelStatement = exports.walkExpression = exports.walkEnumDeclaration = exports.walkEnumMember = exports.walkImplDeclaration = exports.walkImplShorthandDeclaration = exports.walkTraitDeclaration = exports.walkTypeDeclaration = exports.walkExportDirective = exports.walkImportDirective = exports.walkObjectDestructure = exports.walkBlock = exports.walkReturnStatement = exports.walkForLoop = exports.walkWhileLoop = exports.walkFunctionDeclaration = exports.walkVariableDeclaration = exports.walkAssignmentExpression = exports.walkBinaryExpression = exports.walkCallExpression = exports.walkIfExpression = exports.walkIfLetExpression = exports.walkMatchExpression = exports.walkMatchArm = exports.walkUnaryExpression = exports.walkIndexAccess = exports.walkMemberAccess = exports.walkTupleIndexAccess = exports.walkUnknownAccess = exports.walkUnknownIndexAccess = exports.walkListLiteral = exports.walkRangeLiteral = exports.walkRecordLiteral = exports.walkRecordLiteralMember = exports.walkStringLiteral = exports.walkTupleLiteral = exports.walkPattern = exports.walkIdentifierPattern = exports.walkRecordPattern = exports.walkTuplePattern = exports.walkTypeBound = exports.walkFunctionTypeBound = exports.walkNamedTypeBound = exports.walkRecordTypeBound = exports.walkRecordTypeBoundMember = exports.walkTupleTypeBound = exports.walkTypeParameter = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./ast");
const $puck_3 = require("./span");
var EmptyVisitor = exports.EmptyVisitor = {
visitModule: function (m) {},
visitTopLevelStatement: function (e) {},
visitBlockLevelStatement: function (e) {},
visitExpression: function (e) {},
visitEnumDeclaration: function (e) {},
visitEnumMember: function (e) {},
visitImplDeclaration: function (i) {},
visitImplShorthandDeclaration: function (i) {},
visitMethodDeclaration: function (f) {},
visitTraitDeclaration: function (t) {},
visitTypeDeclaration: function (t) {},
visitExportDirective: function (e) {},
visitImportDirective: function (i) {},
visitObjectDestructure: function (o) {},
visitObjectDestructureMember: function (m) {},
visitBlock: function (b) {},
visitBreakStatement: function (b) {},
visitReturnStatement: function (r) {},
visitForLoop: function (e) {},
visitWhileLoop: function (e) {},
visitIdentifier: function (i) {},
visitFunctionDeclaration: function (f) {},
visitVariableDeclaration: function (d) {},
visitAssignmentExpression: function (e) {},
visitBinaryExpression: function (e) {},
visitCallExpression: function (e) {},
visitIfExpression: function (e) {},
visitIfLetExpression: function (e) {},
visitMatchExpression: function (e) {},
visitMatchArm: function (e) {},
visitTypePath: function (e) {},
visitTypePathExpression: function (e) {},
visitUnaryExpression: function (e) {},
visitIndexAccess: function (a) {},
visitMemberAccess: function (a) {},
visitTupleIndexAccess: function (a) {},
visitUnknownAccess: function (a) {},
visitUnknownIndexAccess: function (a) {},
visitListLiteral: function (l) {},
visitBooleanLiteral: function (l) {},
visitNumberLiteral: function (l) {},
visitRangeLiteral: function (l) {},
visitRecordLiteral: function (l) {},
visitRecordLiteralMember: function (l) {},
visitStringLiteral: function (l) {},
visitStringLiteralPart: function (l) {},
visitTupleLiteral: function (l) {},
visitPattern: function (p) {},
visitIdentifierPattern: function (p, mutable) {},
visitRecordPattern: function (p) {},
visitRecordTypePattern: function (t, p) {},
visitTuplePattern: function (p) {},
visitTupleTypePattern: function (t, p) {},
visitTypeBound: function (t) {},
visitFunctionTypeBound: function (t) {},
visitNamedTypeBound: function (t) {},
visitRecordTypeBound: function (t) {},
visitRecordTypeBoundMember: function (t) {},
visitTupleTypeBound: function (t) {},
visitTypeParameter: function (t) {}
};
function walkModule(visitor, m) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
    return EmptyVisitor[visitor.type].visitTopLevelStatement.call(visitor, s);
  });
};
exports.walkModule = walkModule;
function walkTopLevelStatement(visitor, s) {
  let $puck_4 = s;
  if ($puck_4.kind === "ExportDirective") {
    let {value: e} = $puck_4;
    return EmptyVisitor[visitor.type].visitExportDirective.call(visitor, e);
  }
  else {
    if ($puck_4.kind === "ImportDirective") {
      let {value: e} = $puck_4;
      return EmptyVisitor[visitor.type].visitImportDirective.call(visitor, e);
    }
    else {
      if ($puck_4.kind === "EnumDeclaration") {
        let {value: e} = $puck_4;
        return EmptyVisitor[visitor.type].visitEnumDeclaration.call(visitor, e);
      }
      else {
        if ($puck_4.kind === "ImplDeclaration") {
          let {value: e} = $puck_4;
          return EmptyVisitor[visitor.type].visitImplDeclaration.call(visitor, e);
        }
        else {
          if ($puck_4.kind === "ImplShorthandDeclaration") {
            let {value: e} = $puck_4;
            return EmptyVisitor[visitor.type].visitImplShorthandDeclaration.call(visitor, e);
          }
          else {
            if ($puck_4.kind === "TraitDeclaration") {
              let {value: e} = $puck_4;
              return EmptyVisitor[visitor.type].visitTraitDeclaration.call(visitor, e);
            }
            else {
              if ($puck_4.kind === "TypeDeclaration") {
                let {value: e} = $puck_4;
                return EmptyVisitor[visitor.type].visitTypeDeclaration.call(visitor, e);
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
    return EmptyVisitor[visitor.type].visitBlock.call(visitor, e);
  }
  else {
    if ($puck_5.kind === "BreakStatement") {
      let {value: e} = $puck_5;
      return EmptyVisitor[visitor.type].visitBreakStatement.call(visitor, e);
    }
    else {
      if ($puck_5.kind === "ReturnStatement") {
        let {value: e} = $puck_5;
        return EmptyVisitor[visitor.type].visitReturnStatement.call(visitor, e);
      }
      else {
        if ($puck_5.kind === "ForLoop") {
          let {value: e} = $puck_5;
          return EmptyVisitor[visitor.type].visitForLoop.call(visitor, e);
        }
        else {
          if ($puck_5.kind === "WhileLoop") {
            let {value: e} = $puck_5;
            return EmptyVisitor[visitor.type].visitWhileLoop.call(visitor, e);
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
  if ($puck_6.kind === "ThrowStatement") {
    let {value: e} = $puck_6;
    return EmptyVisitor[visitor.type].visitExpression.call(visitor, e.expression);
  }
  else {
    if ($puck_6.kind === "Comment") {
      let $puck_7 = $puck_6;;
      return $puck_7;
    }
    else {
      if ($puck_6.kind === "Identifier") {
        let {value: e} = $puck_6;
        return EmptyVisitor[visitor.type].visitIdentifier.call(visitor, e);
      }
      else {
        if ($puck_6.kind === "FunctionDeclaration") {
          let {value: e} = $puck_6;
          return EmptyVisitor[visitor.type].visitFunctionDeclaration.call(visitor, e);
        }
        else {
          if ($puck_6.kind === "VariableDeclaration") {
            let {value: e} = $puck_6;
            return EmptyVisitor[visitor.type].visitVariableDeclaration.call(visitor, e);
          }
          else {
            if ($puck_6.kind === "AssignmentExpression") {
              let {value: e} = $puck_6;
              return EmptyVisitor[visitor.type].visitAssignmentExpression.call(visitor, e);
            }
            else {
              if ($puck_6.kind === "BinaryExpression") {
                let {value: e} = $puck_6;
                return EmptyVisitor[visitor.type].visitBinaryExpression.call(visitor, e);
              }
              else {
                if ($puck_6.kind === "CallExpression") {
                  let {value: e} = $puck_6;
                  return EmptyVisitor[visitor.type].visitCallExpression.call(visitor, e);
                }
                else {
                  if ($puck_6.kind === "IfExpression") {
                    let {value: e} = $puck_6;
                    return EmptyVisitor[visitor.type].visitIfExpression.call(visitor, e);
                  }
                  else {
                    if ($puck_6.kind === "IfLetExpression") {
                      let {value: e} = $puck_6;
                      return EmptyVisitor[visitor.type].visitIfLetExpression.call(visitor, e);
                    }
                    else {
                      if ($puck_6.kind === "MatchExpression") {
                        let {value: e} = $puck_6;
                        return EmptyVisitor[visitor.type].visitMatchExpression.call(visitor, e);
                      }
                      else {
                        if ($puck_6.kind === "TypePathExpression") {
                          let {value: e} = $puck_6;
                          return EmptyVisitor[visitor.type].visitTypePathExpression.call(visitor, e);
                        }
                        else {
                          if ($puck_6.kind === "UnaryExpression") {
                            let {value: e} = $puck_6;
                            return EmptyVisitor[visitor.type].visitUnaryExpression.call(visitor, e);
                          }
                          else {
                            if ($puck_6.kind === "IndexAccess") {
                              let {value: e} = $puck_6;
                              return EmptyVisitor[visitor.type].visitIndexAccess.call(visitor, e);
                            }
                            else {
                              if ($puck_6.kind === "MemberAccess") {
                                let {value: e} = $puck_6;
                                return EmptyVisitor[visitor.type].visitMemberAccess.call(visitor, e);
                              }
                              else {
                                if ($puck_6.kind === "TupleIndexAccess") {
                                  let {value: e} = $puck_6;
                                  return EmptyVisitor[visitor.type].visitTupleIndexAccess.call(visitor, e);
                                }
                                else {
                                  if ($puck_6.kind === "UnknownAccess") {
                                    let {value: e} = $puck_6;
                                    return EmptyVisitor[visitor.type].visitUnknownAccess.call(visitor, e);
                                  }
                                  else {
                                    if ($puck_6.kind === "UnknownIndexAccess") {
                                      let {value: e} = $puck_6;
                                      return EmptyVisitor[visitor.type].visitUnknownIndexAccess.call(visitor, e);
                                    }
                                    else {
                                      if ($puck_6.kind === "BooleanLiteral") {
                                        let {value: e} = $puck_6;
                                        return EmptyVisitor[visitor.type].visitBooleanLiteral.call(visitor, e);
                                      }
                                      else {
                                        if ($puck_6.kind === "ListLiteral") {
                                          let {value: e} = $puck_6;
                                          return EmptyVisitor[visitor.type].visitListLiteral.call(visitor, e);
                                        }
                                        else {
                                          if ($puck_6.kind === "NumberLiteral") {
                                            let {value: e} = $puck_6;
                                            return EmptyVisitor[visitor.type].visitNumberLiteral.call(visitor, e);
                                          }
                                          else {
                                            if ($puck_6.kind === "RangeLiteral") {
                                              let {value: e} = $puck_6;
                                              return EmptyVisitor[visitor.type].visitRangeLiteral.call(visitor, e);
                                            }
                                            else {
                                              if ($puck_6.kind === "RecordLiteral") {
                                                let {value: e} = $puck_6;
                                                return EmptyVisitor[visitor.type].visitRecordLiteral.call(visitor, e);
                                              }
                                              else {
                                                if ($puck_6.kind === "StringLiteral") {
                                                  let {value: e} = $puck_6;
                                                  return EmptyVisitor[visitor.type].visitStringLiteral.call(visitor, e);
                                                }
                                                else {
                                                  if ($puck_6.kind === "TupleLiteral") {
                                                    let {value: e} = $puck_6;
                                                    return EmptyVisitor[visitor.type].visitTupleLiteral.call(visitor, e);
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
exports.walkExpression = walkExpression;
function walkEnumDeclaration(visitor, e) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.typeParameters, $isTraitObject: true}, function (t) {
    return EmptyVisitor[visitor.type].visitTypeParameter.call(visitor, t);
  });
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.members, $isTraitObject: true}, function (t) {
    return EmptyVisitor[visitor.type].visitEnumMember.call(visitor, t);
  });
};
exports.walkEnumDeclaration = walkEnumDeclaration;
function walkEnumMember(visitor, e) {
  let $puck_8 = e.bound;
  if ($puck_8 !== undefined) {
    let typeBound = $puck_8;
    return EmptyVisitor[visitor.type].visitTypeBound.call(visitor, typeBound);
  };
};
exports.walkEnumMember = walkEnumMember;
function walkImplDeclaration(visitor, i) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
    return EmptyVisitor[visitor.type].visitTypeParameter.call(visitor, p);
  });
  EmptyVisitor[visitor.type].visitNamedTypeBound.call(visitor, i.trait_);
  EmptyVisitor[visitor.type].visitNamedTypeBound.call(visitor, i.type_);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
    return EmptyVisitor[visitor.type].visitFunctionDeclaration.call(visitor, m);
  });
};
exports.walkImplDeclaration = walkImplDeclaration;
function walkImplShorthandDeclaration(visitor, i) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
    return EmptyVisitor[visitor.type].visitTypeParameter.call(visitor, p);
  });
  EmptyVisitor[visitor.type].visitNamedTypeBound.call(visitor, i.type_);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
    return EmptyVisitor[visitor.type].visitFunctionDeclaration.call(visitor, m);
  });
};
exports.walkImplShorthandDeclaration = walkImplShorthandDeclaration;
function walkTraitDeclaration(visitor, t) {
  if (t.typeParameters) {
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
      return EmptyVisitor[visitor.type].visitTypeParameter.call(visitor, p);
    });
  };
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (t) {
    return EmptyVisitor[visitor.type].visitFunctionDeclaration.call(visitor, t);
  });
};
exports.walkTraitDeclaration = walkTraitDeclaration;
function walkTypeDeclaration(visitor, t) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (t) {
    return EmptyVisitor[visitor.type].visitTypeParameter.call(visitor, t);
  });
  let $puck_9 = t.bound;
  if ($puck_9 !== undefined) {
    let typeBound = $puck_9;
    return EmptyVisitor[visitor.type].visitTypeBound.call(visitor, typeBound);
  };
};
exports.walkTypeDeclaration = walkTypeDeclaration;
function walkExportDirective(visitor, e) {
  let $puck_10 = e.statement;
  if ($puck_10.kind === "EnumDeclaration") {
    let {value: d} = $puck_10;
    return EmptyVisitor[visitor.type].visitEnumDeclaration.call(visitor, d);
  }
  else {
    if ($puck_10.kind === "FunctionDeclaration") {
      let {value: d} = $puck_10;
      return EmptyVisitor[visitor.type].visitFunctionDeclaration.call(visitor, d);
    }
    else {
      if ($puck_10.kind === "Identifier") {
        let {value: d} = $puck_10;
        return EmptyVisitor[visitor.type].visitIdentifier.call(visitor, d);
      }
      else {
        if ($puck_10.kind === "TraitDeclaration") {
          let {value: d} = $puck_10;
          return EmptyVisitor[visitor.type].visitTraitDeclaration.call(visitor, d);
        }
        else {
          if ($puck_10.kind === "TypeDeclaration") {
            let {value: d} = $puck_10;
            return EmptyVisitor[visitor.type].visitTypeDeclaration.call(visitor, d);
          }
          else {
            if ($puck_10.kind === "VariableDeclaration") {
              let {value: d} = $puck_10;
              return EmptyVisitor[visitor.type].visitVariableDeclaration.call(visitor, d);
            };
          };
        };
      };
    };
  };
};
exports.walkExportDirective = walkExportDirective;
function walkImportDirective(visitor, i) {
  let $puck_11 = i.specifier;
  if ($puck_11.kind === "Identifier") {
    let {value: identifier} = $puck_11;
    return EmptyVisitor[visitor.type].visitIdentifier.call(visitor, identifier);
  }
  else {
    if ($puck_11.kind === "ObjectDestructure") {
      let {value: d} = $puck_11;
      return EmptyVisitor[visitor.type].visitObjectDestructure.call(visitor, d);
    }
    else {
      if ($puck_11.kind === "Asterisk") {
        let $puck_12 = $puck_11;;
        return $puck_12;
      };
    };
  };
};
exports.walkImportDirective = walkImportDirective;
function walkObjectDestructure(visitor, o) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true}, function (m) {
    EmptyVisitor[visitor.type].visitIdentifier.call(visitor, m.property);
    return EmptyVisitor[visitor.type].visitIdentifier.call(visitor, m.local);
  });
};
exports.walkObjectDestructure = walkObjectDestructure;
function walkBlock(visitor, b) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true}, function (s) {
    return EmptyVisitor[visitor.type].visitBlockLevelStatement.call(visitor, s);
  });
};
exports.walkBlock = walkBlock;
function walkReturnStatement(visitor, r) {
  return EmptyVisitor[visitor.type].visitExpression.call(visitor, r.expression);
};
exports.walkReturnStatement = walkReturnStatement;
function walkForLoop(visitor, e) {
  EmptyVisitor[visitor.type].visitPattern.call(visitor, e.pattern);
  EmptyVisitor[visitor.type].visitExpression.call(visitor, e.expression);
  return EmptyVisitor[visitor.type].visitBlock.call(visitor, e.body);
};
exports.walkForLoop = walkForLoop;
function walkWhileLoop(visitor, e) {
  EmptyVisitor[visitor.type].visitExpression.call(visitor, e.condition);
  return EmptyVisitor[visitor.type].visitBlock.call(visitor, e.body);
};
exports.walkWhileLoop = walkWhileLoop;
function walkFunctionDeclaration(visitor, f) {
  if (f.typeParameters) {
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, function (p) {
      return EmptyVisitor[visitor.type].visitTypeParameter.call(visitor, p);
    });
  };
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true}, function (p) {
    return EmptyVisitor[visitor.type].visitVariableDeclaration.call(visitor, p);
  });
  let $puck_13 = f.returnType;
  if ($puck_13 !== undefined) {
    let returnType = $puck_13;
    EmptyVisitor[visitor.type].visitTypeBound.call(visitor, returnType);
  };
  let $puck_14 = f.body;
  if ($puck_14 !== undefined) {
    let body = $puck_14;
    return EmptyVisitor[visitor.type].visitBlock.call(visitor, body);
  };
};
exports.walkFunctionDeclaration = walkFunctionDeclaration;
function walkVariableDeclaration(visitor, d) {
  EmptyVisitor[visitor.type].visitPattern.call(visitor, d.pattern);
  let $puck_15 = d.typeBound;
  if ($puck_15 !== undefined) {
    let typeBound = $puck_15;
    EmptyVisitor[visitor.type].visitTypeBound.call(visitor, typeBound);
  };
  let $puck_16 = d.initializer;
  if ($puck_16 !== undefined) {
    let initializer = $puck_16;
    return EmptyVisitor[visitor.type].visitExpression.call(visitor, initializer);
  };
};
exports.walkVariableDeclaration = walkVariableDeclaration;
function walkAssignmentExpression(visitor, e) {
  EmptyVisitor[visitor.type].visitExpression.call(visitor, e.lhs);
  return EmptyVisitor[visitor.type].visitExpression.call(visitor, e.rhs);
};
exports.walkAssignmentExpression = walkAssignmentExpression;
function walkBinaryExpression(visitor, e) {
  EmptyVisitor[visitor.type].visitExpression.call(visitor, e.lhs);
  return EmptyVisitor[visitor.type].visitExpression.call(visitor, e.rhs);
};
exports.walkBinaryExpression = walkBinaryExpression;
function walkCallExpression(visitor, e) {
  EmptyVisitor[visitor.type].visitExpression.call(visitor, e.func);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true}, function (e) {
    return EmptyVisitor[visitor.type].visitExpression.call(visitor, e);
  });
};
exports.walkCallExpression = walkCallExpression;
function walkIfExpression(visitor, e) {
  EmptyVisitor[visitor.type].visitExpression.call(visitor, e.condition);
  EmptyVisitor[visitor.type].visitBlock.call(visitor, e.then_);
  let $puck_17 = e.else_;
  if ($puck_17 !== undefined) {
    let else_ = $puck_17;
    return EmptyVisitor[visitor.type].visitBlock.call(visitor, else_);
  };
};
exports.walkIfExpression = walkIfExpression;
function walkIfLetExpression(visitor, e) {
  EmptyVisitor[visitor.type].visitPattern.call(visitor, e.pattern);
  EmptyVisitor[visitor.type].visitExpression.call(visitor, e.expression);
  EmptyVisitor[visitor.type].visitBlock.call(visitor, e.then_);
  let $puck_18 = e.else_;
  if ($puck_18 !== undefined) {
    let else_ = $puck_18;
    return EmptyVisitor[visitor.type].visitBlock.call(visitor, else_);
  };
};
exports.walkIfLetExpression = walkIfLetExpression;
function walkMatchExpression(visitor, e) {
  EmptyVisitor[visitor.type].visitExpression.call(visitor, e.expression);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (p) {
    return EmptyVisitor[visitor.type].visitMatchArm.call(visitor, p);
  });
};
exports.walkMatchExpression = walkMatchExpression;
function walkMatchArm(visitor, e) {
  EmptyVisitor[visitor.type].visitPattern.call(visitor, e.pattern);
  return EmptyVisitor[visitor.type].visitBlock.call(visitor, e.block);
};
exports.walkMatchArm = walkMatchArm;
function walkUnaryExpression(visitor, e) {
  return EmptyVisitor[visitor.type].visitExpression.call(visitor, e.rhs);
};
exports.walkUnaryExpression = walkUnaryExpression;
function walkIndexAccess(visitor, a) {
  EmptyVisitor[visitor.type].visitExpression.call(visitor, a.object);
  return EmptyVisitor[visitor.type].visitExpression.call(visitor, a.index);
};
exports.walkIndexAccess = walkIndexAccess;
function walkMemberAccess(visitor, a) {
  return EmptyVisitor[visitor.type].visitExpression.call(visitor, a.object);
};
exports.walkMemberAccess = walkMemberAccess;
function walkTupleIndexAccess(visitor, a) {
  return EmptyVisitor[visitor.type].visitExpression.call(visitor, a.object);
};
exports.walkTupleIndexAccess = walkTupleIndexAccess;
function walkUnknownAccess(visitor, a) {
  return EmptyVisitor[visitor.type].visitExpression.call(visitor, a.object);
};
exports.walkUnknownAccess = walkUnknownAccess;
function walkUnknownIndexAccess(visitor, a) {
  EmptyVisitor[visitor.type].visitExpression.call(visitor, a.object);
  return EmptyVisitor[visitor.type].visitExpression.call(visitor, a.index);
};
exports.walkUnknownIndexAccess = walkUnknownIndexAccess;
function walkListLiteral(visitor, l) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (e) {
    return EmptyVisitor[visitor.type].visitExpression.call(visitor, e);
  });
};
exports.walkListLiteral = walkListLiteral;
function walkRangeLiteral(visitor, a) {
  EmptyVisitor[visitor.type].visitExpression.call(visitor, a.start);
  return EmptyVisitor[visitor.type].visitExpression.call(visitor, a.end);
};
exports.walkRangeLiteral = walkRangeLiteral;
function walkRecordLiteral(visitor, l) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
    return EmptyVisitor[visitor.type].visitRecordLiteralMember.call(visitor, m);
  });
};
exports.walkRecordLiteral = walkRecordLiteral;
function walkRecordLiteralMember(visitor, l) {
  let $puck_19 = l;
  if ($puck_19.kind === "Property") {
    let {value: {name: name, value: value}} = $puck_19;
    return EmptyVisitor[visitor.type].visitExpression.call(visitor, value);
  }
  else {
    if ($puck_19.kind === "Spread") {
      let {value: e} = $puck_19;
      return EmptyVisitor[visitor.type].visitExpression.call(visitor, e);
    };
  };
};
exports.walkRecordLiteralMember = walkRecordLiteralMember;
function walkStringLiteral(visitor, l) {
  let $puck_20 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filterMap.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.parts, $isTraitObject: true}, function (p) {
    let $puck_21 = p;
    if ($puck_21.kind === "Identifier") {
      let {value: identifier} = $puck_21;
      return $puck_1.Some(identifier);
    }
    else {
      if (true) {
        $puck_21;
        return $puck_1.None;
      };
    };
  })
;
  return $puck_1.Iterable[$puck_20.type].forEach.call($puck_20, function (i) {
    return EmptyVisitor[visitor.type].visitIdentifier.call(visitor, i);
  });
};
exports.walkStringLiteral = walkStringLiteral;
function walkTupleLiteral(visitor, l) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true}, function (e) {
    return EmptyVisitor[visitor.type].visitExpression.call(visitor, e);
  });
};
exports.walkTupleLiteral = walkTupleLiteral;
function walkPattern(visitor, p) {
  let $puck_22 = p;
  if ($puck_22.kind === "CatchAll") {
    let $puck_23 = $puck_22;;
    return $puck_23;
  }
  else {
    if ($puck_22.kind === "Identifier") {
      let {value: {identifier: identifier, mutable: mutable}} = $puck_22;
      return EmptyVisitor[visitor.type].visitIdentifierPattern.call(visitor, identifier, mutable);
    }
    else {
      if ($puck_22.kind === "Record") {
        let {value: record} = $puck_22;
        return EmptyVisitor[visitor.type].visitRecordPattern.call(visitor, record);
      }
      else {
        if ($puck_22.kind === "RecordType") {
          let {value: [typePath, record]} = $puck_22;
          EmptyVisitor[visitor.type].visitTypePath.call(visitor, typePath);
          return EmptyVisitor[visitor.type].visitRecordPattern.call(visitor, record);
        }
        else {
          if ($puck_22.kind === "Tuple") {
            let {value: tuple} = $puck_22;
            return EmptyVisitor[visitor.type].visitTuplePattern.call(visitor, tuple);
          }
          else {
            if ($puck_22.kind === "TupleType") {
              let {value: [typePath, tuple]} = $puck_22;
              EmptyVisitor[visitor.type].visitTypePath.call(visitor, typePath);
              return EmptyVisitor[visitor.type].visitTuplePattern.call(visitor, tuple);
            }
            else {
              if ($puck_22.kind === "UnitType") {
                let {value: typePath} = $puck_22;
                return EmptyVisitor[visitor.type].visitTypePath.call(visitor, typePath);
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
    return EmptyVisitor[visitor.type].visitPattern.call(visitor, p.pattern);
  });
};
exports.walkRecordPattern = walkRecordPattern;
function walkTuplePattern(visitor, p) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true}, function (p) {
    return EmptyVisitor[visitor.type].visitPattern.call(visitor, p);
  });
};
exports.walkTuplePattern = walkTuplePattern;
function walkTypeBound(visitor, t) {
  let $puck_24 = t;
  if ($puck_24.kind === "FunctionTypeBound") {
    let {value: t} = $puck_24;
    return EmptyVisitor[visitor.type].visitFunctionTypeBound.call(visitor, t);
  }
  else {
    if ($puck_24.kind === "NamedTypeBound") {
      let {value: t} = $puck_24;
      return EmptyVisitor[visitor.type].visitNamedTypeBound.call(visitor, t);
    }
    else {
      if ($puck_24.kind === "RecordTypeBound") {
        let {value: t} = $puck_24;
        return EmptyVisitor[visitor.type].visitRecordTypeBound.call(visitor, t);
      }
      else {
        if ($puck_24.kind === "TupleTypeBound") {
          let {value: t} = $puck_24;
          return EmptyVisitor[visitor.type].visitTupleTypeBound.call(visitor, t);
        };
      };
    };
  };
};
exports.walkTypeBound = walkTypeBound;
function walkFunctionTypeBound(visitor, t) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
    return EmptyVisitor[visitor.type].visitTypeParameter.call(visitor, p);
  });
  EmptyVisitor[visitor.type].visitTupleTypeBound.call(visitor, t.parameters);
  return EmptyVisitor[visitor.type].visitTypeBound.call(visitor, t.returnType);
};
exports.walkFunctionTypeBound = walkFunctionTypeBound;
function walkNamedTypeBound(visitor, t) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
    return EmptyVisitor[visitor.type].visitTypeBound.call(visitor, p);
  });
};
exports.walkNamedTypeBound = walkNamedTypeBound;
function walkRecordTypeBound(visitor, t) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (t) {
    return EmptyVisitor[visitor.type].visitRecordTypeBoundMember.call(visitor, t);
  });
};
exports.walkRecordTypeBound = walkRecordTypeBound;
function walkRecordTypeBoundMember(visitor, t) {
  let $puck_25 = t;
  if ($puck_25.kind === "Property") {
    let {value: {name: name, typeBound: typeBound}} = $puck_25;
    return EmptyVisitor[visitor.type].visitTypeBound.call(visitor, typeBound);
  }
  else {
    if ($puck_25.kind === "Spread") {
      let {value: t} = $puck_25;
      return EmptyVisitor[visitor.type].visitTypeBound.call(visitor, t);
    };
  };
};
exports.walkRecordTypeBoundMember = walkRecordTypeBoundMember;
function walkTupleTypeBound(visitor, t) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (p) {
    return EmptyVisitor[visitor.type].visitTypeBound.call(visitor, p);
  });
};
exports.walkTupleTypeBound = walkTupleTypeBound;
function walkTypeParameter(visitor, t) {
  let $puck_26 = t.defaultValue;
  if ($puck_26 !== undefined) {
    let defaultValue = $puck_26;
    return EmptyVisitor[visitor.type].visitTypeBound.call(visitor, defaultValue);
  };
};
exports.walkTypeParameter = walkTypeParameter
