// 样式表
import './assets/index.css'
// 导入颜色选择器组件
import search from "./1/src/index"
import searchEditor from "./1/src/editor"
import shopinfo from "./2/src/index"
import shopinfoEditor from "./2/src/editor"
import banner from "./3/src/index"
import bannerEditor from "./3/src/editor"
import advertise from "./4/src/index"
import advertiseEditor from "./4/src/editor"
import navbar from "./5/src/index"
import navbarEditor from "./5/src/editor"
import groupPurchase from "./6/src/index"
import groupPurchaseEditor from "./6/src/editor"
import hot from "./7/src/index"
import hotEditor from "./7/src/editor"
import group from "./8/src/index"
import groupShop from "./8/src/index"
import groupShopEditor from "./8/src/editor"
import brand from "./9/src/index"
import brandEditor from "./9/src/editor"
import crossslip from "./10/src/index"
import crossslipEditor from "./10/src/editor"
import waterfall from "./11/src/index"
import waterfallEditor from "./11/src/editor"
import leftNav from "./12/src/index"
import leftNavEditor from "./12/src/editor"
import twoAdver from "./13/src/index"
import twoAdverEditor from "./13/src/editor"
import threeAdver from "./14/src/index"
import threeAdverEditor from "./14/src/editor"
import custom from "./15/src/index"
import customEditor from "./15/src/editor"
import componentToast from "./components/toast"
import VR from "./17/src/index"
import VREditor from "./17/src/editor"
import hotPoint from "./18/src/index"
import hotPointEditor from "./18/src/editor"
import brandtwo from "./19/src/index"
import brandtwoEditor from "./19/src/editor"
import leftGoods from "./20/src/index"
import leftGoodsEditor from "./20/src/editor"
import bigGoods from "./21/src/index"
import bigGoodsEditor from "./21/src/editor"
import navBanner from "./30/src/index"
import navBannerEditor from "./30/src/editor"
import serve from "./31/src/index"
import serveEditor from "./31/src/editor"

// 存储组件列表
const components = [
  search,
  searchEditor,
  banner,
  bannerEditor,
  advertise,
  advertiseEditor,
  shopinfo,
  shopinfoEditor,
  navbar,
  navbarEditor,
  groupPurchase,
  groupPurchaseEditor,
  hot,
  hotEditor,
  brand,
  brandEditor,
  crossslip,
  crossslipEditor,
  waterfall,
  waterfallEditor,
  groupShop,
  groupShopEditor,
  leftNav,
  leftNavEditor,
  twoAdver,
  twoAdverEditor,
  threeAdver,
  threeAdverEditor,
  custom,
  customEditor,
  VR,
  VREditor,
  componentToast,
  hotPoint,
  hotPointEditor,
  brandtwo,
  brandtwoEditor,
  leftGoods,
  leftGoodsEditor,
  bigGoods,
  bigGoodsEditor,
  navBanner,
  navBannerEditor,
  serve,
  serveEditor
]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  search,
  searchEditor,
  banner,
  bannerEditor,
  advertise,
  advertiseEditor,
  shopinfo,
  shopinfoEditor,
  navbar,
  navbarEditor,
  groupPurchase,
  groupPurchaseEditor,
  hot,
  hotEditor,
  brand,
  brandEditor,
  crossslip,
  crossslipEditor,
  waterfall,
  waterfallEditor,
  groupShop,
  groupShopEditor,
  leftNav,
  leftNavEditor,
  twoAdver,
  twoAdverEditor,
  threeAdver,
  threeAdverEditor,
  custom,
  customEditor,
  VR,
  VREditor,
  componentToast,
  hotPoint,
  hotPointEditor
}