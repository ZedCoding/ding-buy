import { USER_INFO } from './mutation-types'
export default {
  // 同步用户信息
  syncUserInfo({ commit }, userInfo) {
    commit(USER_INFO, userInfo)
  }
}