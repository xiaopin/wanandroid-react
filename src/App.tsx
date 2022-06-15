import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRouter } from './router'

const App: React.FC = props => {
    const navigator = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            navigator('/home', { replace: true })
        }
    }, [location])

    return <AppRouter></AppRouter>
}

export default App
