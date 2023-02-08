import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const baseURL = 'http://43.143.224.115:8083/'
// const baseURL = 'http://47.100.25.227:8083/'
// const baseURL = 'http://127.0.0.1:8083/'

// create an axios instance
// 创建一个axios实例
const service = axios.create({
  baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // withCredentials: true, //当跨域请求时发送cookie
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Mymall-Admin-Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // 如果返回的错误参数errno为 0 ，则判定为通过 .
    if (res.errno === 0) {
      Message({
        message: res.errmsg || '通过',
        type: 'success',
        duration: 5 * 1000
      })
    }
    // errno === 605 '账号或密码错误'
    if (res.errno === 605) {
      Message({
        message: res.errmsg || '登录失败',
        type: 'error',
        duration: 5 * 1000
      })
      // 本项目中 token 问题 res.err = -1
      if (res.errno === -1) {
        // to re-login
        MessageBox.confirm('您已注销，您可以取消以停留在此页面上，或重新登录', '重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        }).catch((err) => { console.log(err) })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
