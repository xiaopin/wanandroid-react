import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import AppConfig from '@/utils/config'

/**
 * 接口返回的状态码说明
 */
export enum MessageCode {
    Success = 0, // 请求成功
    NotLoggedIn = -1001, // 未登陆
    Error = -1 // 请求失败
}

/// axios请求实例
const instance = axios.create({
    baseURL: AppConfig.baseUrl,
    timeout: AppConfig.timeout,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseEncoding: 'utf-8',
    responseType: 'json'
})

/// 拦截请求
instance.interceptors.request.use(
    config => {
        // TODO: 统一设置token
        return config
    },
    error => {}
)

/// 拦截请求响应, 统一处理响应数据
instance.interceptors.response.use(
    response => {
        // TODO: 统一解析服务器返回的数据, 非0则表示失败
        return response
    },
    error => {}
)

/// HTTP请求响应数据
export declare type HttpResponse<T> = Promise<ApiResp.ResponseModel<T>>

/**
 * HTTP工具类
 */
export default class Http {
    /// 发送GET请求
    static get<T>(path: string, data?: object): HttpResponse<T> {
        return this.request<T>('GET', path, data)
    }

    /// 发送POST请求
    static post<T>(path: string, data?: object): HttpResponse<T> {
        return this.request<T>('POST', path, data)
    }

    /// 发送HTTP请求
    static request<T>(method: Method, path: string, data?: object): HttpResponse<T> {
        const config: AxiosRequestConfig = {
            url: path,
            method: method,
            data: data
        }
        const ret = instance.request<ApiResp.ResponseModel<T>>(config).then(response => {
            if (response === undefined || response === null) {
                throw new Error('The response data is illegal!')
            }
            const data: ApiResp.ResponseModel<T> = response.data
            return data
        })
        return ret
    }
}
