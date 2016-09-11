export function asResult(fn) {
  try {
    return {result: fn()}
  } catch (error) {
    return {error}
  }
}
