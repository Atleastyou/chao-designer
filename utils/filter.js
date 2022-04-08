import Config from '../config/app.js'

const pxtorem = (px) => {
  const scale = document.documentElement.clientWidth / Config.designSize
  const htmlSize = Config.baseSize * Math.min(scale, 2)
  return parseInt(px) / htmlSize + 'rem'
}

const imgPrefix = (url, suffix = '') => {
  if (!url) return ''
  return Config.imagePrefix + url + suffix
}

export {
  pxtorem,
  imgPrefix
}