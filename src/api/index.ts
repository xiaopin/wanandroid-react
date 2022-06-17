import AppConfig from '@/utils/config'
import Http, { HttpResponse } from './http'

export default class Api {
    /** 获取首页轮播图数据 */
    static banner<T = ApiResp.HomeBannerModel[]>(): HttpResponse<T> {
        return Http.get<T>('/banner/json')
    }

    /** 获取首页文章列表 */
    static homeArticles<T = ApiResp.ResponseListModel<ApiResp.ArticleModel>>(
        pageIndex: number,
        pageSize: number = AppConfig.pageSize
    ): HttpResponse<T> {
        return Http.get<T>(`/article/list/${pageIndex}/json?page_size=${pageSize}`)
    }

    /** 获取首页置顶文章列表 */
    static homeTopArticles<T = ApiResp.ArticleModel[]>(): HttpResponse<T> {
        return Http.get<T>('/article/top/json')
    }

    /** 获取工具列表数据 */
    static tools<T = ApiResp.ToolModel[]>(): HttpResponse<T> {
        return Http.get<T>('/tools/list/json')
    }
}
