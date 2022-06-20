/**
 * 登录页面
 */
import React, { useEffect, useState } from 'react'
import '@/style/LoginView.scss'
import { Button, Form, Input, message, Space, Divider } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import Api from '@/api'
import { useCookie } from 'react-use'
import { useUpdateAccount } from '@/store'

type LoginFormData = {
    username: string
    password: string
}

const LoginView: React.FC = props => {
    const [form] = Form.useForm<LoginFormData>()
    const [isLoading, setLoading] = useState(false)
    const navigator = useNavigate()
    const [accountCookie, updateAccountCookie, removeAccountCookie] = useCookie('account')
    const setAccount = useUpdateAccount()

    /** 表单校验成功的回调 */
    const onFinish = (value: LoginFormData) => {
        setLoading(true)
        Api.login(value.username, value.password)
            .then(res => {
                updateAccountCookie(JSON.stringify(res.data))
                setAccount(res.data)
                navigator('/', { replace: true })
            })
            .catch((e: Error) => message.error(e.message))
            .finally(() => setLoading(false))
    }

    /** 表单校验失败的回调 */
    const onFinishFailed = (entity: ValidateErrorEntity<LoginFormData>) => {
        message.error('请填写正确的用户名和密码')
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
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" readOnly={isLoading} />
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
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" readOnly={isLoading} />
                </Form.Item>
                <Form.Item>
                    <Space direction="vertical" align="end">
                        <Button className="login-button" type="primary" htmlType="submit" loading={isLoading}>
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
