/**
 * API返回的数据模型定义
 */
declare namespace ApiResp {
    /** 接口返回的数据格式 */
    declare interface ResponseModel<T> {
        // 接口返回的数据
        data: T
        // 接口返回的状态码
        errorCode: number
        // 接口调用失败时的错误信息
        errorMsg: string
    }

    /** 列表数据模型 */
    declare interface ResponseListModel<T> {
        curPage: number // 当前页码
        pageCount: number // 总页数
        datas: Array<T> // 当前页的列表数据
        offset: number // 当前偏移
        over: boolean
        size: number // 分页大小
        total: number // 数据总量
    }

    /** 首页轮播数据模型 */
    declare interface HomeBannerModel {
        id: number
        title: string
        desc: string
        imagePath: string
        url: string
        isVisible: 0 | 1
        order: number
        type: number
    }

    /** 文章数据模型 */
    declare interface ArticleModel {
        apkLink: string
        audit: number
        author: string
        canEdit: boolean
        chapterId: number
        chapterName: string
        collect: boolean
        courseId: number
        desc: string
        descMd: string
        envelopePic: string
        fresh: boolean
        host: string
        id: number
        link: string
        niceDate: string
        niceShareDate: string
        origin: string
        prefix: string
        projectLink: string
        publishTime: number
        realSuperChapterId: number
        selfVisible: 0 | 1
        shareDate: number
        shareUser: string
        superChapterId: number
        superChapterName: string
        tags: Array<{ name: string; url: string }>
        title: string
        type: number
        userId: number
        visible: 0 | 1
        zan: 0 | 1
    }

    /** 工具数据模型 */
    declare interface ToolModel {
        id: number
        name: string
        desc: string
        link: string
        icon: string
        isNew: 0 | 1
        order: number
        showInTab: 0 | 1
        tabName: string
        visible: 0 | 1
    }
}
