import axios from 'axios'
import { Message, Loading } from 'element-ui'

//封装axios，实现发送/响应接口拦截，实现统一提示效果

const error = () => {
    Message({
        type: 'error',
        message: '遇到错误，请刷新重试',
        duration: 2 * 1000
    })
}
let loading
const startLoading = () => {
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0,0,0,0.7)'
    })
}
const endLoading = () => {
    loading.close()
}

const service = axios.create({
    baseURL: 'https://cnodejs.org/api/v1',
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        startLoading()
        return config
    }, err => {
        endLoading()
        error()
        Promise.reject(err)
    }
)

service.interceptors.response.use(
    response => {
        endLoading()
        return response.data
    },
    err => {
        endLoading()
        error()
        return Promise.reject(err)
    }
)

export default service