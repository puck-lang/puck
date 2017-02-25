exports.Math = Math
exports.RegExp = RegExp
exports.parseFloat = parseFloat
exports.parseInt = parseInt
exports.isNaN = isNaN
exports.infinity = Infinity
exports.panic = function panic(reason) {
  throw new Error(reason)
}
exports._delete = function (object, property) {
  delete object[property]
}
exports.isNull = value => value === null
exports.isUndefined = value => value === undefined

exports.createMap = () => new Map()
exports.createSet = () => new Set()
