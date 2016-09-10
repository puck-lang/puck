export const _new = constructor => (...args) => new constructor(...args)
export function asResult(fn) {
  try {
    return {result: fn()}
  } catch (error) {
    return {error}
  }
}
