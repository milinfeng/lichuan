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
                    <a-tree show-line
                            :default-expanded-keys="['0']"
                            :default-selected-keys="['01']"
                            @select="onSelect">

                        <a-tree-node :key="item.key" :title="item.title" v-for="(item,index) in treeData">
                            <a-tree-node key="01" title="电表设备01"/>
                            <a-tree-node key="02" title="电表设备02"/>
                            <a-tree-node key="03" title="电表设备03"/>
                        </a-tree-node>
                        <!--<a-tree-node key="0" title="电表设备列表">-->
                            <!--<a-tree-node key="01" title="电表设备01"/>-->
                            <!--<a-tree-node key="02" title="电表设备02"/>-->
                            <!--<a-tree-node key="03" title="电表设备03"/>-->
                        <!--</a-tree-node>-->
                        <!--<a-tree-node key="1" title="水表设备列表">-->
                            <!--<a-tree-node key="10" title="水表设备01"/>-->
                            <!--<a-tree-node key="11" title="水表设备02"/>-->
                        <!--</a-tree-node>-->
                        <!--<a-tree-node key="2" title="其它设备">-->
                            <!--<a-tree-node key="20" title="水表设备01"/>-->
                            <!--<a-tree-node key="21" title="水表设备02"/>-->
                        <!--</a-tree-node>-->
                    </a-tree>
                </div>
            </a-col>

            <!-- 右侧模块 -->
            <a-col class="rightPart" :span="19">
                <div style="margin-bottom: 2vh;">
                    <a-row class="topTitle" style="padding: 2vh 2vh">
                        <a-col :span="5" style="display: flex;font-size: 20px;font-weight: bold;">
                            <div class="deviceState"
                                 style="width: 16px;height: 16px;margin:3% 5% 0;background-color: greenyellow;border-radius: 50%;">
                            </div>
                            <div class="deviceName">
                                1#主变压器
                            </div>
                        </a-col>
                    </a-row>
                    <a-row class="topContent" style="padding: 0vh 2vh">
                        <a-col :span="8">
                            <div style="display: flex;flex: 1;justify-content: center;height: 20vh;margin-top: 20%;">
                                <div style="display: flex;flex-direction:column;width: 72%;border: 2px solid #4D8FFD;border-radius: 5px;">
                                    <div style="position:relative;height: 30%;font-size: 22px;font-weight: 500;background: #E4F5FD;">
                                        <div class=""
                                             style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
                                            日累计用电量
                                        </div>
                                    </div>
                                    <div style="position:relative;height: 70%;">
                                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
                                            <span style="font-size:36px;font-weight: 600;margin-right: 20px;color: #2E7AFC;">52.78</span>
                                            <span style="font-size:22px;">Kwh</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="16">
                            <div id="components-button-demo-button-group">
                                <a-button-group style="display: flex;justify-content: flex-end;margin-bottom: 2%;">
                                    <a-button v-for="(item,index) in dateBtn" :key="index"
                                              :class="{activeColor: activeBtn == index}"
                                              @click="handleEcharts(index)">
                                        {{item}}
                                    </a-button>
                                </a-button-group>
                            </div>
                            <div id="totalPowerChart" style="height: 28vh;">

                            </div>
                        </a-col>
                    </a-row>
                </div>

                <div style="border: 1px solid #f2f2f2">
                    <a-row>
                        <a-col :span="24">
                            <div>
                                <a-tabs type="card" @change="callback">
                                    <a-tab-pane key="1" tab="电流">
                                        <current-comp></current-comp>
                                    </a-tab-pane>
                                    <a-tab-pane key="2" tab="电压">
                                        电压
                                    </a-tab-pane>
                                    <a-tab-pane key="3" tab="有功功率">
                                        有功功率
                                    </a-tab-pane>
                                    <a-tab-pane key="4" tab="功率因素">
                                        功率因素
                                    </a-tab-pane>
                                </a-tabs>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    const treeData = [
        {
            title: '0-0',
            key: '0-0',
            children: [
                {
                    title: '0-0-0',
                    key: '0-0-0'
                },
                {
                    title: '0-0-1',
                    key: '0-0-1'
                },
            ],
        },
    ];

    import currentComp from './children/current'
    export default {
        name: "energyComparison",
        components: {
            currentComp
        },
        data() {
            return {
                // deviceList:[],
                activeBtn: 0, // 活跃按钮
                dateBtn: ["日", "月", "年"], // 时间按钮
            }
        },
        watch: {
            checkedKeys(val) {
                console.log('onCheck', val);
            },
        },
        mounted() {
            // this.getDeviceLists()
            // this.handleEcharts();
        },
        methods: {
            getDeviceLists() {

            },
            handleEcharts(index) {
                if (index == "" || index == 0) {
                    this.activeBtn = index
                } else if (index == 1) {
                    this.activeBtn = index
                }
                if (index == 2) {
                    this.activeBtn = index
                }
                this.loadEcharts();
            },
            loadEcharts() {
                // 基于准备好的dom，初始化echarts实例
                let dom = document.getElementById("totalPowerChart");
                let myChart = this.echarts.init(dom);
                // 绘制图表
                myChart.setOption(
                    {
                        backgroundColor: '#fff',
                        tooltip: {
                            trigger: 'axis',
                        },
                        grid: {
                            top: '15%',
                            left: '10%',
                            right: '5%',
                            bottom: '8%',
                            // containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                color: '#59588D',
                                axisLine: {
                                    show: true,
                                },
                                axisLabel: {
                                    color: '#282828',
                                },
                                splitLine: {
                                    // show: true
                                },

                                axisTick: {
                                    show: false,
                                },
                                // boundaryGap: true,
                                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            },
                        ],

                        yAxis: [
                            {
                                type: 'value',
                                name: '用电统计',
                                nameTextStyle: {
                                    color: '#737373',
                                    align: 'right',
                                    lineHeight: 10,
                                },
                                // min: 0,
                                splitNumber: 4,
                                splitLine: {
                                    show: true,
                                },
                                axisLine: {
                                    show: true,
                                },
                                axisLabel: {
                                    show: true,
                                    // margin: 20,
                                    textStyle: {
                                        color: '#737373',
                                    },
                                },
                                axisTick: {
                                    show: false,
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: 'rgba(131,101,101,0.2)',
                                        type: 'dashed',
                                    },
                                },
                            },
                        ],
                        series: [
                            {
                                name: '',
                                type: 'line',
                                // smooth: true, //是否平滑
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: '#48B3FF',
                                    },
                                },
                                label: {
                                    show: false,
                                    position: 'top',
                                    textStyle: {
                                        color: '#48B3FF',
                                    },
                                },

                                itemStyle: {
                                    color: '#FFF',
                                    borderColor: '#48B3FF',
                                    borderWidth: 2,
                                },
                                tooltip: {
                                    show: true,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new this.echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: 'rgba(195,230,255,1)',
                                                },
                                                {
                                                    offset: 1,
                                                    color: 'rgba(195,230,255,0.1)',
                                                },
                                            ],
                                            false
                                        ),
                                        shadowColor: 'rgba(195,230,255,0.1)',
                                        shadowBlur: 20,
                                    },
                                },
                                data: [55, 35, 62, 55, 97, 64, 44, 66, 78, 82, 33, 77],
                            },
                        ],
                    }
                );
            },


            // 单选某1项
            onSelect(selectedKeys, info) {
                console.log('selected', selectedKeys, info);
            },
            callback(key) {
                console.log(key);
            },
        },
    }
</script>

<style lang="less" scoped>
    .compareContainer {
        width: 82vw;
        min-height: 84vh;
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
            padding: 1vh 1.5vh;
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