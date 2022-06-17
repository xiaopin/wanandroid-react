/**
 * 工具页面
 */
import '@/style/ToolView.scss'
import Api from '@/api'
import { Button, Card, Empty, List, Space, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

const ToolView: React.FC = props => {
    const [isLoading, setLoading] = useState(true)
    const [models, setModels] = useState<ApiResp.ToolModel[]>([])
    const { width } = useWindowSize()
    const column = width > 1000 ? 4 : 2

    useEffect(() => {
        setLoading(true)
        Api.tools()
            .then(res => {
                const array = res.data || []
                setModels(array)
            })
            .catch(e => {})
            .finally(() => setLoading(false))
    }, [])

    if (isLoading) {
        // 不建议直接使用style属性(性能比不上css class), 这里作为演示
        return (
            <Spin
                tip={'正在拼命加载中...'}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: 'calc(50% + 100px)',
                    transform: 'translate(-50% - 100px, -50%)'
                }}
            />
        )
    }
    return (
        <div className="tool-view">
            {models.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="没有数据哟" />}
            <List
                grid={{ gutter: 16, column: column }}
                dataSource={models}
                renderItem={item => (
                    <List.Item>
                        <Card
                            key={item.id}
                            title={
                                <a href={item.link} target="_blank">
                                    {item.name}
                                </a>
                            }
                        >
                            <p>{item.desc}</p>
                        </Card>
                    </List.Item>
                )}
            ></List>
        </div>
    )
}

export default ToolView
