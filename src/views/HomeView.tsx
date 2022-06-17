/**
 * 首页页面
 */
import '@/style/HomeView.scss'
import Api from '@/api'
import AppConfig from '@/utils/config'
import { Empty, List, message, Spin, Tag } from 'antd'
import { LinkOutlined, StarOutlined, StarFilled } from '@ant-design/icons'
import VirtualList from 'rc-virtual-list'
import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

const HomeView: React.FC = props => {
    /** 当前页码 */
    const [pageIndex, setPageIndex] = useState(0)
    /** 是否正在加载 */
    const [isLoading, setLoading] = useState(false)
    /** 文章列表数据 */
    const [articles, setArticles] = useState<ApiResp.ArticleModel[]>([])
    /** 窗口尺寸 */
    const { width, height } = useWindowSize()
    /** 滚动内容高度 */
    const scrollContainerHeight = height - 100

    useEffect(
        () => {
            !isLoading && requestArticles(0)
        },
        [] /*空数组确保只执行一次*/
    )

    /** 请求文章列表数据 */
    const requestArticles = (pageIndex: number): void => {
        const tasks = [Api.homeArticles(pageIndex, AppConfig.pageSize)]
        if (pageIndex == 0) {
            tasks.push(Api.homeTopArticles())
        }
        setLoading(true)
        Promise.all(tasks)
            .then((res: Array<any>) => {
                const articles = (res[0] as ApiResp.ResponseModel<ApiResp.ResponseListModel<ApiResp.ArticleModel>>).data.datas || []
                if (res.length == 2) {
                    const array = (res[1] as ApiResp.ResponseModel<ApiResp.ArticleModel[]>).data
                    articles.splice(0, 0, ...array)
                    setArticles(articles)
                    return
                }
                setArticles(state => state.concat(articles))
            })
            .catch((e: Error) => message.error(e.message))
            .finally(() => setLoading(false))
    }

    /** 处理滚动回调事件 */
    const onHandleScroll = (e: any) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === scrollContainerHeight) {
            const n = pageIndex + 1
            setPageIndex(pageIndex => pageIndex + 1)
            requestArticles(n)
        }
    }

    return (
        <div className="home-view">
            {/* 如果直接使用List内置的加载动画, 在滚动到底部时会出现空白留白现象, 所以这里直接采用了Spin组件包裹的方案 */}
            <Spin spinning={isLoading} delay={200}>
                {articles.length == 0 && <Empty description="没有数据哦" />}
                <List>
                    <VirtualList data={articles} height={scrollContainerHeight} itemHeight={47} itemKey="id" onScroll={onHandleScroll}>
                        {item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={<LinkOutlined />}
                                    title={
                                        <a href={item.link} target="_blank">
                                            {item.title}
                                        </a>
                                    }
                                    description={
                                        <div>
                                            {item.type == 1 && <Tag color="red">置顶</Tag>}
                                            {item.tags.map(tag => (
                                                <Tag color="green">{tag.name}</Tag>
                                            ))}
                                            <span className="username">{item.author || item.shareUser}</span>
                                            <span>{item.niceDate}</span>
                                        </div>
                                    }
                                />
                                {item.collect ? <StarFilled /> : <StarOutlined />}
                            </List.Item>
                        )}
                    </VirtualList>
                </List>
            </Spin>
        </div>
    )
}

export default HomeView
