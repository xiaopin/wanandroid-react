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
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button type="primary" onClick={() => navigator('/')}>
                    Back Home
                </Button>
            }
        />
    )
}

export default NotFoundView
