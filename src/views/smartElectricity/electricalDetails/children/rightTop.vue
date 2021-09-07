<template>
    <div class="rightTopContainer">
        <a-row class="topBox">
            <a-col class="topTitle" :span="5">
                <div class="deviceState">
                </div>
                <div class="deviceName">
                    1#主变压器
                </div>
            </a-col>
        </a-row>

        <a-row class="contentBox">
            <a-col :span="8">
                <div class="leftBox">
                    <div class="leftBoxContent">
                        <div class="titlePart">
                            <div class="titleTxt">
                                日累计用电量
                            </div>
                        </div>
                        <div class="dataPart">
                            <div class="dataTxt">
                                <span class="totalPower">52.78</span>
                                <span class="totalUnit">Kwh</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a-col>

            <a-col :span="16">
                <div id="btnGroup">
                    <a-button-group class="btnList">
                        <a-button v-for="(item,index) in dateBtn" :key="index"
                                  :class="{activeColor: activeBtn == index}"
                                  @click="handleEcharts(index)">
                            {{item}}
                        </a-button>
                    </a-button-group>
                </div>
                <div id="totalPowerChart">

                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: 'rightTop',
        props: {},
        data() {
            return {
                activeBtn: 0, // 活跃按钮
                dateBtn: ["日", "月", "年"] // 时间按钮
            }
        },
        computed: {},
        created() {

        },
        mounted() {

        },
        methods: {
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
                            }
                        ]
                    }
                )
            }
        },
        components: {},
    };
</script>

<style scoped lang="less">
    .rightTopContainer {
        margin-bottom: 2vh;
        .topBox {
            padding: 2vh 2vh;
            .topTitle {
                display: flex;
                font-size: 20px;
                font-weight: bold;
                .deviceState {
                    width: 16px;
                    height: 16px;
                    margin:3% 5% 0;
                    background-color: greenyellow;
                    border-radius: 50%;
                }
                .deviceName {

                }
            }
        }
        .contentBox {
            padding: 0vh 2vh;
            .leftBox {
                display: flex;
                flex: 1;
                justify-content: center;
                height: 20vh;
                margin-top: 20%;
                .leftBoxContent {
                    display: flex;
                    flex-direction:column;
                    width: 72%;
                    border: 2px solid #4D8FFD;
                    border-radius: 5px;
                    .titlePart {
                        position:relative;
                        height: 30%;
                        font-size: 22px;
                        font-weight: 500;
                        background: #E4F5FD;
                        .titleTxt {
                            position:absolute;
                            top:50%;
                            left:50%;
                            transform:translate(-50%,-50%)
                        }
                    }
                    .dataPart {
                        position:relative;
                        height: 70%;
                        .dataTxt {
                            position:absolute;
                            top:50%;
                            left:50%;
                            transform:translate(-50%,-50%);
                            .totalPower {
                                margin-right: 20px;
                                font-size:36px;
                                font-weight: 600;
                                color: #2E7AFC;
                            }
                            .totalUnit {
                                font-size:22px;
                            }
                        }
                    }
                }
            }
            #btnGroup {
                .btnList {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 2%;
                }
            }
            #totalPowerChart {
                height: 28vh;
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
</style>
