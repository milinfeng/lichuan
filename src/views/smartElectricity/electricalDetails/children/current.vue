<template>
    <div>
        <div id="dataInfo" style="display: flex;width: 100%;margin-bottom: 2vh;">
            <div style="display: flex;flex: 1;justify-content: center;height: 15vh;">
                <div style="display: flex;flex-direction:column;width: 72%;border: 2px solid #4D8FFD;border-radius: 5px;
">
                    <div style="position:relative;height: 30%;font-size: 22px;font-weight: 600;background: #E4F5FD;">
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
                            实时值
                        </div>
                    </div>
                    <div style="position:relative;height: 70%;font-size:26px;font-weight: 600;color: #2E7AFC;">
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
                            <span>52.78</span>
                            <span>A</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;flex: 1;justify-content: center;height: 15vh;">
                <div style="display: flex;flex-direction:column;width: 72%;border: 2px solid #4D8FFD;border-radius: 5px;
">
                    <div style="position:relative;height: 30%;font-size: 22px;font-weight: 600;background: #E4F5FD;">
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
                            平均值
                        </div>
                    </div>
                    <div style="position:relative;height: 70%;font-size:26px;font-weight: 600;color: #2E7AFC;">
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
                            <span>2.34</span>
                            <span>A</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;flex: 1;justify-content: center;height: 15vh;">
                <div style="display: flex;flex-direction:column;width: 72%;border: 2px solid #4D8FFD;border-radius: 5px;
">
                    <div style="position:relative;height: 30%;font-size: 22px;font-weight: 600;background: #E4F5FD;">
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
                            最大值
                        </div>
                    </div>
                    <div style="display:flex;height: 70%;">
                        <div style="width: 40%;border-right: 2px solid #D6D6D6;">
                            <div style="position: relative;height: 50%;">
                                <p style="position:absolute;top:50%;left:50%;font-size: 20px;transform:translate(-50%,-50%);">
                                    数值
                                </p>
                            </div>
                            <div style="position: relative;height: 50%;">
                                <p style="position:absolute;top:50%;left:50%;font-size: 20px;transform:translate(-50%,-50%);">
                                    时间
                                </p>
                            </div>
                        </div>
                        <div style="flex: 1;">
                            <div style="position: relative;height: 50%;">
                                <p style="position:absolute;top:50%;left:50%;font-size:26px;font-weight: 600;color: #2E7AFC;transform:translate(-50%,-50%);">
                                    <span>3.73</span>
                                    <span>A</span>
                                </p>
                            </div>
                            <div style="position: relative;height: 50%;">
                                <p style="position:absolute;top:50%;left:50%;font-size:26px;font-weight: 600;color: #2E7AFC;transform:translate(-50%,-50%);">
                                    2021.8.14
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;flex: 1;justify-content: center;height: 15vh;">
                <div style="display: flex;flex-direction:column;width: 72%;border: 2px solid #4D8FFD;border-radius: 5px;
">
                    <div style="position:relative;height: 30%;font-size: 22px;font-weight: 600;background: #E4F5FD;">
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
                            最小值
                        </div>
                    </div>
                    <div style="display:flex;height: 70%;">
                        <div style="width: 40%;border-right: 2px solid #D6D6D6;">
                            <div style="position: relative;height: 50%;">
                                <p style="position:absolute;top:50%;left:50%;font-size: 20px;transform:translate(-50%,-50%);">
                                    数值
                                </p>
                            </div>
                            <div style="position: relative;height: 50%;">
                                <p style="position:absolute;top:50%;left:50%;font-size: 20px;transform:translate(-50%,-50%);">
                                    时间
                                </p>
                            </div>
                        </div>
                        <div style="flex: 1;">
                            <div style="position: relative;height: 50%;">
                                <p style="position:absolute;top:50%;left:50%;font-size:26px;font-weight: 600;color: #2E7AFC;transform:translate(-50%,-50%);">
                                    1.77
                                </p>
                            </div>
                            <div style="position: relative;height: 50%;">
                                <p style="position:absolute;top:50%;left:50%;font-size:26px;font-weight: 600;color: #2E7AFC;transform:translate(-50%,-50%);">
                                    23.14
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="dataFigure" style="height: 35vh;">

        </div>
    </div>
</template>

<script>
    export default {
        name:"current",
        data() {
            return {

            };
        },
        created() {

        },
        mounted() {
            // this.handleEcharts();
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
                let dom = document.getElementById("dataFigure");
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
                                name: '电流曲线',
                                type: 'line',
                                smooth: true, //是否平滑
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 5,
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

        },
    };
</script>

<style scoped lang="less">
    #tableInfo h4 {
        margin-bottom: 16px;
    }
</style>