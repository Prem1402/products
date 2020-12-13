export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function trimString(str) {
  return str.substring(0, 30)
}
