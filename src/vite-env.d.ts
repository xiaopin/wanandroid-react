/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** 接口地址 */
    readonly VITE_API_URL: string
    /** 超时时间 */
    readonly VITE_API_TIMEOUT: number
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
