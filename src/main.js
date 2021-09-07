import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import '@/vab'
import '../public/iconfont-weapp-icon.css'
import * as echarts from 'echarts';
import './style/index.less'

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('@/utils/static')
//   mockXHR()
// }

import axios from 'axios'

let app = createApp(App)

app.config.globalProperties.$axios = axios
app.config.globalProperties.echarts = echarts;
app.use(store).use(router).use(Antd).mount('#app')
// createApp(App).use(store).use(router).use(Antd).mount('#app')
