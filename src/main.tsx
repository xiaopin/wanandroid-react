import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import 'antd/dist/antd.css'
import './style/common/app.scss'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HashRouter>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </HashRouter>
    </React.StrictMode>
)
