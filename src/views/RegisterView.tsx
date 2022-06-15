/**
 * 注册页面
 */
import React from 'react'
import '@/style/RegisterView.scss'
import { Button, Form, Input, message, Space, Divider, Popover } from 'antd'
import { LockOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import QRCode from '@/assets/weixin_hongyang.jpg'

/** 验证码提示 */
const RegisterCodePopover: React.FC = props => {
    return (
        <Popover
            content={
                <div className="register-code-popover">
                    <img className="wechat-qrcode" src={QRCode} />
                    <h4>微信扫码关注公众号</h4>
                    <div>
                        发送<i>“我爱安卓”</i>
                    </div>
                    <div>即可获取验证码</div>
                </div>
            }
            placement="right"
        >
            <InfoCircleOutlined style={{ color: '#999999' }} />
        </Popover>
    )
}

/** 注册页面 */
const RegisterView: React.FC = props => {
    const [form] = Form.useForm()

    const onFinish = (value: any) => {
        message.success('Submit success!')
    }

    const onFinishFailed = () => {
        message.error('Submit failed!')
    }

    return (
        <div className="register-view">
            <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <Form.Item>
                    <h2>欢迎注册</h2>
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
                <Form.Item
                    name="code"
                    rules={[
                        {
                            required: true,
                            type: 'string',
                            min: 6,
                            max: 6,
                            message: '请输入验证码'
                        }
                    ]}
                >
                    <Input
                        type="password"
                        placeholder="请输入验证码"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        suffix={<RegisterCodePopover />}
                    />
                </Form.Item>
                <Form.Item>
                    <Space direction="vertical" align="end">
                        <Button className="register-button" type="primary">
                            注册
                        </Button>
                        <Space split={<Divider type="vertical" />}>
                            <Link to={'/login'}>已有账号？去登录</Link>
                            <Link to={'/'}>暂不注册</Link>
                        </Space>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterView
