<template>
  <div>
    <a-row class="compareContainer" type="flex">
      <!--  左侧模块  -->
      <a-col class="leftPart" :span="5">
        <device-comp @selectedDevice="selectedDevice"></device-comp>
      </a-col>

      <!-- 右侧模块 -->
      <a-col class="rightPart" :span="19">
        <!--右上-->
        <right-top-comp></right-top-comp>

        <!--右下-->
        <div style="border: 1px solid #f2f2f2">
          <a-row>
            <a-col :span="24">
              <div style="position: relative">
                <div style="position: absolute; top: 1%; right: 5%">
                  <div id="components-button-demo-button-group1">
                    <a-button-group
                      style="
                        display: flex;
                        justify-content: flex-end;
                        margin-bottom: 2%;
                      "
                    >
                      <a-button
                        v-for="(item, index) in handleEcharts"
                        :key="index"
                        :class="{ activeColor: activeBtn == index }"
                        @click="handleEcharts(index)"
                      >
                        {{ item }}
                      </a-button>
                    </a-button-group>
                  </div>
                </div>
                <a-tabs type="card" @change="callback">
                  <a-tab-pane key="1" tab="电流">
                    <current-comp></current-comp>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="电压">电压</a-tab-pane>
                  <a-tab-pane key="3" tab="有功功率">有功功率</a-tab-pane>
                  <a-tab-pane key="4" tab="功率因素">功率因素</a-tab-pane>
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
  import { toRaw } from '@vue/reactivity'

  import deviceComp from './children/deviceList'
  import rightTopComp from './children/rightTop'

  import currentComp from './children/current'

  export default {
    name: 'energyComparison',
    components: {
      deviceComp,
      rightTopComp,
      currentComp,
    },
    data() {
      return {
        deviceId: 0,
        activeBtn: 0, // 活跃按钮
        handleEcharts: ['日', '月', '年'], // 时间按钮
      }
    },
    mounted() {
      // this.handleEcharts()
    },
    methods: {
      handleEcharts(index) {
        if (index == '' || index == 0) {
          this.activeBtn = index
        } else if (index == 1) {
          this.activeBtn = index
        }
        if (index == 2) {
          this.activeBtn = index
        }
        this.loadEcharts();
      },
      selectedDevice(res) {
        if (res.code == 0) {
          this.deviceId = res.id
          console.log(this.deviceId)
        } else {
          const val = toRaw(res.id)
          console.log(val)
        }
      },

      loadEcharts() {
        // 基于准备好的dom，初始化echarts实例
        let dom = document.getElementById('totalPowerChart')
        let myChart = this.echarts.init(dom)
        // 绘制图表
        myChart.setOption({
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
              data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
              ],
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
        })
      },

      // 单选卡
      callback(key) {
        console.log(key)
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
