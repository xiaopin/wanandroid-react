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

    /** 获取项目分类 */
    static projectCategories<T = ApiResp.ProjectCategoryModel[]>(): HttpResponse<T> {
        return Http.get<T>('/project/tree/json')
    }

    /**
     * 获取项目列表
     *
     * @param cid 项目分类id
     * @param pageIndex 页码
     * @param pageSize 分页大小
     * @returns
     */
    static projects<T = ApiResp.ResponseListModel<ApiResp.ArticleModel>>(
        cid: number,
        pageIndex: number,
        pageSize: number = AppConfig.pageSize
    ): HttpResponse<T> {
        return Http.get<T>(`/project/list/${pageIndex}/json?cid=${cid}&page_size=${pageSize}`)
    }
}
