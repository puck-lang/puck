'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Module = exports.EnumDeclaration = exports.EnumMember = exports.ImplDeclaration = exports.ImplShorthandDeclaration = exports.TraitDeclaration = exports.TypeDeclaration = exports.ExportDirective = exports.ImportDirective = exports.ObjectDestructure = exports.ObjectDestructureMember = exports.Block = exports.BreakStatement = exports.ReturnStatement = exports.WhileLoop = exports.Comment = exports.Attribute = exports.AttributeArgument = exports.Identifier = exports.FunctionDeclaration = exports.VariableDeclaration = exports.AssignmentExpression = exports.BinaryExpression = exports.CallExpression = exports.IfExpression = exports.IfLetExpression = exports.MatchExpression = exports.MatchArm = exports.TypePathExpression = exports.UnaryExpression = exports.IndexAccess = exports.MemberAccess = exports.UnknownAccess = exports.UnknownIndexAccess = exports.BooleanLiteral = exports.ListLiteral = exports.NumberLiteral = exports.RecordLiteral = exports.RecordLiteralMember = exports.StringLiteral = exports.SimpleStringLiteral = exports.TupleLiteral = exports.RecordPattern = exports.RecordPatternMember = exports.TuplePattern = exports.FunctionTypeBound = exports.NamedTypeBound = exports.RecordTypeBound = exports.RecordTypeBoundMember = exports.TupleTypeBound = exports.TypeParameter = exports.TopLevelStatement = exports.BlockLevelStatement = exports.Expression = exports.SimpleLiteral = exports.ExportedStatement = exports.ImportSpecifier = exports.AttributeData = exports.TypePath = exports.StringLiteralPart = exports.Pattern = exports.TypeBoundundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./../entities");
const $puck_3 = require("./span");
const $puck_4 = require("./token");
var Module = exports.Module = (object) => object;
var EnumDeclaration = exports.EnumDeclaration = (object) => object;
var EnumMember = exports.EnumMember = (object) => object;
var ImplDeclaration = exports.ImplDeclaration = (object) => object;
var ImplShorthandDeclaration = exports.ImplShorthandDeclaration = (object) => object;
var TraitDeclaration = exports.TraitDeclaration = (object) => object;
var TypeDeclaration = exports.TypeDeclaration = (object) => object;
var ExportDirective = exports.ExportDirective = (object) => object;
var ImportDirective = exports.ImportDirective = (object) => object;
var ObjectDestructure = exports.ObjectDestructure = (object) => object;
var ObjectDestructureMember = exports.ObjectDestructureMember = (object) => object;
var Block = exports.Block = (object) => object;
var BreakStatement = exports.BreakStatement = (object) => object;
var ReturnStatement = exports.ReturnStatement = (object) => object;
var WhileLoop = exports.WhileLoop = (object) => object;
var Comment = exports.Comment = (object) => object;
var Attribute = exports.Attribute = (object) => object;
var AttributeArgument = exports.AttributeArgument = (object) => object;
var Identifier = exports.Identifier = (object) => object;
var FunctionDeclaration = exports.FunctionDeclaration = (object) => object;
var VariableDeclaration = exports.VariableDeclaration = (object) => object;
var AssignmentExpression = exports.AssignmentExpression = (object) => object;
var BinaryExpression = exports.BinaryExpression = (object) => object;
var CallExpression = exports.CallExpression = (object) => object;
var IfExpression = exports.IfExpression = (object) => object;
var IfLetExpression = exports.IfLetExpression = (object) => object;
var MatchExpression = exports.MatchExpression = (object) => object;
var MatchArm = exports.MatchArm = (object) => object;
var TypePathExpression = exports.TypePathExpression = (object) => object;
var UnaryExpression = exports.UnaryExpression = (object) => object;
var IndexAccess = exports.IndexAccess = (object) => object;
var MemberAccess = exports.MemberAccess = (object) => object;
var UnknownAccess = exports.UnknownAccess = (object) => object;
var UnknownIndexAccess = exports.UnknownIndexAccess = (object) => object;
var BooleanLiteral = exports.BooleanLiteral = (object) => object;
var ListLiteral = exports.ListLiteral = (object) => object;
var NumberLiteral = exports.NumberLiteral = (object) => object;
var RecordLiteral = exports.RecordLiteral = (object) => object;
var RecordLiteralMember = exports.RecordLiteralMember = (object) => object;
var StringLiteral = exports.StringLiteral = (object) => object;
var SimpleStringLiteral = exports.SimpleStringLiteral = (object) => object;
var TupleLiteral = exports.TupleLiteral = (object) => object;
var RecordPattern = exports.RecordPattern = (object) => object;
var RecordPatternMember = exports.RecordPatternMember = (object) => object;
var TuplePattern = exports.TuplePattern = (object) => object;
var FunctionTypeBound = exports.FunctionTypeBound = (object) => object;
var NamedTypeBound = exports.NamedTypeBound = (object) => object;
var RecordTypeBound = exports.RecordTypeBound = (object) => object;
var RecordTypeBoundMember = exports.RecordTypeBoundMember = (object) => object;
var TupleTypeBound = exports.TupleTypeBound = (object) => object;
var TypeParameter = exports.TypeParameter = (object) => object;
var TopLevelStatement = exports.TopLevelStatement = {
ExportDirective: (...members) => ({kind: 'ExportDirective', value: members}),
ImportDirective: (...members) => ({kind: 'ImportDirective', value: members}),
EnumDeclaration: (...members) => ({kind: 'EnumDeclaration', value: members}),
ImplDeclaration: (...members) => ({kind: 'ImplDeclaration', value: members}),
ImplShorthandDeclaration: (...members) => ({kind: 'ImplShorthandDeclaration', value: members}),
TraitDeclaration: (...members) => ({kind: 'TraitDeclaration', value: members}),
TypeDeclaration: (...members) => ({kind: 'TypeDeclaration', value: members}),
BlockLevelStatement: (...members) => ({kind: 'BlockLevelStatement', value: members}),
};
var BlockLevelStatement = exports.BlockLevelStatement = {
Block: (...members) => ({kind: 'Block', value: members}),
BreakStatement: (...members) => ({kind: 'BreakStatement', value: members}),
ReturnStatement: (...members) => ({kind: 'ReturnStatement', value: members}),
WhileLoop: (...members) => ({kind: 'WhileLoop', value: members}),
Expression: (...members) => ({kind: 'Expression', value: members}),
};
var Expression = exports.Expression = {
ThrowStatement: (...members) => ({kind: 'ThrowStatement', value: members}),
Comment: (...members) => ({kind: 'Comment', value: members}),
Identifier: (...members) => ({kind: 'Identifier', value: members}),
FunctionDeclaration: (...members) => ({kind: 'FunctionDeclaration', value: members}),
VariableDeclaration: (...members) => ({kind: 'VariableDeclaration', value: members}),
AssignmentExpression: (...members) => ({kind: 'AssignmentExpression', value: members}),
BinaryExpression: (...members) => ({kind: 'BinaryExpression', value: members}),
CallExpression: (...members) => ({kind: 'CallExpression', value: members}),
IfExpression: (...members) => ({kind: 'IfExpression', value: members}),
IfLetExpression: (...members) => ({kind: 'IfLetExpression', value: members}),
MatchExpression: (...members) => ({kind: 'MatchExpression', value: members}),
TypePathExpression: (...members) => ({kind: 'TypePathExpression', value: members}),
UnaryExpression: (...members) => ({kind: 'UnaryExpression', value: members}),
IndexAccess: (...members) => ({kind: 'IndexAccess', value: members}),
MemberAccess: (...members) => ({kind: 'MemberAccess', value: members}),
UnknownAccess: (...members) => ({kind: 'UnknownAccess', value: members}),
UnknownIndexAccess: (...members) => ({kind: 'UnknownIndexAccess', value: members}),
BooleanLiteral: (...members) => ({kind: 'BooleanLiteral', value: members}),
ListLiteral: (...members) => ({kind: 'ListLiteral', value: members}),
NumberLiteral: (...members) => ({kind: 'NumberLiteral', value: members}),
RecordLiteral: (...members) => ({kind: 'RecordLiteral', value: members}),
StringLiteral: (...members) => ({kind: 'StringLiteral', value: members}),
TupleLiteral: (...members) => ({kind: 'TupleLiteral', value: members}),
};
var SimpleLiteral = exports.SimpleLiteral = {
BooleanLiteral: (...members) => ({kind: 'BooleanLiteral', value: members}),
NumberLiteral: (...members) => ({kind: 'NumberLiteral', value: members}),
StringLiteral: (...members) => ({kind: 'StringLiteral', value: members}),
};
var ExportedStatement = exports.ExportedStatement = {
EnumDeclaration: (...members) => ({kind: 'EnumDeclaration', value: members}),
TraitDeclaration: (...members) => ({kind: 'TraitDeclaration', value: members}),
TypeDeclaration: (...members) => ({kind: 'TypeDeclaration', value: members}),
FunctionDeclaration: (...members) => ({kind: 'FunctionDeclaration', value: members}),
VariableDeclaration: (...members) => ({kind: 'VariableDeclaration', value: members}),
};
var ImportSpecifier = exports.ImportSpecifier = {
Asterisk: (...members) => ({kind: 'Asterisk', value: members}),
Identifier: (...members) => ({kind: 'Identifier', value: members}),
ObjectDestructure: (...members) => ({kind: 'ObjectDestructure', value: members}),
};
var AttributeData = exports.AttributeData = {
None: {kind: 'None', value: Symbol('None')},
Value: (...members) => ({kind: 'Value', value: members}),
Arguments: (...members) => ({kind: 'Arguments', value: members}),
};
var TypePath = exports.TypePath = {
_Object: (...members) => ({kind: '_Object', value: members}),
Member: (...members) => ({kind: 'Member', value: members}),
};
var StringLiteralPart = exports.StringLiteralPart = {
Literal: (...members) => ({kind: 'Literal', value: members}),
Identifier: (...members) => ({kind: 'Identifier', value: members}),
};
var Pattern = exports.Pattern = {
CatchAll: (...members) => ({kind: 'CatchAll', value: members}),
Identifier: (...members) => ({kind: 'Identifier', value: members}),
Record: (...members) => ({kind: 'Record', value: members}),
Tuple: (...members) => ({kind: 'Tuple', value: members}),
RecordType: (...members) => ({kind: 'RecordType', value: members}),
TupleType: (...members) => ({kind: 'TupleType', value: members}),
UnitType: (...members) => ({kind: 'UnitType', value: members}),
};
var TypeBound = exports.TypeBound = {
FunctionTypeBound: (...members) => ({kind: 'FunctionTypeBound', value: members}),
NamedTypeBound: (...members) => ({kind: 'NamedTypeBound', value: members}),
RecordTypeBound: (...members) => ({kind: 'RecordTypeBound', value: members}),
TupleTypeBound: (...members) => ({kind: 'TupleTypeBound', value: members}),
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TopLevelStatement"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  let $puck_5 = self;
  if ($unwrapTraitObject($puck_5).kind === "ExportDirective") {
    let {value: [e]} = $unwrapTraitObject($puck_5);
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective', value: e, $isTraitObject: true});
  }
  else {
    if ($unwrapTraitObject($puck_5).kind === "ImportDirective") {
      let {value: [e]} = $unwrapTraitObject($puck_5);
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: e, $isTraitObject: true});
    }
    else {
      if ($unwrapTraitObject($puck_5).kind === "EnumDeclaration") {
        let {value: [e]} = $unwrapTraitObject($puck_5);
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: e, $isTraitObject: true});
      }
      else {
        if ($unwrapTraitObject($puck_5).kind === "ImplDeclaration") {
          let {value: [e]} = $unwrapTraitObject($puck_5);
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: e, $isTraitObject: true});
        }
        else {
          if ($unwrapTraitObject($puck_5).kind === "ImplShorthandDeclaration") {
            let {value: [e]} = $unwrapTraitObject($puck_5);
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration', value: e, $isTraitObject: true});
          }
          else {
            if ($unwrapTraitObject($puck_5).kind === "TraitDeclaration") {
              let {value: [e]} = $unwrapTraitObject($puck_5);
              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: e, $isTraitObject: true});
            }
            else {
              if ($unwrapTraitObject($puck_5).kind === "TypeDeclaration") {
                let {value: [e]} = $unwrapTraitObject($puck_5);
                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: e, $isTraitObject: true});
              }
              else {
                if ($unwrapTraitObject($puck_5).kind === "BlockLevelStatement") {
                  let {value: [e]} = $unwrapTraitObject($puck_5);
                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: e, $isTraitObject: true});
                };
              };
            };
          };
        };
      };
    };
  };
},
end: function () {
  const self = this;
  let $puck_6 = self;
  if ($unwrapTraitObject($puck_6).kind === "ExportDirective") {
    let {value: [e]} = $unwrapTraitObject($puck_6);
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective', value: e, $isTraitObject: true});
  }
  else {
    if ($unwrapTraitObject($puck_6).kind === "ImportDirective") {
      let {value: [e]} = $unwrapTraitObject($puck_6);
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: e, $isTraitObject: true});
    }
    else {
      if ($unwrapTraitObject($puck_6).kind === "EnumDeclaration") {
        let {value: [e]} = $unwrapTraitObject($puck_6);
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: e, $isTraitObject: true});
      }
      else {
        if ($unwrapTraitObject($puck_6).kind === "ImplDeclaration") {
          let {value: [e]} = $unwrapTraitObject($puck_6);
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: e, $isTraitObject: true});
        }
        else {
          if ($unwrapTraitObject($puck_6).kind === "ImplShorthandDeclaration") {
            let {value: [e]} = $unwrapTraitObject($puck_6);
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration', value: e, $isTraitObject: true});
          }
          else {
            if ($unwrapTraitObject($puck_6).kind === "TraitDeclaration") {
              let {value: [e]} = $unwrapTraitObject($puck_6);
              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: e, $isTraitObject: true});
            }
            else {
              if ($unwrapTraitObject($puck_6).kind === "TypeDeclaration") {
                let {value: [e]} = $unwrapTraitObject($puck_6);
                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: e, $isTraitObject: true});
              }
              else {
                if ($unwrapTraitObject($puck_6).kind === "BlockLevelStatement") {
                  let {value: [e]} = $unwrapTraitObject($puck_6);
                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: e, $isTraitObject: true});
                };
              };
            };
          };
        };
      };
    };
  };
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  let $puck_7 = self;
  if ($unwrapTraitObject($puck_7).kind === "Block") {
    let {value: [e]} = $unwrapTraitObject($puck_7);
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e, $isTraitObject: true});
  }
  else {
    if ($unwrapTraitObject($puck_7).kind === "BreakStatement") {
      let {value: [e]} = $unwrapTraitObject($puck_7);
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement', value: e, $isTraitObject: true});
    }
    else {
      if ($unwrapTraitObject($puck_7).kind === "ReturnStatement") {
        let {value: [e]} = $unwrapTraitObject($puck_7);
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement', value: e, $isTraitObject: true});
      }
      else {
        if ($unwrapTraitObject($puck_7).kind === "WhileLoop") {
          let {value: [e]} = $unwrapTraitObject($puck_7);
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop', value: e, $isTraitObject: true});
        }
        else {
          if ($unwrapTraitObject($puck_7).kind === "Expression") {
            let {value: [e]} = $unwrapTraitObject($puck_7);
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e, $isTraitObject: true});
          };
        };
      };
    };
  };
},
end: function () {
  const self = this;
  let $puck_8 = self;
  if ($unwrapTraitObject($puck_8).kind === "Block") {
    let {value: [e]} = $unwrapTraitObject($puck_8);
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e, $isTraitObject: true});
  }
  else {
    if ($unwrapTraitObject($puck_8).kind === "BreakStatement") {
      let {value: [e]} = $unwrapTraitObject($puck_8);
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement', value: e, $isTraitObject: true});
    }
    else {
      if ($unwrapTraitObject($puck_8).kind === "ReturnStatement") {
        let {value: [e]} = $unwrapTraitObject($puck_8);
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement', value: e, $isTraitObject: true});
      }
      else {
        if ($unwrapTraitObject($puck_8).kind === "WhileLoop") {
          let {value: [e]} = $unwrapTraitObject($puck_8);
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop', value: e, $isTraitObject: true});
        }
        else {
          if ($unwrapTraitObject($puck_8).kind === "Expression") {
            let {value: [e]} = $unwrapTraitObject($puck_8);
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e, $isTraitObject: true});
          };
        };
      };
    };
  };
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  let $puck_9 = self;
  if ($unwrapTraitObject($puck_9).kind === "ThrowStatement") {
    let {value: [e]} = $unwrapTraitObject($puck_9);
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true});
  }
  else {
    if ($unwrapTraitObject($puck_9).kind === "Comment") {
      let {value: [$puck_10]} = $unwrapTraitObject($puck_9);
      throw "No span for Comment";
    }
    else {
      if ($unwrapTraitObject($puck_9).kind === "Identifier") {
        let {value: [e]} = $unwrapTraitObject($puck_9);
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: e, $isTraitObject: true});
      }
      else {
        if ($unwrapTraitObject($puck_9).kind === "FunctionDeclaration") {
          let {value: [e]} = $unwrapTraitObject($puck_9);
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: e, $isTraitObject: true});
        }
        else {
          if ($unwrapTraitObject($puck_9).kind === "VariableDeclaration") {
            let {value: [e]} = $unwrapTraitObject($puck_9);
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: e, $isTraitObject: true});
          }
          else {
            if ($unwrapTraitObject($puck_9).kind === "AssignmentExpression") {
              let {value: [e]} = $unwrapTraitObject($puck_9);
              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true});
            }
            else {
              if ($unwrapTraitObject($puck_9).kind === "BinaryExpression") {
                let {value: [e]} = $unwrapTraitObject($puck_9);
                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression', value: e, $isTraitObject: true});
              }
              else {
                if ($unwrapTraitObject($puck_9).kind === "CallExpression") {
                  let {value: [e]} = $unwrapTraitObject($puck_9);
                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true});
                }
                else {
                  if ($unwrapTraitObject($puck_9).kind === "IfExpression") {
                    let {value: [e]} = $unwrapTraitObject($puck_9);
                    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true});
                  }
                  else {
                    if ($unwrapTraitObject($puck_9).kind === "IfLetExpression") {
                      let {value: [e]} = $unwrapTraitObject($puck_9);
                      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true});
                    }
                    else {
                      if ($unwrapTraitObject($puck_9).kind === "MatchExpression") {
                        let {value: [e]} = $unwrapTraitObject($puck_9);
                        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true});
                      }
                      else {
                        if ($unwrapTraitObject($puck_9).kind === "TypePathExpression") {
                          let {value: [e]} = $unwrapTraitObject($puck_9);
                          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression', value: e, $isTraitObject: true});
                        }
                        else {
                          if ($unwrapTraitObject($puck_9).kind === "UnaryExpression") {
                            let {value: [e]} = $unwrapTraitObject($puck_9);
                            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true});
                          }
                          else {
                            if ($unwrapTraitObject($puck_9).kind === "IndexAccess") {
                              let {value: [e]} = $unwrapTraitObject($puck_9);
                              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: e, $isTraitObject: true});
                            }
                            else {
                              if ($unwrapTraitObject($puck_9).kind === "MemberAccess") {
                                let {value: [e]} = $unwrapTraitObject($puck_9);
                                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: e, $isTraitObject: true});
                              }
                              else {
                                if ($unwrapTraitObject($puck_9).kind === "UnknownAccess") {
                                  let {value: [e]} = $unwrapTraitObject($puck_9);
                                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: e, $isTraitObject: true});
                                }
                                else {
                                  if ($unwrapTraitObject($puck_9).kind === "UnknownIndexAccess") {
                                    let {value: [e]} = $unwrapTraitObject($puck_9);
                                    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: e, $isTraitObject: true});
                                  }
                                  else {
                                    if ($unwrapTraitObject($puck_9).kind === "BooleanLiteral") {
                                      let {value: [e]} = $unwrapTraitObject($puck_9);
                                      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: e, $isTraitObject: true});
                                    }
                                    else {
                                      if ($unwrapTraitObject($puck_9).kind === "ListLiteral") {
                                        let {value: [e]} = $unwrapTraitObject($puck_9);
                                        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: e, $isTraitObject: true});
                                      }
                                      else {
                                        if ($unwrapTraitObject($puck_9).kind === "NumberLiteral") {
                                          let {value: [e]} = $unwrapTraitObject($puck_9);
                                          return e.span.start;
                                        }
                                        else {
                                          if ($unwrapTraitObject($puck_9).kind === "RecordLiteral") {
                                            let {value: [e]} = $unwrapTraitObject($puck_9);
                                            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral', value: e, $isTraitObject: true});
                                          }
                                          else {
                                            if ($unwrapTraitObject($puck_9).kind === "StringLiteral") {
                                              let {value: [e]} = $unwrapTraitObject($puck_9);
                                              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: e, $isTraitObject: true});
                                            }
                                            else {
                                              if ($unwrapTraitObject($puck_9).kind === "TupleLiteral") {
                                                let {value: [e]} = $unwrapTraitObject($puck_9);
                                                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral', value: e, $isTraitObject: true});
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
},
end: function () {
  const self = this;
  let $puck_11 = self;
  if ($unwrapTraitObject($puck_11).kind === "ThrowStatement") {
    let {value: [e]} = $unwrapTraitObject($puck_11);
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true});
  }
  else {
    if ($unwrapTraitObject($puck_11).kind === "Comment") {
      let {value: [$puck_12]} = $unwrapTraitObject($puck_11);
      throw "No span for Comment";
    }
    else {
      if ($unwrapTraitObject($puck_11).kind === "Identifier") {
        let {value: [e]} = $unwrapTraitObject($puck_11);
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: e, $isTraitObject: true});
      }
      else {
        if ($unwrapTraitObject($puck_11).kind === "FunctionDeclaration") {
          let {value: [e]} = $unwrapTraitObject($puck_11);
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: e, $isTraitObject: true});
        }
        else {
          if ($unwrapTraitObject($puck_11).kind === "VariableDeclaration") {
            let {value: [e]} = $unwrapTraitObject($puck_11);
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: e, $isTraitObject: true});
          }
          else {
            if ($unwrapTraitObject($puck_11).kind === "AssignmentExpression") {
              let {value: [e]} = $unwrapTraitObject($puck_11);
              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true});
            }
            else {
              if ($unwrapTraitObject($puck_11).kind === "BinaryExpression") {
                let {value: [e]} = $unwrapTraitObject($puck_11);
                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression', value: e, $isTraitObject: true});
              }
              else {
                if ($unwrapTraitObject($puck_11).kind === "CallExpression") {
                  let {value: [e]} = $unwrapTraitObject($puck_11);
                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true});
                }
                else {
                  if ($unwrapTraitObject($puck_11).kind === "IfExpression") {
                    let {value: [e]} = $unwrapTraitObject($puck_11);
                    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true});
                  }
                  else {
                    if ($unwrapTraitObject($puck_11).kind === "IfLetExpression") {
                      let {value: [e]} = $unwrapTraitObject($puck_11);
                      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true});
                    }
                    else {
                      if ($unwrapTraitObject($puck_11).kind === "MatchExpression") {
                        let {value: [e]} = $unwrapTraitObject($puck_11);
                        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true});
                      }
                      else {
                        if ($unwrapTraitObject($puck_11).kind === "TypePathExpression") {
                          let {value: [e]} = $unwrapTraitObject($puck_11);
                          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression', value: e, $isTraitObject: true});
                        }
                        else {
                          if ($unwrapTraitObject($puck_11).kind === "UnaryExpression") {
                            let {value: [e]} = $unwrapTraitObject($puck_11);
                            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true});
                          }
                          else {
                            if ($unwrapTraitObject($puck_11).kind === "IndexAccess") {
                              let {value: [e]} = $unwrapTraitObject($puck_11);
                              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: e, $isTraitObject: true});
                            }
                            else {
                              if ($unwrapTraitObject($puck_11).kind === "MemberAccess") {
                                let {value: [e]} = $unwrapTraitObject($puck_11);
                                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: e, $isTraitObject: true});
                              }
                              else {
                                if ($unwrapTraitObject($puck_11).kind === "UnknownAccess") {
                                  let {value: [e]} = $unwrapTraitObject($puck_11);
                                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: e, $isTraitObject: true});
                                }
                                else {
                                  if ($unwrapTraitObject($puck_11).kind === "UnknownIndexAccess") {
                                    let {value: [e]} = $unwrapTraitObject($puck_11);
                                    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: e, $isTraitObject: true});
                                  }
                                  else {
                                    if ($unwrapTraitObject($puck_11).kind === "BooleanLiteral") {
                                      let {value: [e]} = $unwrapTraitObject($puck_11);
                                      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: e, $isTraitObject: true});
                                    }
                                    else {
                                      if ($unwrapTraitObject($puck_11).kind === "ListLiteral") {
                                        let {value: [e]} = $unwrapTraitObject($puck_11);
                                        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: e, $isTraitObject: true});
                                      }
                                      else {
                                        if ($unwrapTraitObject($puck_11).kind === "NumberLiteral") {
                                          let {value: [e]} = $unwrapTraitObject($puck_11);
                                          return e.span.end;
                                        }
                                        else {
                                          if ($unwrapTraitObject($puck_11).kind === "RecordLiteral") {
                                            let {value: [e]} = $unwrapTraitObject($puck_11);
                                            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral', value: e, $isTraitObject: true});
                                          }
                                          else {
                                            if ($unwrapTraitObject($puck_11).kind === "StringLiteral") {
                                              let {value: [e]} = $unwrapTraitObject($puck_11);
                                              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: e, $isTraitObject: true});
                                            }
                                            else {
                                              if ($unwrapTraitObject($puck_11).kind === "TupleLiteral") {
                                                let {value: [e]} = $unwrapTraitObject($puck_11);
                                                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral', value: e, $isTraitObject: true});
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
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration"] = {
span: function () {
  const self = this;
  return {
    start: self.value.keyword.span.start,
    end: self.value.closeBrace.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumMember"] = {
span: function () {
  const self = this;
  return {
    start: self.value.name.span.start,
    end: $puck_1.Option.mapOr.call(self.value.bound, self.value.name.span, function (b) {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: b, $isTraitObject: true});
  }).end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration"] = {
span: function () {
  const self = this;
  return {
    start: self.value.implKeyword.span.start,
    end: self.value.closeBrace.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration"] = {
span: function () {
  const self = this;
  return {
    start: self.value.implKeyword.span.start,
    end: self.value.closeBrace.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"] = {
span: function () {
  const self = this;
  return {
    start: self.value.keyword.span.start,
    end: self.value.closeBrace.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"] = {
span: function () {
  const self = this;
  return {
    start: self.value.keyword.span.start,
    end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: $puck_1.Option.unwrap.call(self.value.bound), $isTraitObject: true}),
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective"] = {
span: function () {
  const self = this;
  return {
    start: self.value.keyword.span.start,
    end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportedStatement"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportedStatement', value: self.value.statement, $isTraitObject: true}),
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportedStatement"] = {
span: function () {
  const self = this;
  let $puck_13 = self;
  if ($unwrapTraitObject($puck_13).kind === "EnumDeclaration") {
    let {value: [d]} = $unwrapTraitObject($puck_13);
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: d, $isTraitObject: true});
  }
  else {
    if ($unwrapTraitObject($puck_13).kind === "TraitDeclaration") {
      let {value: [d]} = $unwrapTraitObject($puck_13);
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: d, $isTraitObject: true});
    }
    else {
      if ($unwrapTraitObject($puck_13).kind === "TypeDeclaration") {
        let {value: [d]} = $unwrapTraitObject($puck_13);
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: d, $isTraitObject: true});
      }
      else {
        if ($unwrapTraitObject($puck_13).kind === "FunctionDeclaration") {
          let {value: [d]} = $unwrapTraitObject($puck_13);
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: d, $isTraitObject: true});
        }
        else {
          if ($unwrapTraitObject($puck_13).kind === "VariableDeclaration") {
            let {value: [d]} = $unwrapTraitObject($puck_13);
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true});
          };
        };
      };
    };
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective"] = {
span: function () {
  const self = this;
  return {
    start: self.value.importKeyword.span.start,
    end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier', value: self.value.specifier, $isTraitObject: true}),
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier"] = {
span: function () {
  const self = this;
  let $puck_14 = self;
  if ($unwrapTraitObject($puck_14).kind === "Asterisk") {
    let {value: [token]} = $unwrapTraitObject($puck_14);
    return token.span;
  }
  else {
    if ($unwrapTraitObject($puck_14).kind === "Identifier") {
      let {value: [identifier]} = $unwrapTraitObject($puck_14);
      return identifier.span;
    }
    else {
      if ($unwrapTraitObject($puck_14).kind === "ObjectDestructure") {
        let {value: [objectDestructure]} = $unwrapTraitObject($puck_14);
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructure"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructure', value: objectDestructure, $isTraitObject: true});
      };
    };
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructure"] = {
span: function () {
  const self = this;
  return {
    start: self.value.openBrace.span.start,
    end: self.value.closeBrace.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember"] = {
span: function () {
  const self = this;
  return {
    start: self.value.property.span.start,
    end: self.value.local.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  let $puck_15 = self.value.openBrace;
  if ($puck_15.kind === "Some") {
    let {value: [openBrace]} = $puck_15;
    return openBrace.span.start;
  }
  else {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: $puck_1.Option.unwrap.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.statements, $isTraitObject: true})), $isTraitObject: true});
  };
},
end: function () {
  const self = this;
  let $puck_16 = self.value.closeBrace;
  if ($puck_16.kind === "Some") {
    let {value: [closeBrace]} = $puck_16;
    return closeBrace.span.end;
  }
  else {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: $puck_1.Option.unwrap.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.statements, $isTraitObject: true})), $isTraitObject: true});
  };
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement"] = {
span: function () {
  const self = this;
  return self.value.keyword.span;
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement"] = {
span: function () {
  const self = this;
  return {
    start: self.value.keyword.span.start,
    end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.expression, $isTraitObject: true}),
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop"] = {
span: function () {
  const self = this;
  return {
    start: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.condition, $isTraitObject: true}),
    end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: self.value.body, $isTraitObject: true}),
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute"] = {
span: function () {
  const self = this;
  return {
    start: self.value.hash.span.start,
    end: self.value.closeBracket.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"] = {
span: function () {
  const self = this;
  return self.value.span;
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_1.Option.mapOrElse.call(self.value.name, function () {
    return $puck_1.Option.mapOrElse.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.typeParameters, $isTraitObject: true}), function () {
      return self.value.openParenOrBar.span.start;
    }, function (p) {
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: p, $isTraitObject: true});
    });
  }, function (i) {
    return i.span.start;
  });
},
end: function () {
  const self = this;
  return $puck_1.Option.mapOrElse.call(self.value.body, function () {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: $puck_1.Option.unwrap.call(self.value.returnType), $isTraitObject: true});
  }, function (b) {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: b, $isTraitObject: true});
  });
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: self.value.pattern, $isTraitObject: true});
},
end: function () {
  const self = this;
  return $puck_1.Option.mapOrElse.call(self.value.initializer, function () {
    return $puck_1.Option.mapOrElse.call(self.value.typeBound, function () {
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: self.value.pattern, $isTraitObject: true});
    }, function (t) {
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t, $isTraitObject: true});
    });
  }, function (i) {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: i, $isTraitObject: true});
  });
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.lhs, $isTraitObject: true});
},
end: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.rhs, $isTraitObject: true});
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.lhs, $isTraitObject: true});
},
end: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.rhs, $isTraitObject: true});
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.func, $isTraitObject: true});
},
end: function () {
  const self = this;
  return self.value.closeParen.span.end;
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return self.value.ifKeyword.span.start;
},
end: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: $puck_1.Option.unwrapOr.call(self.value.else_, self.value.then_), $isTraitObject: true});
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return self.value.ifKeyword.span.start;
},
end: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: $puck_1.Option.unwrapOr.call(self.value.else_, self.value.then_), $isTraitObject: true});
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return self.value.matchKeyword.span.start;
},
end: function () {
  const self = this;
  return self.value.closeBrace.span.end;
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: self.value.pattern, $isTraitObject: true});
},
end: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: self.value.block, $isTraitObject: true});
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression"] = {
span: function () {
  const self = this;
  return {
    start: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.typePath, $isTraitObject: true}),
    end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.typePath, $isTraitObject: true}),
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"] = {
span: function () {
  const self = this;
  let $puck_17 = self;
  if ($unwrapTraitObject($puck_17).kind === "_Object") {
    let {value: [identifier, typePath]} = $unwrapTraitObject($puck_17);
    return {
      start: identifier.span.start,
      end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: typePath, $isTraitObject: true}),
    };
  }
  else {
    if ($unwrapTraitObject($puck_17).kind === "Member") {
      let {value: [identifier]} = $unwrapTraitObject($puck_17);
      return identifier.span;
    };
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression"] = {
span: function () {
  const self = this;
  return {
    start: self.value.operator.span.start,
    end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.rhs, $isTraitObject: true}),
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess"] = {
span: function () {
  const self = this;
  return {
    start: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true}),
    end: self.value.closeBracket.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true});
},
end: function () {
  const self = this;
  return self.value.member.span.end;
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true});
},
end: function () {
  const self = this;
  return self.value.member.span.end;
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess"] = {
span: function () {
  const self = this;
  return {
    start: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true}),
    end: self.value.closeBracket.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral"] = {
span: function () {
  const self = this;
  return self.value.keyword.span;
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral"] = {
span: function () {
  const self = this;
  return {
    start: self.value.openBracket.span.start,
    end: self.value.closeBracket.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral"] = {
span: function () {
  const self = this;
  return self.value.span;
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral"] = {
span: function () {
  const self = this;
  return {
    start: self.value.openBrace.span.start,
    end: self.value.closeBrace.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteralMember"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return self.value.name.span.start;
},
end: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.value, $isTraitObject: true});
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart', value: $puck_1.Option.unwrap.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.parts, $isTraitObject: true})), $isTraitObject: true});
},
end: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart', value: $puck_1.Option.unwrap.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.parts, $isTraitObject: true})), $isTraitObject: true});
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteralPart"] = {
span: function () {
  const self = this;
  let $puck_18 = self;
  if ($unwrapTraitObject($puck_18).kind === "Literal") {
    let {value: [{span: span}]} = $unwrapTraitObject($puck_18);
    return span;
  }
  else {
    if ($unwrapTraitObject($puck_18).kind === "Identifier") {
      let {value: [{span: span}]} = $unwrapTraitObject($puck_18);
      return span;
    };
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral"] = {
span: function () {
  const self = this;
  return {
    start: self.value.openParen.span.start,
    end: self.value.closeParen.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"] = {
span: function () {
  const self = this;
  let $puck_19 = self;
  if ($unwrapTraitObject($puck_19).kind === "CatchAll") {
    let {value: [token]} = $unwrapTraitObject($puck_19);
    return token.span;
  }
  else {
    if ($unwrapTraitObject($puck_19).kind === "Identifier") {
      let {value: [identifier]} = $unwrapTraitObject($puck_19);
      return identifier.span;
    }
    else {
      if ($unwrapTraitObject($puck_19).kind === "Record") {
        let {value: [recordPattern]} = $unwrapTraitObject($puck_19);
        return {
          start: recordPattern.openBrace.span.start,
          end: recordPattern.closeBrace.span.end,
        };
      }
      else {
        if ($unwrapTraitObject($puck_19).kind === "Tuple") {
          let {value: [tuplePattern]} = $unwrapTraitObject($puck_19);
          return {
            start: tuplePattern.openParen.span.start,
            end: tuplePattern.closeParen.span.end,
          };
        }
        else {
          if ($unwrapTraitObject($puck_19).kind === "RecordType") {
            let {value: [typePath, recordPattern]} = $unwrapTraitObject($puck_19);
            return {
              start: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: typePath, $isTraitObject: true}),
              end: recordPattern.closeBrace.span.end,
            };
          }
          else {
            if ($unwrapTraitObject($puck_19).kind === "TupleType") {
              let {value: [typePath, tuplePattern]} = $unwrapTraitObject($puck_19);
              return {
                start: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: typePath, $isTraitObject: true}),
                end: tuplePattern.closeParen.span.end,
              };
            }
            else {
              if ($unwrapTraitObject($puck_19).kind === "UnitType") {
                let {value: [typePath]} = $unwrapTraitObject($puck_19);
                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: typePath, $isTraitObject: true});
              };
            };
          };
        };
      };
    };
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPattern"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return self.value.openBrace.span.start;
},
end: function () {
  const self = this;
  return self.value.closeBrace.span.end;
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPatternMember"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return self.value.property.span.start;
},
end: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: self.value.pattern, $isTraitObject: true});
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TuplePattern"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return self.value.openParen.span.start;
},
end: function () {
  const self = this;
  return self.value.closeParen.span.end;
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"] = {
span: function () {
  const self = this;
  let $puck_20 = self;
  if ($unwrapTraitObject($puck_20).kind === "FunctionTypeBound") {
    let {value: [t]} = $unwrapTraitObject($puck_20);
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound', value: t, $isTraitObject: true});
  }
  else {
    if ($unwrapTraitObject($puck_20).kind === "NamedTypeBound") {
      let {value: [t]} = $unwrapTraitObject($puck_20);
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true});
    }
    else {
      if ($unwrapTraitObject($puck_20).kind === "RecordTypeBound") {
        let {value: [t]} = $unwrapTraitObject($puck_20);
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound', value: t, $isTraitObject: true});
      }
      else {
        if ($unwrapTraitObject($puck_20).kind === "TupleTypeBound") {
          let {value: [t]} = $unwrapTraitObject($puck_20);
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: t, $isTraitObject: true});
        };
      };
    };
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound"] = {
span: function () {
  const self = this;
  return {
    start: $puck_1.Option.mapOrElse.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.typeParameters, $isTraitObject: true}), function () {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: self.value.parameters, $isTraitObject: true});
  }, function (p) {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: p, $isTraitObject: true});
  }).start,
    end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: self.value.returnType, $isTraitObject: true}),
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"] = {
span: function () {
  const self = this;
  return {
    start: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.path, $isTraitObject: true}),
    end: $puck_1.Option.mapOr.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.typeParameters, $isTraitObject: true}), $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.path, $isTraitObject: true}), function (p) {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: p, $isTraitObject: true});
  }).end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound"] = {
span: function () {
  const self = this;
  return {
    start: self.value.openBrace.span.start,
    end: self.value.closeBrace.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBoundMember"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return self.value.name.span.start;
},
end: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: self.value.typeBound, $isTraitObject: true});
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return self.value.openParen.span.start;
},
end: function () {
  const self = this;
  return self.value.closeParen.span.end;
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"] = {
span: function () {
  const self = this;
  return {
    start: self.value.name.span.start,
    end: self.value.name.span.end,
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
TopLevelStatement.getType = function () {
  const self = this;
  let $puck_21 = self;
  if ($unwrapTraitObject($puck_21).kind === "ExportDirective") {
    let {value: [e]} = $unwrapTraitObject($puck_21);
    throw "type on export";
  }
  else {
    if ($unwrapTraitObject($puck_21).kind === "ImportDirective") {
      let {value: [e]} = $unwrapTraitObject($puck_21);
      throw "type on import";
    }
    else {
      if ($unwrapTraitObject($puck_21).kind === "EnumDeclaration") {
        let {value: [e]} = $unwrapTraitObject($puck_21);
        return e.type_;
      }
      else {
        if ($unwrapTraitObject($puck_21).kind === "ImplDeclaration") {
          let {value: [e]} = $unwrapTraitObject($puck_21);
          return e.type_.type_;
        }
        else {
          if ($unwrapTraitObject($puck_21).kind === "ImplShorthandDeclaration") {
            let {value: [e]} = $unwrapTraitObject($puck_21);
            return e.type_.type_;
          }
          else {
            if ($unwrapTraitObject($puck_21).kind === "TraitDeclaration") {
              let {value: [e]} = $unwrapTraitObject($puck_21);
              return e.type_;
            }
            else {
              if ($unwrapTraitObject($puck_21).kind === "TypeDeclaration") {
                let {value: [e]} = $unwrapTraitObject($puck_21);
                return e.type_;
              }
              else {
                if ($unwrapTraitObject($puck_21).kind === "BlockLevelStatement") {
                  let {value: [e]} = $unwrapTraitObject($puck_21);
                  return BlockLevelStatement.getType.call(e);
                };
              };
            };
          };
        };
      };
    };
  };
};
BlockLevelStatement.getType = function () {
  const self = this;
  let $puck_22 = self;
  if ($unwrapTraitObject($puck_22).kind === "Block") {
    let {value: [e]} = $unwrapTraitObject($puck_22);
    return e.type_;
  }
  else {
    if ($unwrapTraitObject($puck_22).kind === "BreakStatement") {
      let {value: [e]} = $unwrapTraitObject($puck_22);
      return e.type_;
    }
    else {
      if ($unwrapTraitObject($puck_22).kind === "ReturnStatement") {
        let {value: [e]} = $unwrapTraitObject($puck_22);
        return e.type_;
      }
      else {
        if ($unwrapTraitObject($puck_22).kind === "WhileLoop") {
          let {value: [e]} = $unwrapTraitObject($puck_22);
          return e.type_;
        }
        else {
          if ($unwrapTraitObject($puck_22).kind === "Expression") {
            let {value: [e]} = $unwrapTraitObject($puck_22);
            return Expression.getType.call(e);
          };
        };
      };
    };
  };
};
Expression.getType = function () {
  const self = this;
  let $puck_23 = self;
  if ($unwrapTraitObject($puck_23).kind === "ThrowStatement") {
    let {value: [e]} = $unwrapTraitObject($puck_23);
    return e.type_;
  }
  else {
    if ($unwrapTraitObject($puck_23).kind === "Comment") {
      let {value: [$puck_24]} = $unwrapTraitObject($puck_23);
      return $puck_1.panic("getType on comment");
    }
    else {
      if ($unwrapTraitObject($puck_23).kind === "Identifier") {
        let {value: [e]} = $unwrapTraitObject($puck_23);
        return e.type_;
      }
      else {
        if ($unwrapTraitObject($puck_23).kind === "FunctionDeclaration") {
          let {value: [e]} = $unwrapTraitObject($puck_23);
          return e.type_;
        }
        else {
          if ($unwrapTraitObject($puck_23).kind === "VariableDeclaration") {
            let {value: [e]} = $unwrapTraitObject($puck_23);
            return e.type_;
          }
          else {
            if ($unwrapTraitObject($puck_23).kind === "AssignmentExpression") {
              let {value: [e]} = $unwrapTraitObject($puck_23);
              return e.type_;
            }
            else {
              if ($unwrapTraitObject($puck_23).kind === "BinaryExpression") {
                let {value: [e]} = $unwrapTraitObject($puck_23);
                return e.type_;
              }
              else {
                if ($unwrapTraitObject($puck_23).kind === "CallExpression") {
                  let {value: [e]} = $unwrapTraitObject($puck_23);
                  return e.type_;
                }
                else {
                  if ($unwrapTraitObject($puck_23).kind === "IfExpression") {
                    let {value: [e]} = $unwrapTraitObject($puck_23);
                    return e.type_;
                  }
                  else {
                    if ($unwrapTraitObject($puck_23).kind === "IfLetExpression") {
                      let {value: [e]} = $unwrapTraitObject($puck_23);
                      return e.type_;
                    }
                    else {
                      if ($unwrapTraitObject($puck_23).kind === "MatchExpression") {
                        let {value: [e]} = $unwrapTraitObject($puck_23);
                        return e.type_;
                      }
                      else {
                        if ($unwrapTraitObject($puck_23).kind === "TypePathExpression") {
                          let {value: [e]} = $unwrapTraitObject($puck_23);
                          return e.type_;
                        }
                        else {
                          if ($unwrapTraitObject($puck_23).kind === "UnaryExpression") {
                            let {value: [e]} = $unwrapTraitObject($puck_23);
                            return e.type_;
                          }
                          else {
                            if ($unwrapTraitObject($puck_23).kind === "IndexAccess") {
                              let {value: [e]} = $unwrapTraitObject($puck_23);
                              return e.type_;
                            }
                            else {
                              if ($unwrapTraitObject($puck_23).kind === "MemberAccess") {
                                let {value: [e]} = $unwrapTraitObject($puck_23);
                                return e.type_;
                              }
                              else {
                                if ($unwrapTraitObject($puck_23).kind === "UnknownAccess") {
                                  let {value: [e]} = $unwrapTraitObject($puck_23);
                                  return e.type_;
                                }
                                else {
                                  if ($unwrapTraitObject($puck_23).kind === "UnknownIndexAccess") {
                                    let {value: [e]} = $unwrapTraitObject($puck_23);
                                    return e.type_;
                                  }
                                  else {
                                    if ($unwrapTraitObject($puck_23).kind === "BooleanLiteral") {
                                      let {value: [e]} = $unwrapTraitObject($puck_23);
                                      return e.type_;
                                    }
                                    else {
                                      if ($unwrapTraitObject($puck_23).kind === "ListLiteral") {
                                        let {value: [e]} = $unwrapTraitObject($puck_23);
                                        return e.type_;
                                      }
                                      else {
                                        if ($unwrapTraitObject($puck_23).kind === "NumberLiteral") {
                                          let {value: [e]} = $unwrapTraitObject($puck_23);
                                          return e.type_;
                                        }
                                        else {
                                          if ($unwrapTraitObject($puck_23).kind === "RecordLiteral") {
                                            let {value: [e]} = $unwrapTraitObject($puck_23);
                                            return e.type_;
                                          }
                                          else {
                                            if ($unwrapTraitObject($puck_23).kind === "StringLiteral") {
                                              let {value: [e]} = $unwrapTraitObject($puck_23);
                                              return e.type_;
                                            }
                                            else {
                                              if ($unwrapTraitObject($puck_23).kind === "TupleLiteral") {
                                                let {value: [e]} = $unwrapTraitObject($puck_23);
                                                return e.type_;
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
ExportDirective.getType = function () {
  const self = this;
  let $puck_25 = self.statement;
  if ($unwrapTraitObject($puck_25).kind === "EnumDeclaration") {
    let {value: [d]} = $unwrapTraitObject($puck_25);
    return d.type_;
  }
  else {
    if ($unwrapTraitObject($puck_25).kind === "TraitDeclaration") {
      let {value: [d]} = $unwrapTraitObject($puck_25);
      return d.type_;
    }
    else {
      if ($unwrapTraitObject($puck_25).kind === "TypeDeclaration") {
        let {value: [d]} = $unwrapTraitObject($puck_25);
        return d.type_;
      }
      else {
        if ($unwrapTraitObject($puck_25).kind === "FunctionDeclaration") {
          let {value: [d]} = $unwrapTraitObject($puck_25);
          return d.type_;
        }
        else {
          if ($unwrapTraitObject($puck_25).kind === "VariableDeclaration") {
            let {value: [d]} = $unwrapTraitObject($puck_25);
            return d.type_;
          };
        };
      };
    };
  };
};
Pattern.displayName = function () {
  const self = this;
  let $puck_26 = self;
  if ($unwrapTraitObject($puck_26).kind === "CatchAll") {
    let {value: [$puck_27]} = $unwrapTraitObject($puck_26);
    return "_";
  }
  else {
    if ($unwrapTraitObject($puck_26).kind === "Identifier") {
      let {value: [identifier]} = $unwrapTraitObject($puck_26);
      return identifier.name;
    }
    else {
      if ($unwrapTraitObject($puck_26).kind === "Record") {
        let {value: [recordPattern]} = $unwrapTraitObject($puck_26);
        return RecordPattern.displayName.call(recordPattern);
      }
      else {
        if ($unwrapTraitObject($puck_26).kind === "Tuple") {
          let {value: [tuplePattern]} = $unwrapTraitObject($puck_26);
          return TuplePattern.displayName.call(tuplePattern);
        }
        else {
          if ($unwrapTraitObject($puck_26).kind === "RecordType") {
            let {value: [$puck_28, recordPattern]} = $unwrapTraitObject($puck_26);
            return RecordPattern.displayName.call(recordPattern);
          }
          else {
            if ($unwrapTraitObject($puck_26).kind === "TupleType") {
              let {value: [$puck_29, tuplePattern]} = $unwrapTraitObject($puck_26);
              return TuplePattern.displayName.call(tuplePattern);
            }
            else {
              if ($unwrapTraitObject($puck_26).kind === "UnitType") {
                let {value: [$puck_30]} = $unwrapTraitObject($puck_26);
                return "";
              };
            };
          };
        };
      };
    };
  };
};
RecordPattern.displayName = function () {
  const self = this;
  return "{" + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.properties, $isTraitObject: true}, function (p) {
    let $puck_31 = p.pattern;
    let $puck_32;
    if (($puck_31.kind === "Identifier")) {
      let {value: [{name: name}]} = $puck_31;
      $puck_32 = name === p.property.name;
    }
    else {
      $puck_32 = false;
    };
    const shorthand = $puck_32;
    if (shorthand) {
      return p.property.name;
    }
    else {
      return p.property.name + ": " + Pattern.displayName.call(p.pattern);
    };
  }).value.join(", ") + "}";
};
TuplePattern.displayName = function () {
  const self = this;
  return "(" + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.properties, $isTraitObject: true}, function (p) {
    return Pattern.displayName.call(p);
  }).value.join(", ") + ")";
};
TypeBound.getType = function () {
  const self = this;
  let $puck_33 = self;
  if (($unwrapTraitObject($puck_33).kind === "FunctionTypeBound")) {
    let {value: [t]} = $unwrapTraitObject($puck_33);
    return t.type_;
  }
  else {
    if ($unwrapTraitObject($puck_33).kind === "NamedTypeBound") {
      let {value: [t]} = $unwrapTraitObject($puck_33);
      return t.type_;
    }
    else {
      if ($unwrapTraitObject($puck_33).kind === "RecordTypeBound") {
        let {value: [t]} = $unwrapTraitObject($puck_33);
        return t.type_;
      }
      else {
        if ($unwrapTraitObject($puck_33).kind === "TupleTypeBound") {
          let {value: [t]} = $unwrapTraitObject($puck_33);
          return t.type_;
        };
      };
    };
  };
};
TypeBound.getRecordTypeBound = function () {
  const self = this;
  let $puck_34 = self;
  if ($unwrapTraitObject($puck_34).kind === "RecordTypeBound") {
    let {value: [record]} = $unwrapTraitObject($puck_34);
    return record;
  }
  else {
    if (true) {
      let $puck_35 = $puck_34;
      throw "TypeBound is not a RecordTypeBound";
    };
  };
};
TypeBound.getTupleTypeBound = function () {
  const self = this;
  let $puck_36 = self;
  if ($unwrapTraitObject($puck_36).kind === "TupleTypeBound") {
    let {value: [tuple]} = $unwrapTraitObject($puck_36);
    return tuple;
  }
  else {
    if (true) {
      let $puck_37 = $puck_36;
      throw "TypeBound is not a TupleTypeBound";
    };
  };
};
NamedTypeBound.getType = function () {
  const self = this;
  return $unwrapTraitObject(self.type_);
}
