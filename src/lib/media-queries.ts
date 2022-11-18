export const mediaSize = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const minDeviceWidth = {
  mobileS: `(min-width: ${mediaSize.mobileS})`,
  mobileM: `(min-width: ${mediaSize.mobileM})`,
  mobileL: `(min-width: ${mediaSize.mobileL})`,
  tablet: `(min-width: ${mediaSize.tablet})`,
  laptop: `(min-width: ${mediaSize.laptop})`,
  laptopL: `(min-width: ${mediaSize.laptopL})`,
  desktop: `(min-width: ${mediaSize.desktop})`,
  desktopL: `(min-width: ${mediaSize.desktop})`
}

export const maxDeviceWidth = {
  mobileS: `(max-width: ${mediaSize.mobileS})`,
  mobileM: `(max-width: ${mediaSize.mobileM})`,
  mobileL: `(max-width: ${mediaSize.mobileL})`,
  tablet: `(max-width: ${mediaSize.tablet})`,
  laptop: `(max-width: ${mediaSize.laptop})`,
  laptopL: `(max-width: ${mediaSize.laptopL})`,
  desktop: `(max-width: ${mediaSize.desktop})`,
  desktopL: `(max-width: ${mediaSize.desktop})`
}
