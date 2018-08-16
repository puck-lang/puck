'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Module = exports.EnumDeclaration = exports.EnumMember = exports.ImplDeclaration = exports.ImplShorthandDeclaration = exports.TraitDeclaration = exports.TypeDeclaration = exports.ExportDirective = exports.ImportDirective = exports.ObjectDestructure = exports.ObjectDestructureMember = exports.Block = exports.BreakStatement = exports.ReturnStatement = exports.ForLoop = exports.WhileLoop = exports.Comment = exports.Attribute = exports.AttributeArgument = exports.Identifier = exports.FunctionDeclaration = exports.VariableDeclaration = exports.AssignmentExpression = exports.BinaryExpression = exports.CallExpression = exports.TypeArguments = exports.IfExpression = exports.IfLetExpression = exports.MatchExpression = exports.MatchArm = exports.TypePathExpression = exports.UnaryExpression = exports.IndexAccess = exports.MemberAccess = exports.TupleIndexAccess = exports.UnknownAccess = exports.UnknownIndexAccess = exports.BooleanLiteral = exports.ListLiteral = exports.NumberLiteral = exports.RangeLiteral = exports.RecordLiteral = exports.StringLiteral = exports.SimpleStringLiteral = exports.TupleLiteral = exports.RecordPattern = exports.RecordPatternMember = exports.TuplePattern = exports.FunctionTypeBound = exports.IntersectionTypeBound = exports.NamedTypeBound = exports.RecordTypeBound = exports.TupleTypeBound = exports.TypeParameter = exports.TopLevelStatement = exports.BlockLevelStatement = exports.Expression = exports.SimpleLiteral = exports.ExportedStatement = exports.ImportSpecifier = exports.AttributeData = exports.TypePath = exports.RecordLiteralMember = exports.StringLiteralPart = exports.Pattern = exports.TypeBound = exports.RecordTypeBoundMember = undefined;
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
var ForLoop = exports.ForLoop = (object) => object;
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
var TypeArguments = exports.TypeArguments = (object) => object;
var IfExpression = exports.IfExpression = (object) => object;
var IfLetExpression = exports.IfLetExpression = (object) => object;
var MatchExpression = exports.MatchExpression = (object) => object;
var MatchArm = exports.MatchArm = (object) => object;
var TypePathExpression = exports.TypePathExpression = (object) => object;
var UnaryExpression = exports.UnaryExpression = (object) => object;
var IndexAccess = exports.IndexAccess = (object) => object;
var MemberAccess = exports.MemberAccess = (object) => object;
var TupleIndexAccess = exports.TupleIndexAccess = (object) => object;
var UnknownAccess = exports.UnknownAccess = (object) => object;
var UnknownIndexAccess = exports.UnknownIndexAccess = (object) => object;
var BooleanLiteral = exports.BooleanLiteral = (object) => object;
var ListLiteral = exports.ListLiteral = (object) => object;
var NumberLiteral = exports.NumberLiteral = (object) => object;
var RangeLiteral = exports.RangeLiteral = (object) => object;
var RecordLiteral = exports.RecordLiteral = (object) => object;
var StringLiteral = exports.StringLiteral = (object) => object;
var SimpleStringLiteral = exports.SimpleStringLiteral = (object) => object;
var TupleLiteral = exports.TupleLiteral = (object) => object;
var RecordPattern = exports.RecordPattern = (object) => object;
var RecordPatternMember = exports.RecordPatternMember = (object) => object;
var TuplePattern = exports.TuplePattern = (object) => object;
var FunctionTypeBound = exports.FunctionTypeBound = (object) => object;
var IntersectionTypeBound = exports.IntersectionTypeBound = (object) => object;
var NamedTypeBound = exports.NamedTypeBound = (object) => object;
var RecordTypeBound = exports.RecordTypeBound = (object) => object;
var TupleTypeBound = exports.TupleTypeBound = (object) => object;
var TypeParameter = exports.TypeParameter = (object) => object;
var TopLevelStatement = exports.TopLevelStatement = {
ExportDirective: (member) => ({kind: 'ExportDirective', value: member}),
ImportDirective: (member) => ({kind: 'ImportDirective', value: member}),
EnumDeclaration: (member) => ({kind: 'EnumDeclaration', value: member}),
ImplDeclaration: (member) => ({kind: 'ImplDeclaration', value: member}),
ImplShorthandDeclaration: (member) => ({kind: 'ImplShorthandDeclaration', value: member}),
TraitDeclaration: (member) => ({kind: 'TraitDeclaration', value: member}),
TypeDeclaration: (member) => ({kind: 'TypeDeclaration', value: member}),
BlockLevelStatement: (member) => ({kind: 'BlockLevelStatement', value: member}),
};
var BlockLevelStatement = exports.BlockLevelStatement = {
Block: (member) => ({kind: 'Block', value: member}),
BreakStatement: (member) => ({kind: 'BreakStatement', value: member}),
ReturnStatement: (member) => ({kind: 'ReturnStatement', value: member}),
ForLoop: (member) => ({kind: 'ForLoop', value: member}),
WhileLoop: (member) => ({kind: 'WhileLoop', value: member}),
Expression: (member) => ({kind: 'Expression', value: member}),
};
var Expression = exports.Expression = {
ThrowStatement: (member) => ({kind: 'ThrowStatement', value: member}),
Comment: (member) => ({kind: 'Comment', value: member}),
Identifier: (member) => ({kind: 'Identifier', value: member}),
FunctionDeclaration: (member) => ({kind: 'FunctionDeclaration', value: member}),
VariableDeclaration: (member) => ({kind: 'VariableDeclaration', value: member}),
AssignmentExpression: (member) => ({kind: 'AssignmentExpression', value: member}),
BinaryExpression: (member) => ({kind: 'BinaryExpression', value: member}),
CallExpression: (member) => ({kind: 'CallExpression', value: member}),
IfExpression: (member) => ({kind: 'IfExpression', value: member}),
IfLetExpression: (member) => ({kind: 'IfLetExpression', value: member}),
MatchExpression: (member) => ({kind: 'MatchExpression', value: member}),
TypePathExpression: (member) => ({kind: 'TypePathExpression', value: member}),
UnaryExpression: (member) => ({kind: 'UnaryExpression', value: member}),
IndexAccess: (member) => ({kind: 'IndexAccess', value: member}),
TupleIndexAccess: (member) => ({kind: 'TupleIndexAccess', value: member}),
MemberAccess: (member) => ({kind: 'MemberAccess', value: member}),
UnknownAccess: (member) => ({kind: 'UnknownAccess', value: member}),
UnknownIndexAccess: (member) => ({kind: 'UnknownIndexAccess', value: member}),
BooleanLiteral: (member) => ({kind: 'BooleanLiteral', value: member}),
ListLiteral: (member) => ({kind: 'ListLiteral', value: member}),
NumberLiteral: (member) => ({kind: 'NumberLiteral', value: member}),
RangeLiteral: (member) => ({kind: 'RangeLiteral', value: member}),
RecordLiteral: (member) => ({kind: 'RecordLiteral', value: member}),
StringLiteral: (member) => ({kind: 'StringLiteral', value: member}),
TupleLiteral: (member) => ({kind: 'TupleLiteral', value: member}),
};
var SimpleLiteral = exports.SimpleLiteral = {
BooleanLiteral: (member) => ({kind: 'BooleanLiteral', value: member}),
NumberLiteral: (member) => ({kind: 'NumberLiteral', value: member}),
StringLiteral: (member) => ({kind: 'StringLiteral', value: member}),
};
var ExportedStatement = exports.ExportedStatement = {
EnumDeclaration: (member) => ({kind: 'EnumDeclaration', value: member}),
TraitDeclaration: (member) => ({kind: 'TraitDeclaration', value: member}),
TypeDeclaration: (member) => ({kind: 'TypeDeclaration', value: member}),
Identifier: (member) => ({kind: 'Identifier', value: member}),
FunctionDeclaration: (member) => ({kind: 'FunctionDeclaration', value: member}),
VariableDeclaration: (member) => ({kind: 'VariableDeclaration', value: member}),
};
var ImportSpecifier = exports.ImportSpecifier = {
Asterisk: (member) => ({kind: 'Asterisk', value: member}),
Identifier: (member) => ({kind: 'Identifier', value: member}),
ObjectDestructure: (member) => ({kind: 'ObjectDestructure', value: member}),
};
var AttributeData = exports.AttributeData = {
None: {kind: 'None', value: Symbol('None')},
Value: (member) => ({kind: 'Value', value: member}),
Arguments: (member) => ({kind: 'Arguments', value: member}),
};
var TypePath = exports.TypePath = {
_Object: (...members) => ({kind: '_Object', value: members}),
Member: (member) => ({kind: 'Member', value: member}),
};
var RecordLiteralMember = exports.RecordLiteralMember = {
Property: (object) => ({kind: 'Property', value: object}),
Spread: (member) => ({kind: 'Spread', value: member}),
};
var StringLiteralPart = exports.StringLiteralPart = {
Literal: (member) => ({kind: 'Literal', value: member}),
Identifier: (member) => ({kind: 'Identifier', value: member}),
};
var Pattern = exports.Pattern = {
CatchAll: (member) => ({kind: 'CatchAll', value: member}),
Identifier: (object) => ({kind: 'Identifier', value: object}),
Record: (member) => ({kind: 'Record', value: member}),
Tuple: (member) => ({kind: 'Tuple', value: member}),
RecordType: (...members) => ({kind: 'RecordType', value: members}),
TupleType: (...members) => ({kind: 'TupleType', value: members}),
UnitType: (member) => ({kind: 'UnitType', value: member}),
};
var TypeBound = exports.TypeBound = {
FunctionTypeBound: (member) => ({kind: 'FunctionTypeBound', value: member}),
IntersectionTypeBound: (member) => ({kind: 'IntersectionTypeBound', value: member}),
NamedTypeBound: (member) => ({kind: 'NamedTypeBound', value: member}),
RecordTypeBound: (member) => ({kind: 'RecordTypeBound', value: member}),
TupleTypeBound: (member) => ({kind: 'TupleTypeBound', value: member}),
};
var RecordTypeBoundMember = exports.RecordTypeBoundMember = {
Property: (object) => ({kind: 'Property', value: object}),
Spread: (member) => ({kind: 'Spread', value: member}),
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TopLevelStatement"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  let $puck_5 = self;
  if ($puck_5.value.kind === "ExportDirective") {
    let {value: e} = $puck_5.value;
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective', value: e, $isTraitObject: true});
  }
  else {
    if ($puck_5.value.kind === "ImportDirective") {
      let {value: e} = $puck_5.value;
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: e, $isTraitObject: true});
    }
    else {
      if ($puck_5.value.kind === "EnumDeclaration") {
        let {value: e} = $puck_5.value;
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: e, $isTraitObject: true});
      }
      else {
        if ($puck_5.value.kind === "ImplDeclaration") {
          let {value: e} = $puck_5.value;
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: e, $isTraitObject: true});
        }
        else {
          if ($puck_5.value.kind === "ImplShorthandDeclaration") {
            let {value: e} = $puck_5.value;
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration', value: e, $isTraitObject: true});
          }
          else {
            if ($puck_5.value.kind === "TraitDeclaration") {
              let {value: e} = $puck_5.value;
              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: e, $isTraitObject: true});
            }
            else {
              if ($puck_5.value.kind === "TypeDeclaration") {
                let {value: e} = $puck_5.value;
                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: e, $isTraitObject: true});
              }
              else {
                if ($puck_5.value.kind === "BlockLevelStatement") {
                  let {value: e} = $puck_5.value;
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
  if ($puck_6.value.kind === "ExportDirective") {
    let {value: e} = $puck_6.value;
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective', value: e, $isTraitObject: true});
  }
  else {
    if ($puck_6.value.kind === "ImportDirective") {
      let {value: e} = $puck_6.value;
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: e, $isTraitObject: true});
    }
    else {
      if ($puck_6.value.kind === "EnumDeclaration") {
        let {value: e} = $puck_6.value;
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: e, $isTraitObject: true});
      }
      else {
        if ($puck_6.value.kind === "ImplDeclaration") {
          let {value: e} = $puck_6.value;
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: e, $isTraitObject: true});
        }
        else {
          if ($puck_6.value.kind === "ImplShorthandDeclaration") {
            let {value: e} = $puck_6.value;
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration', value: e, $isTraitObject: true});
          }
          else {
            if ($puck_6.value.kind === "TraitDeclaration") {
              let {value: e} = $puck_6.value;
              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: e, $isTraitObject: true});
            }
            else {
              if ($puck_6.value.kind === "TypeDeclaration") {
                let {value: e} = $puck_6.value;
                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: e, $isTraitObject: true});
              }
              else {
                if ($puck_6.value.kind === "BlockLevelStatement") {
                  let {value: e} = $puck_6.value;
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
  if ($puck_7.value.kind === "Block") {
    let {value: e} = $puck_7.value;
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e, $isTraitObject: true});
  }
  else {
    if ($puck_7.value.kind === "BreakStatement") {
      let {value: e} = $puck_7.value;
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement', value: e, $isTraitObject: true});
    }
    else {
      if ($puck_7.value.kind === "ReturnStatement") {
        let {value: e} = $puck_7.value;
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement', value: e, $isTraitObject: true});
      }
      else {
        if ($puck_7.value.kind === "ForLoop") {
          let {value: e} = $puck_7.value;
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true});
        }
        else {
          if ($puck_7.value.kind === "WhileLoop") {
            let {value: e} = $puck_7.value;
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop', value: e, $isTraitObject: true});
          }
          else {
            if ($puck_7.value.kind === "Expression") {
              let {value: e} = $puck_7.value;
              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e, $isTraitObject: true});
            };
          };
        };
      };
    };
  };
},
end: function () {
  const self = this;
  let $puck_8 = self;
  if ($puck_8.value.kind === "Block") {
    let {value: e} = $puck_8.value;
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: e, $isTraitObject: true});
  }
  else {
    if ($puck_8.value.kind === "BreakStatement") {
      let {value: e} = $puck_8.value;
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BreakStatement', value: e, $isTraitObject: true});
    }
    else {
      if ($puck_8.value.kind === "ReturnStatement") {
        let {value: e} = $puck_8.value;
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement', value: e, $isTraitObject: true});
      }
      else {
        if ($puck_8.value.kind === "ForLoop") {
          let {value: e} = $puck_8.value;
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true});
        }
        else {
          if ($puck_8.value.kind === "WhileLoop") {
            let {value: e} = $puck_8.value;
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop', value: e, $isTraitObject: true});
          }
          else {
            if ($puck_8.value.kind === "Expression") {
              let {value: e} = $puck_8.value;
              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e, $isTraitObject: true});
            };
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
  if ($puck_9.value.kind === "ThrowStatement") {
    let {value: e} = $puck_9.value;
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true});
  }
  else {
    if ($puck_9.value.kind === "Comment") {
      $puck_9.value;
      throw "No span for Comment";
    }
    else {
      if ($puck_9.value.kind === "Identifier") {
        let {value: e} = $puck_9.value;
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: e, $isTraitObject: true});
      }
      else {
        if ($puck_9.value.kind === "FunctionDeclaration") {
          let {value: e} = $puck_9.value;
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: e, $isTraitObject: true});
        }
        else {
          if ($puck_9.value.kind === "VariableDeclaration") {
            let {value: e} = $puck_9.value;
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: e, $isTraitObject: true});
          }
          else {
            if ($puck_9.value.kind === "AssignmentExpression") {
              let {value: e} = $puck_9.value;
              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true});
            }
            else {
              if ($puck_9.value.kind === "BinaryExpression") {
                let {value: e} = $puck_9.value;
                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression', value: e, $isTraitObject: true});
              }
              else {
                if ($puck_9.value.kind === "CallExpression") {
                  let {value: e} = $puck_9.value;
                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true});
                }
                else {
                  if ($puck_9.value.kind === "IfExpression") {
                    let {value: e} = $puck_9.value;
                    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true});
                  }
                  else {
                    if ($puck_9.value.kind === "IfLetExpression") {
                      let {value: e} = $puck_9.value;
                      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true});
                    }
                    else {
                      if ($puck_9.value.kind === "MatchExpression") {
                        let {value: e} = $puck_9.value;
                        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true});
                      }
                      else {
                        if ($puck_9.value.kind === "TypePathExpression") {
                          let {value: e} = $puck_9.value;
                          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression', value: e, $isTraitObject: true});
                        }
                        else {
                          if ($puck_9.value.kind === "UnaryExpression") {
                            let {value: e} = $puck_9.value;
                            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true});
                          }
                          else {
                            if ($puck_9.value.kind === "IndexAccess") {
                              let {value: e} = $puck_9.value;
                              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: e, $isTraitObject: true});
                            }
                            else {
                              if ($puck_9.value.kind === "MemberAccess") {
                                let {value: e} = $puck_9.value;
                                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: e, $isTraitObject: true});
                              }
                              else {
                                if ($puck_9.value.kind === "TupleIndexAccess") {
                                  let {value: e} = $puck_9.value;
                                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleIndexAccess"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleIndexAccess', value: e, $isTraitObject: true});
                                }
                                else {
                                  if ($puck_9.value.kind === "UnknownAccess") {
                                    let {value: e} = $puck_9.value;
                                    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: e, $isTraitObject: true});
                                  }
                                  else {
                                    if ($puck_9.value.kind === "UnknownIndexAccess") {
                                      let {value: e} = $puck_9.value;
                                      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: e, $isTraitObject: true});
                                    }
                                    else {
                                      if ($puck_9.value.kind === "BooleanLiteral") {
                                        let {value: e} = $puck_9.value;
                                        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: e, $isTraitObject: true});
                                      }
                                      else {
                                        if ($puck_9.value.kind === "ListLiteral") {
                                          let {value: e} = $puck_9.value;
                                          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: e, $isTraitObject: true});
                                        }
                                        else {
                                          if ($puck_9.value.kind === "NumberLiteral") {
                                            let {value: e} = $puck_9.value;
                                            return e.span.start;
                                          }
                                          else {
                                            if ($puck_9.value.kind === "RangeLiteral") {
                                              let {value: e} = $puck_9.value;
                                              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RangeLiteral"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RangeLiteral', value: e, $isTraitObject: true});
                                            }
                                            else {
                                              if ($puck_9.value.kind === "RecordLiteral") {
                                                let {value: e} = $puck_9.value;
                                                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral', value: e, $isTraitObject: true});
                                              }
                                              else {
                                                if ($puck_9.value.kind === "StringLiteral") {
                                                  let {value: e} = $puck_9.value;
                                                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: e, $isTraitObject: true});
                                                }
                                                else {
                                                  if ($puck_9.value.kind === "TupleLiteral") {
                                                    let {value: e} = $puck_9.value;
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
    };
  };
},
end: function () {
  const self = this;
  let $puck_10 = self;
  if ($puck_10.value.kind === "ThrowStatement") {
    let {value: e} = $puck_10.value;
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true});
  }
  else {
    if ($puck_10.value.kind === "Comment") {
      $puck_10.value;
      throw "No span for Comment";
    }
    else {
      if ($puck_10.value.kind === "Identifier") {
        let {value: e} = $puck_10.value;
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: e, $isTraitObject: true});
      }
      else {
        if ($puck_10.value.kind === "FunctionDeclaration") {
          let {value: e} = $puck_10.value;
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: e, $isTraitObject: true});
        }
        else {
          if ($puck_10.value.kind === "VariableDeclaration") {
            let {value: e} = $puck_10.value;
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: e, $isTraitObject: true});
          }
          else {
            if ($puck_10.value.kind === "AssignmentExpression") {
              let {value: e} = $puck_10.value;
              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true});
            }
            else {
              if ($puck_10.value.kind === "BinaryExpression") {
                let {value: e} = $puck_10.value;
                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BinaryExpression', value: e, $isTraitObject: true});
              }
              else {
                if ($puck_10.value.kind === "CallExpression") {
                  let {value: e} = $puck_10.value;
                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true});
                }
                else {
                  if ($puck_10.value.kind === "IfExpression") {
                    let {value: e} = $puck_10.value;
                    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true});
                  }
                  else {
                    if ($puck_10.value.kind === "IfLetExpression") {
                      let {value: e} = $puck_10.value;
                      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true});
                    }
                    else {
                      if ($puck_10.value.kind === "MatchExpression") {
                        let {value: e} = $puck_10.value;
                        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true});
                      }
                      else {
                        if ($puck_10.value.kind === "TypePathExpression") {
                          let {value: e} = $puck_10.value;
                          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePathExpression', value: e, $isTraitObject: true});
                        }
                        else {
                          if ($puck_10.value.kind === "UnaryExpression") {
                            let {value: e} = $puck_10.value;
                            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true});
                          }
                          else {
                            if ($puck_10.value.kind === "IndexAccess") {
                              let {value: e} = $puck_10.value;
                              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: e, $isTraitObject: true});
                            }
                            else {
                              if ($puck_10.value.kind === "MemberAccess") {
                                let {value: e} = $puck_10.value;
                                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: e, $isTraitObject: true});
                              }
                              else {
                                if ($puck_10.value.kind === "TupleIndexAccess") {
                                  let {value: e} = $puck_10.value;
                                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleIndexAccess"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleIndexAccess', value: e, $isTraitObject: true});
                                }
                                else {
                                  if ($puck_10.value.kind === "UnknownAccess") {
                                    let {value: e} = $puck_10.value;
                                    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: e, $isTraitObject: true});
                                  }
                                  else {
                                    if ($puck_10.value.kind === "UnknownIndexAccess") {
                                      let {value: e} = $puck_10.value;
                                      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: e, $isTraitObject: true});
                                    }
                                    else {
                                      if ($puck_10.value.kind === "BooleanLiteral") {
                                        let {value: e} = $puck_10.value;
                                        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: e, $isTraitObject: true});
                                      }
                                      else {
                                        if ($puck_10.value.kind === "ListLiteral") {
                                          let {value: e} = $puck_10.value;
                                          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: e, $isTraitObject: true});
                                        }
                                        else {
                                          if ($puck_10.value.kind === "NumberLiteral") {
                                            let {value: e} = $puck_10.value;
                                            return e.span.end;
                                          }
                                          else {
                                            if ($puck_10.value.kind === "RangeLiteral") {
                                              let {value: e} = $puck_10.value;
                                              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RangeLiteral"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RangeLiteral', value: e, $isTraitObject: true});
                                            }
                                            else {
                                              if ($puck_10.value.kind === "RecordLiteral") {
                                                let {value: e} = $puck_10.value;
                                                return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral', value: e, $isTraitObject: true});
                                              }
                                              else {
                                                if ($puck_10.value.kind === "StringLiteral") {
                                                  let {value: e} = $puck_10.value;
                                                  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: e, $isTraitObject: true});
                                                }
                                                else {
                                                  if ($puck_10.value.kind === "TupleLiteral") {
                                                    let {value: e} = $puck_10.value;
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
  let $puck_11 = self;
  if ($puck_11.value.kind === "EnumDeclaration") {
    let {value: d} = $puck_11.value;
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: d, $isTraitObject: true});
  }
  else {
    if ($puck_11.value.kind === "TraitDeclaration") {
      let {value: d} = $puck_11.value;
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: d, $isTraitObject: true});
    }
    else {
      if ($puck_11.value.kind === "TypeDeclaration") {
        let {value: d} = $puck_11.value;
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: d, $isTraitObject: true});
      }
      else {
        if ($puck_11.value.kind === "Identifier") {
          let {value: d} = $puck_11.value;
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: d, $isTraitObject: true});
        }
        else {
          if ($puck_11.value.kind === "FunctionDeclaration") {
            let {value: d} = $puck_11.value;
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: d, $isTraitObject: true});
          }
          else {
            if ($puck_11.value.kind === "VariableDeclaration") {
              let {value: d} = $puck_11.value;
              return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true});
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
  let $puck_12 = self;
  if ($puck_12.value.kind === "Asterisk") {
    let {value: token} = $puck_12.value;
    return token.span;
  }
  else {
    if ($puck_12.value.kind === "Identifier") {
      let {value: identifier} = $puck_12.value;
      return identifier.span;
    }
    else {
      if ($puck_12.value.kind === "ObjectDestructure") {
        let {value: objectDestructure} = $puck_12.value;
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
  let $puck_13 = self.value.openBrace;
  if ($puck_13 !== undefined) {
    let openBrace = $puck_13;
    return openBrace.span.start;
  }
  else {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: $puck_1.Option.unwrap.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.statements, $isTraitObject: true})), $isTraitObject: true});
  };
},
end: function () {
  const self = this;
  let $puck_14 = self.value.closeBrace;
  if ($puck_14 !== undefined) {
    let closeBrace = $puck_14;
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
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop"] = {
span: function () {
  const self = this;
  return {
    start: self.value.forKeyword.span.start,
    end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: self.value.body, $isTraitObject: true}),
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
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeArguments"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return self.value.openBracket.span.start;
},
end: function () {
  const self = this;
  return self.value.closeBracket.span.end;
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
  let $puck_15 = self;
  if ($puck_15.value.kind === "_Object") {
    let {value: [identifier, typePath]} = $puck_15.value;
    return {
      start: identifier.span.start,
      end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: typePath, $isTraitObject: true}),
    };
  }
  else {
    if ($puck_15.value.kind === "Member") {
      let {value: identifier} = $puck_15.value;
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
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true});
},
end: function () {
  const self = this;
  return self.value.closeBracket.span.end;
}
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
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleIndexAccess"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.object, $isTraitObject: true});
},
end: function () {
  const self = this;
  return self.value.index.span.end;
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
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RangeLiteral"] = {
span: function () {
  const self = this;
  return {
    start: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.start, $isTraitObject: true}),
    end: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.end, $isTraitObject: true}),
  };
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
  let $puck_16 = self;
  if ($puck_16.value.kind === "Property") {
    let {value: {name: name}} = $puck_16.value;
    return name.span.start;
  }
  else {
    if ($puck_16.value.kind === "Spread") {
      let {value: e} = $puck_16.value;
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e, $isTraitObject: true});
    };
  };
},
end: function () {
  const self = this;
  let $puck_17 = self;
  if ($puck_17.value.kind === "Property") {
    let {value: {value: value}} = $puck_17.value;
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: value, $isTraitObject: true});
  }
  else {
    if ($puck_17.value.kind === "Spread") {
      let {value: e} = $puck_17.value;
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e, $isTraitObject: true});
    };
  };
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
  if ($puck_18.value.kind === "Literal") {
    let {value: {span: span}} = $puck_18.value;
    return span;
  }
  else {
    if ($puck_18.value.kind === "Identifier") {
      let {value: {span: span}} = $puck_18.value;
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
  if ($puck_19.value.kind === "CatchAll") {
    let {value: token} = $puck_19.value;
    return token.span;
  }
  else {
    if ($puck_19.value.kind === "Identifier") {
      let {value: {identifier: identifier}} = $puck_19.value;
      return identifier.span;
    }
    else {
      if ($puck_19.value.kind === "Record") {
        let {value: recordPattern} = $puck_19.value;
        return {
          start: recordPattern.openBrace.span.start,
          end: recordPattern.closeBrace.span.end,
        };
      }
      else {
        if ($puck_19.value.kind === "Tuple") {
          let {value: tuplePattern} = $puck_19.value;
          return {
            start: tuplePattern.openParen.span.start,
            end: tuplePattern.closeParen.span.end,
          };
        }
        else {
          if ($puck_19.value.kind === "RecordType") {
            let {value: [typePath, recordPattern]} = $puck_19.value;
            return {
              start: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: typePath, $isTraitObject: true}),
              end: recordPattern.closeBrace.span.end,
            };
          }
          else {
            if ($puck_19.value.kind === "TupleType") {
              let {value: [typePath, tuplePattern]} = $puck_19.value;
              return {
                start: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: typePath, $isTraitObject: true}),
                end: tuplePattern.closeParen.span.end,
              };
            }
            else {
              if ($puck_19.value.kind === "UnitType") {
                let {value: typePath} = $puck_19.value;
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
  if ($puck_20.value.kind === "FunctionTypeBound") {
    let {value: t} = $puck_20.value;
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound', value: t, $isTraitObject: true});
  }
  else {
    if ($puck_20.value.kind === "IntersectionTypeBound") {
      let {value: t} = $puck_20.value;
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IntersectionTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IntersectionTypeBound', value: t, $isTraitObject: true});
    }
    else {
      if ($puck_20.value.kind === "NamedTypeBound") {
        let {value: t} = $puck_20.value;
        return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true});
      }
      else {
        if ($puck_20.value.kind === "RecordTypeBound") {
          let {value: t} = $puck_20.value;
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound', value: t, $isTraitObject: true});
        }
        else {
          if ($puck_20.value.kind === "TupleTypeBound") {
            let {value: t} = $puck_20.value;
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: t, $isTraitObject: true});
          };
        };
      };
    };
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_1.Option.mapOrElse.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.typeParameters, $isTraitObject: true}), function () {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: self.value.parameters, $isTraitObject: true});
  }, function (p) {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: p, $isTraitObject: true});
  });
},
end: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: self.value.returnType, $isTraitObject: true});
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IntersectionTypeBound"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: self.value.baseType, $isTraitObject: true});
},
end: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: self.value.traitBound, $isTraitObject: true});
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.path, $isTraitObject: true});
},
end: function () {
  const self = this;
  return $puck_1.Option.mapOr.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value.typeParameters, $isTraitObject: true}), $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: self.value.path, $isTraitObject: true}), function (p) {
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: p, $isTraitObject: true});
  });
}
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound"] = {
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
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBoundMember"] = {
span: $puck_3.ToSpan.span,
start: function () {
  const self = this;
  let $puck_21 = self;
  if ($puck_21.value.kind === "Property") {
    let {value: {name: name}} = $puck_21.value;
    return name.span.start;
  }
  else {
    if ($puck_21.value.kind === "Spread") {
      let {value: t} = $puck_21.value;
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].start.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t, $isTraitObject: true});
    };
  };
},
end: function () {
  const self = this;
  let $puck_22 = self;
  if ($puck_22.value.kind === "Property") {
    let {value: {typeBound: typeBound}} = $puck_22.value;
    return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: typeBound, $isTraitObject: true});
  }
  else {
    if ($puck_22.value.kind === "Spread") {
      let {value: t} = $puck_22.value;
      return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t, $isTraitObject: true});
    };
  };
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
  return self.value.name.span;
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
TopLevelStatement.getType = function () {
  const self = this;
  let $puck_23 = self;
  if ($puck_23.kind === "ExportDirective") {
    let {value: e} = $puck_23;
    throw "type on export";
  }
  else {
    if ($puck_23.kind === "ImportDirective") {
      let {value: e} = $puck_23;
      throw "type on import";
    }
    else {
      if ($puck_23.kind === "EnumDeclaration") {
        let {value: e} = $puck_23;
        return e.type_;
      }
      else {
        if ($puck_23.kind === "ImplDeclaration") {
          let {value: e} = $puck_23;
          return e.type_.type_;
        }
        else {
          if ($puck_23.kind === "ImplShorthandDeclaration") {
            let {value: e} = $puck_23;
            return e.type_.type_;
          }
          else {
            if ($puck_23.kind === "TraitDeclaration") {
              let {value: e} = $puck_23;
              return e.type_;
            }
            else {
              if ($puck_23.kind === "TypeDeclaration") {
                let {value: e} = $puck_23;
                return e.type_;
              }
              else {
                if ($puck_23.kind === "BlockLevelStatement") {
                  let {value: e} = $puck_23;
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
  let $puck_24 = self;
  if ($puck_24.kind === "Block") {
    let {value: e} = $puck_24;
    return e.type_;
  }
  else {
    if ($puck_24.kind === "BreakStatement") {
      let {value: e} = $puck_24;
      return e.type_;
    }
    else {
      if ($puck_24.kind === "ReturnStatement") {
        let {value: e} = $puck_24;
        return e.type_;
      }
      else {
        if ($puck_24.kind === "ForLoop") {
          let {value: e} = $puck_24;
          return e.type_;
        }
        else {
          if ($puck_24.kind === "WhileLoop") {
            let {value: e} = $puck_24;
            return e.type_;
          }
          else {
            if ($puck_24.kind === "Expression") {
              let {value: e} = $puck_24;
              return Expression.getType.call(e);
            };
          };
        };
      };
    };
  };
};
Expression.getType = function () {
  const self = this;
  let $puck_25 = self;
  if ($puck_25.kind === "ThrowStatement") {
    let {value: e} = $puck_25;
    return e.type_;
  }
  else {
    if ($puck_25.kind === "Comment") {
      $puck_25;
      return $puck_1.panic("getType on comment");
    }
    else {
      if ($puck_25.kind === "Identifier") {
        let {value: e} = $puck_25;
        return e.type_;
      }
      else {
        if ($puck_25.kind === "FunctionDeclaration") {
          let {value: e} = $puck_25;
          return e.type_;
        }
        else {
          if ($puck_25.kind === "VariableDeclaration") {
            let {value: e} = $puck_25;
            return e.type_;
          }
          else {
            if ($puck_25.kind === "AssignmentExpression") {
              let {value: e} = $puck_25;
              return e.type_;
            }
            else {
              if ($puck_25.kind === "BinaryExpression") {
                let {value: e} = $puck_25;
                return e.type_;
              }
              else {
                if ($puck_25.kind === "CallExpression") {
                  let {value: e} = $puck_25;
                  return e.type_;
                }
                else {
                  if ($puck_25.kind === "IfExpression") {
                    let {value: e} = $puck_25;
                    return e.type_;
                  }
                  else {
                    if ($puck_25.kind === "IfLetExpression") {
                      let {value: e} = $puck_25;
                      return e.type_;
                    }
                    else {
                      if ($puck_25.kind === "MatchExpression") {
                        let {value: e} = $puck_25;
                        return e.type_;
                      }
                      else {
                        if ($puck_25.kind === "TypePathExpression") {
                          let {value: e} = $puck_25;
                          return e.type_;
                        }
                        else {
                          if ($puck_25.kind === "UnaryExpression") {
                            let {value: e} = $puck_25;
                            return e.type_;
                          }
                          else {
                            if ($puck_25.kind === "IndexAccess") {
                              let {value: e} = $puck_25;
                              return e.type_;
                            }
                            else {
                              if ($puck_25.kind === "MemberAccess") {
                                let {value: e} = $puck_25;
                                return e.type_;
                              }
                              else {
                                if ($puck_25.kind === "TupleIndexAccess") {
                                  let {value: e} = $puck_25;
                                  return e.type_;
                                }
                                else {
                                  if ($puck_25.kind === "UnknownAccess") {
                                    let {value: e} = $puck_25;
                                    return e.type_;
                                  }
                                  else {
                                    if ($puck_25.kind === "UnknownIndexAccess") {
                                      let {value: e} = $puck_25;
                                      return e.type_;
                                    }
                                    else {
                                      if ($puck_25.kind === "BooleanLiteral") {
                                        let {value: e} = $puck_25;
                                        return e.type_;
                                      }
                                      else {
                                        if ($puck_25.kind === "ListLiteral") {
                                          let {value: e} = $puck_25;
                                          return e.type_;
                                        }
                                        else {
                                          if ($puck_25.kind === "NumberLiteral") {
                                            let {value: e} = $puck_25;
                                            return e.type_;
                                          }
                                          else {
                                            if ($puck_25.kind === "RangeLiteral") {
                                              let {value: e} = $puck_25;
                                              return e.type_;
                                            }
                                            else {
                                              if ($puck_25.kind === "RecordLiteral") {
                                                let {value: e} = $puck_25;
                                                return e.type_;
                                              }
                                              else {
                                                if ($puck_25.kind === "StringLiteral") {
                                                  let {value: e} = $puck_25;
                                                  return e.type_;
                                                }
                                                else {
                                                  if ($puck_25.kind === "TupleLiteral") {
                                                    let {value: e} = $puck_25;
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
  };
};
TraitDeclaration.getType = function () {
  const self = this;
  return $unwrapTraitObject(self.type_);
};
ExportDirective.getType = function () {
  const self = this;
  let $puck_26 = self.statement;
  if ($puck_26.kind === "EnumDeclaration") {
    let {value: d} = $puck_26;
    return d.type_;
  }
  else {
    if ($puck_26.kind === "TraitDeclaration") {
      let {value: d} = $puck_26;
      return d.type_;
    }
    else {
      if ($puck_26.kind === "TypeDeclaration") {
        let {value: d} = $puck_26;
        return d.type_;
      }
      else {
        if ($puck_26.kind === "Identifier") {
          let {value: d} = $puck_26;
          return d.type_;
        }
        else {
          if ($puck_26.kind === "FunctionDeclaration") {
            let {value: d} = $puck_26;
            return d.type_;
          }
          else {
            if ($puck_26.kind === "VariableDeclaration") {
              let {value: d} = $puck_26;
              return d.type_;
            };
          };
        };
      };
    };
  };
};
Pattern.displayName = function () {
  const self = this;
  let $puck_27 = self;
  if ($puck_27.kind === "CatchAll") {
    $puck_27;
    return "_";
  }
  else {
    if ($puck_27.kind === "Identifier") {
      let {value: {identifier: identifier}} = $puck_27;
      return identifier.name;
    }
    else {
      if ($puck_27.kind === "Record") {
        let {value: recordPattern} = $puck_27;
        return RecordPattern.displayName.call(recordPattern);
      }
      else {
        if ($puck_27.kind === "Tuple") {
          let {value: tuplePattern} = $puck_27;
          return TuplePattern.displayName.call(tuplePattern);
        }
        else {
          if ($puck_27.kind === "RecordType") {
            let {value: [, recordPattern]} = $puck_27;
            return RecordPattern.displayName.call(recordPattern);
          }
          else {
            if ($puck_27.kind === "TupleType") {
              let {value: [, tuplePattern]} = $puck_27;
              return TuplePattern.displayName.call(tuplePattern);
            }
            else {
              if ($puck_27.kind === "UnitType") {
                $puck_27;
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
    let $puck_28 = p.pattern;
    let $puck_29;
    if (($puck_28.kind === "Identifier")) {
      let {value: {identifier: {name: name}}} = $puck_28;
      $puck_29 = name === p.property.name;
    }
    else {
      $puck_29 = false;
    };
    const shorthand = $puck_29;
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
  let $puck_30 = self;
  if (($puck_30.kind === "FunctionTypeBound")) {
    let {value: t} = $puck_30;
    return t.type_;
  }
  else {
    if ($puck_30.kind === "IntersectionTypeBound") {
      let {value: t} = $puck_30;
      return t.type_;
    }
    else {
      if ($puck_30.kind === "NamedTypeBound") {
        let {value: t} = $puck_30;
        return NamedTypeBound.getType.call(t);
      }
      else {
        if ($puck_30.kind === "RecordTypeBound") {
          let {value: t} = $puck_30;
          return t.type_;
        }
        else {
          if ($puck_30.kind === "TupleTypeBound") {
            let {value: t} = $puck_30;
            return t.type_;
          };
        };
      };
    };
  };
};
TypeBound.getRecordTypeBound = function () {
  const self = this;
  let $puck_31 = self;
  if ($puck_31.kind === "RecordTypeBound") {
    let {value: record} = $puck_31;
    return record;
  }
  else {
    if (true) {
      $puck_31;
      throw "TypeBound is not a RecordTypeBound";
    };
  };
};
TypeBound.getTupleTypeBound = function () {
  const self = this;
  let $puck_32 = self;
  if ($puck_32.kind === "TupleTypeBound") {
    let {value: tuple} = $puck_32;
    return tuple;
  }
  else {
    if (true) {
      $puck_32;
      throw "TypeBound is not a TupleTypeBound";
    };
  };
};
NamedTypeBound.getType = function () {
  const self = this;
  return $unwrapTraitObject(self.type_);
}
