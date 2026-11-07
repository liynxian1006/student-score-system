import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  // 开发环境走 vite 代理；生产环境若前后端同源可保留 /api
  baseURL: '/api',
  timeout: 10000
})

// 响应拦截：直接取出 data 字段，统一错误提示
request.interceptors.response.use(
  (resp) => {
    const body = resp.data
    if (body && body.code === 0) {
      return body.data
    }
    ElMessage.error(body?.msg || '请求失败')
    return Promise.reject(new Error(body?.msg || '请求失败'))
  },
  (error) => {
    ElMessage.error(error.response?.data?.msg || error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default request
