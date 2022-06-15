/**
 * 登录页面
 */
import React from 'react'
import '@/style/LoginView.scss'
import { Button, Form, Input, message, Space, Divider } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const LoginView: React.FC = props => {
    const [form] = Form.useForm()

    const onFinish = (value: any) => {
        message.success('Submit success!')
    }

    const onFinishFailed = () => {
        message.error('Submit failed!')
    }

    return (
        <div className="login-view">
            <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <Form.Item>
                    <h2>欢迎登录</h2>
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            type: 'string',
                            min: 2,
                            message: '请输入用户名'
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            type: 'string',
                            min: 6,
                            message: '请输入密码'
                        }
                    ]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
                </Form.Item>
                <Form.Item>
                    <Space direction="vertical" align="end">
                        <Button className="login-button" type="primary">
                            登录
                        </Button>
                        <Space split={<Divider type="vertical" />}>
                            <Link to={'/register'}>还没账号？去注册</Link>
                            <Link to={'/'}>暂不登录</Link>
                        </Space>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginView
