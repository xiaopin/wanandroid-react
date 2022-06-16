/**
 * App全局配置信息
 */
export default class AppConfig {
    /// 接口请求地址
    static baseUrl: string = import.meta.env.VITE_API_URL
    /// 请求超时时间
    static timeout: number = import.meta.env.VITE_API_TIMEOUT
    /// 分页大小
    static pageSize: number = 20
    /// 分页大小选择
    static pageSizes: Array<number> = [20, 50, 100]
}
