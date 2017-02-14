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
  if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
    (function () {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          _$unwrapTraitObject$v2 = _slicedToArray(_$unwrapTraitObject$v[0], 2),
          member = _$unwrapTraitObject$v2[0],
          enum_ = _$unwrapTraitObject$v2[1];

      __PUCK__value__2 = _core.Option.map.call(enum_.name, function (name) {
        return "" + name + "::" + member + "";
      });
    })();
  } else {
    __PUCK__value__2 = type_.displayName;
  };
  var displayName = __PUCK__value__2;
  var providedType = _core.Option.mapOr.call(type_.enumMember, type_, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        __PUCK__value__3 = _ref2[0],
        enum_ = _ref2[1];

    return enum_;
  });
  var __PUCK__value__4 = providedType._class;
  var __PUCK__value__5 = void 0;
  if ($unwrapTraitObject(__PUCK__value__4).kind == "Some") {
    var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__4),
        _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
        _class = _$unwrapTraitObject2$[0];

    __PUCK__value__5 = (0, _types.createTypeInstance)(providedType, { type: '$List<E>', value: _class.typeParameters, $isTraitObject: true });
  } else {
    __PUCK__value__5 = providedType;
  };
  var returnType = __PUCK__value__5;
  var __PUCK__value__6 = _core.Option.unwrapOr.call(type_.providesType, type_).kind;
  var __PUCK__value__7 = __PUCK__value__6;
  var __PUCK__value__8 = void 0;
  if ($unwrapTraitObject(__PUCK__value__7).kind == "Struct") {
    var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__7),
        _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
        struct = _$unwrapTraitObject3$[0];

    var __PUCK__value__9 = struct.kind;
    var __PUCK__value__10 = __PUCK__value__9;
    var __PUCK__value__11 = void 0;
    if ($unwrapTraitObject(__PUCK__value__10).kind == "Record") {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__10),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
          record = _$unwrapTraitObject4$[0];

      __PUCK__value__11 = _entities.TypeKind.Function({
        selfBinding: _core.None,
        parameters: [{
          name: _core.Option.unwrapOr.call(type_.name, "record"),
          token: { type: '$Span', value: _span.Span.empty(), $isTraitObject: true },
          mutable: false,
          type_: _core.Option.unwrapOr.call(type_.providesType, type_),
          redefined: false
        }],
        parameterRange: {
          start: 1,
          end: 2
        },
        returnType: returnType,
        isAbstract: false
      });
    } else {
      var __PUCK__value__12 = __PUCK__value__9;
      var __PUCK__value__13 = void 0;
      if ($unwrapTraitObject(__PUCK__value__12).kind == "Tuple") {
        var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__12),
            _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
            tuple = _$unwrapTraitObject5$[0];

        var __PUCK__value__15 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
        var __PUCK__value__14 = _core.Iterable[__PUCK__value__15.type].map.call(__PUCK__value__15, function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              p = _ref4[0],
              i = _ref4[1];

          return {
            name: i.toString(),
            token: _span.Span.empty(),
            mutable: false,
            type_: p,
            redefined: false
          };
        });
        __PUCK__value__13 = _entities.TypeKind.Function({
          selfBinding: _core.None,
          parameters: _core.Iterable[__PUCK__value__14.type].toList.call(__PUCK__value__14),
          parameterRange: {
            start: tuple.properties.length,
            end: tuple.properties.length + 1
          },
          returnType: returnType,
          isAbstract: false
        });
      } else {
        var __PUCK__value__16 = __PUCK__value__9;
        var __PUCK__value__17 = void 0;
        if ($unwrapTraitObject(__PUCK__value__16).kind == "Unit") {
          var _undefined = $unwrapTraitObject(__PUCK__value__16);
          return {
            displayName: displayName,
            name: returnType.name,
            kind: returnType.kind,
            _class: returnType._class,
            instance: returnType.instance,
            providesType: returnType.providesType,
            enumMember: returnType.enumMember
          };
        };
        __PUCK__value__13 = __PUCK__value__17;
      };
      __PUCK__value__11 = __PUCK__value__13;
    };
    __PUCK__value__8 = __PUCK__value__11;
  } else {
    var __PUCK__value__18 = __PUCK__value__6;
    var __PUCK__value__19 = void 0;
    if (true) {
      var __PUCK__value__20 = __PUCK__value__18;
      __PUCK__value__19 = _entities.TypeKind.Struct({
        implementations: [],
        kind: _entities.StructKind.Tuple({ properties: [] })
      });
    };
    __PUCK__value__8 = __PUCK__value__19;
  };
  var kind = __PUCK__value__8;
  return {
    displayName: displayName,
    name: type_.name,
    kind: kind,
    _class: _core.Option.map.call(providedType._class, function (_class) {
      return $unwrapTraitObject(_js._Object).assign({}, _class, { instances: [] });
    }),
    instance: providedType.instance,
    providesType: _core.Option.orValue.call(type_.providesType, (0, _core.Some)(type_)),
    enumMember: type_.enumMember
  };
}