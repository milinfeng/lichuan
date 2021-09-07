<template>
  <div>
    <a-row>
      <a-col :span="4" :offset="1">
        <div class="energyOverview-left">
          <p class="energyOverview-pa fs">建筑面积</p>
          <p class="energyOverview-pb fs">12222平方米</p>
        </div>
      </a-col>
      <a-col :span="8" :offset="2">
        <div class="energyOverview-maximum">
          <a-row>
            <i class="t-icon t-icon-dian"></i>
            <a-col :span="7" :offset="1">本月累计用电量</a-col>
            <span class="verticalLine">|</span>
            <a-col :span="3" :offset="1">
              <p class="fontColor">2334Kwh</p>
            </a-col>
            <a-col :span="7" :offset="1">
      <p class="fontColor-comparison"><i class="fontColor-i">↓</i> 2334Kwh(同比)</p>

            </a-col>
          </a-row>
        </div>
        <div class="energyOverview-maximum">
          <a-row>
            <i class="t-icon t-icon-shuiliang-copy"></i>
            <a-col :span="7" :offset="1">本月累计用水量</a-col>
            <span class="verticalLine">|</span>
            <a-col :span="3" :offset="1">
              <p class="fontColor">2334Kwh</p>
            </a-col>
            <a-col :span="7" :offset="1">
              <p class="fontColor-comparison"><i class="fontColor-i">↓</i> 2334Kwh(同比)</p>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :span="7" :offset="0">
        <div class="load-box">
          <div id="PieChart"></div>
        </div>
      </a-col>
    </a-row>

    <div class="statistics">
      <div class="gutter-example">
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="12">
            <div class="gutter-box">
              <div id="loadBox"></div>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <div class="gutter-box">
              <div id="energyConsumption"></div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="consumption-statistics">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="24">
          <div class="gutter-box">
            <div id="consumptionStatistics"></div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  export default {
    props: {},
    data() {
      return {}
    },
    computed: {},
    created() {},
    mounted() {
      let PieChart = this.$root.echarts.init(
        document.getElementById('PieChart')
      )
      let loadBox = this.$root.echarts.init(document.getElementById('loadBox'))
      let consumptionStatistics = this.$root.echarts.init(
        document.getElementById('consumptionStatistics')
      )
      let energyConsumption = this.$root.echarts.init(
        document.getElementById('energyConsumption')
      )
      PieChart.setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
        width: '45%',
        left: '290',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '88%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '21',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: '1号楼' },
              { value: 735, name: '2号楼' },
              { value: 580, name: '3号楼' },
              { value: 484, name: '4号楼' },
              { value: 100, name: '5号楼' },
              { value: 200, name: '6号楼' },
              { value: 300, name: '7号楼' },
              { value: 400, name: '8号楼' },
              { value: 500, name: '9号楼' },
              { value: 600, name: '10号楼' },
            ],
          },
        ],
      }),
        loadBox.setOption({
          title: {
            text: '建筑能耗统计',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999',
              },
            },
          },
          legend: {
            data: ['蒸发量', '降水量', '平均温度'],
          },
          xAxis: [
            {
              type: 'category',
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
              axisPointer: {
                type: 'shadow',
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '水量',
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: '{value} ml',
              },
            },
            {
              type: 'value',
              name: '温度',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value} °C',
              },
            },
          ],
          series: [
            {
              name: '蒸发量',
              type: 'bar',
              data: [
                2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
                3.3,
              ],
            },
            {
              name: '平均温度',
              type: 'line',
              yAxisIndex: 1,
              data: [
                2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0,
                6.2,
              ],
            },
          ],
        }),
        energyConsumption.setOption({
          title: {
            text: '用电能耗排名',
            subtext: '楼栋',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: 'category',
            data: ['1号楼', '3号楼', '2号楼', '4号楼', '5号楼', '6号楼'],
          },
          series: [
            {
              name: '2012年',
              type: 'bar',
              data: [19325, 23438, 31000, 121594, 134141, 681807],
            },
          ],
        }),
        consumptionStatistics.setOption({
          title: {
            text: '能耗统计',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['空间', '动力', '照明', '其它'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [
              '一月',
              '二月',
              '三月',
              '四月',
              '五月',
              '六月',
              '七月',
              '八月',
              '九月',
              '十月',
              '十一月',
              '十二月',
            ],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '空间',
              type: 'line',
              stack: '总量',
              data: [
                120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210,
              ],
            },
            {
              name: '动力',
              type: 'line',
              stack: '总量',
              data: [
                220, 182, 191, 234, 290, 330, 310, 132, 101, 134, 90, 230, 210,
              ],
            },
            {
              name: '照明',
              type: 'line',
              stack: '总量',
              data: [
                150, 232, 201, 154, 190, 330, 410, 132, 101, 134, 90, 230, 210,
              ],
            },
            {
              name: '其它',
              type: 'line',
              stack: '总量',
              data: [
                320, 332, 301, 334, 390, 330, 320, 132, 101, 134, 90, 230, 210,
              ],
            },
          ],
        })
    },
    watch: {},
    methods: {},
    components: {},
  }
</script>

<style scoped lang="less">
  .energyOverview-left {
    display: inline-block;
    width: 200px;
    height: 100px;
    border-radius: 9px;
    background: #2e7bfd;
    text-align: center;
    line-height: 30px;
    font-weight: 800;
    color: #fff;

    .energyOverview-pa {
      margin-top: 12px;
    }
  }

  .gutter-box {
    border: 1px solid #ccc;
    padding: 24px;
    margin: 15px 0;
    border-radius: 4px;
    overflow: hidden;
  }

  .energyOverview-maximum {
    border: 1px solid #4388fd;
    height: 35px;
    line-height: 35px;
    width: 100%;
    border-radius: 3px;
    text-align: center;
    margin: 0 22px;
    margin-bottom: 25px;
  }

  .t-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    font-size: 25px;
    margin-top: 5px;
    margin-left: 15px;
  }

  .verticalLine {
    color: #ccc;
    font-weight: 400;
    font-size: 2em;
    line-height: 23px;
  }

  .current {
    color: #3f7eeb;
    font-weight: 800;
  }

  .fontColor {
    color: rgb(55, 120, 236);
    font-weight: 800;
  }

  .fontColor-comparison {
    color: rgb(39, 174, 60);
    font-weight: 800;
  }

  .fontColor-i {
    font-size: 20px;
  }



  #loadBox {
    width: 600px;
    height: 300px;
    margin: 0 auto;
  }

  #energyConsumption {
    width: 600px;
    height: 300px;
    margin: 0 auto;

  }

  #consumptionStatistics {
    width: 1300px;
    height: 300px;
    margin: 0 auto;

  }

  #PieChart {
    width: 450px;
    height: 100px;
    margin: 0 auto;
  }

   
</style>
