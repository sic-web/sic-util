/**
 * 函数“win_dynamic_fontSize”根据当前屏幕宽度计算并设置文档的字体大小。
 */
export const win_dynamic_fontSize = () => {
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const baseScreenWidth = 1920;
  const baseFontSize = 16;
  const fontSize = (screenWidth / baseScreenWidth) * baseFontSize;
  document.documentElement.style.fontSize = fontSize + "px";
};
