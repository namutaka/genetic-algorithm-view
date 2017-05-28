console.table = console.table || function() {}

export function createArray(size, initialFunc) {
  const ret = []
  for( var i = 0; i < size; i++) {
    ret.push(initialFunc(i))
  }
  return ret
}

export function intRandom(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

