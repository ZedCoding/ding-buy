import { getLocalStore } from '../plugins/global'

const state = {
  userInfo: getLocalStore('userInfo') || {}, // 用户信息
  shopCartInfo: getLocalStore('shopCartInfo') || {}, // 购物车信息
  addressInfo: getLocalStore('addressInfo') || [], // 地址信息
}

export default state