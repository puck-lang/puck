'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getImplementationsForInstance = getImplementationsForInstance;
exports.getImplementationsForTrait = getImplementationsForTrait;
exports.getMostSpecificImplementations = getMostSpecificImplementations;
exports.getImplementation = getImplementation;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../../ast/ast');

var _entities = require('./../../entities');

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
    var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
        enum_ = _PUCK__value__2$valu[0];

    __PUCK__value__3 = enum_.implementations;
  } else {
    var __PUCK__value__4 = __PUCK__value__1;
    var __PUCK__value__5 = void 0;
    if ($unwrapTraitObject(__PUCK__value__4).kind == "Struct") {
      var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
          struct = _PUCK__value__4$valu[0];

      __PUCK__value__5 = struct.implementations;
    } else {
      var __PUCK__value__6 = __PUCK__value__1;
      var __PUCK__value__7 = void 0;
      if ($unwrapTraitObject(__PUCK__value__6).kind == "Parameter") {
        var _undefined = __PUCK__value__6;
        __PUCK__value__7 = [];
      } else {
        var __PUCK__value__8 = __PUCK__value__1;
        var __PUCK__value__9 = void 0;
        if (true) {
          var __PUCK__value__10 = __PUCK__value__8;
          throw "Not an enum or a struct";
        };
        __PUCK__value__7 = __PUCK__value__9;
      };
      __PUCK__value__5 = __PUCK__value__7;
    };
    __PUCK__value__3 = __PUCK__value__5;
  };
  var implementations = __PUCK__value__3;
  if (implementations.length > 1) {
    var __PUCK__value__11 = type_.instance;
    if ($unwrapTraitObject(__PUCK__value__11).kind == "Some") {
      var _ret = function () {
        var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
            objectInstance = _PUCK__value__11$val[0];

        return {
          v: implementations.filter(function (i) {
            var objectInstance_ = objectInstance;
            var implementationInstance = _core.Option.unwrap.call(i.type_.instance);
            return _core.Iterable['$List<E>'].all.call({ type: '$List<E>', value: _core.List.zip({ type: '$List<E>', value: objectInstance_.typeParameters, $isTraitObject: true }, { type: '$List<E>', value: implementationInstance.typeParameters, $isTraitObject: true }), $isTraitObject: true }, function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  objectP = _ref2[0],
                  implP = _ref2[1];

              return (0, _types.isAssignable)(implP, objectP);
            });
          })
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
function getImplementationsForTrait(type_, trait_, implementations) {
  return implementations.filter(function (i) {
    return (0, _types.isAssignable)(trait_, $unwrapTraitObject(i).trait_);
  });
};
function getMostSpecificImplementations(type_, implementations) {
  var __PUCK__value__12 = type_.instance;
  if ($unwrapTraitObject(__PUCK__value__12).kind == "Some") {
    var _ret2 = function () {
      var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1),
          objectInstance = _PUCK__value__12$val[0];

      var maxSpecificity = 0;
      return {
        v: $unwrapTraitObject(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: implementations, $isTraitObject: true }, function (i) {
          var specificity = getTypeSpecificity(i.type_);
          maxSpecificity = $unwrapTraitObject($unwrapTraitObject(_js.global).Math).max(maxSpecificity, specificity);
          return [i, specificity];
        }).value.filter(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              __PUCK__value__13 = _ref4[0],
              specificity = _ref4[1];

          return specificity == maxSpecificity;
        })).map(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              i = _ref6[0],
              __PUCK__value__14 = _ref6[1];

          return i;
        })
      };
    }();

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  } else {
    return implementations;
  };
};
function getImplementation(functionName, type_, e, reportError) {
  var implementations = getImplementationsForInstance(type_);
  implementations = $unwrapTraitObject(implementations).filter(function (i) {
    return _entities.Type.getTrait.call(asType($unwrapTraitObject(i).trait_)).functions[functionName];
  });
  var __PUCK__value__15 = void 0;
  if ($unwrapTraitObject(implementations).length > 1) {
    __PUCK__value__15 = $unwrapTraitObject(implementations).filter(function (i) {
      return $unwrapTraitObject(e.scope).getTypeBinding(_core.Option.unwrap.call(asType($unwrapTraitObject(i).trait_).name));
    });
  } else {
    __PUCK__value__15 = implementations;
  };
  implementations = __PUCK__value__15;
  var __PUCK__value__16 = void 0;
  if ($unwrapTraitObject(implementations).length > 1) {
    __PUCK__value__16 = $unwrapTraitObject(implementations).filter(function (i) {
      return _core.Range.contains.call(_entities.Type.getFunction.call(asType(_entities.Type.getTrait.call(asType($unwrapTraitObject(i).trait_)).functions[functionName])).argumentRange, e.argumentList.length);
    });
  } else {
    __PUCK__value__16 = implementations;
  };
  implementations = __PUCK__value__16;
  var __PUCK__value__17 = void 0;
  if ($unwrapTraitObject(implementations).length > 1 && _core.Option.isSome.call(type_.instance)) {
    __PUCK__value__17 = getMostSpecificImplementations(type_, implementations);
  } else {
    __PUCK__value__17 = implementations;
  };
  implementations = __PUCK__value__17;
  if (implementations.length > 1) {
    return reportError(e, "Ambiguous trait call");
  } else {
    return _core.Iterable['$List<E>'].first.call({ type: '$List<E>', value: implementations, $isTraitObject: true });
  };
};
function getTypeSpecificity(type_) {
  var __PUCK__value__18 = type_.kind;
  if ($unwrapTraitObject(__PUCK__value__18).kind == "Parameter") {
    var _PUCK__value__18$val = _slicedToArray(__PUCK__value__18.value, 1),
        __PUCK__value__19 = _PUCK__value__18$val[0];

    return 0;
  };
  var __PUCK__value__20 = type_.instance;
  var __PUCK__value__21 = __PUCK__value__20;
  if ($unwrapTraitObject(__PUCK__value__21).kind == "Some") {
    var _PUCK__value__21$val = _slicedToArray(__PUCK__value__21.value, 1),
        instance = _PUCK__value__21$val[0];

    return instance.typeParameters.reduce(function (sum, type_) {
      return sum + getTypeSpecificity(type_);
    }, 1);
  } else {
    var __PUCK__value__22 = __PUCK__value__20;
    if ($unwrapTraitObject(__PUCK__value__22).kind == "None") {
      var _undefined2 = __PUCK__value__22;
      return 1;
    };
  };
}
