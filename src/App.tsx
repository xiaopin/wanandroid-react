import React from 'react'
import AppLayout from './components/AppLayout'

const App: React.FC = props => {
    return (
        <AppLayout footer={'©️2022 · 版权所有'}>
            <div>插槽内容</div>
        </AppLayout>
    )
}

export default App
