'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.walkingVisitor = exports.emptyVisitor = exports.walkModule = exports.walkTopLevelStatement = exports.walkBlockLevelStatement = exports.walkExpression = exports.walkEnumDeclaration = exports.walkEnumMember = exports.walkImplDeclaration = exports.walkImplShorthandDeclaration = exports.walkTraitDeclaration = exports.walkTypeDeclaration = exports.walkExportDirective = exports.walkImportDirective = exports.walkObjectDestructure = exports.walkBlock = exports.walkReturnStatement = exports.walkForLoop = exports.walkWhileLoop = exports.walkFunctionDeclaration = exports.walkVariableDeclaration = exports.walkAssignmentExpression = exports.walkBinaryExpression = exports.walkCallExpression = exports.walkIfExpression = exports.walkIfLetExpression = exports.walkMatchExpression = exports.walkMatchArm = exports.walkUnaryExpression = exports.walkIndexAccess = exports.walkMemberAccess = exports.walkTupleIndexAccess = exports.walkUnknownAccess = exports.walkUnknownIndexAccess = exports.walkListLiteral = exports.walkRangeLiteral = exports.walkRecordLiteral = exports.walkRecordLiteralMember = exports.walkStringLiteral = exports.walkTupleLiteral = exports.walkPattern = exports.walkIdentifierPattern = exports.walkRecordPattern = exports.walkTuplePattern = exports.walkTypeBound = exports.walkFunctionTypeBound = exports.walkIntersectionTypeBound = exports.walkNamedTypeBound = exports.walkRecordTypeBound = exports.walkRecordTypeBoundMember = exports.walkTupleTypeBound = exports.walkTypeParameter = exports.walkTypeParameterBound = exports.walkWhereClause = undefined;
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
  visitForLoop: function (e) {
  const self = this;
  return walkForLoop(self, e);
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
  visitTupleIndexAccess: function (a) {
  const self = this;
  return walkTupleIndexAccess(self, a);
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
  visitRangeLiteral: function (l) {
  const self = this;
  return walkRangeLiteral(self, l);
},
  visitRecordLiteral: function (l) {
  const self = this;
  return walkRecordLiteral(self, l);
},
  visitRecordLiteralMember: function (l) {
  const self = this;
  return walkRecordLiteralMember(self, l);
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
  IntersectionTypeBound: function (t) {
  const self = this;
  return walkIntersectionTypeBound(self, t);
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
  visitTypeParameterBound: function (t) {
  const self = this;
  return walkTypeParameterBound(self, t);
},
  visitWhereClause: function (t) {
  const self = this;
  return walkWhereClause(self, t);
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
  visitForLoop: function () {},
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
  visitRangeLiteral: function () {},
  visitRecordLiteral: function () {},
  visitStringLiteral: function () {},
  visitTupleLiteral: function () {},
  visitPattern: function () {},
  visitIdentifierPattern: function () {},
  visitRecordPattern: function () {},
  visitTuplePattern: function () {},
  visitTypeParameter: function () {},
  visitTypeParameterBound: function () {},
  visitWhereClause: function () {},
  visitTypeBound: function (t) {
  const self = this;
  return walkTypeBound(self, t);
},
  visitFunctionTypeBound: function () {},
  visitIntersectionTypeBound: function () {},
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
  if ($puck_4.kind === "ExportDirective") {
    let {value: e} = $puck_4;
    return $unwrapTraitObject(visitor).visitExportDirective(e);
  }
  else {
    if ($puck_4.kind === "ImportDirective") {
      let {value: e} = $puck_4;
      return $unwrapTraitObject(visitor).visitImportDirective(e);
    }
    else {
      if ($puck_4.kind === "EnumDeclaration") {
        let {value: e} = $puck_4;
        return $unwrapTraitObject(visitor).visitEnumDeclaration(e);
      }
      else {
        if ($puck_4.kind === "ImplDeclaration") {
          let {value: e} = $puck_4;
          return $unwrapTraitObject(visitor).visitImplDeclaration(e);
        }
        else {
          if ($puck_4.kind === "ImplShorthandDeclaration") {
            let {value: e} = $puck_4;
            return $unwrapTraitObject(visitor).visitImplShorthandDeclaration(e);
          }
          else {
            if ($puck_4.kind === "TraitDeclaration") {
              let {value: e} = $puck_4;
              return $unwrapTraitObject(visitor).visitTraitDeclaration(e);
            }
            else {
              if ($puck_4.kind === "TypeDeclaration") {
                let {value: e} = $puck_4;
                return $unwrapTraitObject(visitor).visitTypeDeclaration(e);
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
    return $unwrapTraitObject(visitor).visitBlock(e);
  }
  else {
    if ($puck_5.kind === "BreakStatement") {
      let {value: e} = $puck_5;
      return $unwrapTraitObject(visitor).visitBreak(e);
    }
    else {
      if ($puck_5.kind === "ReturnStatement") {
        let {value: e} = $puck_5;
        return $unwrapTraitObject(visitor).visitReturn(e);
      }
      else {
        if ($puck_5.kind === "ForLoop") {
          let {value: e} = $puck_5;
          return $unwrapTraitObject(visitor).visitForLoop(e);
        }
        else {
          if ($puck_5.kind === "WhileLoop") {
            let {value: e} = $puck_5;
            return $unwrapTraitObject(visitor).visitWhileLoop(e);
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
      return $unwrapTraitObject(visitor).visitIdentifier(e);
    }
    else {
      if ($puck_6.kind === "FunctionDeclaration") {
        let {value: e} = $puck_6;
        return $unwrapTraitObject(visitor).visitFunctionDeclaration(e);
      }
      else {
        if ($puck_6.kind === "VariableDeclaration") {
          let {value: e} = $puck_6;
          return $unwrapTraitObject(visitor).visitVariableDeclaration(e);
        }
        else {
          if ($puck_6.kind === "AssignmentExpression") {
            let {value: e} = $puck_6;
            return $unwrapTraitObject(visitor).visitAssignmentExpression(e);
          }
          else {
            if ($puck_6.kind === "BinaryExpression") {
              let {value: e} = $puck_6;
              return $unwrapTraitObject(visitor).visitBinaryExpression(e);
            }
            else {
              if ($puck_6.kind === "CallExpression") {
                let {value: e} = $puck_6;
                return $unwrapTraitObject(visitor).visitCallExpression(e);
              }
              else {
                if ($puck_6.kind === "IfExpression") {
                  let {value: e} = $puck_6;
                  return $unwrapTraitObject(visitor).visitIfExpression(e);
                }
                else {
                  if ($puck_6.kind === "IfLetExpression") {
                    let {value: e} = $puck_6;
                    return $unwrapTraitObject(visitor).visitIfLetExpression(e);
                  }
                  else {
                    if ($puck_6.kind === "MatchExpression") {
                      let {value: e} = $puck_6;
                      return $unwrapTraitObject(visitor).visitMatchExpression(e);
                    }
                    else {
                      if ($puck_6.kind === "TypePathExpression") {
                        let {value: e} = $puck_6;
                        return $unwrapTraitObject(visitor).visitTypePathExpression(e);
                      }
                      else {
                        if ($puck_6.kind === "UnaryExpression") {
                          let {value: e} = $puck_6;
                          return $unwrapTraitObject(visitor).visitUnaryExpression(e);
                        }
                        else {
                          if ($puck_6.kind === "IndexAccess") {
                            let {value: e} = $puck_6;
                            return $unwrapTraitObject(visitor).visitIndexAccess(e);
                          }
                          else {
                            if ($puck_6.kind === "MemberAccess") {
                              let {value: e} = $puck_6;
                              return $unwrapTraitObject(visitor).visitMemberAccess(e);
                            }
                            else {
                              if ($puck_6.kind === "TupleIndexAccess") {
                                let {value: e} = $puck_6;
                                return $unwrapTraitObject(visitor).visitTupleIndexAccess(e);
                              }
                              else {
                                if ($puck_6.kind === "UnknownAccess") {
                                  let {value: e} = $puck_6;
                                  return $unwrapTraitObject(visitor).visitUnknownAccess(e);
                                }
                                else {
                                  if ($puck_6.kind === "UnknownIndexAccess") {
                                    let {value: e} = $puck_6;
                                    return $unwrapTraitObject(visitor).visitUnknownIndexAccess(e);
                                  }
                                  else {
                                    if ($puck_6.kind === "BooleanLiteral") {
                                      let {value: e} = $puck_6;
                                      return $unwrapTraitObject(visitor).visitBooleanLiteral(e);
                                    }
                                    else {
                                      if ($puck_6.kind === "ListLiteral") {
                                        let {value: e} = $puck_6;
                                        return $unwrapTraitObject(visitor).visitListLiteral(e);
                                      }
                                      else {
                                        if ($puck_6.kind === "NumberLiteral") {
                                          let {value: e} = $puck_6;
                                          return $unwrapTraitObject(visitor).visitNumberLiteral(e);
                                        }
                                        else {
                                          if ($puck_6.kind === "RangeLiteral") {
                                            let {value: e} = $puck_6;
                                            return $unwrapTraitObject(visitor).visitRangeLiteral(e);
                                          }
                                          else {
                                            if ($puck_6.kind === "RecordLiteral") {
                                              let {value: e} = $puck_6;
                                              return $unwrapTraitObject(visitor).visitRecordLiteral(e);
                                            }
                                            else {
                                              if ($puck_6.kind === "StringLiteral") {
                                                let {value: e} = $puck_6;
                                                return $unwrapTraitObject(visitor).visitStringLiteral(e);
                                              }
                                              else {
                                                if ($puck_6.kind === "TupleLiteral") {
                                                  let {value: e} = $puck_6;
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
  if ($puck_8 !== undefined) {
    let typeBound = $puck_8;
    return $unwrapTraitObject(visitor).visitTypeBound(typeBound);
  };
};
exports.walkEnumMember = walkEnumMember;
function walkImplDeclaration(visitor, i) {
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeParameter).bind(visitor));
  $unwrapTraitObject(visitor).visitNamedTypeBound(i.trait_);
  $unwrapTraitObject(visitor).visitNamedTypeBound(i.type_);
  let $puck_9 = i.whereClause;
  if ($puck_9 !== undefined) {
    let whereClause = $puck_9;
    $unwrapTraitObject(visitor).visitWhereClause(whereClause);
  };
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
  let $puck_10 = t.traitBound;
  if ($puck_10 !== undefined) {
    let {bound: bound} = $puck_10;
    $unwrapTraitObject(visitor).visitTypeBound(bound);
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
  let $puck_11 = t.bound;
  if ($puck_11 !== undefined) {
    let typeBound = $puck_11;
    return $unwrapTraitObject(visitor).visitTypeBound(typeBound);
  };
};
exports.walkTypeDeclaration = walkTypeDeclaration;
function walkExportDirective(visitor, e) {
  let $puck_12 = e.statement;
  if ($puck_12.kind === "EnumDeclaration") {
    let {value: d} = $puck_12;
    return $unwrapTraitObject(visitor).visitEnumDeclaration(d);
  }
  else {
    if ($puck_12.kind === "FunctionDeclaration") {
      let {value: d} = $puck_12;
      return $unwrapTraitObject(visitor).visitFunctionDeclaration(d);
    }
    else {
      if ($puck_12.kind === "Identifier") {
        let {value: d} = $puck_12;
        return $unwrapTraitObject(visitor).visitIdentifier(d);
      }
      else {
        if ($puck_12.kind === "TraitDeclaration") {
          let {value: d} = $puck_12;
          return $unwrapTraitObject(visitor).visitTraitDeclaration(d);
        }
        else {
          if ($puck_12.kind === "TypeDeclaration") {
            let {value: d} = $puck_12;
            return $unwrapTraitObject(visitor).visitTypeDeclaration(d);
          }
          else {
            if ($puck_12.kind === "VariableDeclaration") {
              let {value: d} = $puck_12;
              return $unwrapTraitObject(visitor).visitVariableDeclaration(d);
            };
          };
        };
      };
    };
  };
};
exports.walkExportDirective = walkExportDirective;
function walkImportDirective(visitor, i) {
  let $puck_13 = i.specifier;
  if ($puck_13.kind === "Identifier") {
    let {value: identifier} = $puck_13;
    return $unwrapTraitObject(visitor).visitIdentifier(identifier);
  }
  else {
    if ($puck_13.kind === "ObjectDestructure") {
      let {value: d} = $puck_13;
      return $unwrapTraitObject(visitor).visitObjectDestructure(d);
    }
    else {
      if ($puck_13.kind === "Asterisk") {
        let $puck_14 = $puck_13;;
        return $puck_14;
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
function walkForLoop(visitor, e) {
  $unwrapTraitObject(visitor).visitPattern(e.pattern);
  $unwrapTraitObject(visitor).visitExpression(e.expression);
  return $unwrapTraitObject(visitor).visitBlock(e.body);
};
exports.walkForLoop = walkForLoop;
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
  let $puck_15 = f.returnType;
  if ($puck_15 !== undefined) {
    let returnType = $puck_15;
    $unwrapTraitObject(visitor).visitTypeBound(returnType);
  };
  let $puck_16 = f.whereClause;
  if ($puck_16 !== undefined) {
    let whereClause = $puck_16;
    $unwrapTraitObject(visitor).visitWhereClause(whereClause);
  };
  let $puck_17 = f.body;
  if ($puck_17 !== undefined) {
    let body = $puck_17;
    return $unwrapTraitObject(visitor).visitBlock(body);
  };
};
exports.walkFunctionDeclaration = walkFunctionDeclaration;
function walkVariableDeclaration(visitor, d) {
  $unwrapTraitObject(visitor).visitPattern(d.pattern);
  let $puck_18 = d.typeBound;
  if ($puck_18 !== undefined) {
    let typeBound = $puck_18;
    $unwrapTraitObject(visitor).visitTypeBound(typeBound);
  };
  let $puck_19 = d.initializer;
  if ($puck_19 !== undefined) {
    let initializer = $puck_19;
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
  let $puck_20 = e.else_;
  if ($puck_20 !== undefined) {
    let else_ = $puck_20;
    return $unwrapTraitObject(visitor).visitBlock(else_);
  };
};
exports.walkIfExpression = walkIfExpression;
function walkIfLetExpression(visitor, e) {
  $unwrapTraitObject(visitor).visitPattern(e.pattern);
  $unwrapTraitObject(visitor).visitExpression(e.expression);
  $unwrapTraitObject(visitor).visitBlock(e.then_);
  let $puck_21 = e.else_;
  if ($puck_21 !== undefined) {
    let else_ = $puck_21;
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
function walkTupleIndexAccess(visitor, a) {
  $unwrapTraitObject(visitor).visitExpression(a.object);
  return $unwrapTraitObject(visitor).visitExpression(a.index);
};
exports.walkTupleIndexAccess = walkTupleIndexAccess;
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
function walkRangeLiteral(visitor, a) {
  $unwrapTraitObject(visitor).visitExpression(a.start);
  return $unwrapTraitObject(visitor).visitExpression(a.end);
};
exports.walkRangeLiteral = walkRangeLiteral;
function walkRecordLiteral(visitor, l) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
    return $unwrapTraitObject(visitor).visitRecordLiteralMember(m);
  });
};
exports.walkRecordLiteral = walkRecordLiteral;
function walkRecordLiteralMember(visitor, l) {
  let $puck_22 = l;
  if ($puck_22.kind === "Property") {
    let {value: {name: name, value: value}} = $puck_22;
    return $unwrapTraitObject(visitor).visitExpression(value);
  }
  else {
    if ($puck_22.kind === "Spread") {
      let {value: e} = $puck_22;
      return $unwrapTraitObject(visitor).visitExpression(e);
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
  let $puck_25 = p;
  if ($puck_25.kind === "CatchAll") {
    let $puck_26 = $puck_25;;
    return $puck_26;
  }
  else {
    if ($puck_25.kind === "Identifier") {
      let {value: {identifier: identifier, mutable: mutable}} = $puck_25;
      return $unwrapTraitObject(visitor).visitIdentifierPattern(identifier, mutable);
    }
    else {
      if ($puck_25.kind === "Record") {
        let {value: record} = $puck_25;
        return $unwrapTraitObject(visitor).visitRecordPattern(record);
      }
      else {
        if ($puck_25.kind === "RecordType") {
          let {value: [typePath, record]} = $puck_25;
          $unwrapTraitObject(visitor).visitTypePath(typePath);
          return $unwrapTraitObject(visitor).visitRecordPattern(record);
        }
        else {
          if ($puck_25.kind === "Tuple") {
            let {value: tuple} = $puck_25;
            return $unwrapTraitObject(visitor).visitTuplePattern(tuple);
          }
          else {
            if ($puck_25.kind === "TupleType") {
              let {value: [typePath, tuple]} = $puck_25;
              $unwrapTraitObject(visitor).visitTypePath(typePath);
              return $unwrapTraitObject(visitor).visitTuplePattern(tuple);
            }
            else {
              if ($puck_25.kind === "UnitType") {
                let {value: typePath} = $puck_25;
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
  let $puck_27 = t;
  if ($puck_27.kind === "FunctionTypeBound") {
    let {value: t} = $puck_27;
    return $unwrapTraitObject(visitor).visitFunctionTypeBound(t);
  }
  else {
    if ($puck_27.kind === "IntersectionTypeBound") {
      let {value: t} = $puck_27;
      return $unwrapTraitObject(visitor).visitIntersectionTypeBound(t);
    }
    else {
      if ($puck_27.kind === "NamedTypeBound") {
        let {value: t} = $puck_27;
        return $unwrapTraitObject(visitor).visitNamedTypeBound(t);
      }
      else {
        if ($puck_27.kind === "RecordTypeBound") {
          let {value: t} = $puck_27;
          return $unwrapTraitObject(visitor).visitRecordTypeBound(t);
        }
        else {
          if ($puck_27.kind === "TupleTypeBound") {
            let {value: t} = $puck_27;
            return $unwrapTraitObject(visitor).visitTupleTypeBound(t);
          };
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
function walkIntersectionTypeBound(visitor, t) {
  $unwrapTraitObject(visitor).visitTypeBound(t.baseType);
  return $unwrapTraitObject(visitor).visitNamedTypeBound(t.traitBound);
};
exports.walkIntersectionTypeBound = walkIntersectionTypeBound;
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
  let $puck_28 = t;
  if ($puck_28.kind === "Property") {
    let {value: {name: name, typeBound: typeBound}} = $puck_28;
    return $unwrapTraitObject(visitor).visitTypeBound(typeBound);
  }
  else {
    if ($puck_28.kind === "Spread") {
      let {value: t} = $puck_28;
      return $unwrapTraitObject(visitor).visitTypeBound(t);
    };
  };
};
exports.walkRecordTypeBoundMember = walkRecordTypeBoundMember;
function walkTupleTypeBound(visitor, t) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(visitor).visitTypeBound).bind(visitor));
};
exports.walkTupleTypeBound = walkTupleTypeBound;
function walkTypeParameter(visitor, t) {
  let $puck_29 = t.defaultValue;
  if ($puck_29 !== undefined) {
    let defaultValue = $puck_29;
    return $unwrapTraitObject(visitor).visitTypeBound(defaultValue);
  };
};
exports.walkTypeParameter = walkTypeParameter;
function walkTypeParameterBound(visitor, t) {
  $unwrapTraitObject(visitor).visitTypeBound(t.subType);
  return $unwrapTraitObject(visitor).visitTypeBound(t.superType);
};
exports.walkTypeParameterBound = walkTypeParameterBound;
function walkWhereClause(visitor, w) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: w.bounds, $isTraitObject: true}, function (b) {
    return $unwrapTraitObject(visitor).visitTypeParameterBound(b);
  });
};
exports.walkWhereClause = walkWhereClause
