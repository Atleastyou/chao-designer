import request from '../utils/request.js'

// 获取七牛token
const qiniuToken = () => request.get(`/other/getQiniuToken`)

// 获取商品列表
const goodsList = (params) => request.get('/Goods/goodsList', { params })

// 获取连接选项卡选项
const getGoodsTabs = (params) => request.get('/ShopTheme/getGoodsConditionType', { params })

// 获取跳转链接弹窗的选项
const getGoodsCondition = (params) => request.get('/ShopTheme/getGoodsCondition', { params })

// 组件列表
const moduleList = () => request.get(`/ShopTheme/getModularList`)

// 获取图标列表
const getIcon = (params) => request.get('/Icon/getList', { params })

// 添加图标
const postAddIcon = (params) => request.post('/Icon/add', { ...params })

// 删除图标
const postDelIcon = (params) => request.get('/Icon/del', { params })

// 修改图标名称
const postEditIcon = (params) => request.get('/Icon/edit', { params })

// 获取组合购详情
const getGroupGoods = (params) => request.get('/GoodsCombination/getInfo', { params })

// 获取商品数据
const getGoodsByCondition = (params) => request.get('/ShopTheme/getGoodsByCondition', { params })

// 微页面列表
const themeList = (params) => request.get('/PageTheme/getThemeList', { params })

// 获取VR案例列表
const getVrList = (params) => request.get('/Vr/getVrList', { params })
// 获取运营商品牌
const getBrandList = (params) => request.get('/Brand/getList', { params })

export {
  qiniuToken,
  goodsList,
  getGoodsTabs,
  getGoodsCondition,
  getIcon,
  moduleList,
  postAddIcon,
  postDelIcon,
  postEditIcon,
  getGroupGoods,
  getGoodsByCondition,
  themeList,
  getVrList,
  getBrandList
}