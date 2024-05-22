import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
const APP_NAME = require('./package.json').name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('flow-graph', {
      useDevMode: true
    })
  ],
  server: {
    // 监听端口
    port: 9999,
    // 关闭主机检查，使微应用可以被 fetch
    disableHostCheck: true,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*', // 主应用获取子应用时跨域响应头
    },
    cors: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: "esnext",
    lib: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      name: `${APP_NAME}-[name]`,
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      formats: ["umd"],
      entry: path.resolve(__dirname, "src/main.js"),
      // // 按需加载相关，设置为 webpackJsonp_微应用名称 即可
      // jsonpFunction: `webpackJsonp_${APP_NAME}`,
    }
  },
})
