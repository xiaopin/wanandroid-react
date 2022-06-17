/**
 * 导航页面
 */
import React, { useEffect, useState } from 'react'
import '@/style/NavigationView.scss'
import Api from '@/api'
import { Divider, Empty, message, Space, Tag } from 'antd'
import { LinkOutlined } from '@ant-design/icons'

const NavigationView: React.FC = props => {
    const [data, setData] = useState<ApiResp.NavigationModel[]>([])
    const [isLoading, setLoading] = useState(false)
    const colors: string[] = [
        'magenta',
        'red',
        'volcano',
        'orange',
        'gold',
        'lime',
        'green',
        'cyan',
        'blue',
        'geekblue',
        'purple',
        '#f50',
        '#2db7f5',
        '#87d068',
        '#108ee9'
    ]

    useEffect(() => {
        if (isLoading) return
        setLoading(true)
        Api.navigations()
            .then(res => {
                const array = res.data || []
                setData(array)
            })
            .catch((e: Error) => message.error(e.message))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="navigation-view">
            {data.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="没有数据哟" />}
            {data.map((item, section) => (
                <>
                    <Divider orientation="left">{item.name}</Divider>
                    <Space wrap>
                        {item.articles.map(nav => (
                            <a href={nav.link} target="_blank">
                                <Tag color={colors[section % colors.length]} icon={<LinkOutlined />}>
                                    {nav.title}
                                </Tag>
                            </a>
                        ))}
                    </Space>
                </>
            ))}
        </div>
    )
}

export default NavigationView
