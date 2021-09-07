import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/login',
    component: () =>
        import('@/views/login'),
    hidden: true,
},
{
    path: '/403',
    name: '403',
    component: () =>
        import('@/views/403'),
    hidden: true,
},
{
    path: '/404',
    name: '404',
    component: () =>
        import('@/views/404'),
    hidden: true,
},
]
export const asyncRoutes = [{
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
        title: '首页',
        icon: 'home-4-line',
        affix: true,
    },
    children: [{
        path: 'index',
        name: 'Index',
        component: () =>
            import('@/views/index'),
        meta: {
            title: '首页',
            icon: 'home-4-line',
            affix: true,
        },
    },],
},
{
    path: '/powerVisualization',
    component: Layout,
    redirect: '/powerVisualization/threeDimensional',
    alwaysShow: true,
    meta: {
        title: '电力可视化',
        icon: 'node-tree',
    },
    children: [{
        path: 'threeDimensional',
        name: 'threeDimensional',
        component: () =>
            import('@/views/powerVisualization/threeDimensional'),
        meta: {
            title: '三维可视化',
            icon: 'live-line',
        },
    },
    {
        path: 'relayDiagram',
        name: 'relayDiagram',
        component: () =>
            import('@/views/powerVisualization/relayDiagram'),
        meta: {
            title: '一次电力接线图',
            icon: 'mind-map',
        },
    },
    ],
},
{
    path: '/smartElectricity',
    component: Layout,
    redirect: '/smartElectricity/transformer',
    alwaysShow: true,
    meta: {
        title: '智慧用电',
        icon: 'messenger-line',
    },
    children: [{
        path: 'transformer',
        name: 'transformer',
        component: () =>
            import('@/views/smartElectricity/transformer'),
        meta: {
            title: '变压器运行监测',
            icon: 'dvd-line',
        },
    },
    {
        path: 'electricalDetails',
        name: 'electricalDetails',
        component: () =>
            import('@/views/smartElectricity/electricalDetails'),
        meta: {
            title: '用电详情监测',
            icon: 'flashlight-line',
        },
    },
    {
        path: 'PowerQuality',
        name: 'PowerQuality',
        component: () =>
            import('@/views/smartElectricity/PowerQuality'),
        meta: {
            title: '电能质量监测',
            icon: 'increase-decrease-line',
        },
    },
    ],
},
{
    path: '/energyAnalysis',
    component: Layout,
    redirect: '/energyAnalysis/energyOverview',
    alwaysShow: true,
    meta: {
        title: '能耗分析',
        icon: 'pie-chart-box-line',
        // icon: 'apps-line',
    },
    children: [{
        path: 'energyOverview',
        name: 'energyOverview',
        component: () =>
            import('@/views/energyAnalysis/energyOverview'),
        meta: {
            title: '能耗总览',
            icon: 'line-chart-fill',
        },
    },
    {
        path: 'energyComparison',
        name: 'energyComparison',
        component: () =>
            import('@/views/energyAnalysis/energyComparison'),
        meta: {
            title: '用能对比分析',
            icon: 'pie-chart-2-line',
        },
    },
    ],
},
{
    path: '/reportForm',
    component: Layout,
    redirect: '/reportForm/projectReport',
    alwaysShow: true,
    meta: {
        title: '报表',
        icon: 'list-check',
    },
    children: [{
        path: 'projectReport',
        name: 'projectReport',
        component: () =>
            import('@/views/reportForm/projectReport'),
        meta: {
            title: '项目用能报表',
            icon: 'table-2',
        },
    },
    {
        path: 'mainStatements',
        name: 'mainStatements',
        component: () =>
            import('@/views/reportForm/mainStatements'),
        meta: {
            title: '主要进线用能报表',
            icon: 'table-line',
        },
    },
    {
        path: 'customReport',
        name: 'customReport',
        component: () =>
            import('@/views/reportForm/customReport'),
        meta: {
            title: '自定义用能报表',
            icon: 'table-alt-line',
        },
    },
    ],
},
{
    path: 'alarmInformation',
    component: Layout,
    redirect: '/alarmInformation',
    meta: {
        title: '告警信息',
        icon: 'home-4-line',
        affix: true,
    },
    children: [{
        path: 'alarmInformation',
        name: 'alarmInformation',
        component: () =>
            import('@/views/alarmInformation'),
        meta: {
            title: '告警信息',
            icon: 'alarm-warning-line',
            affix: true,
        },
    },],
},
{
    path: 'systemConfiguration',
    component: Layout,
    redirect: '/systemConfiguration',
    meta: {
        title: '告警信息',
        icon: 'home-4-line',
        affix: true,
    },
    children: [{
        path: 'systemConfiguration',
        name: 'systemConfiguration',
        component: () =>
            import('@/views/systemConfiguration'),
        meta: {
            title: '系统配置',
            icon: 'windows-line',
            affix: true,
        },
    },],
},
{
    path: '/error',
    name: 'Error',
    component: Layout,
    redirect: '/error/403',
    meta: {
        title: '错误页',
        icon: 'error-warning-line',
    },
    children: [{
        path: '403',
        name: 'Error403',
        component: () =>
            import('@/views/403'),
        meta: {
            title: '403',
            icon: 'error-warning-line',
        },
    },
    {
        path: '404',
        name: 'Error404',
        component: () =>
            import('@/views/404'),
        meta: {
            title: '404',
            icon: 'error-warning-line',
        },
    },
    ],
},
{
    path: '/vab',
    component: Layout,
    redirect: '/vab/table',
    alwaysShow: true,
    meta: {
        title: '组件',
        icon: 'apps-line',
    },
    children: [
        {
            path: 'table',
            name: 'Table',
            component: () => import('@/views/vab/table'),
            meta: {
                title: '表格',
                icon: 'table-2',
            },
        },
        {
            path: 'icon',
            name: 'Icon',
            component: () => import('@/views/vab/icon'),
            meta: {
                title: '图标',
                icon: 'remixicon-line',
            },
        },
    ],
},
{
    path: '/*',
    redirect: '/404',
    hidden: true,
},
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
})

export default router