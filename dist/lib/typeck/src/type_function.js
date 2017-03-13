'use strict';
exports.enumMemberToFunction = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../../ast/ast");
const $puck_4 = require("./../../ast/span");
const $puck_5 = require("./../../entities");
const $puck_6 = require("./scope");
const $puck_7 = require("./types");
function enumMemberToFunction(type_) {
  let $puck_8 = type_.enumMember;
  let $puck_9;
  if ($puck_8 !== undefined) {
    let [member, enum_] = $puck_8;
    $puck_9 = $puck_1.Option.map.call(enum_.name, function (name) {
      return "" + name + "::" + member + "";
    });
  }
  else {
    $puck_9 = type_.displayName;
  };
  const displayName = $puck_9;
  let providedType = $puck_1.Option.unwrapOr.call($puck_1.Option.orValue.call($puck_1.Option.map.call(type_.enumMember, function ([, enum_]) {
    return enum_;
  }), type_.providesType), type_);
  let $puck_10 = providedType._class;
  let $puck_11;
  if ($puck_10 !== undefined) {
    let _class = $puck_10;
    $puck_11 = $puck_7.createTypeInstance(providedType, _class.typeParameters);
  }
  else {
    $puck_11 = providedType;
  };
  let returnType = $puck_11;
  let $puck_12 = $puck_1.Option.unwrapOr.call(type_.providesType, type_).kind;
  let $puck_13;
  if ($puck_12.kind === "Struct") {
    let {value: struct} = $puck_12;
    let $puck_14 = struct.kind;
    let $puck_15;
    if ($puck_14.kind === "Record") {
      let {value: record} = $puck_14;
      $puck_15 = $puck_5.TypeKind.Function({
        selfBinding: $puck_1.None,
        parameters: [{
        definition: type_.definition,
        name: $puck_1.Option.unwrapOr.call(type_.name, "0"),
        mutable: false,
        allowRedeclare: false,
        type_: $puck_1.Option.unwrapOr.call(type_.providesType, type_),
        completeType: $puck_1.None,
        previous: $puck_1.None,
      }],
        parameterRange: {
        start: 1,
        end: 2,
      },
        returnType: returnType,
        isAbstract: false,
      });
    }
    else {
      let $puck_16;
      if ($puck_14.kind === "Tuple") {
        let {value: tuple} = $puck_14;
        let $puck_18 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true})
;
        let $puck_17 = $puck_1.Iterable[$puck_18.type].map.call($puck_18, function ([i, p]) {
          return $puck_6.Binding({
            definition: p.definition,
            name: "" + i + "",
            mutable: false,
            allowRedeclare: false,
            type_: p,
            completeType: $puck_1.None,
            previous: $puck_1.None,
          });
        })
;
        $puck_16 = $puck_5.TypeKind.Function({
          selfBinding: $puck_1.None,
          parameters: $puck_1.Iterable[$puck_17.type].toList.call($puck_17),
          parameterRange: {
          start: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}),
          end: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}) + 1,
        },
          returnType: returnType,
          isAbstract: false,
        });
      }
      else {
        let $puck_19;
        if (($puck_14.kind === "Unit")) {
          $puck_14;
          return $puck_5.Type({
            definition: returnType.definition,
            id: returnType.id,
            displayName: displayName,
            name: returnType.name,
            kind: returnType.kind,
            _class: returnType._class,
            instance: returnType.instance,
            providesType: returnType.providesType,
            enumMember: returnType.enumMember,
          });
        };
        $puck_16 = $puck_19;
      };
      $puck_15 = $puck_16;
    };
    $puck_13 = $puck_15;
  }
  else {
    let $puck_20;
    if (true) {
      $puck_12;
      $puck_20 = $puck_5.TypeKind.Struct({
        implementations: [],
        kind: $puck_5.StructKind.Tuple({properties: []}),
      });
    };
    $puck_13 = $puck_20;
  };
  const kind = $puck_13;
  return {
    definition: returnType.definition,
    id: providedType.id,
    displayName: displayName,
    name: type_.name,
    kind: kind,
    _class: $puck_1.Option.map.call(providedType._class, function (_class) {
    return $puck_2._Object.assign({}, _class, {instances: []});
  }),
    instance: providedType.instance,
    providesType: $puck_1.Option.orValue.call(type_.providesType, $puck_1.Some(type_)),
    enumMember: type_.enumMember,
  };
};
exports.enumMemberToFunction = enumMemberToFunction
