"use strict";
exports._null = null;
exports._undefined = undefined;
exports._global = typeof global !== 'undefined' && global;
exports._self = typeof self !== 'undefined' && self;
exports._window = typeof window !== 'undefined' && window;
exports._Array = Array;
exports._Boolean = Boolean;
exports._Date = Date;
exports._Error = Error;
exports._Number = Number;
exports._Object = Object;
exports._RegExp = RegExp;
exports._String = String;
exports._module = typeof module !== 'undefined' && module;
exports._process = typeof process !== 'undefined' && process;
exports._require = typeof require === 'function' && require;
exports._new = function (constructor) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return new (constructor.bind.apply(constructor, [void 0].concat(args)))();
}; };
exports._typeof = function (object) { return typeof object; };
function asResult(fn) {
    try {
        return { result: fn() };
    }
    catch (error) {
        return { error: error };
    }
}
exports.asResult = asResult;
function wrapAsResult(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        try {
            return { result: fn.apply(void 0, args) };
        }
        catch (error) {
            return { error: error };
        }
    };
}
exports.wrapAsResult = wrapAsResult;
