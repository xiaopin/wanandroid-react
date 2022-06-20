import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCookie } from 'react-use'
import { AppRouter } from './router'
import { useUpdateAccount } from './store'

const App: React.FC = props => {
    const navigator = useNavigate()
    const location = useLocation()
    const [accountCookie, updateAccountCookie, removeAccountCookie] = useCookie('account')
    const setAccount = useUpdateAccount()

    useEffect(() => {
        if (location.pathname === '/') {
            navigator('/home', { replace: true })
        }
    }, [location])

    useEffect(() => {
        if (typeof accountCookie === 'string' && accountCookie.length) {
            const account = JSON.parse(accountCookie)
            setAccount(account)
        }
    }, [])

    return <AppRouter></AppRouter>
}

export default App
