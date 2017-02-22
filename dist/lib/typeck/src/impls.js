'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getImplementationForTrait = getImplementationForTrait;
exports.getImplementation = getImplementation;
exports.resolveImplTypeParameters = resolveImplTypeParameters;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../../ast/ast');

var _span = require('./../../ast/span');

var _entities = require('./../../entities');

var _scope = require('./scope');

var _types = require('./types');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function asType(a) {
  return a;
};
function getImplementationsForInstance(type_) {
  var __PUCK__value__1 = type_.kind;
  var __PUCK__value__2 = __PUCK__value__1;
  var __PUCK__value__3 = void 0;
  if ($unwrapTraitObject(__PUCK__value__2).kind == "Enum") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        enum_ = _$unwrapTraitObject$v[0];

    __PUCK__value__3 = enum_.implementations;
  } else {
    var __PUCK__value__4 = __PUCK__value__1;
    var __PUCK__value__5 = void 0;
    if ($unwrapTraitObject(__PUCK__value__4).kind == "Struct") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__4),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          struct = _$unwrapTraitObject2$[0];

      __PUCK__value__5 = struct.implementations;
    } else {
      var __PUCK__value__6 = __PUCK__value__1;
      var __PUCK__value__7 = void 0;
      if (true) {
        var __PUCK__value__8 = __PUCK__value__6;
        __PUCK__value__7 = [];
      };
      __PUCK__value__5 = __PUCK__value__7;
    };
    __PUCK__value__3 = __PUCK__value__5;
  };
  var implementations = __PUCK__value__3;
  if (implementations.length > 1) {
    var __PUCK__value__9 = type_.instance;
    if ($unwrapTraitObject(__PUCK__value__9).kind == "Some") {
      var _ret = function () {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__9),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            objectInstance = _$unwrapTraitObject3$[0];

        var __PUCK__value__10 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true }, function (i) {
          var implementationInstance = _core.Option.unwrap.call(i.type_.instance);
          return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.List.zip({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: objectInstance.typeParameters, $isTraitObject: true }, implementationInstance.typeParameters), $isTraitObject: true }, function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                objectP = _ref2[0],
                implP = _ref2[1];

            return (0, _types.isAssignable)(implP, objectP);
          });
        });
        return {
          v: _core.Iterable[__PUCK__value__10.type].toList.call(__PUCK__value__10)
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      return implementations;
    };
  } else {
    return implementations;
  };
};
function getMostSpecificImplementations(type_, implementations) {
  var __PUCK__value__11 = type_.instance;
  if ($unwrapTraitObject(__PUCK__value__11).kind == "Some") {
    var _ret2 = function () {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__11),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
          objectInstance = _$unwrapTraitObject4$[0];

      var maxSpecificity = 0;
      var __PUCK__value__14 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true }, function (i) {
        var specificity = getTypeSpecificity(i.type_);
        maxSpecificity = $unwrapTraitObject($unwrapTraitObject(_js.global).Math).max(maxSpecificity, specificity);
        return [i, specificity];
      });
      var __PUCK__value__13 = _core.Iterable[__PUCK__value__14.type].filter.call(__PUCK__value__14, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            __PUCK__value__15 = _ref4[0],
            specificity = _ref4[1];

        return specificity == maxSpecificity;
      });
      var __PUCK__value__12 = _core.Iterable[__PUCK__value__13.type].map.call(__PUCK__value__13, function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            i = _ref6[0],
            __PUCK__value__16 = _ref6[1];

        return i;
      });
      return {
        v: _core.Iterable[__PUCK__value__12.type].toList.call(__PUCK__value__12)
      };
    }();

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  } else {
    return implementations;
  };
};
function getImplementationForTrait(type_, trait_) {
  var __PUCK__value__18 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getImplementationsForInstance(type_), $isTraitObject: true }, function (i) {
    return !_entities.Type.getTrait.call(i.trait_).isShorthand;
  });
  var __PUCK__value__17 = _core.Iterable[__PUCK__value__18.type].filter.call(__PUCK__value__18, function (i) {
    return (0, _types.isAssignable)(i.trait_, trait_);
  });
  var implementations = _core.Iterable[__PUCK__value__17.type].toList.call(__PUCK__value__17);
  var __PUCK__value__19 = void 0;
  if ($unwrapTraitObject(implementations).length > 1) {
    __PUCK__value__19 = getMostSpecificImplementations(type_, implementations);
  } else {
    __PUCK__value__19 = implementations;
  };
  implementations = __PUCK__value__19;
  if (implementations.length > 1) {
    return (0, _core.Err)(implementations);
  } else {
    return (0, _core.Ok)(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true }));
  };
};
function getImplementation(functionName, type_, e) {
  var implementations = getImplementationsForInstance(type_);
  implementations = $unwrapTraitObject(implementations).filter(function (i) {
    return _core.ObjectMap.has.call(_entities.Type.getTrait.call(asType($unwrapTraitObject(i).trait_)).functions, functionName);
  });
  var scope = e.scope;
  var __PUCK__value__20 = void 0;
  if ($unwrapTraitObject(implementations).length > 1) {
    __PUCK__value__20 = $unwrapTraitObject(implementations).filter(function (i) {
      return _core.Option.isSome.call(_scope.Scope.getBinding.call(scope, _core.Option.unwrap.call(asType($unwrapTraitObject(i).trait_).name)));
    });
  } else {
    __PUCK__value__20 = implementations;
  };
  implementations = __PUCK__value__20;
  var __PUCK__value__21 = void 0;
  if ($unwrapTraitObject(implementations).length > 1) {
    __PUCK__value__21 = $unwrapTraitObject(implementations).filter(function (i) {
      return _core.Range.contains.call(_entities.Type.getFunction.call(asType(_core.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: _entities.Type.getTrait.call(asType($unwrapTraitObject(i).trait_)).functions, $isTraitObject: true }, functionName))).parameterRange, e.argumentList.length);
    });
  } else {
    __PUCK__value__21 = implementations;
  };
  implementations = __PUCK__value__21;
  var __PUCK__value__22 = void 0;
  if ($unwrapTraitObject(implementations).length > 1 && _core.Option.isSome.call(type_.instance)) {
    __PUCK__value__22 = getMostSpecificImplementations(type_, implementations);
  } else {
    __PUCK__value__22 = implementations;
  };
  implementations = __PUCK__value__22;
  if (implementations.length > 1) {
    return (0, _core.Err)(implementations);
  } else {
    return (0, _core.Ok)(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true }));
  };
};
function getTypeSpecificity(type_) {
  var __PUCK__value__23 = type_.kind;
  if ($unwrapTraitObject(__PUCK__value__23).kind == "Parameter") {
    var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__23),
        _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
        __PUCK__value__24 = _$unwrapTraitObject5$[0];

    return 0;
  };
  var __PUCK__value__25 = type_.instance;
  var __PUCK__value__26 = __PUCK__value__25;
  if ($unwrapTraitObject(__PUCK__value__26).kind == "Some") {
    var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__26),
        _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
        instance = _$unwrapTraitObject6$[0];

    return instance.typeParameters.reduce(function (sum, type_) {
      return sum + getTypeSpecificity(type_);
    }, 1);
  } else {
    var __PUCK__value__27 = __PUCK__value__25;
    if ($unwrapTraitObject(__PUCK__value__27).kind == "None") {
      var _undefined = $unwrapTraitObject(__PUCK__value__27);
      return 1;
    };
  };
};
function resolveImplTypeParameters(implementation, objectType) {
  var parameterMap = _core.ObjectMap._new();
  var __PUCK__value__28 = implementation.type_.instance;
  if ($unwrapTraitObject(__PUCK__value__28).kind == "Some") {
    var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__28),
        _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
        instance = _$unwrapTraitObject7$[0];

    _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true }, function (p) {
      return _core.ObjectMap.set.call(parameterMap, _core.Option.unwrap.call(p.name), p);
    });
    var iter = _core.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: _core.List.zip({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true }, _core.Option.unwrap.call(_entities.Type.typeParameters.call(objectType))), $isTraitObject: true });
    while (true) {
      var __PUCK__value__29 = _core.Iterator[iter.type].next.call(iter);
      if ($unwrapTraitObject(__PUCK__value__29).kind == "Some") {
        var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__29),
            _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
            _$unwrapTraitObject8$2 = _slicedToArray(_$unwrapTraitObject8$[0], 2),
            ip = _$unwrapTraitObject8$2[0],
            op = _$unwrapTraitObject8$2[1];

        var __PUCK__value__30 = collectTypeParameters(parameterMap, ip, op);
        if ($unwrapTraitObject(__PUCK__value__30).kind == "Err") {
          var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__30),
              _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
              err = _$unwrapTraitObject9$[0];

          return (0, _core.Err)(err);
        };
      } else {
        break;
      };
    };
  };
  return (0, _core.Ok)((0, _types.resolveTypeParameters)(parameterMap)(implementation.trait_));
};
function collectTypeParameters(parameterMap, ip, op) {
  var __PUCK__value__31 = ip.kind;
  var __PUCK__value__32 = __PUCK__value__31;
  if ($unwrapTraitObject(__PUCK__value__32).kind == "Parameter") {
    var _undefined2 = $unwrapTraitObject(__PUCK__value__32);
    var name = _core.Option.unwrap.call(ip.name);
    if ((0, _types.isAssignable)(_core.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: parameterMap, $isTraitObject: true }, name), op)) {
      parameterMap[name] = op;
    } else {
      return (0, _core.Err)([_core.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: parameterMap, $isTraitObject: true }, name), op]);
    };
  } else {
    var __PUCK__value__33 = __PUCK__value__31;
    if (true) {
      var __PUCK__value__34 = __PUCK__value__33;
      var __PUCK__value__35 = ip.instance;
      if ($unwrapTraitObject(__PUCK__value__35).kind == "Some") {
        var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__35),
            _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
            instance = _$unwrapTraitObject11[0];

        var iter = _core.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: _core.List.zip({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true }, _core.Option.unwrap.call(op.instance).typeParameters), $isTraitObject: true });
        while (true) {
          var __PUCK__value__36 = _core.Iterator[iter.type].next.call(iter);
          if ($unwrapTraitObject(__PUCK__value__36).kind == "Some") {
            var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__36),
                _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
                _$unwrapTraitObject14 = _slicedToArray(_$unwrapTraitObject13[0], 2),
                _ip = _$unwrapTraitObject14[0],
                _op = _$unwrapTraitObject14[1];

            var __PUCK__value__37 = collectTypeParameters(parameterMap, _ip, _op);
            if ($unwrapTraitObject(__PUCK__value__37).kind == "Err") {
              var _$unwrapTraitObject15 = $unwrapTraitObject(__PUCK__value__37),
                  _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15.value, 1),
                  err = _$unwrapTraitObject16[0];

              return (0, _core.Err)(err);
            };
          } else {
            break;
          };
        };
      };
    };
  };
  return (0, _core.Ok)([]);
}
