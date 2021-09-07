<template>
  <div>
    <a-row type="flex" justify="space-evenly" :gutter="[3, 3]">
      <a-col :span="6">
        <div class="home-left">
          <p class="project-title">项目概况</p>
          <div class="project-overview">
            <a-row>
              <i class="t-icon t-icon-dian"></i>
              <a-col :span="8" :offset="2">电压等级</a-col>
              <span class="verticalLine">|</span>
              <a-col :span="5" :offset="2"><p class="fontColor">IOKV</p></a-col>
            </a-row>
          </div>
          <div class="project-overview">
            <a-row>
              <i class="t-icon t-icon-bianyaqi1-copy"></i>
              <a-col :span="8" :offset="2">装机容量</a-col>
              <span class="verticalLine">|</span>
              <a-col :span="5" :offset="2"><p class="fontColor">IOKV</p></a-col>
            </a-row>
          </div>
          <div class="project-overview">
            <a-row>
              <i class="t-icon t-icon-bianyaqi-copy"></i>
              <a-col :span="8" :offset="2">变压器数量</a-col>
              <span class="verticalLine">|</span>
              <a-col :span="5" :offset="2"><p class="fontColor">IOKV</p></a-col>
            </a-row>
          </div>
        </div>
      </a-col>
      <a-col :span="18">
        <div class="home-right">
          <p class="project-title">用电概况</p>
          <a-row class="home-right-box">
            <a-col :span="7">
              <div class="project-current">
                <a-row class="current-box">
                  <a-col :span="55" :offset="4">
                    <span class="current">
                      <i class="t-icon t-icon-fuhe-copy"></i>
                      当前负荷
                    </span>
                  </a-col>
                </a-row>
                <a-col :span="8" :offset="8" class="current-text fontColor">
                  12333Kwh
                </a-col>
              </div>
            </a-col>
            <a-col :span="8" :offset="1">
              <div class="electric-load">
                <a-row>
                  <i class="t-icon t-icon-rifadianliang-copy"></i>
                  <a-col :span="8" :offset="1">今日用电量</a-col>
                  <span class="verticalLine">|</span>
                  <a-col :span="5" :offset="3">
                    <p class="fontColor">234Kwh</p>
                  </a-col>
                </a-row>
              </div>

              <div class="electric-load">
                <a-row>
                  <i class="t-icon t-icon-rifadianliang-copy"></i>
                  <a-col :span="8" :offset="1">昨日用电量</a-col>
                  <span class="verticalLine">|</span>
                  <a-col :span="5" :offset="3">
                    <p class="fontColor">234Kwh</p>
                  </a-col>
                </a-row>
              </div>

              <div class="electric-maximum">
                <a-row>
                  <i class="t-icon t-icon-fuhe-copy"></i>
                  <a-col :span="8" :offset="1">当月最大负荷</a-col>
                  <span class="verticalLine">|</span>
                  <a-col :span="3" :offset="1">
                    <p class="fontColor">2334Kwh</p>
                  </a-col>
                  <a-col ::span="2" :offset="1">
                    <i class="t-icon t-icon-time-copy"></i>
                  </a-col>
                  <a-col :span="3" :offset="0">
                    <p class="time">发生时间</p>
                  </a-col>
                  <a-col :span="2" :offset="0">
                    <p class="time-color">2021.8.15</p>
                  </a-col>
                </a-row>
              </div>

              <div class="electric-maximum">
                <a-row>
                  <i class="t-icon t-icon-fuhe-copy"></i>
                  <a-col :span="8" :offset="1">当月最大负荷</a-col>
                  <span class="verticalLine">|</span>
                  <a-col :span="3" :offset="1">
                    <p class="fontColor">2334Kwh</p>
                  </a-col>
                  <a-col ::span="2" :offset="1">
                    <i class="t-icon t-icon-time-copy"></i>
                  </a-col>
                  <a-col :span="3" :offset="0">
                    <p class="time">发生时间</p>
                  </a-col>
                  <a-col :span="2" :offset="0">
                    <p class="time-color">2021.8.15</p>
                  </a-col>
                </a-row>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="electric-load">
                <a-row>
                  <i class="t-icon t-icon-yuefadianliang-copy1"></i>
                  <a-col :span="8" :offset="1">当月用电量</a-col>
                  <span class="verticalLine">|</span>
                  <a-col :span="5" :offset="3">
                    <p class="fontColor">2334Kwh</p>
                  </a-col>
                </a-row>
              </div>
              <div class="electric-load">
                <a-row>
                  <i class="t-icon t-icon-yuefadianliang-copy1"></i>
                  <a-col :span="8" :offset="1">上月用电量</a-col>
                  <span class="verticalLine">|</span>
                  <a-col :span="5" :offset="3">
                    <p class="fontColor">2334Kwh</p>
                  </a-col>
                </a-row>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <!-- 用电统计 -->
    <div class="statistics" style=" height: 280px;">
      <a-row>
        <a-col :span="17">
          <p class="project-title">用电统计</p>
        </a-col>
        <a-col :span="3" :offset="3">
          <time-select style="margin-top: 8px;" @time-selected="timeSelected" />
        </a-col>
      </a-row>
      <a-row>
        <div class="survey">
          <div id="myChart"></div>
        </div>
      </a-row>
    </div>

    <!-- 负荷统计 -->
    <div class="statistics"  style=" height: 350px;">
      <a-row>
        <a-col :span="17">
          <p class="project-title">负荷统计</p>
        </a-col>
        <a-col :span="3" :offset="3">
          <time-select style="margin-top: 8px;" @time-selected="timeSelected" />
        </a-col>
      </a-row>
      <a-row>
        <div id="min"></div>
      </a-row>
    </div>
  </div>
</template>
<script>
  import timeSelect from '@/components/TimeSelect'
  import { topData } from '@/api/index/home'
  export default {
    components: {
      timeSelect,
    },
    data() {
      return {}
    },
    mounted() {
      let myChart = this.$root.echarts.init(document.getElementById('myChart'))
      let min = this.$root.echarts.init(document.getElementById('min'))

      // 绘制图表
      myChart.setOption({
        //这里的是采用什么方式触发数据，这里显示的竖轴，跟随鼠标移动到节点上会显示内容
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          x: 60,
          y: 6,
          bottom: 100,
          containLabel: true,
          // x2:-20,
          // y2:-10,
        },

        xAxis: {
          //代表x轴，这里type类型代表字符
          type: 'category',
          boundaryGap: false, //这里表示是否补齐空白
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false, //不显示坐标轴线
          },
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
          //网格属性
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'dashed',
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 36,
          },
        },
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false, //不显示坐标轴线
            },
            //网格样式
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                type: 'dashed',
              },
            },
          },
        ],
        //图表类型，type表示按照什么类型图表显示，line代表折线，下面的内容与
        //legend一一对应
        series: [
          {
            data: [50, 26, 33, 22, 43, 30, 26, 33, 22, 43, 30],
            type: 'line',
            smooth: true, //如果想折线图平滑可以加上这个属性
            showSymbol: true,
            symbolSize: 3,
            symbol: 'circle', //设定为实心点
            hoverAnimation: false,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  color: 'rgba(132, 202, 247,0.2)',
                },
                color: '#21a8f3', //改变区域颜色
              },
            },
          },
        ],
      }),
        // 绘制图表
        min.setOption({
          title: {
            text: '折线图堆叠',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['一号楼', '二号楼'],
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
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 210],
            },
          ],
        })
    },
    methods: {
      timeSelected(type) {
        const obj = {
          year: '年',
          month: '月',
          day: '日',
        }
        this.$message.info('用户点击了' + obj[type])
      },
     async topData() {
            const data = await topData()
            console.log(data,5552);
      }
    },
    created() {
      // this.topData()
    },
  }
</script>

<style scoped lang="less">
  .home-left {
    height: 220px;
    border: 1px solid #ccc;

    .project-overview {
      width: 90%;
      height: 35px;
      margin: 0 auto;
      margin-bottom: 15px;
      line-height: 35px;
      border-radius: 3px;
      text-align: center;
      border: 1px solid #4388fd;
    }
  }

  .home-right {
    height: 220px;
    margin-left: 15px;
    border: 1px solid #ccc;

    .project-current {
      height: 163px;
      margin-top: 4px;
      border: 1px solid #4388fd;
      border-radius: 4px;
      margin-left: 46px;
    }

    .current {
      font-size: 19px;
      font-weight: 800;
      line-height: 79px;
      margin-left: 30px;
      width: 187px;
    }

    .current-text {
      line-height: 79px;
      font-size: 21px;
      text-align: center;
    }

    .current-box {
      background: rgb(159, 222, 247);
      height: 83px;
      overflow: hidden;
    }

    .electric-load {
      border: 1px solid #4388fd;
      height: 35px;
      line-height: 35px;
      width: 90%;
      border-radius: 3px;
      text-align: center;
      margin: 0 auto;
      margin-bottom: 9px;
    }

    .electric-maximum {
      border: 1px solid #4388fd;
      height: 35px;
      line-height: 35px;
      width: 190%;
      margin-left: 19px;
      border-radius: 3px;
      text-align: center;
      margin-bottom: 9px;
      .time-color {
        width: 67px;
        height: 10px;
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #22ad36;
      }
    }
  }

  .statistics {
    border: 1px solid #ccc;
    margin: 15px 0;

    .survey {
      width: 95%;
      height: 270px;
      overflow: hidden;
    }
  }

  .project-title {
    font-weight: bold;
    margin-top: 5px;
    margin-left: 15px;
    font-size: 17px;
  }

  .fontColor {
    color: #3f7eeb;
    font-weight: 800;
  }

  .fontColorq {
    color: #22ad37;
    font-weight: 800;
  }

  .t-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    font-size: 25px;
    margin-top: 5px;
    margin-left: 15px;
  }

  .home-right-box {
    margin-top: -13px;
  }
  .verticalLine {
    color: #ccc;
    font-weight: 400;
    font-size: 2em;
    line-height: 23px;
  }

  .verticalLineq {
    color: #ccc;
    font-weight: 400;
    font-size: 2em;
    line-height: 30px;
    margin-left: 4px;
  }

  .t-icon-time-copy {
    color: #f00;
  }

  #myChart {
    width: 110%;
    height: 300px;
    margin: 0 auto;
  }

  #min {
    width: 95%;
    height: 300px;
    margin: 0 auto;
  }
</style>
