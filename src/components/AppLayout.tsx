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
    TeamOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import { Layout, Menu, Avatar, Space, Divider, BackTop, Modal } from 'antd'
import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { MenuInfo } from 'rc-menu/lib/interface'
import './AppLayout.scss'
import { useAccountState, useAccountValue } from '@/store'
import { useCookie } from 'react-use'

export interface AppLayoutProps {
    children?: React.ReactNode
    header?: React.ReactNode
    footer?: React.ReactNode
}

const items: Array<{
    key: string
    icon: React.FunctionComponentElement<{}>
    label: string
    path: string
}> = [
    { key: '1', icon: React.createElement(HomeOutlined), label: '首页', path: '/home' },
    { key: '2', icon: React.createElement(AppstoreAddOutlined), label: '广场', path: '/square' },
    { key: '3', icon: React.createElement(AimOutlined), label: '导航', path: '/navigation' },
    { key: '4', icon: React.createElement(TeamOutlined), label: '教程', path: '/tutorial' },
    { key: '5', icon: React.createElement(QuestionCircleOutlined), label: '问答', path: '/QA' },
    { key: '6', icon: React.createElement(ClusterOutlined), label: '体系', path: '/series' },
    { key: '7', icon: React.createElement(ProjectOutlined), label: '项目', path: '/project' },
    { key: '8', icon: React.createElement(WechatOutlined), label: '公众号', path: '/public-account' },
    { key: '9', icon: React.createElement(ApartmentOutlined), label: '项目分类', path: '/project-category' },
    { key: '10', icon: React.createElement(ToolOutlined), label: '工具', path: '/tool' }
]

const AppLayout: React.FC<AppLayoutProps> = props => {
    const [selectedMenuKeys, setSelectedMenuKeys] = useState<string[]>(['1'])
    const navigator = useNavigate()
    /** 退出登录的弹窗是否显示 */
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false)
    /** 登录账号数据 */
    const [account, setAccount] = useAccountState()
    /** 清空cookie的方法 */
    const removeCookies: (() => void)[] = [useCookie('account'), useCookie('loginUserName'), useCookie('token_pass'), useCookie('JSESSIONID')].map(
        array => array[2]
    )

    /** 菜单点击的回调 */
    const onHandleMenuClick = (info: MenuInfo) => {
        const { key } = info
        const item = items.find(element => element.key === key)
        if (!item) return
        navigator(item.path, { replace: true })
    }

    /** 退出登录 */
    const onHandleLogout = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        setLogoutModalVisible(false)
        setAccount(undefined)
        removeCookies.forEach(remove => remove())
        navigator('/login')
    }

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
                    {account !== undefined && <div className="username">{account?.nickname || account?.publicName || account?.username}</div>}
                    {account === undefined && (
                        <Space size={8} split={<Divider type="vertical" style={{ backgroundColor: 'white' }} />}>
                            <Link to={'/login'}>登录</Link>
                            <Link to={'/register'}>注册</Link>
                        </Space>
                    )}
                    <div className="logout-button" onClick={() => setLogoutModalVisible(true)}>
                        {account !== undefined && <LogoutOutlined />}
                    </div>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={selectedMenuKeys} items={items} onClick={onHandleMenuClick} />
            </Layout.Sider>
            <Layout className="app-right-layout">
                {props.header && <Layout.Header className="app-layout-header">{props.header}</Layout.Header>}
                <Layout.Content className="app-layout-content">
                    {props.children}
                    <Outlet />
                    <BackTop visibilityHeight={150} style={{ right: '50px', bottom: '40px' }}></BackTop>
                    <Modal
                        title="温馨提示"
                        visible={isLogoutModalVisible}
                        onOk={onHandleLogout}
                        onCancel={() => setLogoutModalVisible(false)}
                        okText="确定"
                        cancelText="取消"
                        centered={true}
                        closable={false}
                        keyboard={false}
                        maskClosable={false}
                    >
                        <p>确定要退出当前账号吗？</p>
                    </Modal>
                </Layout.Content>
                <Layout.Footer className="app-layout-footer">{props.footer ?? '©2022 · All Rights Reserved.'}</Layout.Footer>
            </Layout>
        </Layout>
    )
}

export default AppLayout
