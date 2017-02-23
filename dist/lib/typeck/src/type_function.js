'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.enumMemberToFunction = enumMemberToFunction;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../../ast/ast');

var _span = require('./../../ast/span');

var _entities = require('./../../entities');

var _types = require('./types');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function enumMemberToFunction(type_) {
  var __PUCK__value__1 = type_.enumMember;
  var __PUCK__value__2 = void 0;
  if (__PUCK__value__1.kind == "Some") {
    (function () {
      var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
          _PUCK__value__1$valu$ = _slicedToArray(_PUCK__value__1$valu[0], 2),
          member = _PUCK__value__1$valu$[0],
          enum_ = _PUCK__value__1$valu$[1];

      __PUCK__value__2 = _core.Option.map.call(enum_.name, function (name) {
        return "" + name + "::" + member + "";
      });
    })();
  } else {
    __PUCK__value__2 = type_.displayName;
  };
  var displayName = __PUCK__value__2;
  var providedType = _core.Option.unwrapOr.call(_core.Option.orValue.call(_core.Option.map.call(type_.enumMember, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        __PUCK__value__3 = _ref2[0],
        enum_ = _ref2[1];

    return enum_;
  }), type_.providesType), type_);
  var __PUCK__value__4 = providedType._class;
  var __PUCK__value__5 = void 0;
  if (__PUCK__value__4.kind == "Some") {
    var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
        _class = _PUCK__value__4$valu[0];

    __PUCK__value__5 = (0, _types.createTypeInstance)(providedType, { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.typeParameters, $isTraitObject: true });
  } else {
    __PUCK__value__5 = providedType;
  };
  var returnType = __PUCK__value__5;
  var __PUCK__value__6 = _core.Option.unwrapOr.call(type_.providesType, type_).kind;
  var __PUCK__value__7 = void 0;
  if ($unwrapTraitObject(__PUCK__value__6).kind == "Struct") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__6),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        struct = _$unwrapTraitObject$v[0];

    var __PUCK__value__8 = struct.kind;
    var __PUCK__value__9 = void 0;
    if ($unwrapTraitObject(__PUCK__value__8).kind == "Record") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__8),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          record = _$unwrapTraitObject2$[0];

      __PUCK__value__9 = _entities.TypeKind.Function({
        selfBinding: _core.None,
        parameters: [{
          name: _core.Option.unwrapOr.call(type_.name, "0"),
          token: { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/span.puck:Span', value: _span.Span.empty(), $isTraitObject: true },
          mutable: false,
          allowRedeclare: false,
          type_: _core.Option.unwrapOr.call(type_.providesType, type_),
          completeType: _core.None,
          previous: _core.None
        }],
        parameterRange: {
          start: 1,
          end: 2
        },
        returnType: returnType,
        isAbstract: false
      });
    } else {
      var __PUCK__value__10 = void 0;
      if ($unwrapTraitObject(__PUCK__value__8).kind == "Tuple") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__8),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            tuple = _$unwrapTraitObject3$[0];

        var __PUCK__value__12 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true });
        var __PUCK__value__11 = _core.Iterable[__PUCK__value__12.type].map.call(__PUCK__value__12, function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              i = _ref4[0],
              p = _ref4[1];

          return {
            name: "" + i + "",
            token: _span.Span.empty(),
            mutable: false,
            allowRedeclare: false,
            type_: p,
            completeType: _core.None,
            previous: _core.None
          };
        });
        __PUCK__value__10 = _entities.TypeKind.Function({
          selfBinding: _core.None,
          parameters: _core.Iterable[__PUCK__value__11.type].toList.call(__PUCK__value__11),
          parameterRange: {
            start: _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true }),
            end: _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true }) + 1
          },
          returnType: returnType,
          isAbstract: false
        });
      } else {
        var __PUCK__value__13 = void 0;
        if ($unwrapTraitObject(__PUCK__value__8).kind == "Unit") {
          var _undefined = $unwrapTraitObject(__PUCK__value__8);
          return (0, _entities.Type)({
            id: returnType.id,
            displayName: displayName,
            name: returnType.name,
            kind: returnType.kind,
            _class: returnType._class,
            instance: returnType.instance,
            providesType: returnType.providesType,
            enumMember: returnType.enumMember
          });
        };
        __PUCK__value__10 = __PUCK__value__13;
      };
      __PUCK__value__9 = __PUCK__value__10;
    };
    __PUCK__value__7 = __PUCK__value__9;
  } else {
    var __PUCK__value__14 = void 0;
    if (true) {
      var __PUCK__value__15 = __PUCK__value__6;
      __PUCK__value__14 = _entities.TypeKind.Struct({
        implementations: [],
        kind: _entities.StructKind.Tuple({ properties: [] })
      });
    };
    __PUCK__value__7 = __PUCK__value__14;
  };
  var kind = __PUCK__value__7;
  return {
    id: providedType.id,
    displayName: displayName,
    name: type_.name,
    kind: kind,
    _class: _core.Option.map.call(providedType._class, function (_class) {
      return _js._Object.assign({}, _class, { instances: [] });
    }),
    instance: providedType.instance,
    providesType: _core.Option.orValue.call(type_.providesType, (0, _core.Some)(type_)),
    enumMember: type_.enumMember
  };
}
