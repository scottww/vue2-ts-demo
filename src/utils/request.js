// src/utils/request.js
import axios from 'axios'
// import { ElMessage } from 'element-plus'
import { Message } from 'element-ui'

// 创建 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API || '',
  baseURL: '',
  withCredentials: false,
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 携带 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }

    // get 请求把 data 转为 params, 只对get请求加时间戳，防缓存
    if (config.method === 'get') {
      config.params = { ...config.params, ...config.data, n: Date.now() }
    }

    // 加时间戳防缓存
    // const timestamp = Date.parse(new Date()) / 1000
    // if (config.url.includes('?')) {
    //   config.url += `&n=${timestamp}`
    // } else {
    //   config.url += `?n=${timestamp}`
    // }

    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        type: 'error',
        message: res.msg || '请求出错，请重试',
        duration: 1500,
      })
      return Promise.reject(res.msg || 'Error')
    } else {
      return res
    }
  },
  error => {
    const codeMessage = {
      400: '请求错误(400)',
      401: '未授权，请重新登录(401)',
      403: '拒绝访问(403)',
      404: '请求出错(404)',
      408: '请求超时(408)',
      500: '服务器错误(500)',
      501: '服务未实现(501)',
      502: '网络错误(502)',
      503: '服务不可用(503)',
      504: '网络超时(504)',
      505: 'HTTP版本不受支持(505)',
    }

    let message = ''
    if (error.response) {
      const status = error.response.status
      message = codeMessage[status] || `连接出错(${status})!`
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      message = '网络未响应，请检查网络'
    } else {
      // 其他错误
      message = error.message || '请求出错'
    }

    Message({
      type: 'error',
      message,
      duration: 2000,
    })
    return Promise.reject(error)
  }
)

// 封装统一方法
const request = {
  get(url, params = {}) {
    return service.get(url, { params })
  },
  post(url, data = {}) {
    return service.post(url, data)
  },
  put(url, data = {}) {
    return service.put(url, data)
  },
  delete(url, data = {}) {
    return service.delete(url, { data })
  }
}

// 开发环境引入 Mock.js
if (process.env.NODE_ENV === 'development') {
  require('@/mock') // 注意路径根据你的项目调整
}

export default request
