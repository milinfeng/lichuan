<template>
  <div>
    <div class="electricalDetails-top">
      <a-row>
        <a-col :span="8">
          <span>请选择变压器</span>
          <a-select
            show-search
            placeholder="Select a person"
            option-filter-prop="children"
            style="width: 200px"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
          >
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="tom">Tom</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5" :offset="21">
          <div class="electricalDetails-selected">
            <time-select @time-selected="timeSelected" />
          </div>
        </a-col>
      </a-row>
      <a-divider />
      <a-row type="flex" justify="space-around">
        <a-col :span="4">
          <div class="flex-box">
            <div class="flex-left">
              <p class="transformer-test">变压器数量</p>
              <p>
                <span class="transformer-data">6</span>
                台
              </p>
            </div>
            <i class="t-icon t-icon-fuhe-copy"></i>
          </div>
        </a-col>
        <a-col :span="4">
          <div
            class="flex-box"
            style="background: linear-gradient(to right, #76d088, 51%, #57c15f)"
          >
            <div class="flex-left">
              <p class="transformer-test">变压器容量</p>
              <p>
                <span class="transformer-data">888</span>
                KVA
              </p>
            </div>
            <i class="t-icon t-icon-bianyaqi-copy"></i>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="load-box">
            <div class="load-left">
              <p>当前负荷</p>
              <p>当前负荷率</p>
            </div>
            <a-divider
              class="verticalLine"
              type="vertical"
              style="height: 66px"
            />
            <div class="load-data">
              <p>1234Kw</p>
              <p>12.55%</p>
            </div>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="load-box">
            <div class="load-left">
              <p>当前负荷</p>
              <p>当前负荷率</p>
            </div>
            <a-divider
              class="verticalLine"
              type="vertical"
              style="height: 66px"
            />
            <div class="load-data">
              <p>1234Kw</p>
              <p>12.55%</p>
            </div>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="load-box">
            <div class="load-left">
              <p>当前负荷</p>
              <p>当前负荷率</p>
            </div>
            <a-divider
              class="verticalLine"
              type="vertical"
              style="height: 66px"
            />
            <div class="load-data">
              <p>1234Kw</p>
              <p>12.55%</p>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="transformer-onitoring">
      <div id="onitoring"></div>
    </div>

    <div class="transformer-onitoring">
      <div id="rate"></div>
    </div>
  </div>
</template>

<script>
  import timeSelect from '@/components/TimeSelect'

  export default {
    props: {},
    data() {
      return {}
    },
    computed: {},
    created() {},
    mounted() {
      let onitoring = this.$root.echarts.init(
        document.getElementById('onitoring')
      )

      let rate = this.$root.echarts.init(document.getElementById('rate'))
      onitoring.setOption({
        title: {
          text: '变压器负荷检测',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
          },
        ],
      }),
        rate.setOption({
          title: {
            text: '变压器负载率监测',
          },
          color: ['#8cd5c2'],
          lineStyle: {
            color: '#FC4B1C', //改变折线颜色
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line',
            },
          ],
        })
    },
    watch: {},
    methods: {
      handleChange(value) {
        console.log(`selected ${value}`)
      },
      handleBlur() {
        console.log('blur')
      },
      handleFocus() {
        console.log('focus')
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        )
      },
      timeSelected(type) {
        const obj = {
          year: '年',
          month: '月',
          day: '日',
        }
        this.$message.info('用户点击了' + obj[type])
      },
    },
    components: {
      timeSelect,
    },
  }
</script>

<style scoped lang="less">
  .electricalDetails-selected {
    margin-top: -30px;
  }

  .flex-box {
    position: relative;
    width: 200px;
    height: 88px;
    background-color: #0093e9;
    background: linear-gradient(to right, #448ae6, 51%, #5280c9);

    .flex-left {
      width: 130px;
      height: 88px;
      p {
        color: #fff;
        font-weight: 800;
        margin: 0 auto;
        line-height: 41px;
        text-align: center;
        margin-left: -10px;
      }
    }

    .t-icon {
      position: absolute;
      width: 50px;
      height: 50px;
      margin-left: 120px;
      margin-top: -71px;
    }
  }

  .load-box {
    position: relative;
    width: 200px;
    height: 88px;
    border: 2px solid #0093e9;

    .load-left {
      width: 100px;
      height: 88px;
      text-align: center;
      p {
        line-height: 20px;
        margin-top: 10px;
      }
    }

    .verticalLine {
      position: absolute;
      margin-left: 93px;
      margin-top: 11px;
    }

    .load-data {
      position: absolute;
      margin-left: 121px;
      margin-top: -86px;
      font-weight: 800;
      color: cornflowerblue;
    }
  }

  .transformer-onitoring {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    margin-top: 15px;
    overflow: hidden;

    #onitoring {
      width: 100%;
      height: 300px;
    }
  }

  #rate {
    width: 100%;
    height: 300px;
  }

  .transformer-test {
    font-size: 16px;
    font-weight: 800;
  }

  .transformer-data {
    font-size: 20px;
  }
</style>
