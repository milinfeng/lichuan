<template>
    <div>
        <a-row class="compareContainer" type="flex">
            <!--  左侧模块  -->
            <a-col class="leftPart" :span="5">
                <div class="deviceTitle">
                    设备类型列表
                </div>
                <div class="deviceList">
                    <!--默认设备选中状态-->
                    <a-tree
                            checkable
                            :tree-data="treeData"
                            :default-expanded-keys="['11','12']"
                            :default-selected-keys="['11','12']"
                            :default-checked-keys="['11','12']"
                            :replace-fields="replaceFields"
                            @select="onSelect"
                            @check="onCheck"
                    />
                </div>
            </a-col>

            <!-- 右侧模块 -->
            <a-col class="rightPart" :span="19">
                <a-row class="rightPartBox">
                    <a-col class="topContainer" :span="24">
                        <div class="topTitle">
                            <div class="staticsText">用电对比统计</div>
                            <div id="components-button-demo-button-group">
                                <a-button-group>
                                    <a-button v-for="(item,index) in dateBtn" :key="index"
                                        :class="{activeColor: activeBtn == index}"
                                        @click="handleEcharts(index)"
                                    >
                                        {{item}}
                                    </a-button>
                                </a-button-group>
                            </div>
                        </div>
                        <div id="compareCharts"></div>
                    </a-col>

                    <a-col class="bottomContainer" :span="24">
                        <div class="tableTitle">用电信息列表</div>
                        <a-table :columns="columns" :data-source="tableData">
                            <a slot="name" slot-scope="text">{{ text }}</a>
                        </a-table>
                    </a-col>

                </a-row>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    // todo 设备列表
    const treeData = [
        {
            name: '电表设备列表',
            key: '1',
            child: [
                {
                    name: '电表设备01',
                    key: '11',
                },
                {
                    name: '电表设备02',
                    key: '12',
                },
                {
                    name: '电表设备03',
                    key: '13',
                },
                {
                    name: '电表设备04',
                    key: '14',
                }
            ],
        },
        {
            name: '水表设备列表',
            key: '2',
            child: [
                {
                    name: '电表设备01',
                    key: '20',
                },
                {
                    name: '电表设备02',
                    key: '21',
                },
                {
                    name: '电表设备03',
                    key: '22',
                },
                {
                    name: '电表设备04',
                    key: '23',
                }
            ],
        },
    ];
    // todo 表格数据
    // 表头
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            scopedSlots: { customRender: 'name' },
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 80,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address 1',
            ellipsis: true,
        },
        {
            title: 'Long Column Long Column Long Column',
            dataIndex: 'address',
            key: 'address 2',
            ellipsis: true,
        },
        {
            title: 'haha',
            dataIndex: 'address',
            key: 'address 3',
            ellipsis: true,
        },
        {
            title: 'hehe',
            dataIndex: 'address',
            key: 'address 4',
            ellipsis: true,
        },
    ];
    const tableData = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park, London No. 2 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    export default {
        name: "energyComprasion",
        data() {
            return {
                // deviceList:[],
                treeData,
                replaceFields: {
                    children: 'child',
                    title: 'name',
                },
                activeBtn: 0, // 活跃按钮
                dateBtn: ["日","月","年"], // 时间按钮
                tableData,
                columns,
            }
        },
        watch: {
            checkedKeys(val) {
                console.log('onCheck', val);
            },
        },
        mounted() {
            // this.getDeviceLists()

            // this.handleEcharts()
        },
        methods: {
            getDeviceLists() {

            },
            handleEcharts(index) {
                if(index == "" || index == 0) {
                    this.activeBtn = index
                }else if(index == 1) {
                    this.activeBtn = index
                }if(index == 2) {
                    this.activeBtn = index
                }
                this.loadEcharts();
            },
            // 单选某1项
            onSelect(selectedKeys, info) {
                console.log('selected', selectedKeys, info);
            },
            // 勾选某1项
            onCheck(checkedKeys, info) {
                console.log('onCheck', checkedKeys, info);
            },
            // 加载echarts
            loadEcharts() {
                // 基于准备好的dom，初始化echarts实例
                let dom = document.getElementById("compareCharts");
                let myChart = this.echarts.init(dom);
                // 绘制图表
                myChart.setOption(
                    {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                            },
                        },
                        legend: {
                            top: '5%',
                            right: '5%',
                            data: ['开关柜AH1', '高压柜G2', '高压柜G3', '1#主变', '高压柜G1'],
                        },
                        grid: {
                            top: '15%',
                            left: '3%',
                            right: '4%',
                            bottom: '1%',
                            containLabel: true,
                        },
                        yAxis: {
                            type: 'value',

                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#D2E6F9',
                                    type: 'dashed',
                                },
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#D2E6F9',
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                color: '#000',
                                fontSize: '14',
                            },
                        },
                        xAxis: {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月'],
                            axisLine: {
                                lineStyle: {
                                    color: '#D2E6F9',
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                color: '#666666',
                                fontSize: '14',
                            },
                        },
                        series: [
                            {
                                name: '开关柜AH1',
                                type: 'bar',
                                barWidth: 20,
                                barGap: '40%',
                                data: [18, 23, 29],
                                itemStyle: {
                                    borderRadius: [4, 24, 0, 0],
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 1,
                                        x2: 0,
                                        y2: 0,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: '#8BDCFF', // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: '#4594E8', // 100% 处的颜色
                                            },
                                        ],
                                        global: false, // 缺省为 false
                                    },
                                },
                            },
                            {
                                name: '高压柜G2',
                                type: 'bar',
                                barWidth: 20,
                                barGap: '40%',
                                data: [23, 28, 36],
                                itemStyle: {
                                    borderRadius: [4, 24, 0, 0],
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 1,
                                        x2: 0,
                                        y2: 0,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: '#FFB2B2', // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: '#F45353', // 100% 处的颜色
                                            },
                                        ],
                                        global: false, // 缺省为 false
                                    },
                                },
                            },
                            {
                                name: '高压柜G3',
                                type: 'bar',
                                barWidth: 20,
                                barGap: '40%',
                                data: [26, 32, 20],
                                itemStyle: {
                                    borderRadius: [4, 24, 0, 0],
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 1,
                                        x2: 0,
                                        y2: 0,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: '#59FFB7', // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: '#37BDFF', // 100% 处的颜色
                                            },
                                        ],
                                        global: false, // 缺省为 false
                                    },
                                },
                            },
                            {
                                name: '1#主变',
                                type: 'bar',
                                barWidth: 20,
                                barGap: '40%',
                                data: [18, 23, 29],
                                itemStyle: {
                                    borderRadius: [4, 24, 0, 0],
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 1,
                                        x2: 0,
                                        y2: 0,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: '#5bfff9', // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: '#008d32', // 100% 处的颜色
                                            },
                                        ],
                                        global: false, // 缺省为 false
                                    },
                                },
                            },
                            {
                                name: '高压柜G1',
                                type: 'bar',
                                barWidth: 20,
                                barGap: '40%',
                                data: [18, 23, 29],
                                itemStyle: {
                                    borderRadius: [4, 24, 0, 0],
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 1,
                                        x2: 0,
                                        y2: 0,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: '#feff89', // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: '#ff9a09', // 100% 处的颜色
                                            },
                                        ],
                                        global: false, // 缺省为 false
                                    }
                                }
                            }
                        ]
                    }
                );
            },
        },
    }
</script>

<style lang="less" scoped >
    .compareContainer {
        width: 82vw;
        height: 84vh;
        border: 1px solid #ccc;
        .leftPart {
            padding: 1vh 2vh;
            border-right: 1px solid #ccc;
            .deviceTitle {
                font-size: 20px;
                font-weight: 600;
            }
        }

        .rightPart {
            height: 100%;
            .rightPartBox {
                width: 100%;
                height: 100%;
                .topContainer {
                    height: 50%;
                    padding: 0.5vh;
                    border-bottom: 1px solid #F0F2F5;
                    .topTitle {
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-between;
                        padding: 1vh 2vh;
                        .staticsText {
                            width: 18%;
                            font-size: 22px;
                            font-weight: 600;
                        }
                        #components-button-demo-button-group {
                            width:12%;
                            a-button-group {
                                cursor: pointer;
                            }
                        }
                    }
                    #compareCharts {
                        height: 86%;
                        overflow: hidden;
                    }
                }
                .bottomContainer {
                    height: 50%;
                    .tableTitle {
                        margin:1vh 2vh;
                        font-size: 22px;
                        font-weight: 600;
                    }
                    
                }
            }
        }

        .activeColor {
            color: #fff;
            text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
            background: #1890ff;
            border-color: #1890ff;
            box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
        }

    }
</style>