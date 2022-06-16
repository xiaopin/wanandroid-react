/**
 * 404页面
 */
import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFoundView: React.FC = props => {
    const navigator = useNavigate()
    return (
        <Result
            status="404"
            title="404"
            subTitle="对不起，你好像走丢了..."
            extra={
                <Button type="primary" onClick={() => navigator('/')}>
                    走，跟我回家！
                </Button>
            }
        />
    )
}

export default NotFoundView
