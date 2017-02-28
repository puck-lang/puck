exports.Math = Math;
exports.RegExp = RegExp;
exports.parseFloat = parseFloat;
exports.parseInt = parseInt;
exports.isNaN = isNaN;
exports.infinity = Infinity;
exports.panic = function panic(reason) {
    throw new Error(reason);
};
exports._delete = function (object, property) {
    delete object[property];
};
exports.identical = function (a, b) { return a === b; };
exports.isNull = function (value) { return value === null; };
exports.isUndefined = function (value) { return value === undefined; };
exports.createMap = function () { return new Map(); };
exports.createSet = function () { return new Set(); };
