import {
    UserOutlined,
    HomeOutlined,
    AimOutlined,
    AppstoreAddOutlined,
    QuestionCircleOutlined,
    ToolOutlined,
    WechatOutlined,
    ApartmentOutlined,
    ProjectOutlined,
    ClusterOutlined,
    TeamOutlined
} from '@ant-design/icons'
import { Layout, Menu, Avatar } from 'antd'
import React, { useState } from 'react'
import './AppLayout.scss'

export interface AppLayoutProps {
    children?: React.ReactNode
    header?: React.ReactNode
    footer?: React.ReactNode
}

const items: Array<{
    key: string
    icon: React.FunctionComponentElement<{}>
    label: string
}> = [
    { key: '1', icon: React.createElement(HomeOutlined), label: '首页' },
    { key: '2', icon: React.createElement(AppstoreAddOutlined), label: '广场' },
    { key: '3', icon: React.createElement(AimOutlined), label: '导航' },
    { key: '4', icon: React.createElement(TeamOutlined), label: '教程' },
    { key: '5', icon: React.createElement(QuestionCircleOutlined), label: '问答' },
    { key: '6', icon: React.createElement(ClusterOutlined), label: '体系' },
    { key: '7', icon: React.createElement(ProjectOutlined), label: '项目' },
    { key: '8', icon: React.createElement(WechatOutlined), label: '公众号' },
    { key: '9', icon: React.createElement(ApartmentOutlined), label: '项目分类' },
    { key: '10', icon: React.createElement(ToolOutlined), label: '工具' }
]

const AppLayout: React.FC<AppLayoutProps> = props => {
    const [selectedMenuKeys, setSelectedMenuKeys] = useState<string[]>(['1'])

    return (
        <Layout hasSider className="app-layout">
            <Layout.Sider
                className="app-layout-sider"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0
                }}
            >
                <div className="user">
                    <Avatar size={80} icon={<UserOutlined />} />
                    <div className="username">
                        <span>登录</span>
                        <span>注册</span>
                    </div>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={selectedMenuKeys} items={items} />
            </Layout.Sider>
            <Layout className="app-right-layout">
                {props.header && <Layout.Header className="app-layout-header">{props.header}</Layout.Header>}
                <Layout.Content className="app-layout-content">{props.children}</Layout.Content>
                <Layout.Footer className="app-layout-footer">{props.footer ?? '©2022 · All Rights Reserved.'}</Layout.Footer>
            </Layout>
        </Layout>
    )
}

export default AppLayout
