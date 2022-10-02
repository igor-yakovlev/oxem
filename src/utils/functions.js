export function getBackgroundSize (value, min, max) {
  value = Number(toPlainString(value))
  value = checkLimits(value, min, max)
  return { backgroundSize: `${((value - min) * 100) / (max - min)}% 100%` }
}

export function numberWithSpaces(value) {
  const plain = toPlainString(value)
  return plain.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function toPlainString(str) {
  return str.toString().replace(/\s/g, '')
}

export function checkLimits(value, min, max) {
  if (value > min && value < max) return value
  if (value <= min) {
    return min
  } else {
    return max
  }
}

export function noop () {
  return  null;
}

