<template>
  <div style="position: relative">
    <!-- 1. SVG渲染模块-->
    <div class="svg-contain">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="background-color: #000000"
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
      >
        <defs />
        <!-- group 是用来分组用的 -->
        <g
          v-for="item in svgLists"
          :key="item"
          :id="item.id"
          :title="item.title"
          :transform="
            'translate(' +
            item.svgPositionX +
            ',' +
            item.svgPositionY +
            ')' +
            'rotate(' +
            item.angle +
            ')' +
            'scale(' +
            item.size +
            ')'
          "
        >
          <SvgComponents
            :component_prop="item"
            :svgInfoData="svgInfoData"
          ></SvgComponents>
        </g>
      </svg>
    </div>

    <!-- 2. 按钮操作 -->
    <div class="btns-content">
      <a-button type="primary" @click="testF">模拟硬件</a-button>
      <a-button type="primary" @click="testG">取消模拟硬件</a-button>
    </div>
  </div>
</template>

<script>
  import SvgComponents from '@/views/index/SvgComponents.vue'
  import { haha } from '@/api/user'
  export default {
    components: { SvgComponents },
    data() {
      return {
        svgLists: [], // todo svg列表(导出的json文件数据)
        svgInfoData: [], // todo 原电气元件
        analogDataTimer: '', // 模拟数据定时器
        userInfo: '',
        editable: false,
        deviceDatas: [], // yc数据
        switchDatas: [], // yx数据
        timer: null, // 定时器名称
      }
    },
    methods: {
      async haha() {
        const result = await haha()
        this.svgLists = result.data
        
        console.log(result)
      },
      /**
       * @description: 此方法仅为演示使用,真正修改组件数据，请判断data_type属性
       * @param {*}
       * @return {*}
       *
       */
      testF() {
        /**
         *  1. 按照电器元件类别分类分组
         *
         */
        // 所有文本内容设备
        let textSvgList = this.svgLists.filter(
          (item) => item.type == 'TextSvg' && item.sigId != ''
        )

        // 所有开关设备
        let switchSvgList = this.svgLists.filter(
          (f) => f.type == 'WireBreakOnSvg' || f.type == 'WireBreakOffSvg'
        )

        for (let i = 0; i < this.deviceDatas.length; i++) {
          for (let j = 0; j < textSvgList.length; j++) {
            if (this.deviceDatas[i].ycId == textSvgList[j].sigId) {
              textSvgList[j].title = this.deviceDatas[i].key
            }
          }
        }

        for (let i = 0; i < this.switchDatas.length; i++) {
          for (let j = 0; j < switchSvgList.length; j++) {
            if (this.switchDatas[i].ycId == switchSvgList[j].sigId) {
              if (this.switchDatas[i].key == 0) {
                switchSvgList[j].type = 'WireBreakOnSvg'
                switchSvgList[j].svgColor = '#00FF00'
              } else {
                switchSvgList[j].type = 'WireBreakOffSvg'
                switchSvgList[j].svgColor = '#FF0000'
              }
            }
          }
        }
      },
      testG() {
        clearInterval(this.analogDataTimer)
      },

      // 请求后台数据
      getDevicesInfo() {
        this.$axios.get('/webServer/newData.json').then((res) => {
          this.deviceDatas = res.data[0]
          this.switchDatas = res.data[1]
          // console.log(res.data);
        })
      },

      // 定时刷新数据函数
      dataRefreh() {
        // 计时器正在进行中，退出函数
        if (this.timer != null) {
          return
        }
        // 计时器为空，操作
        this.timer = setInterval(() => {
          // console.log("刷新" + new Date());
          this.getDevicesInfo() // 加载数据函数
        }, 3000)
      },
      // 停止定时器
      clear() {
        console.log('停止定时器')
        clearInterval(this.timer) //清除计时器
        this.timer = null //设置为null
      },
    },
    created() {
      this.haha()
      let _this = this
      // 请求接口获取组件(元组件数据)
      this.$axios.get('/InterfaceReturn.json').then(function (response) {
        // todo 1. svg组件信息(元器件)
        _this.svgInfoData = response.data

        // // todo 2. 渲染组件(导出的json数据) 待定（数据库读取）
        // _this.svgLists = JSON.parse(localStorage.getItem('svginfo'));
        // console.log(_this.svgLists);
      })

      // 画布数据
      // this.$axios.get('/data/json.json')
      // this.$axios.get('/data/haha.json').then(function (response) {
      //   // todo 2. 渲染组件(导出的json数据) 待定（数据库读取）
      //   _this.svgLists = response.data
      //   console.log(_this.svgLists)
      //   console.log('------------------------')
      // })
      // 请求后台数据
      this.getDevicesInfo()
      // 定时刷新数据
      // this.dataRefreh();
    },
    unmounted() {
      // 在页面销毁后，清除计时器
      this.clear()
    },
  }
</script>

<style scoped lang="less"></style>
