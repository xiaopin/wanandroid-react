/**
 * 数据加载完毕的底部提示组件
 */
import { Col, Row } from 'antd'
import React from 'react'

const BottomedOut: React.FC = props => {
    return (
        <Row>
            <Col span={24} style={{ textAlign: 'center', color: '#999999', fontSize: '12px', padding: '10px 0' }}>
                ~~已经到底了~~
            </Col>
        </Row>
    )
}

export default BottomedOut
