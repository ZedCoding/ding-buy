
import { Toast } from 'vant';
export default {
  install(Vue) { 
    Vue.prototype.$toast = (message, duration = 1500) => { 
      Toast({
        message,
        duration
      })
    }
  }
}