'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.enumMemberToFunctionundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../../ast/ast");
const $puck_4 = require("./../../ast/span");
const $puck_5 = require("./../../entities");
const $puck_6 = require("./types");
function enumMemberToFunction(type_) {
  let $puck_7 = type_.enumMember;
  let $puck_8;
  if ($puck_7.kind == "Some") {
    let {value: [[member, enum_]]} = $puck_7;
    $puck_8 = $puck_1.Option.map.call(enum_.name, function (name) {
      return "" + name + "::" + member + "";
    });
  }
  else {
    $puck_8 = type_.displayName;
  };
  const displayName = $puck_8;
  let providedType = $puck_1.Option.unwrapOr.call($puck_1.Option.orValue.call($puck_1.Option.map.call(type_.enumMember, function ([$puck_9, enum_]) {
    return enum_;
  }), type_.providesType), type_);
  let $puck_10 = providedType._class;
  let $puck_11;
  if ($puck_10.kind == "Some") {
    let {value: [_class]} = $puck_10;
    $puck_11 = $puck_6.createTypeInstance(providedType, _class.typeParameters);
  }
  else {
    $puck_11 = providedType;
  };
  let returnType = $puck_11;
  let $puck_12 = $puck_1.Option.unwrapOr.call(type_.providesType, type_).kind;
  let $puck_13;
  if ($unwrapTraitObject($puck_12).kind == "Struct") {
    let {value: [struct]} = $unwrapTraitObject($puck_12);
    let $puck_14 = struct.kind;
    let $puck_15;
    if ($unwrapTraitObject($puck_14).kind == "Record") {
      let {value: [record]} = $unwrapTraitObject($puck_14);
      $puck_15 = $puck_5.TypeKind.Function({
        selfBinding: $puck_1.None,
        parameters: [{
        name: $puck_1.Option.unwrapOr.call(type_.name, "0"),
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/span.puck:Span', value: $puck_4.Span.empty(), $isTraitObject: true},
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
      if ($unwrapTraitObject($puck_14).kind == "Tuple") {
        let {value: [tuple]} = $unwrapTraitObject($puck_14);
        let $puck_18 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true})
;
        let $puck_17 = $puck_1.Iterable[$puck_18.type].map.call($puck_18, function ([i, p]) {
          return {
            name: "" + i + "",
            token: $puck_4.Span.empty(),
            mutable: false,
            allowRedeclare: false,
            type_: p,
            completeType: $puck_1.None,
            previous: $puck_1.None,
          };
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
        if (($unwrapTraitObject($puck_14).kind == "Unit")) {
          let undefined = $unwrapTraitObject($puck_14);
          return $puck_5.Type({
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
      let $puck_21 = $puck_12;
      $puck_20 = $puck_5.TypeKind.Struct({
        implementations: [],
        kind: $puck_5.StructKind.Tuple({properties: []}),
      });
    };
    $puck_13 = $puck_20;
  };
  const kind = $puck_13;
  return {
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
