exports.Math = Math;
exports.RegExp = RegExp;
exports.parseFloat = parseFloat;
exports.parseInt = parseInt;
exports.isNaN = isNaN;
exports.infinity = Infinity;
exports.panic = function panic(reason) {
    throw new Error(reason);
};
