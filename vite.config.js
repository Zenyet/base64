import {defineConfig} from "vite";

export default defineConfig(({command, mode}) => {
    console.log(mode);
    if (mode === 'production') {
        return {
            base: '/base64/', // 服务器的路径，若没设置二级目录之类的就用默认 development 的
            server: {
                port: 8080,
                host: true,
                open: true,
                hmr: true,
            },
            build: {
                sourcemap: false,
            }
        }
    } else if (mode === 'development') {
        return {
            base: './',
            server: {
                port: 8080,
                host: true,
                open: true,
                hmr: true,
            },
            build: {
                sourcemap: true
            }
        }
    }
});