import axios from 'axios'
import { Message } from 'iview'

const http = axios.create({
  // baseURL: process.env.VUE_ADMIN_API_URL|| '/api',
  baseURL: process.env.API_URL || 'http://localhost:3003/api',
  timeout: 5000,
  // withCredentials: true,
  header: { 'Access-Control-Allow-Origin': '*' }
})

// 请求拦截器
http.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  (res) => {
    // 根据业务修改
    return res
  },
  (error) => {
    let { message } = error
    const { data } = error.response
    console.log('err' + error) // for debug
    if (message === 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '后端接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      if (data && data.message) {
        message = data.message
      } else {
        message = '后端接口' + message.substr(message.length - 3) + '异常'
      }
    }
    Message.error(message || '未知错误')
    return Promise.reject(error)
  }
)
export default http
