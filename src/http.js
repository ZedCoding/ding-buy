import axios from 'axios'
import router from './router'
import { Notify } from 'vant';

const http = axios.create({
  baseURL: 'https://mock.cangdu.org/mock/5d940466d360e8289c6a8eb7',
  timeout: 60000 // 请求超时时间,
})

http.interceptors.request.use(config => {
  config.url += '?t=' + new Date().getTime(); // 加时间戳防止请求缓存
  return { ...config }
}, error => {
  return Promise.reject(error)
})

http.interceptors.response.use(response => {
  return response
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400: case 500:
        error.message = error.response.data.Message;
        break;
      case 401:
        error.message = '无效授权，请重新登录(401)';
        router.push({ path: '/login' })
        break;
      case 404:
        error.message = "请求未找到(404)";
        break;
      default:
        error.message = "连接出错啦~"
        break;
    }
  } else {
    error.message = "连击服务器失败"
  }
  Notify({ type: 'danger', message: error.message, duration: 800 });
  return new Promise(() => { }) // pending的promise，中止promise链
})

export default http
