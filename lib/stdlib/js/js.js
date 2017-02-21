export const _null = null
export const _undefined = undefined

export const _global = typeof global !== 'undefined' && global
export const _self = typeof self !== 'undefined' && self
export const _window = typeof window !== 'undefined' && window

export const _Array = Array
export const _Boolean = Boolean
export const _Date = Date
export const _Error = Error
export const _Number = Number
export const _Object = Object
export const _RegExp = RegExp
export const _String = String

export const _module = typeof module !== 'undefined' && module
export const _process = typeof process !== 'undefined' && process
export const _require = typeof require === 'function' && require

export const _new = constructor => (...args) => new constructor(...args)
export const _typeof = object => typeof object

export function asResult(fn) {
  try {
    return {value: fn(), error: false}
  } catch (error) {
    return {value: error, error: true}
  }
}

export function wrapAsResult(fn) {
  return (...args) => {
    try {
      return {value: fn(...args), error: false}
    } catch (error) {
      return {value: error, error: true}
    }
  }
}

export function hasProperty(object, property) {
  return property in object
}
