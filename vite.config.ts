import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@/': `${resolve(__dirname, 'src')}/`
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 全局引入 scss 文件
                additionalData: '@use "./src/style/common/variable.scss" as *;'
            }
        }
    }
})
