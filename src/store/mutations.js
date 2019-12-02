import {
  USER_INFO,
  CHANGE_USER_NAME,
  CHANGE_SEX,
  CHANGE_BIRTHDAY,
  ADD_ADDRESS,
  EDIT_ADDRESS,
  REMOVE_ADDRESS,
  ADD_GOODS,
  REMOVE_GOODS,
  CLEAR_CART,
  SELECT_ALL_GOODS,
  LOG_OUT
} from './mutation-types'

import { setLocalStore, removeLocalStore } from '../plugins/global';
export default {
  [USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
    setLocalStore('userInfo', userInfo);
  },
  [CHANGE_USER_NAME](state, name) {
    state.userInfo.user_name = name;
    setLocalStore('userInfo', state.userInfo);
  },
  [CHANGE_SEX](state, sex) {
    state.userInfo.sex = sex;
    setLocalStore('userInfo', state.userInfo);
  },
  [CHANGE_BIRTHDAY](state, day) {
    state.userInfo.birth_day = day;
    setLocalStore('userInfo', state.userInfo);
  },
  [ADD_ADDRESS](state, address) {
    state.addressInfo.push(address);
    setLocalStore('addressInfo', state.addressInfo);
  },
  [EDIT_ADDRESS](state, address) {
    let addressInfo = state.addressInfo;
    addressInfo = addressInfo.map(item => {
      if (item.id === address.id) {
        item = address;
      }
      return item;
    })
    state.addressInfo = [...addressInfo];
    setLocalStore('addressInfo', state.addressInfo);
  },
  [REMOVE_ADDRESS](state, id) {
    let addressInfo = state.addressInfo
    let currentIndex;
    addressInfo.forEach((item, index) => {
      if (item.id === id) {
        currentIndex = index;
      }
    })
    addressInfo.splice(currentIndex, 1);
    state.addressInfo = [...addressInfo];
    setLocalStore('addressInfo', state.addressInfo);
  },
  [ADD_GOODS](state, { id, name, small_image, price }) {
    let shopCartInfo = state.shopCartInfo
    if (shopCartInfo[id]) {
      shopCartInfo[id]['number']++;
    } else {
      shopCartInfo[id] = {
        id,
        number: 1,
        name,
        small_image,
        price,
        checked: true
      }
    }
    state.shopCartInfo = { ...shopCartInfo };
    setLocalStore('shopCartInfo', state.shopCartInfo);
  },
  [REMOVE_GOODS](state, id) {
    let shopCartInfo = state.shopCartInfo
    delete shopCartInfo[id];
    state.shopCartInfo = { ...shopCartInfo };
    setLocalStore('shopCartInfo', state.shopCartInfo);
  },
  [CLEAR_CART](state) {
    state.shopCartInfo = {};
    removeLocalStore('shopCartInfo');
  },
  [SELECT_ALL_GOODS](state, flag) {
    let shopCartInfo = state.shopCartInfo;
    Object.values(shopCartInfo).forEach(item => item.checked = flag);
    state.shopCartInfo = { ...shopCartInfo };
    setLocalStore('shopCartInfo', state.shopCartInfo);
  },
  [LOG_OUT](state) {
    state.userInfo = {};
    state.addressInfo = [];
    state.shopCartInfo = {};
    removeLocalStore('userInfo');
    removeLocalStore('addressInfo');
    removeLocalStore('shopCartInfo');
  }
}