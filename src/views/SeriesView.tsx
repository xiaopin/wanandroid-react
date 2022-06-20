/**
 * 体系页面
 */
import '@/style/SeriesView.scss'
import Api from '@/api'
import AppConfig from '@/utils/config'
import { Divider, Empty, List, message, Space, Spin, Tag } from 'antd'
import { LinkOutlined, StarOutlined, StarFilled } from '@ant-design/icons'
import React, { MouseEvent, useEffect, useState } from 'react'
import VirtualList from 'rc-virtual-list'
import { useWindowSize } from 'react-use'
import BottomedOut from '@/components/BottomedOut'

const SeriesView: React.FC = props => {
    /** 分类数据 */
    const [categories, setCategories] = useState<ApiResp.SeriesCategoryModel[]>([])
    /** 一级分类的选择索引 */
    const [categoryIndex, setCategoryIndex] = useState(0)
    /** 二级分类的选择索引 */
    const [categoryIndex2, setCategoryIndex2] = useState(0)
    /** 当前选择的分类id */
    const [cid, setCid] = useState(0)
    /** 当前页码 */
    const [pageIndex, setPageIndex] = useState(1)
    /** 是否正在加载 */
    const [isLoading, setLoading] = useState(false)
    /** 文章是否已加载完毕 */
    const [isNoMoreData, setNoMoreData] = useState(false)
    /** 文章数据 */
    const [articles, setArticles] = useState<ApiResp.ArticleModel[]>([])
    /** 滚动高度 */
    const scrollContainerHeight = useWindowSize().height - 100

    useEffect(() => {
        if (isLoading) return
        requestCategories()
    }, [])

    /** 获取分类数据 */
    const requestCategories = (): void => {
        setLoading(true)
        Api.seriesCategories()
            .then(res => {
                const array = res.data || []
                setCategories(array)
                const cid = array[0].children[0].id
                setCid(cid)
                requestArticles(cid, pageIndex)
            })
            .catch((e: Error) => message.error(e.message))
            .finally(() => setLoading(false))
    }

    /** 获取指定分类的文章列表 */
    const requestArticles = (cid: number, pageIndex: number): void => {
        setLoading(true)
        Api.seriesArticles(cid, pageIndex, AppConfig.pageSize)
            .then(res => {
                const array = res.data.datas || []
                if (array.length < AppConfig.pageSize) {
                    setNoMoreData(true)
                }
                setArticles(pageIndex <= 1 ? array : oldData => oldData.concat(array))
            })
            .catch((e: Error) => message.error(e.message))
            .finally(() => setLoading(false))
    }

    /** 一级分类点击回调 */
    const onHandleTopCategoryClick = (item: ApiResp.SeriesCategoryModel, index: number): void => {
        setCid(item.id)
        setCategoryIndex(index)
        setCategoryIndex2(-1)
        setPageIndex(1)
        requestArticles(item.id, 1)
    }

    /** 二级分类点击回调 */
    const onHandleSecondCategoryClick = (item: ApiResp.SeriesCategoryModel, index: number): void => {
        setCid(item.id)
        setCategoryIndex2(index)
        setPageIndex(1)
        requestArticles(item.id, 1)
    }

    /** 处理滚动回调事件 */
    const onHandleScroll = (e: MouseEvent<HTMLElement>) => {
        if (isLoading || isNoMoreData) return
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === scrollContainerHeight) {
            setPageIndex(pageIndex => {
                const n = pageIndex + 1
                requestArticles(cid, n)
                return n
            })
        }
    }

    return (
        <div className="series-view">
            <Spin spinning={isLoading} delay={200}>
                {articles.length == 0 && <Empty description="没有数据哦" />}
                <List>
                    {/* itemHeight={47} */}
                    <VirtualList data={articles} height={scrollContainerHeight} itemKey="id" onScroll={onHandleScroll}>
                        {(item, index) => (
                            <React.Fragment key={item.id}>
                                {/* 顶部添加分类数据 */}
                                {index == 0 && (
                                    <>
                                        <Divider orientation="left">一级分类</Divider>
                                        <Space wrap>
                                            {categories.map((item, idx) => (
                                                <Tag
                                                    color={idx == categoryIndex ? 'green' : undefined}
                                                    onClick={() => onHandleTopCategoryClick(item, idx)}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </Tag>
                                            ))}
                                        </Space>
                                        <Divider orientation="left">二级分类</Divider>
                                        {categories.length > 0 && categories[categoryIndex].children.length && (
                                            <Space wrap>
                                                {categories[categoryIndex].children.map((item, idx) => (
                                                    <Tag
                                                        color={idx == categoryIndex2 ? 'green' : undefined}
                                                        onClick={() => onHandleSecondCategoryClick(item, idx)}
                                                        key={item.id}
                                                    >
                                                        {item.name}
                                                    </Tag>
                                                ))}
                                            </Space>
                                        )}
                                    </>
                                )}
                                {/* 单条文章展示 */}
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<LinkOutlined />}
                                        title={
                                            <a href={item.link} target="_blank">
                                                {item.title}
                                            </a>
                                        }
                                        description={
                                            <div>
                                                {item.tags.map(tag => (
                                                    <Tag color="green" key={tag.name}>
                                                        {tag.name}
                                                    </Tag>
                                                ))}
                                                <span className="username">{item.author || item.shareUser}</span>
                                                <span>{item.niceDate}</span>
                                            </div>
                                        }
                                    />
                                    {item.collect ? <StarFilled /> : <StarOutlined />}
                                </List.Item>
                                {/* 加载完毕的提示 */}
                                {isNoMoreData && index == articles.length - 1 && <BottomedOut />}
                            </React.Fragment>
                        )}
                    </VirtualList>
                </List>
            </Spin>
        </div>
    )
}

export default SeriesView
