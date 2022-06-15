import { Button } from 'antd'
import React, { lazy } from 'react'
import { Routes, Route, useNavigate, useRoutes } from 'react-router-dom'
import AppLayout from '@/components/AppLayout'
import AboutView from '@/views/AboutView'
import HomeView from '@/views/HomeView'
import NotFoundView from '@/views/404'

const App: React.FC = props => {
    const navigator = useNavigate()

    return (
        <AppLayout>
            <div>
                <Button type="link" onClick={() => navigator('/')}>
                    Home
                </Button>
                <Button type="link" onClick={() => navigator('/about')}>
                    About
                </Button>
            </div>
            <Routes>
                <Route path="/" element={<HomeView />}></Route>
                <Route path="/about" element={<AboutView />}></Route>
                <Route path="*" element={<NotFoundView />}></Route>
            </Routes>
        </AppLayout>
    )
}

export default App
