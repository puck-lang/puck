'use strict';
exports.PositionVisitor = exports.walkModule = exports.walkTopLevelStatement = exports.walkBlockLevelStatement = exports.walkExpression = exports.walkEnumDeclaration = exports.walkEnumMember = exports.walkImplDeclaration = exports.walkImplShorthandDeclaration = exports.walkMethodDeclaration = exports.walkTraitDeclaration = exports.walkTypeDeclaration = exports.walkExportDirective = exports.walkImportDirective = exports.walkObjectDestructure = exports.walkObjectDestructureMember = exports.walkBlock = exports.walkReturnStatement = exports.walkForLoop = exports.walkWhileLoop = exports.walkFunctionDeclaration = exports.walkVariableDeclaration = exports.walkAssignmentExpression = exports.walkBinaryExpression = exports.walkCallExpression = exports.walkIfExpression = exports.walkIfLetExpression = exports.walkMatchExpression = exports.walkMatchArm = exports.walkTypePath = exports.walkTypePathExpression = exports.walkUnaryExpression = exports.walkIndexAccess = exports.walkMemberAccess = exports.walkTupleIndexAccess = exports.walkUnknownAccess = exports.walkUnknownIndexAccess = exports.walkListLiteral = exports.walkRangeLiteral = exports.walkRecordLiteral = exports.walkRecordLiteralMember = exports.walkStringLiteral = exports.walkStringLiteralPart = exports.walkTupleLiteral = exports.walkPattern = exports.walkIdentifierPattern = exports.walkRecordPattern = exports.walkTuplePattern = exports.walkTypeBound = exports.walkFunctionTypeBound = exports.walkIntersectionTypeBound = exports.walkNamedTypeBound = exports.walkRecordTypeBound = exports.walkRecordTypeBoundMember = exports.walkTupleTypeBound = exports.walkTypeParameter = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./../ast/ast");
const $puck_3 = require("./../ast/span");
var PositionVisitor = exports.PositionVisitor = {
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
visitStringLiteralPart: function (l) {
  let self = this;
  walkStringLiteralPart(self, l);
},
visitTupleLiteral: function (l) {
  let self = this;
  walkTupleLiteral(self, l);
},
visitPattern: function (p) {
  let self = this;
  walkPattern(self, p);
},
visitIdentifierPattern: function (p) {
  let self = this;
  walkIdentifierPattern(self, p);
},
visitRecordPattern: function (p) {
  let self = this;
  walkRecordPattern(self, p);
},
visitRecordTypePattern: function (t, p) {
  let self = this;
  walkTypePath(self, t);
  walkRecordPattern(self, p);
},
visitTuplePattern: function (p) {
  let self = this;
  walkTuplePattern(self, p);
},
visitTupleTypePattern: function (t, p) {
  let self = this;
  walkTypePath(self, t);
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
}
};
function walkModule(visitor, m) {
  let $puck_4 = $puck_1.List.binarySearchBy.call(m.statements, function (statement) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TopLevelStatement"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TopLevelStatement', value: statement, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_4.kind === "Ok") {
    let {value: index} = $puck_4;
    PositionVisitor[visitor.type].visitTopLevelStatement.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: m.statements, $isTraitObject: true}, index));
    return true;
  }
  else {
    return false;
  };
};
exports.walkModule = walkModule;
function walkTopLevelStatement(visitor, e) {
  let $puck_5 = e;
  if ($puck_5.kind === "EnumDeclaration") {
    let {value: s} = $puck_5;
    PositionVisitor[visitor.type].visitEnumDeclaration.call(visitor, s);
  }
  else {
    if ($puck_5.kind === "ExportDirective") {
      let {value: s} = $puck_5;
      PositionVisitor[visitor.type].visitExportDirective.call(visitor, s);
    }
    else {
      if ($puck_5.kind === "ImportDirective") {
        let {value: s} = $puck_5;
        PositionVisitor[visitor.type].visitImportDirective.call(visitor, s);
      }
      else {
        if ($puck_5.kind === "ImplDeclaration") {
          let {value: s} = $puck_5;
          PositionVisitor[visitor.type].visitImplDeclaration.call(visitor, s);
        }
        else {
          if ($puck_5.kind === "ImplShorthandDeclaration") {
            let {value: s} = $puck_5;
            PositionVisitor[visitor.type].visitImplShorthandDeclaration.call(visitor, s);
          }
          else {
            if ($puck_5.kind === "TraitDeclaration") {
              let {value: s} = $puck_5;
              PositionVisitor[visitor.type].visitTraitDeclaration.call(visitor, s);
            }
            else {
              if ($puck_5.kind === "TypeDeclaration") {
                let {value: s} = $puck_5;
                PositionVisitor[visitor.type].visitTypeDeclaration.call(visitor, s);
              }
              else {
                if ($puck_5.kind === "BlockLevelStatement") {
                  let {value: s} = $puck_5;
                  PositionVisitor[visitor.type].visitBlockLevelStatement.call(visitor, s);
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
function walkBlockLevelStatement(visitor, e) {
  let $puck_6 = e;
  if ($puck_6.kind === "Block") {
    let {value: e} = $puck_6;
    PositionVisitor[visitor.type].visitBlock.call(visitor, e);
  }
  else {
    if ($puck_6.kind === "BreakStatement") {
      let {value: e} = $puck_6;
      PositionVisitor[visitor.type].visitBreakStatement.call(visitor, e);
    }
    else {
      if ($puck_6.kind === "ReturnStatement") {
        let {value: e} = $puck_6;
        PositionVisitor[visitor.type].visitReturnStatement.call(visitor, e);
      }
      else {
        if ($puck_6.kind === "ForLoop") {
          let {value: e} = $puck_6;
          PositionVisitor[visitor.type].visitForLoop.call(visitor, e);
        }
        else {
          if ($puck_6.kind === "WhileLoop") {
            let {value: e} = $puck_6;
            PositionVisitor[visitor.type].visitWhileLoop.call(visitor, e);
          }
          else {
            if ($puck_6.kind === "Expression") {
              let {value: e} = $puck_6;
              walkExpression(visitor, e);
            };
          };
        };
      };
    };
  };
};
exports.walkBlockLevelStatement = walkBlockLevelStatement;
function walkExpression(visitor, e) {
  let $puck_7 = e;
  if ($puck_7.kind === "Comment") {
    $puck_7;
  }
  else {
    if ($puck_7.kind === "Identifier") {
      let {value: e} = $puck_7;
      PositionVisitor[visitor.type].visitIdentifier.call(visitor, e);
    }
    else {
      if ($puck_7.kind === "FunctionDeclaration") {
        let {value: e} = $puck_7;
        PositionVisitor[visitor.type].visitFunctionDeclaration.call(visitor, e);
      }
      else {
        if ($puck_7.kind === "VariableDeclaration") {
          let {value: e} = $puck_7;
          PositionVisitor[visitor.type].visitVariableDeclaration.call(visitor, e);
        }
        else {
          if ($puck_7.kind === "AssignmentExpression") {
            let {value: e} = $puck_7;
            PositionVisitor[visitor.type].visitAssignmentExpression.call(visitor, e);
          }
          else {
            if ($puck_7.kind === "BinaryExpression") {
              let {value: e} = $puck_7;
              PositionVisitor[visitor.type].visitBinaryExpression.call(visitor, e);
            }
            else {
              if ($puck_7.kind === "CallExpression") {
                let {value: e} = $puck_7;
                PositionVisitor[visitor.type].visitCallExpression.call(visitor, e);
              }
              else {
                if ($puck_7.kind === "IfExpression") {
                  let {value: e} = $puck_7;
                  PositionVisitor[visitor.type].visitIfExpression.call(visitor, e);
                }
                else {
                  if ($puck_7.kind === "IfLetExpression") {
                    let {value: e} = $puck_7;
                    PositionVisitor[visitor.type].visitIfLetExpression.call(visitor, e);
                  }
                  else {
                    if ($puck_7.kind === "MatchExpression") {
                      let {value: e} = $puck_7;
                      PositionVisitor[visitor.type].visitMatchExpression.call(visitor, e);
                    }
                    else {
                      if ($puck_7.kind === "TypePathExpression") {
                        let {value: e} = $puck_7;
                        PositionVisitor[visitor.type].visitTypePathExpression.call(visitor, e);
                      }
                      else {
                        if ($puck_7.kind === "UnaryExpression") {
                          let {value: e} = $puck_7;
                          PositionVisitor[visitor.type].visitUnaryExpression.call(visitor, e);
                        }
                        else {
                          if ($puck_7.kind === "IndexAccess") {
                            let {value: e} = $puck_7;
                            PositionVisitor[visitor.type].visitIndexAccess.call(visitor, e);
                          }
                          else {
                            if ($puck_7.kind === "MemberAccess") {
                              let {value: e} = $puck_7;
                              PositionVisitor[visitor.type].visitMemberAccess.call(visitor, e);
                            }
                            else {
                              if ($puck_7.kind === "TupleIndexAccess") {
                                let {value: e} = $puck_7;
                                PositionVisitor[visitor.type].visitTupleIndexAccess.call(visitor, e);
                              }
                              else {
                                if ($puck_7.kind === "UnknownAccess") {
                                  let {value: e} = $puck_7;
                                  PositionVisitor[visitor.type].visitUnknownAccess.call(visitor, e);
                                }
                                else {
                                  if ($puck_7.kind === "UnknownIndexAccess") {
                                    let {value: e} = $puck_7;
                                    PositionVisitor[visitor.type].visitUnknownIndexAccess.call(visitor, e);
                                  }
                                  else {
                                    if ($puck_7.kind === "BooleanLiteral") {
                                      let {value: e} = $puck_7;
                                      PositionVisitor[visitor.type].visitBooleanLiteral.call(visitor, e);
                                    }
                                    else {
                                      if ($puck_7.kind === "ListLiteral") {
                                        let {value: e} = $puck_7;
                                        PositionVisitor[visitor.type].visitListLiteral.call(visitor, e);
                                      }
                                      else {
                                        if ($puck_7.kind === "NumberLiteral") {
                                          let {value: e} = $puck_7;
                                          PositionVisitor[visitor.type].visitNumberLiteral.call(visitor, e);
                                        }
                                        else {
                                          if ($puck_7.kind === "RangeLiteral") {
                                            let {value: e} = $puck_7;
                                            PositionVisitor[visitor.type].visitRangeLiteral.call(visitor, e);
                                          }
                                          else {
                                            if ($puck_7.kind === "RecordLiteral") {
                                              let {value: e} = $puck_7;
                                              PositionVisitor[visitor.type].visitRecordLiteral.call(visitor, e);
                                            }
                                            else {
                                              if ($puck_7.kind === "StringLiteral") {
                                                let {value: e} = $puck_7;
                                                PositionVisitor[visitor.type].visitStringLiteral.call(visitor, e);
                                              }
                                              else {
                                                if ($puck_7.kind === "TupleLiteral") {
                                                  let {value: e} = $puck_7;
                                                  PositionVisitor[visitor.type].visitTupleLiteral.call(visitor, e);
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
  let $puck_8 = $puck_1.List.binarySearchBy.call(e.members, function (member) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumMember"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumMember', value: member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_8.kind === "Ok") {
    let {value: index} = $puck_8;
    PositionVisitor[visitor.type].visitEnumMember.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: e.members, $isTraitObject: true}, index));
    return true;
  };
  if ($puck_1.identical($puck_3.Span.cmp.call(e.name.span, PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitIdentifier.call(visitor, e.name);
  };
  let $puck_9 = $puck_1.List.binarySearchBy.call(e.typeParameters, function (member) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_9.kind === "Ok") {
    let {value: index} = $puck_9;
    PositionVisitor[visitor.type].visitTypeParameter.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: e.typeParameters, $isTraitObject: true}, index));
    return true;
  }
  else {
    return false;
  };
};
exports.walkEnumDeclaration = walkEnumDeclaration;
function walkEnumMember(visitor, e) {
  let $puck_10 = e.bound;
  if ($puck_10 !== undefined) {
    let typeBound = $puck_10;
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: typeBound, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      return PositionVisitor[visitor.type].visitTypeBound.call(visitor, typeBound);
    };
  };
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: e.name, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    return PositionVisitor[visitor.type].visitIdentifier.call(visitor, e.name);
  };
};
exports.walkEnumMember = walkEnumMember;
function walkImplDeclaration(visitor, i) {
  let $puck_11 = $puck_1.List.binarySearchBy.call(i.members, function (member) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_11.kind === "Ok") {
    let {value: index} = $puck_11;
    PositionVisitor[visitor.type].visitMethodDeclaration.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: i.members, $isTraitObject: true}, index));
    return true;
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.type_, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitNamedTypeBound.call(visitor, i.type_);
      return true;
    }
    else {
      if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.trait_, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
        PositionVisitor[visitor.type].visitNamedTypeBound.call(visitor, i.trait_);
        return true;
      }
      else {
        return false;
      };
    };
  };
};
exports.walkImplDeclaration = walkImplDeclaration;
function walkImplShorthandDeclaration(visitor, i) {
  let $puck_12 = $puck_1.List.binarySearchBy.call(i.members, function (member) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_12.kind === "Ok") {
    let {value: index} = $puck_12;
    PositionVisitor[visitor.type].visitMethodDeclaration.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: i.members, $isTraitObject: true}, index));
    return true;
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.type_, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitNamedTypeBound.call(visitor, i.type_);
      return true;
    }
    else {
      return false;
    };
  };
};
exports.walkImplShorthandDeclaration = walkImplShorthandDeclaration;
function walkMethodDeclaration(visitor, f) {
  PositionVisitor[visitor.type].visitFunctionDeclaration.call(visitor, f);
};
exports.walkMethodDeclaration = walkMethodDeclaration;
function walkTraitDeclaration(visitor, t) {
  let $puck_13 = $puck_1.List.binarySearchBy.call(t.members, function (member) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_13.kind === "Ok") {
    let {value: index} = $puck_13;
    PositionVisitor[visitor.type].visitMethodDeclaration.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: t.members, $isTraitObject: true}, index));
    return true;
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call(t.name.span, PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitIdentifier.call(visitor, t.name);
      return true;
    }
    else {
      if ($puck_1.Option.unwrapOr.call($puck_1.Option.map.call(t.traitBound, function ({bound: bound}) {
        return $puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: bound, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal);
      }), false)) {
        PositionVisitor[visitor.type].visitTypeBound.call(visitor, $puck_1.Option.unwrap.call(t.traitBound).bound);
        return true;
      }
      else {
        let $puck_14 = $puck_1.List.binarySearchBy.call(t.typeParameters, function (member) {
          return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
        });
        if ($puck_14.kind === "Ok") {
          let {value: index} = $puck_14;
          PositionVisitor[visitor.type].visitTypeParameter.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: t.typeParameters, $isTraitObject: true}, index));
          return true;
        }
        else {
          return false;
        };
      };
    };
  };
};
exports.walkTraitDeclaration = walkTraitDeclaration;
function walkTypeDeclaration(visitor, t) {
  let $puck_15 = t.bound;
  if ($puck_15 !== undefined) {
    let typeBound = $puck_15;
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: typeBound, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      return PositionVisitor[visitor.type].visitTypeBound.call(visitor, typeBound);
    };
  };
  if ($puck_1.identical($puck_3.Span.cmp.call(t.name.span, PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    return PositionVisitor[visitor.type].visitIdentifier.call(visitor, t.name);
  };
  let $puck_16 = $puck_1.List.binarySearchBy.call(t.typeParameters, function (member) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_16.kind === "Ok") {
    let {value: index} = $puck_16;
    PositionVisitor[visitor.type].visitTypeParameter.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: t.typeParameters, $isTraitObject: true}, index));
    true;
  };
};
exports.walkTypeDeclaration = walkTypeDeclaration;
function walkExportDirective(visitor, e) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportedStatement"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportedStatement', value: e.statement, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    let $puck_17 = e.statement;
    if ($puck_17.kind === "EnumDeclaration") {
      let {value: d} = $puck_17;
      PositionVisitor[visitor.type].visitEnumDeclaration.call(visitor, d);
    }
    else {
      if ($puck_17.kind === "TraitDeclaration") {
        let {value: d} = $puck_17;
        PositionVisitor[visitor.type].visitTraitDeclaration.call(visitor, d);
      }
      else {
        if ($puck_17.kind === "TypeDeclaration") {
          let {value: d} = $puck_17;
          PositionVisitor[visitor.type].visitTypeDeclaration.call(visitor, d);
        }
        else {
          if ($puck_17.kind === "Identifier") {
            let {value: d} = $puck_17;
            PositionVisitor[visitor.type].visitIdentifier.call(visitor, d);
          }
          else {
            if ($puck_17.kind === "FunctionDeclaration") {
              let {value: d} = $puck_17;
              PositionVisitor[visitor.type].visitFunctionDeclaration.call(visitor, d);
            }
            else {
              if ($puck_17.kind === "VariableDeclaration") {
                let {value: d} = $puck_17;
                PositionVisitor[visitor.type].visitVariableDeclaration.call(visitor, d);
              };
            };
          };
        };
      };
    };
  };
};
exports.walkExportDirective = walkExportDirective;
function walkImportDirective(visitor, i) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier', value: i.specifier, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    let $puck_18 = i.specifier;
    if ($puck_18.kind === "ObjectDestructure") {
      let {value: s} = $puck_18;
      PositionVisitor[visitor.type].visitObjectDestructure.call(visitor, s);
    }
    else {
      if (true) {
        $puck_18;
      };
    };
  };
};
exports.walkImportDirective = walkImportDirective;
function walkObjectDestructure(visitor, o) {
  let $puck_19 = $puck_1.List.binarySearchBy.call(o.members, function (member) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_19.kind === "Ok") {
    let {value: index} = $puck_19;
    PositionVisitor[visitor.type].visitObjectDestructureMember.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: o.members, $isTraitObject: true}, index));
    return true;
  }
  else {
    return false;
  };
};
exports.walkObjectDestructure = walkObjectDestructure;
function walkObjectDestructureMember(visitor, m) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.property, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitIdentifier.call(visitor, m.property);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitIdentifier.call(visitor, m.local);
    };
  };
};
exports.walkObjectDestructureMember = walkObjectDestructureMember;
function walkBlock(visitor, b) {
  let $puck_20 = $puck_1.List.binarySearchBy.call(b.statements, function (statement) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: statement, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_20.kind === "Ok") {
    let {value: index} = $puck_20;
    PositionVisitor[visitor.type].visitBlockLevelStatement.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: b.statements, $isTraitObject: true}, index));
    return true;
  }
  else {
    return false;
  };
};
exports.walkBlock = walkBlock;
function walkReturnStatement(visitor, r) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: r.expression, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, r.expression);
  };
};
exports.walkReturnStatement = walkReturnStatement;
function walkForLoop(visitor, e) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e.body, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitBlock.call(visitor, e.body);
  };
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.expression);
  }
  else {
    PositionVisitor[visitor.type].visitPattern.call(visitor, e.pattern);
  };
};
exports.walkForLoop = walkForLoop;
function walkWhileLoop(visitor, e) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e.body, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitBlock.call(visitor, e.body);
  }
  else {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.condition);
  };
};
exports.walkWhileLoop = walkWhileLoop;
function walkFunctionDeclaration(visitor, f) {
  let $puck_21 = f.body;
  if ($puck_21 !== undefined) {
    let body = $puck_21;
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: body, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      return PositionVisitor[visitor.type].visitBlock.call(visitor, body);
    };
  };
  let $puck_22 = $puck_1.List.binarySearchBy.call(f.parameterList, function (arg) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: arg, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_22.kind === "Ok") {
    let {value: index} = $puck_22;
    return PositionVisitor[visitor.type].visitVariableDeclaration.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: f.parameterList, $isTraitObject: true}, index));
  };
  let $puck_23 = f.returnType;
  if ($puck_23 !== undefined) {
    let returnType = $puck_23;
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: returnType, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      return PositionVisitor[visitor.type].visitTypeBound.call(visitor, returnType);
    };
  };
  let $puck_24 = $puck_1.List.binarySearchBy.call(f.typeParameters, function (arg) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: arg, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_24.kind === "Ok") {
    let {value: index} = $puck_24;
    return PositionVisitor[visitor.type].visitTypeParameter.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: f.typeParameters, $isTraitObject: true}, index));
  };
};
exports.walkFunctionDeclaration = walkFunctionDeclaration;
function walkVariableDeclaration(visitor, d) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: d.pattern, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitPattern.call(visitor, d.pattern);
  }
  else {
    let $puck_25 = d.typeBound;
    if ($puck_25 !== undefined) {
      let typeBound = $puck_25;
      if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: typeBound, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
        return PositionVisitor[visitor.type].visitTypeBound.call(visitor, typeBound);
      };
    };
    let $puck_26 = d.initializer;
    if ($puck_26 !== undefined) {
      let initializer = $puck_26;
      if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: initializer, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
        return PositionVisitor[visitor.type].visitExpression.call(visitor, initializer);
      };
    };
  };
};
exports.walkVariableDeclaration = walkVariableDeclaration;
function walkAssignmentExpression(visitor, e) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.lhs, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.lhs);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.rhs, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, e.rhs);
    };
  };
};
exports.walkAssignmentExpression = walkAssignmentExpression;
function walkBinaryExpression(visitor, e) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.lhs, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.lhs);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.rhs, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, e.rhs);
    };
  };
};
exports.walkBinaryExpression = walkBinaryExpression;
function walkCallExpression(visitor, e) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.func, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.func);
  }
  else {
    let $puck_27 = $puck_1.List.binarySearchBy.call(e.argumentList, function (arg) {
      return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: arg, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
    });
    if ($puck_27.kind === "Ok") {
      let {value: index} = $puck_27;
      PositionVisitor[visitor.type].visitExpression.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: e.argumentList, $isTraitObject: true}, index));
    };
  };
};
exports.walkCallExpression = walkCallExpression;
function walkIfExpression(visitor, e) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e.then_, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitBlock.call(visitor, e.then_);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.condition, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, e.condition);
    }
    else {
      let $puck_28 = e.else_;
      if ($puck_28 !== undefined) {
        let else_ = $puck_28;
        if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: else_, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
          return PositionVisitor[visitor.type].visitBlock.call(visitor, else_);
        };
      };
    };
  };
};
exports.walkIfExpression = walkIfExpression;
function walkIfLetExpression(visitor, e) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e.then_, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitBlock.call(visitor, e.then_);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: e.pattern, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitPattern.call(visitor, e.pattern);
    }
    else {
      if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
        PositionVisitor[visitor.type].visitExpression.call(visitor, e.expression);
      }
      else {
        let $puck_29 = e.else_;
        if ($puck_29 !== undefined) {
          let else_ = $puck_29;
          if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: else_, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
            return PositionVisitor[visitor.type].visitBlock.call(visitor, else_);
          };
        };
      };
    };
  };
};
exports.walkIfLetExpression = walkIfLetExpression;
function walkMatchExpression(visitor, e) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.expression);
  }
  else {
    let $puck_30 = $puck_1.List.binarySearchBy.call(e.patterns, function (pattern) {
      return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: pattern, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
    });
    if ($puck_30.kind === "Ok") {
      let {value: index} = $puck_30;
      PositionVisitor[visitor.type].visitMatchArm.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: e.patterns, $isTraitObject: true}, index));
    }
    else {
      return false;
    };
  };
  return true;
};
exports.walkMatchExpression = walkMatchExpression;
function walkMatchArm(visitor, e) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e.block, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitBlock.call(visitor, e.block);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: e.pattern, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitPattern.call(visitor, e.pattern);
    };
  };
};
exports.walkMatchArm = walkMatchArm;
function walkTypePath(visitor, e) {
  let $puck_31 = e;
  if ($puck_31.kind === "Member") {
    let {value: i} = $puck_31;
    PositionVisitor[visitor.type].visitIdentifier.call(visitor, i);
  }
  else {
    if ($puck_31.kind === "_Object") {
      let {value: [i, p]} = $puck_31;
      if ($puck_1.identical($puck_3.Span.cmp.call(i.span, PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
        PositionVisitor[visitor.type].visitIdentifier.call(visitor, i);
      }
      else {
        PositionVisitor[visitor.type].visitTypePath.call(visitor, p);
      };
    };
  };
};
exports.walkTypePath = walkTypePath;
function walkTypePathExpression(visitor, e) {
  PositionVisitor[visitor.type].visitTypePath.call(visitor, e.typePath);
};
exports.walkTypePathExpression = walkTypePathExpression;
function walkUnaryExpression(visitor, e) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.rhs, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, e.rhs);
  };
};
exports.walkUnaryExpression = walkUnaryExpression;
function walkIndexAccess(visitor, a) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, a.object);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.index, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, a.index);
    };
  };
};
exports.walkIndexAccess = walkIndexAccess;
function walkMemberAccess(visitor, a) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, a.object);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitIdentifier.call(visitor, a.member);
    };
  };
};
exports.walkMemberAccess = walkMemberAccess;
function walkTupleIndexAccess(visitor, a) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, a.object);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral', value: a.index, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitNumberLiteral.call(visitor, a.index);
    };
  };
};
exports.walkTupleIndexAccess = walkTupleIndexAccess;
function walkUnknownAccess(visitor, a) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, a.object);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitIdentifier.call(visitor, a.member);
    };
  };
};
exports.walkUnknownAccess = walkUnknownAccess;
function walkUnknownIndexAccess(visitor, a) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, a.object);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.index, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, a.index);
    };
  };
};
exports.walkUnknownIndexAccess = walkUnknownIndexAccess;
function walkListLiteral(visitor, l) {
  let $puck_32 = $puck_1.List.binarySearchBy.call(l.members, function (member) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_32.kind === "Ok") {
    let {value: index} = $puck_32;
    PositionVisitor[visitor.type].visitExpression.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: l.members, $isTraitObject: true}, index));
  };
};
exports.walkListLiteral = walkListLiteral;
function walkRangeLiteral(visitor, l) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: l.start, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitExpression.call(visitor, l.start);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: l.end, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, l.end);
    };
  };
};
exports.walkRangeLiteral = walkRangeLiteral;
function walkRecordLiteral(visitor, l) {
  let $puck_33 = $puck_1.List.binarySearchBy.call(l.members, function (member) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteralMember"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteralMember', value: member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_33.kind === "Ok") {
    let {value: index} = $puck_33;
    PositionVisitor[visitor.type].visitRecordLiteralMember.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: l.members, $isTraitObject: true}, index));
  };
};
exports.walkRecordLiteral = walkRecordLiteral;
function walkRecordLiteralMember(visitor, l) {
  let $puck_34 = l;
  if ($puck_34.kind === "Property") {
    let {value: {name: name, value: value}} = $puck_34;
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: value, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitExpression.call(visitor, value);
    };
  }
  else {
    if ($puck_34.kind === "Spread") {
      let {value: e} = $puck_34;
      PositionVisitor[visitor.type].visitExpression.call(visitor, e);
    };
  };
};
exports.walkRecordLiteralMember = walkRecordLiteralMember;
function walkStringLiteral(visitor, l) {
  let $puck_35 = $puck_1.List.binarySearchBy.call(l.parts, function (part) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart', value: part, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_35.kind === "Ok") {
    let {value: index} = $puck_35;
    PositionVisitor[visitor.type].visitStringLiteralPart.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: l.parts, $isTraitObject: true}, index));
  };
};
exports.walkStringLiteral = walkStringLiteral;
function walkStringLiteralPart(visitor, l) {
  let $puck_36 = l;
  if ($puck_36.kind === "Literal") {
    $puck_36;
  }
  else {
    if ($puck_36.kind === "Identifier") {
      let {value: identifier} = $puck_36;
      PositionVisitor[visitor.type].visitIdentifier.call(visitor, identifier);
    };
  };
};
exports.walkStringLiteralPart = walkStringLiteralPart;
function walkTupleLiteral(visitor, l) {
  let $puck_37 = $puck_1.List.binarySearchBy.call(l.expressions, function (member) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: member, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_37.kind === "Ok") {
    let {value: index} = $puck_37;
    PositionVisitor[visitor.type].visitExpression.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: l.expressions, $isTraitObject: true}, index));
  };
};
exports.walkTupleLiteral = walkTupleLiteral;
function walkPattern(visitor, p) {
  let $puck_38 = p;
  if ($puck_38.kind === "CatchAll") {
    $puck_38;
  }
  else {
    if ($puck_38.kind === "Identifier") {
      let {value: {identifier: identifier}} = $puck_38;
      PositionVisitor[visitor.type].visitIdentifierPattern.call(visitor, identifier);
    }
    else {
      if ($puck_38.kind === "Record") {
        let {value: recordPattern} = $puck_38;
        PositionVisitor[visitor.type].visitRecordPattern.call(visitor, recordPattern);
      }
      else {
        if ($puck_38.kind === "Tuple") {
          let {value: tuplePattern} = $puck_38;
          PositionVisitor[visitor.type].visitTuplePattern.call(visitor, tuplePattern);
        }
        else {
          if ($puck_38.kind === "RecordType") {
            let {value: [typePath, recordPattern]} = $puck_38;
            PositionVisitor[visitor.type].visitRecordTypePattern.call(visitor, typePath, recordPattern);
          }
          else {
            if ($puck_38.kind === "TupleType") {
              let {value: [typePath, tuplePattern]} = $puck_38;
              PositionVisitor[visitor.type].visitTupleTypePattern.call(visitor, typePath, tuplePattern);
            }
            else {
              if ($puck_38.kind === "UnitType") {
                let {value: typePath} = $puck_38;
                PositionVisitor[visitor.type].visitTypePath.call(visitor, typePath);
              };
            };
          };
        };
      };
    };
  };
};
exports.walkPattern = walkPattern;
function walkIdentifierPattern(visitor, p) {
  PositionVisitor[visitor.type].visitIdentifier.call(visitor, p);
};
exports.walkIdentifierPattern = walkIdentifierPattern;
function walkRecordPattern(visitor, p) {
  let $puck_39 = $puck_1.List.binarySearchBy.call(p.properties, function (prop) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPatternMember"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPatternMember', value: prop, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_39.kind === "Ok") {
    let {value: index} = $puck_39;
    PositionVisitor[visitor.type].visitPattern.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: p.properties, $isTraitObject: true}, index).pattern);
  };
};
exports.walkRecordPattern = walkRecordPattern;
function walkTuplePattern(visitor, p) {
  let $puck_40 = $puck_1.List.binarySearchBy.call(p.properties, function (prop) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: prop, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_40.kind === "Ok") {
    let {value: index} = $puck_40;
    PositionVisitor[visitor.type].visitPattern.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: p.properties, $isTraitObject: true}, index));
  };
};
exports.walkTuplePattern = walkTuplePattern;
function walkTypeBound(visitor, t) {
  let $puck_41 = t;
  if ($puck_41.kind === "FunctionTypeBound") {
    let {value: t} = $puck_41;
    PositionVisitor[visitor.type].visitFunctionTypeBound.call(visitor, t);
  }
  else {
    if ($puck_41.kind === "IntersectionTypeBound") {
      let {value: t} = $puck_41;
      PositionVisitor[visitor.type].visitIntersectionTypeBound.call(visitor, t);
    }
    else {
      if ($puck_41.kind === "NamedTypeBound") {
        let {value: t} = $puck_41;
        PositionVisitor[visitor.type].visitNamedTypeBound.call(visitor, t);
      }
      else {
        if ($puck_41.kind === "RecordTypeBound") {
          let {value: t} = $puck_41;
          PositionVisitor[visitor.type].visitRecordTypeBound.call(visitor, t);
        }
        else {
          if ($puck_41.kind === "TupleTypeBound") {
            let {value: t} = $puck_41;
            PositionVisitor[visitor.type].visitTupleTypeBound.call(visitor, t);
          };
        };
      };
    };
  };
};
exports.walkTypeBound = walkTypeBound;
function walkFunctionTypeBound(visitor, t) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: t.parameters, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitTupleTypeBound.call(visitor, t.parameters);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t.returnType, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitTypeBound.call(visitor, t.returnType);
    }
    else {
      let $puck_42 = $puck_1.List.binarySearchBy.call(t.typeParameters, function (t) {
        return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
      });
      if ($puck_42.kind === "Ok") {
        let {value: index} = $puck_42;
        PositionVisitor[visitor.type].visitTypeParameter.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: t.typeParameters, $isTraitObject: true}, index));
      };
    };
  };
};
exports.walkFunctionTypeBound = walkFunctionTypeBound;
function walkIntersectionTypeBound(visitor, t) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t.baseType, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitTypeBound.call(visitor, t.baseType);
  }
  else {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t.traitBound, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitNamedTypeBound.call(visitor, t.traitBound);
    };
  };
};
exports.walkIntersectionTypeBound = walkIntersectionTypeBound;
function walkNamedTypeBound(visitor, t) {
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: t.path, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
    PositionVisitor[visitor.type].visitTypePath.call(visitor, t.path);
  }
  else {
    let $puck_43 = $puck_1.List.binarySearchBy.call(t.typeParameters, function (t) {
      return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
    });
    if ($puck_43.kind === "Ok") {
      let {value: index} = $puck_43;
      PositionVisitor[visitor.type].visitTypeBound.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: t.typeParameters, $isTraitObject: true}, index));
    };
  };
};
exports.walkNamedTypeBound = walkNamedTypeBound;
function walkRecordTypeBound(visitor, t) {
  let $puck_44 = $puck_1.List.binarySearchBy.call(t.properties, function (t) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBoundMember"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBoundMember', value: t, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_44.kind === "Ok") {
    let {value: index} = $puck_44;
    PositionVisitor[visitor.type].visitRecordTypeBoundMember.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: t.properties, $isTraitObject: true}, index));
  };
};
exports.walkRecordTypeBound = walkRecordTypeBound;
function walkRecordTypeBoundMember(visitor, t) {
  let $puck_45 = t;
  if ($puck_45.kind === "Property") {
    let {value: {name: name, typeBound: typeBound}} = $puck_45;
    if ($puck_1.identical($puck_3.Span.cmp.call(name.span, PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitIdentifier.call(visitor, name);
    };
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: typeBound, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor)), $puck_1.Ordering.Equal)) {
      PositionVisitor[visitor.type].visitTypeBound.call(visitor, typeBound);
    };
  }
  else {
    if ($puck_45.kind === "Spread") {
      let {value: t} = $puck_45;
      PositionVisitor[visitor.type].visitTypeBound.call(visitor, t);
    };
  };
};
exports.walkRecordTypeBoundMember = walkRecordTypeBoundMember;
function walkTupleTypeBound(visitor, t) {
  let $puck_46 = $puck_1.List.binarySearchBy.call(t.properties, function (t) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t, $isTraitObject: true}), PositionVisitor[visitor.type].position.call(visitor));
  });
  if ($puck_46.kind === "Ok") {
    let {value: index} = $puck_46;
    PositionVisitor[visitor.type].visitTypeBound.call(visitor, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: t.properties, $isTraitObject: true}, index));
  };
};
exports.walkTupleTypeBound = walkTupleTypeBound;
function walkTypeParameter(visitor, t) {};
exports.walkTypeParameter = walkTypeParameter
