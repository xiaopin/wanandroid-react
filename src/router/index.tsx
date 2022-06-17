import * as React from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'

type RouteItemConfig = Omit<RouteObject, 'element' | 'children'> & {
    path: string
    component: React.LazyExoticComponent<React.FC<{}>>
    auth?: boolean
    children?: RouteItemConfig[]
}

/**
 * 路由配置表
 */
const routeConfigs: RouteItemConfig[] = [
    {
        path: '/',
        component: React.lazy(() => import('@/components/AppLayout')),
        children: [
            {
                path: '/home',
                component: React.lazy(() => import('@/views/HomeView'))
            },
            {
                path: '/about',
                component: React.lazy(() => import('@/views/AboutView'))
            },
            {
                path: '/project',
                component: React.lazy(() => import('@/views/ProjectView'))
            },
            {
                path: '/navigation',
                component: React.lazy(() => import('@/views/NavigationView'))
            },
            {
                path: '/tool',
                component: React.lazy(() => import('@/views/ToolView'))
            }
        ]
    },
    {
        path: '/login',
        component: React.lazy(() => import('@/views/LoginView'))
    },
    {
        path: '/register',
        component: React.lazy(() => import('@/views/RegisterView'))
    },
    {
        path: '*',
        component: React.lazy(() => import('@/views/404'))
    }
]

/** 根据路由配置表生成对应的路由数据 */
const generateRoutes = (configs: RouteItemConfig[]): RouteObject[] => {
    const routes = configs.map(config => {
        const route: RouteObject = Object.assign({}, config)
        if (config.children !== undefined && config.children.length > 0) {
            route.children = generateRoutes(config.children)
        }
        const ViewComponent = config.component
        route.element = (
            <React.Suspense fallback={<div>Loading...</div>}>
                <ViewComponent />
            </React.Suspense>
        )
        // Remove component property
        delete (route as any)['component']
        return route
    })
    return routes
}

export const AppRouter = () => useRoutes(generateRoutes(routeConfigs))
