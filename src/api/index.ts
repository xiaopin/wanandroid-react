import * as M from '@/types/model'
import Http, { HttpResponse } from './http'

export default class Api {
    /** 获取首页轮播图数据 */
    static banner<T = M.HomeBannerModel[]>(): HttpResponse<T> {
        return Http.get<T>('/banner/json')
    }

    /** 获取工具列表数据 */
    static tools<T = M.ToolModel[]>(): HttpResponse<T> {
        return Http.get<T>('/tools/list/json')
    }
}
