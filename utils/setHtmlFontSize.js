function setHtmlFontSize() {
  const scale = document.documentElement.clientWidth / 375
  document.documentElement.style.fontSize = `37.5px`
  // document.documentElement.style.fontSize = `${37.5 * Math.min(scale, 2)}px`
}
// 初始化
setHtmlFontSize()
// 改变窗口大小时重新设置 fontSize
window.onresize = function () {
  setHtmlFontSize()
}
