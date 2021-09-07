<template>
  <div>
    <a-row class="compareContainer" type="flex">
      <!--  左侧模块  -->
      <a-col class="leftPart" :span="5">
        <div class="deviceTitle">设备类型列表</div>
        <div class="deviceList">
          <!--默认设备选中状态-->
          <a-tree
            show-line
            :default-expanded-keys="['0']"
            :default-selected-keys="['01']"
            @select="onSelect"
          >
            <a-icon slot="switcherIcon" type="down" />
            <a-tree-node key="0" title="电表设备列表">
              <a-tree-node key="01" title="电表设备01" />
              <a-tree-node key="02" title="电表设备02" />
              <a-tree-node key="03" title="电表设备03" />
            </a-tree-node>
            <a-tree-node key="1" title="水表设备列表">
              <a-tree-node key="10" title="水表设备01" />
              <a-tree-node key="11" title="水表设备02" />
            </a-tree-node>
            <a-tree-node key="2" title="其它设备">
              <a-tree-node key="20" title="水表设备01" />
              <a-tree-node key="21" title="水表设备02" />
            </a-tree-node>
          </a-tree>
        </div>
      </a-col>

      <!-- 右侧模块 -->
      <a-col class="rightPart" :span="19">
        <div>
          <a-row class="tabTitle" style="padding: 2vh 2vh">
            <a-col :span="5" style="font-size: 20px; font-weight: bold">
              电能质量监测
            </a-col>
            <a-col :span="5"></a-col>
            <a-col :span="14">
              <div style="display: flex">
                <div style="width: 72%">
                  <a-input-group compact>
                    <a-input
                      style="width: auto; margin-right: 5%"
                      default-value="请输入文本内容"
                    />
                    <a-date-picker style="width: 50%" />
                  </a-input-group>
                </div>
                <div id="components-button-demo-button-group" style="flex: 1">
                  <a-button-group>
                    <a-button
                      v-for="(item, index) in dateBtn"
                      :key="index"
                      :class="{ activeColor: activeBtn == index }"
                      @click="handleEcharts(index)"
                    >
                      {{ item }}
                    </a-button>
                  </a-button-group>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
        <div style="">
          <a-row>
            <a-col :span="24">
              <div>
                <a-tabs type="card" @change="callback">
                  <a-tab-pane key="1" tab="三相不平衡">
                    <monitor></monitor>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="电流谐波畸变率">
                    <monitor></monitor>
                  </a-tab-pane>
                  <a-tab-pane key="3" tab="电压谐波畸变率">
                    电压谐波畸变率
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
  import monitor from './children/monitor.vue'
  export default {
    name: 'energyComparison',
    components: { monitor },
    data() {
      return {
        // deviceList:[],
        activeBtn: 0, // 活跃按钮
        dateBtn: ['日', '月', '年'], // 时间按钮
      }
    },
    watch: {
      checkedKeys(val) {
        console.log('onCheck', val)
      },
    },
    mounted() {
      // this.getDeviceLists()
    },
    methods: {
      getDeviceLists() {},
      handleEcharts(index) {
        if (index == '' || index == 0) {
          this.activeBtn = index
        } else if (index == 1) {
          this.activeBtn = index
        }
        if (index == 2) {
          this.activeBtn = index
        }
        this.loadEcharts()
      },

      // 单选某1项
      onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info)
      },
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
