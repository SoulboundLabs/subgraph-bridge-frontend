export const urlHandleToId = (urlHandle: string) => {
  return urlHandle.split('-').join(' ')
}

export const idToUrlHandle = (id: string = '') => {
  return id.toLowerCase().split(' ').join('-')
}

export const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export const getRomanNumeral = (index: number) => {
  return romanNumerals[index]
}

export const spaceToUnderscore = (str: string) => {
  return str.split(' ').join('_')
}

export const lowercaseFirstLetter = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
