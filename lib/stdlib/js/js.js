export const _null = null
export const _undefined = undefined

export const _global = typeof global !== 'undefined' && global
export const _self = typeof self !== 'undefined' && self
export const _window = typeof window !== 'undefined' && window

export const _module = typeof module !== 'undefined' && module
export const _require = typeof require === 'function' && require

export const _new = constructor => (...args) => new constructor(...args)
