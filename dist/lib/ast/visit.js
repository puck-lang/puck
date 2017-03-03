'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.walkingVisitor = exports.emptyVisitor = exports.walkModule = exports.walkTopLevelStatement = exports.walkBlockLevelStatement = exports.walkExpression = exports.walkEnumDeclaration = exports.walkEnumMember = exports.walkImplDeclaration = exports.walkImplShorthandDeclaration = exports.walkTraitDeclaration = exports.walkTypeDeclaration = exports.walkExportDirective = exports.walkImportDirective = exports.walkObjectDestructure = exports.walkBlock = exports.walkReturnStatement = exports.walkWhileLoop = exports.walkFunctionDeclaration = exports.walkVariableDeclaration = exports.walkAssignmentExpression = exports.walkBinaryExpression = exports.walkCallExpression = exports.walkIfExpression = exports.walkIfLetExpression = exports.walkMatchExpression = exports.walkMatchArm = exports.walkUnaryExpression = exports.walkIndexAccess = exports.walkMemberAccess = exports.walkUnknownAccess = exports.walkUnknownIndexAccess = exports.walkListLiteral = exports.walkRecordLiteral = exports.walkStringLiteral = exports.walkTupleLiteral = exports.walkPattern = exports.walkIdentifierPattern = exports.walkRecordPattern = exports.walkTuplePattern = exports.walkTypeBound = exports.walkFunctionTypeBound = exports.walkNamedTypeBound = exports.walkRecordTypeBound = exports.walkRecordTypeBoundMember = exports.walkTupleTypeBound = exports.walkTypeParameterundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./ast");
const $puck_3 = require("./../compiler/ast");
var walkingVisitor = exports.walkingVisitor = {
  visitModule: function (m) {
  const self = this;
  return walkModule(self, m);
},
  visitTopLevelStatement: function (e) {
  const self = this;
  return walkTopLevelStatement(self, e);
},
  visitBlockLevelStatement: function (e) {
  const self = this;
  return walkBlockLevelStatement(self, e);
},
  visitExpression: function (e) {
  const self = this;
  return walkExpression(self, e);
},
  visitEnumDeclaration: function (e) {
  const self = this;
  return walkEnumDeclaration(self, e);
},
  visitEnumMember: function (e) {
  const self = this;
  return walkEnumMember(self, e);
},
  visitImplDeclaration: function (i) {
  const self = this;
  return walkImplDeclaration(self, i);
},
  visitImplShorthandDeclaration: function (i) {
  const self = this;
  return walkImplShorthandDeclaration(self, i);
},
  visitMethodDeclaration: function (f) {
  const self = this;
  return walkFunctionDeclaration(self, f);
},
  visitTraitDeclaration: function (t) {
  const self = this;
  return walkTraitDeclaration(self, t);
},
  visitTypeDeclaration: function (t) {
  const self = this;
  return walkTypeDeclaration(self, t);
},
  visitExportDirective: function (e) {
  const self = this;
  return walkExportDirective(self, e);
},
  visitImportDirective: function (i) {
  const self = this;
  return walkImportDirective(self, i);
},
  visitObjectDestructure: function (o) {
  const self = this;
  return walkObjectDestructure(self, o);
},
  visitBlock: function (b) {
  const self = this;
  return walkBlock(self, b);
},
  visitBreak: function () {},
  visitReturn: function (r) {
  const self = this;
  return walkReturnStatement(self, r);
},
  visitWhileLoop: function (e) {
  const self = this;
  return walkWhileLoop(self, e);
},
  visitIdentifier: function (i) {},
  visitFunctionDeclaration: function (f) {
  const self = this;
  return walkFunctionDeclaration(self, f);
},
  visitVariableDeclaration: function (d) {
  const self = this;
  return walkVariableDeclaration(self, d);
},
  visitAssignmentExpression: function (e) {
  const self = this;
  return walkAssignmentExpression(self, e);
},
  visitBinaryExpression: function (e) {
  const self = this;
  return walkBinaryExpression(self, e);
},
  visitCallExpression: function (e) {
  const self = this;
  return walkCallExpression(self, e);
},
  visitIfExpression: function (e) {
  const self = this;
  return walkIfExpression(self, e);
},
  visitIfLetExpression: function (e) {
  const self = this;
  return walkIfLetExpression(self, e);
},
  visitMatchExpression: function (e) {
  const self = this;
  return walkMatchExpression(self, e);
},
  visitMatchArm: function (e) {
  const self = this;
  return walkMatchArm(self, e);
},
  visitUnaryExpression: function (e) {
  const self = this;
  return walkUnaryExpression(self, e);
},
  visitIndexAccess: function (a) {
  const self = this;
  return walkIndexAccess(self, a);
},
  visitMemberAccess: function (a) {
  const self = this;
  return walkMemberAccess(self, a);
},
  visitUnknownAccess: function (a) {
  const self = this;
  return walkUnknownAccess(self, a);
},
  visitUnknownIndexAccess: function (a) {
  const self = this;
  return walkUnknownIndexAccess(self, a);
},
  visitBooleanLiteral: function (l) {},
  visitListLiteral: function (l) {
  const self = this;
  return walkListLiteral(self, l);
},
  visitNumberLiteral: function (l) {},
  visitRecordLiteral: function (l) {
  const self = this;
  return walkRecordLiteral(self, l);
},
  visitStringLiteral: function (l) {
  const self = this;
  return walkStringLiteral(self, l);
},
  visitTupleLiteral: function (l) {
  const self = this;
  return walkTupleLiteral(self, l);
},
  visitPattern: function (p) {
  const self = this;
  return walkPattern(self, p);
},
  visitIdentifierPattern: function (p) {
  const self = this;
  return walkIdentifierPattern(self, p);
},
  visitRecordPattern: function (p) {
  const self = this;
  return walkRecordPattern(self, p);
},
  visitTuplePattern: function (p) {
  const self = this;
  return walkTuplePattern(self, p);
},
  visitTypeBound: function (t) {
  const self = this;
  return walkTypeBound(self, t);
},
  visitFunctionTypeBound: function (t) {
  const self = this;
  return walkFunctionTypeBound(self, t);
},
  visitNamedTypeBound: function (t) {
  const self = this;
  return walkNamedTypeBound(self, t);
},
  visitRecordTypeBound: function (t) {
  const self = this;
  return walkRecordTypeBound(self, t);
},
  visitRecordTypeBoundMember: function (t) {
  const self = this;
  return walkRecordTypeBoundMember(self, t);
},
  visitTupleTypeBound: function (t) {
  const self = this;
  return walkTupleTypeBound(self, t);
},
  visitTypeParameter: function (t) {
  const self = this;
  return walkTypeParameter(self, t);
},
};
var emptyVisitor = exports.emptyVisitor = {
  visitModule: function () {},
  visitTopLevelStatement: function (e) {
  const self = this;
  return walkTopLevelStatement(self, e);
},
  visitBlockLevelStatement: function (e) {
  const self = this;
  return walkBlockLevelStatement(self, e);
},
  visitExpression: function (e) {
  const self = this;
  return walkExpression(self, e);
},
  visitEnumDeclaration: function () {},
  visitEnumMember: function () {},
  visitMethodDeclaration: function () {},
  visitImplDeclaration: function () {},
  visitImplShorthandDeclaration: function () {},
  visitTraitDeclaration: function () {},
  visitTypeDeclaration: function () {},
  visitExportDirective: function () {},
  visitImportDirective: function () {},
  visitObjectDestructure: function () {},
  visitBlock: function () {},
  visitBreak: function () {},
  visitReturn: function () {},
  visitWhileLoop: function () {},
  visitIdentifier: function () {},
  visitFunctionDeclaration: function () {},
  visitVariableDeclaration: function () {},
  visitAssignmentExpression: function () {},
  visitBinaryExpression: function () {},
  visitCallExpression: function () {},
  visitIfExpression: function () {},
  visitIfLetExpression: function () {},
  visitMatchExpression: function () {},
  visitMatchArm: function () {},
  visitTypePath: function () {},
  visitTypePathExpression: function () {},
  visitUnaryExpression: function () {},
  visitIndexAccess: function () {},
  visitMemberAccess: function () {},
  visitUnknownAccess: function () {},
  visitUnknownIndexAccess: function () {},
  visitBooleanLiteral: function () {},
  visitListLiteral: function () {},
  visitNumberLiteral: function () {},
  visitRecordLiteral: function () {},
  visitStringLiteral: function () {},
  visitTupleLiteral: function () {},
  visitPattern: function () {},
  visitIdentifierPattern: function () {},
  visitRecordPattern: function () {},
  visitTuplePattern: function () {},
  visitTypeParameter: function () {},
  visitTypeBound: function (t) {
  const self = this;
  return walkTypeBound(self, t);
},
  visitFunctionTypeBound: function () {},
  visitNamedTypeBound: function () {},
  visitRecordTypeBound: function () {},
  visitRecordTypeBoundMember: function () {},
  visitTupleTypeBound: function () {},
};
function walkModule(visitor, m) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
    return $unwrapTraitObject(visitor).visitTopLevelStatement(s);
  });
};
exports.walkModule = walkModule;
function walkTopLevelStatement(visitor, s) {
  let $puck_4 = s;
  if ($unwrapTraitObject($puck_4).kind === "ExportDirective") {
    let {value: e} = $unwrapTraitObject($puck_4);
    return $unwrapTraitObject(visitor).visitExportDirective(e);
  }
  else {
    if ($unwrapTraitObject($puck_4).kind === "ImportDirective") {
      let {value: e} = $unwrapTraitObject($puck_4);
      return $unwrapTraitObject(visitor).visitImportDirective(e);
    }
    else {
      if ($unwrapTraitObject($puck_4).kind === "EnumDeclaration") {
        let {value: e} = $unwrapTraitObject($puck_4);
        return $unwrapTraitObject(visitor).visitEnumDeclaration(e);
      }
      else {
        if ($unwrapTraitObject($puck_4).kind === "ImplDeclaration") {
          let {value: e} = $unwrapTraitObject($puck_4);
          return $unwrapTraitObject(visitor).visitImplDeclaration(e);
        }
        else {
          if ($unwrapTraitObject($puck_4).kind === "ImplShorthandDeclaration") {
            let {value: e} = $unwrapTraitObject($puck_4);
            return $unwrapTraitObject(visitor).visitImplShorthandDeclaration(e);
          }
          else {
            if ($unwrapTraitObject($puck_4).kind === "TraitDeclaration") {
              let {value: e} = $unwrapTraitObject($puck_4);
              return $unwrapTraitObject(visitor).visitTraitDeclaration(e);
            }
            else {
              if ($unwrapTraitObject($puck_4).kind === "TypeDeclaration") {
                let {value: e} = $unwrapTraitObject($puck_4);
                return $unwrapTraitObject(visitor).visitTypeDeclaration(e);
              }
              else {
                if ($unwrapTraitObject($puck_4).kind === "BlockLevelStatement") {
                  let {value: e} = $unwrapTraitObject($puck_4);
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
  if ($unwrapTraitObject($puck_5).kind === "Block") {
    let {value: e} = $unwrapTraitObject($puck_5);
    return $unwrapTraitObject(visitor).visitBlock(e);
  }
  else {
    if ($unwrapTraitObject($puck_5).kind === "BreakStatement") {
      let {value: e} = $unwrapTraitObject($puck_5);
      return $unwrapTraitObject(visitor).visitBreak(e);
    }
    else {
      if ($unwrapTraitObject($puck_5).kind === "ReturnStatement") {
        let {value: e} = $unwrapTraitObject($puck_5);
        return $unwrapTraitObject(visitor).visitReturn(e);
      }
      else {
        if ($unwrapTraitObject($puck_5).kind === "WhileLoop") {
          let {value: e} = $unwrapTraitObject($puck_5);
          return $unwrapTraitObject(visitor).visitWhileLoop(e);
        }
        else {
          if ($unwrapTraitObject($puck_5).kind === "Expression") {
            let {value: e} = $unwrapTraitObject($puck_5);
            return walkExpression(visitor, e);
          };
        };
      };
    };
  };
};
exports.walkBlockLevelStatement = walkBlockLevelStatement;
function walkExpression(visitor, e) {
  let $puck_6 = e;
  if ($unwrapTraitObject($puck_6).kind === "ThrowStatement") {
    let {value: e} = $unwrapTraitObject($puck_6);
    return $unwrapTraitObject(visitor).visitExpression(e.expression);
  }
  else {
    if ($unwrapTraitObject($puck_6).kind === "Comment") {
      let $puck_7 = $unwrapTraitObject($puck_6);;
      return $puck_7;
    }
    else {
      if ($unwrapTraitObject($puck_6).kind === "Identifier") {
        let {value: e} = $unwrapTraitObject($puck_6);
        return $unwrapTraitObject(visitor).visitIdentifier(e);
      }
      else {
        if ($unwrapTraitObject($puck_6).kind === "FunctionDeclaration") {
          let {value: e} = $unwrapTraitObject($puck_6);
          return $unwrapTraitObject(visitor).visitFunctionDeclaration(e);
        }
        else {
          if ($unwrapTraitObject($puck_6).kind === "VariableDeclaration") {
            let {value: e} = $unwrapTraitObject($puck_6);
            return $unwrapTraitObject(visitor).visitVariableDeclaration(e);
          }
          else {
            if ($unwrapTraitObject($puck_6).kind === "AssignmentExpression") {
              let {value: e} = $unwrapTraitObject($puck_6);
              return $unwrapTraitObject(visitor).visitAssignmentExpression(e);
            }
            else {
              if ($unwrapTraitObject($puck_6).kind === "BinaryExpression") {
                let {value: e} = $unwrapTraitObject($puck_6);
                return $unwrapTraitObject(visitor).visitBinaryExpression(e);
              }
              else {
                if ($unwrapTraitObject($puck_6).kind === "CallExpression") {
                  let {value: e} = $unwrapTraitObject($puck_6);
                  return $unwrapTraitObject(visitor).visitCallExpression(e);
                }
                else {
                  if ($unwrapTraitObject($puck_6).kind === "IfExpression") {
                    let {value: e} = $unwrapTraitObject($puck_6);
                    return $unwrapTraitObject(visitor).visitIfExpression(e);
                  }
                  else {
                    if ($unwrapTraitObject($puck_6).kind === "IfLetExpression") {
                      let {value: e} = $unwrapTraitObject($puck_6);
                      return $unwrapTraitObject(visitor).visitIfLetExpression(e);
                    }
                    else {
                      if ($unwrapTraitObject($puck_6).kind === "MatchExpression") {
                        let {value: e} = $unwrapTraitObject($puck_6);
                        return $unwrapTraitObject(visitor).visitMatchExpression(e);
                      }
                      else {
                        if ($unwrapTraitObject($puck_6).kind === "TypePathExpression") {
                          let {value: e} = $unwrapTraitObject($puck_6);
                          return $unwrapTraitObject(visitor).visitTypePathExpression(e);
                        }
                        else {
                          if ($unwrapTraitObject($puck_6).kind === "UnaryExpression") {
                            let {value: e} = $unwrapTraitObject($puck_6);
                            return $unwrapTraitObject(visitor).visitUnaryExpression(e);
                          }
                          else {
                            if ($unwrapTraitObject($puck_6).kind === "IndexAccess") {
                              let {value: e} = $unwrapTraitObject($puck_6);
                              return $unwrapTraitObject(visitor).visitIndexAccess(e);
                            }
                            else {
                              if ($unwrapTraitObject($puck_6).kind === "MemberAccess") {
                                let {value: e} = $unwrapTraitObject($puck_6);
                                return $unwrapTraitObject(visitor).visitMemberAccess(e);
                              }
                              else {
                                if ($unwrapTraitObject($puck_6).kind === "UnknownAccess") {
                                  let {value: e} = $unwrapTraitObject($puck_6);
                                  return $unwrapTraitObject(visitor).visitUnknownAccess(e);
                                }
                                else {
                                  if ($unwrapTraitObject($puck_6).kind === "UnknownIndexAccess") {
                                    let {value: e} = $unwrapTraitObject($puck_6);
                                    return $unwrapTraitObject(visitor).visitUnknownIndexAccess(e);
                                  }
                                  else {
                                    if ($unwrapTraitObject($puck_6).kind === "BooleanLiteral") {
                                      let {value: e} = $unwrapTraitObject($puck_6);
                                      return $unwrapTraitObject(visitor).visitBooleanLiteral(e);
                                    }
                                    else {
                                      if ($unwrapTraitObject($puck_6).kind === "ListLiteral") {
                                        let {value: e} = $unwrapTraitObject($puck_6);
                                        return $unwrapTraitObject(visitor).visitListLiteral(e);
                                      }
                                      else {
                                        if ($unwrapTraitObject($puck_6).kind === "NumberLiteral") {
                                          let {value: e} = $unwrapTraitObject($puck_6);
                                          return $unwrapTraitObject(visitor).visitNumberLiteral(e);
                                        }
                                        else {
                                          if ($unwrapTraitObject($puck_6).kind === "RecordLiteral") {
                                            let {value: e} = $unwrapTraitObject($puck_6);
                                            return $unwrapTraitObject(visitor).visitRecordLiteral(e);
                                          }
                                          else {
                                            if ($unwrapTraitObject($puck_6).kind === "StringLiteral") {
                                              let {value: e} = $unwrapTraitObject($puck_6);
                                              return $unwrapTraitObject(visitor).visitStringLiteral(e);
                                            }
                                            else {
                                              if ($unwrapTraitObject($puck_6).kind === "TupleLiteral") {
                                                let {value: e} = $unwrapTraitObject($puck_6);
                                                return $unwrapTraitObject(visitor).visitTupleLiteral(e);
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
    return $unwrapTraitObject(visitor).visitTypeParameter(t);
  });
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.members, $isTraitObject: true}, function (t) {
    return $unwrapTraitObject(visitor).visitEnumMember(t);
  });
};
exports.walkEnumDeclaration = walkEnumDeclaration;
function walkEnumMember(visitor, e) {
  let $puck_8 = e.bound;
  if ($puck_8.kind === "Some") {
    let {value: typeBound} = $puck_8;
    return $unwrapTraitObject(visitor).visitTypeBound(typeBound);
  };
};
exports.walkEnumMember = walkEnumMember;
function walkImplDeclaration(visitor, i) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeParameter).bind(visitor));
  $unwrapTraitObject(visitor).visitNamedTypeBound(i.trait_);
  $unwrapTraitObject(visitor).visitNamedTypeBound(i.type_);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitFunctionDeclaration).bind(visitor));
};
exports.walkImplDeclaration = walkImplDeclaration;
function walkImplShorthandDeclaration(visitor, i) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeParameter).bind(visitor));
  $unwrapTraitObject(visitor).visitNamedTypeBound(i.type_);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitFunctionDeclaration).bind(visitor));
};
exports.walkImplShorthandDeclaration = walkImplShorthandDeclaration;
function walkTraitDeclaration(visitor, t) {
  if (t.typeParameters) {
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeParameter).bind(visitor));
  };
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (t) {
    return $unwrapTraitObject(visitor).visitFunctionDeclaration(t);
  });
};
exports.walkTraitDeclaration = walkTraitDeclaration;
function walkTypeDeclaration(visitor, t) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (t) {
    return $unwrapTraitObject(visitor).visitTypeParameter(t);
  });
  let $puck_9 = t.bound;
  if ($puck_9.kind === "Some") {
    let {value: typeBound} = $puck_9;
    return $unwrapTraitObject(visitor).visitTypeBound(typeBound);
  };
};
exports.walkTypeDeclaration = walkTypeDeclaration;
function walkExportDirective(visitor, e) {
  let $puck_10 = e.statement;
  if ($unwrapTraitObject($puck_10).kind === "EnumDeclaration") {
    let {value: d} = $unwrapTraitObject($puck_10);
    return $unwrapTraitObject(visitor).visitEnumDeclaration(d);
  }
  else {
    if ($unwrapTraitObject($puck_10).kind === "FunctionDeclaration") {
      let {value: d} = $unwrapTraitObject($puck_10);
      return $unwrapTraitObject(visitor).visitFunctionDeclaration(d);
    }
    else {
      if ($unwrapTraitObject($puck_10).kind === "TraitDeclaration") {
        let {value: d} = $unwrapTraitObject($puck_10);
        return $unwrapTraitObject(visitor).visitTraitDeclaration(d);
      }
      else {
        if ($unwrapTraitObject($puck_10).kind === "TypeDeclaration") {
          let {value: d} = $unwrapTraitObject($puck_10);
          return $unwrapTraitObject(visitor).visitTypeDeclaration(d);
        }
        else {
          if ($unwrapTraitObject($puck_10).kind === "VariableDeclaration") {
            let {value: d} = $unwrapTraitObject($puck_10);
            return $unwrapTraitObject(visitor).visitVariableDeclaration(d);
          };
        };
      };
    };
  };
};
exports.walkExportDirective = walkExportDirective;
function walkImportDirective(visitor, i) {
  let $puck_11 = i.specifier;
  if ($unwrapTraitObject($puck_11).kind === "Identifier") {
    let {value: identifier} = $unwrapTraitObject($puck_11);
    return $unwrapTraitObject(visitor).visitIdentifier(identifier);
  }
  else {
    if ($unwrapTraitObject($puck_11).kind === "ObjectDestructure") {
      let {value: d} = $unwrapTraitObject($puck_11);
      return $unwrapTraitObject(visitor).visitObjectDestructure(d);
    }
    else {
      if ($unwrapTraitObject($puck_11).kind === "Asterisk") {
        let $puck_12 = $unwrapTraitObject($puck_11);;
        return $puck_12;
      };
    };
  };
};
exports.walkImportDirective = walkImportDirective;
function walkObjectDestructure(visitor, o) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true}, function (m) {
    $unwrapTraitObject(visitor).visitIdentifier(m.property);
    return $unwrapTraitObject(visitor).visitIdentifier(m.local);
  });
};
exports.walkObjectDestructure = walkObjectDestructure;
function walkBlock(visitor, b) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true}, function (s) {
    return $unwrapTraitObject(visitor).visitBlockLevelStatement(s);
  });
};
exports.walkBlock = walkBlock;
function walkReturnStatement(visitor, r) {
  return $unwrapTraitObject(visitor).visitExpression(r.expression);
};
exports.walkReturnStatement = walkReturnStatement;
function walkWhileLoop(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.condition);
  return $unwrapTraitObject(visitor).visitBlock(e.body);
};
exports.walkWhileLoop = walkWhileLoop;
function walkFunctionDeclaration(visitor, f) {
  if (f.typeParameters) {
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeParameter).bind(visitor));
  };
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitVariableDeclaration).bind(visitor));
  let $puck_13 = f.returnType;
  if ($puck_13.kind === "Some") {
    let {value: returnType} = $puck_13;
    $unwrapTraitObject(visitor).visitTypeBound(returnType);
  };
  let $puck_14 = f.body;
  if ($puck_14.kind === "Some") {
    let {value: body} = $puck_14;
    return $unwrapTraitObject(visitor).visitBlock(body);
  };
};
exports.walkFunctionDeclaration = walkFunctionDeclaration;
function walkVariableDeclaration(visitor, d) {
  $unwrapTraitObject(visitor).visitPattern(d.pattern);
  let $puck_15 = d.typeBound;
  if ($puck_15.kind === "Some") {
    let {value: typeBound} = $puck_15;
    $unwrapTraitObject(visitor).visitTypeBound(typeBound);
  };
  let $puck_16 = d.initializer;
  if ($puck_16.kind === "Some") {
    let {value: initializer} = $puck_16;
    return $unwrapTraitObject(visitor).visitExpression(initializer);
  };
};
exports.walkVariableDeclaration = walkVariableDeclaration;
function walkAssignmentExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.lhs);
  return $unwrapTraitObject(visitor).visitExpression(e.rhs);
};
exports.walkAssignmentExpression = walkAssignmentExpression;
function walkBinaryExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.lhs);
  return $unwrapTraitObject(visitor).visitExpression(e.rhs);
};
exports.walkBinaryExpression = walkBinaryExpression;
function walkCallExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.func);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true}, function (e) {
    return $unwrapTraitObject(visitor).visitExpression(e);
  });
};
exports.walkCallExpression = walkCallExpression;
function walkIfExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.condition);
  $unwrapTraitObject(visitor).visitBlock(e.then_);
  let $puck_17 = e.else_;
  if ($puck_17.kind === "Some") {
    let {value: else_} = $puck_17;
    return $unwrapTraitObject(visitor).visitBlock(else_);
  };
};
exports.walkIfExpression = walkIfExpression;
function walkIfLetExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitPattern(e.pattern);
  $unwrapTraitObject(visitor).visitExpression(e.expression);
  $unwrapTraitObject(visitor).visitBlock(e.then_);
  let $puck_18 = e.else_;
  if ($puck_18.kind === "Some") {
    let {value: else_} = $puck_18;
    return $unwrapTraitObject(visitor).visitBlock(else_);
  };
};
exports.walkIfLetExpression = walkIfLetExpression;
function walkMatchExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitExpression(e.expression);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (p) {
    return $unwrapTraitObject(visitor).visitMatchArm(p);
  });
};
exports.walkMatchExpression = walkMatchExpression;
function walkMatchArm(visitor, e) {
  $unwrapTraitObject(visitor).visitPattern(e.pattern);
  return $unwrapTraitObject(visitor).visitBlock(e.block);
};
exports.walkMatchArm = walkMatchArm;
function walkUnaryExpression(visitor, e) {
  return $unwrapTraitObject(visitor).visitExpression(e.rhs);
};
exports.walkUnaryExpression = walkUnaryExpression;
function walkIndexAccess(visitor, a) {
  $unwrapTraitObject(visitor).visitExpression(a.object);
  return $unwrapTraitObject(visitor).visitExpression(a.index);
};
exports.walkIndexAccess = walkIndexAccess;
function walkMemberAccess(visitor, a) {
  $unwrapTraitObject(visitor).visitExpression(a.object);
  return $unwrapTraitObject(visitor).visitExpression(a.member);
};
exports.walkMemberAccess = walkMemberAccess;
function walkUnknownAccess(visitor, a) {
  $unwrapTraitObject(visitor).visitExpression(a.object);
  return $unwrapTraitObject(visitor).visitExpression(a.member);
};
exports.walkUnknownAccess = walkUnknownAccess;
function walkUnknownIndexAccess(visitor, a) {
  $unwrapTraitObject(visitor).visitExpression(a.object);
  return $unwrapTraitObject(visitor).visitExpression(a.index);
};
exports.walkUnknownIndexAccess = walkUnknownIndexAccess;
function walkListLiteral(visitor, l) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (e) {
    return $unwrapTraitObject(visitor).visitExpression(e);
  });
};
exports.walkListLiteral = walkListLiteral;
function walkRecordLiteral(visitor, l) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
    $unwrapTraitObject(visitor).visitIdentifier(m.name);
    return $unwrapTraitObject(visitor).visitExpression(m.value);
  });
};
exports.walkRecordLiteral = walkRecordLiteral;
function walkStringLiteral(visitor, l) {
  let $puck_19 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filterMap.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.parts, $isTraitObject: true}, function (p) {
    let $puck_20 = p;
    if ($unwrapTraitObject($puck_20).kind === "Identifier") {
      let {value: identifier} = $unwrapTraitObject($puck_20);
      return $puck_1.Some(identifier);
    }
    else {
      if (true) {
        $puck_20;
        return $puck_1.None;
      };
    };
  })
;
  return $puck_1.Iterable[$puck_19.type].forEach.call($puck_19, function (i) {
    return $unwrapTraitObject(visitor).visitIdentifier(i);
  });
};
exports.walkStringLiteral = walkStringLiteral;
function walkTupleLiteral(visitor, l) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true}, function (e) {
    return $unwrapTraitObject(visitor).visitExpression(e);
  });
};
exports.walkTupleLiteral = walkTupleLiteral;
function walkPattern(visitor, p) {
  let $puck_21 = p;
  if ($unwrapTraitObject($puck_21).kind === "CatchAll") {
    let $puck_22 = $unwrapTraitObject($puck_21);;
    return $puck_22;
  }
  else {
    if ($unwrapTraitObject($puck_21).kind === "Identifier") {
      let {value: {identifier: identifier, mutable: mutable}} = $unwrapTraitObject($puck_21);
      return $unwrapTraitObject(visitor).visitIdentifierPattern(identifier, mutable);
    }
    else {
      if ($unwrapTraitObject($puck_21).kind === "Record") {
        let {value: record} = $unwrapTraitObject($puck_21);
        return $unwrapTraitObject(visitor).visitRecordPattern(record);
      }
      else {
        if ($unwrapTraitObject($puck_21).kind === "RecordType") {
          let {value: [typePath, record]} = $unwrapTraitObject($puck_21);
          $unwrapTraitObject(visitor).visitTypePath(typePath);
          return $unwrapTraitObject(visitor).visitRecordPattern(record);
        }
        else {
          if ($unwrapTraitObject($puck_21).kind === "Tuple") {
            let {value: tuple} = $unwrapTraitObject($puck_21);
            return $unwrapTraitObject(visitor).visitTuplePattern(tuple);
          }
          else {
            if ($unwrapTraitObject($puck_21).kind === "TupleType") {
              let {value: [typePath, tuple]} = $unwrapTraitObject($puck_21);
              $unwrapTraitObject(visitor).visitTypePath(typePath);
              return $unwrapTraitObject(visitor).visitTuplePattern(tuple);
            }
            else {
              if ($unwrapTraitObject($puck_21).kind === "UnitType") {
                let {value: typePath} = $unwrapTraitObject($puck_21);
                return $unwrapTraitObject(visitor).visitTypePath(typePath);
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
    return $unwrapTraitObject(visitor).visitPattern(p.pattern);
  });
};
exports.walkRecordPattern = walkRecordPattern;
function walkTuplePattern(visitor, p) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true}, function (p) {
    return $unwrapTraitObject(visitor).visitPattern(p);
  });
};
exports.walkTuplePattern = walkTuplePattern;
function walkTypeBound(visitor, t) {
  let $puck_23 = t;
  if ($unwrapTraitObject($puck_23).kind === "FunctionTypeBound") {
    let {value: t} = $unwrapTraitObject($puck_23);
    return $unwrapTraitObject(visitor).visitFunctionTypeBound(t);
  }
  else {
    if ($unwrapTraitObject($puck_23).kind === "NamedTypeBound") {
      let {value: t} = $unwrapTraitObject($puck_23);
      return $unwrapTraitObject(visitor).visitNamedTypeBound(t);
    }
    else {
      if ($unwrapTraitObject($puck_23).kind === "RecordTypeBound") {
        let {value: t} = $unwrapTraitObject($puck_23);
        return $unwrapTraitObject(visitor).visitRecordTypeBound(t);
      }
      else {
        if ($unwrapTraitObject($puck_23).kind === "TupleTypeBound") {
          let {value: t} = $unwrapTraitObject($puck_23);
          return $unwrapTraitObject(visitor).visitTupleTypeBound(t);
        };
      };
    };
  };
};
exports.walkTypeBound = walkTypeBound;
function walkFunctionTypeBound(visitor, t) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeParameter).bind(visitor));
  $unwrapTraitObject(visitor).visitTupleTypeBound(t.parameters);
  return $unwrapTraitObject(visitor).visitTypeBound(t.returnType);
};
exports.walkFunctionTypeBound = walkFunctionTypeBound;
function walkNamedTypeBound(visitor, t) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeBound).bind(visitor));
};
exports.walkNamedTypeBound = walkNamedTypeBound;
function walkRecordTypeBound(visitor, t) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (t) {
    return $unwrapTraitObject(visitor).visitRecordTypeBoundMember(t);
  });
};
exports.walkRecordTypeBound = walkRecordTypeBound;
function walkRecordTypeBoundMember(visitor, t) {
  return $unwrapTraitObject(visitor).visitTypeBound(t.typeBound);
};
exports.walkRecordTypeBoundMember = walkRecordTypeBoundMember;
function walkTupleTypeBound(visitor, t) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeBound).bind(visitor));
};
exports.walkTupleTypeBound = walkTupleTypeBound;
function walkTypeParameter(visitor, t) {
  let $puck_24 = t.defaultValue;
  if ($puck_24.kind === "Some") {
    let {value: defaultValue} = $puck_24;
    return $unwrapTraitObject(visitor).visitTypeBound(defaultValue);
  };
};
exports.walkTypeParameter = walkTypeParameter
