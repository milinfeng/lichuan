<template>
    <div>
        <div id="tableInfo" style="display: flex;width: 100%;">
            <div style="display: flex;flex: 1;justify-content: center;height: 20vh;">
                <div style="display: flex;flex-direction:column;width: 72%;border: 2px solid #4D8FFD;border-radius: 5px;
">
                    <div style="position:relative;height: 30%;font-size: 24px;font-weight: 500;background: #E4F5FD;">
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
                            平均值
                        </div>
                    </div>
                    <div style="position:relative;height: 70%;font-size:36px;font-weight: 600;color: #2E7AFC;">
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
                            52.78
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;flex: 1;justify-content: center;height: 20vh;">
                <div style="display: flex;flex-direction:column;width: 72%;border: 2px solid #4D8FFD;border-radius: 5px;
">
                    <div style="position:relative;height: 30%;font-size: 24px;font-weight: 500;background: #E4F5FD;">
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
                                <p style="position:absolute;top:50%;left:50%;font-size:36px;font-weight: 600;color: #2E7AFC;transform:translate(-50%,-50%);">
                                    1.77
                                </p>
                            </div>
                            <div style="position: relative;height: 50%;">
                                <p style="position:absolute;top:50%;left:50%;font-size:36px;font-weight: 600;color: #2E7AFC;transform:translate(-50%,-50%);">
                                    23.14
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;flex: 1;justify-content: center;height: 20vh;">
                <div style="display: flex;flex-direction:column;width: 72%;border: 2px solid #4D8FFD;border-radius: 5px;
">
                    <div style="position:relative;height: 30%;font-size: 24px;font-weight: 500;background: #E4F5FD;">
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
                                <p style="position:absolute;top:50%;left:50%;font-size:36px;font-weight: 600;color: #2E7AFC;transform:translate(-50%,-50%);">
                                    1.77
                                </p>
                            </div>
                            <div style="position: relative;height: 50%;">
                                <p style="position:absolute;top:50%;left:50%;font-size:36px;font-weight: 600;color: #2E7AFC;transform:translate(-50%,-50%);">
                                    23.14
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <a-row class="tabTitle" style="padding: 3vh 2vh 1vh;">
                <a-col :span="5" style="font-size: 20px;font-weight: bold;">电能质量监测</a-col>
            </a-row>
            <div id="compareCharts" style="height: 44vh;overflow: hidden;"></div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "monitor",
        props: {},
        data() {
            return {

                myChart: null
            };
        },
        computed: {},
        created() {
        },
        mounted() {
            // this.loadEcharts();
        },
        watch: {},
        methods: {
            // 加载echarts
            loadEcharts() {
                // 基于准备好的dom，初始化echarts实例
                if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
                    this.myChart.dispose();
                }

                this.myChart = this.echarts.init(document.getElementById('compareCharts'));
                // 绘制图表
                this.myChart.setOption(
                    {
                        backgroundColor: '#FCFCFC',
                        // backgroundColor: '#12193a',
                        color: ['#f0c725', '#16f892'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                // 坐标轴指示器，坐标轴触发有效
                                type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                            },
                        },
                        legend: {
                            x: 'center',
                            top: '25',
                            textStyle: {
                                color: '#000',
                                fontSize: 14,
                            },
                        },
                        grid: {
                            left: '6%',
                            right: '4%',
                            top: '20%',
                            bottom: '8%',
                            containLabel: true,
                        },
                        toolbox: {
                            show: true,
                            orient: 'vertical',
                            x: 'right',
                            y: 'center',
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: ['1月', '2月', '3月', '4月'],
                                axisLine: {
                                    lineStyle: {
                                        color: 'rgba(240,199,37,0.5)',
                                    },
                                },
                                axisLabel: {
                                    interval: 0,
                                    color: '#000',
                                    fontSize: '15',
                                },
                            },
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '单位(%)',
                                nameTextStyle: {
                                    color: '#000',
                                    align: 'right',
                                    lineHeight: 10,
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: 'rgba(240,199,37,0.5)',
                                    },
                                },
                                axisLabel: {
                                    interval: 0,
                                    color: '#000',
                                    fontSize: '15',
                                },
                                splitLine: {
                                    show: false,
                                },
                            },
                        ],
                        series: [
                            {
                                name: 'A相',
                                type: 'line',
                                smooth: true,
                                symbolSize: 8,
                                data: [127, 224, 120, 278, 227, 237],
                                barWidth: '30%',
                                itemStyle: {
                                    normal: {
                                        color: '#f0c725',
                                    },
                                },
                            },
                            {
                                name: 'B相',
                                type: 'line',
                                smooth: true,
                                symbolSize: 8,
                                data: [27, 124, 70, 178, 127, 157],
                                barWidth: '30%',
                                itemStyle: {
                                    normal: {
                                        color: '#0BE3FF',
                                    },
                                },
                            },
                            {
                                name: 'C相',
                                type: 'line',
                                smooth: true,
                                symbolSize: 8,
                                data: [127, 74, 120, 99, 130, 355],
                                barWidth: '30%',
                                itemStyle: {
                                    normal: {
                                        color: '#16f892',
                                    },
                                },
                            },
                        ],
                    }
                );
            },
        },
        components: {},
    };
</script>

<style scoped lang="less">
    #tableInfo h4 {
        margin-bottom: 16px;
    }
</style>
