<template>
  <div class="customReport-box">
    <div class="box">
      <div class="left">
        <a-drawer
          placement="left"
          :closable="false"
          :visible="isDrawerShow"
          @close="onClose"
          :mask="false"
          :drawerStyle="{ position: 'absolute', top: '64px' }"
          wrapClassName="left-drawer"
        >
          <a-button @click="toggleDrawer" class="left-Button">关开</a-button>
          <div class="search-bar">
            <a-select
              show-search
              placeholder="输入搜索关键词"
              option-filter-prop="children"
              style="width: 153px; left: -14px; top: -48px"
              :filter-option="filterOption"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
            >
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
              <a-select-option value="tom">Tom</a-select-option>
            </a-select>
          </div>
          <div class="left-a">
            <a href="javascript:;" @click="showModal">编辑分组</a>
            <a-modal
            lazy:	{ height: 32, offset: 32 }	
              listStyle:{width:600px}
              title="Title"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
            >
              <popup />
            </a-modal>
          </div>
          <a-divider />
          <div class="left-tree">
            <a-tree
              :show-line="showLine"
              :show-icon="showIcon"
              :default-expanded-keys="['0-0-0', '0-0-1', '0-0-2']"
              @select="onSelect"
            >
              <a-icon slot="icon" type="carry-out" />
              <a-tree-node class="tree-first" key="0-0" title="利川中医">
                <a-icon slot="icon" type="carry-out" />
                <span slot="title" style="color: #1890ff">parent 1</span>
                <a-tree-node key="0-0-0" title="parent 1-0">
                  <a-icon slot="icon" type="carry-out" />
                  <a-tree-node key="0-0-0-0" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                  </a-tree-node>
                  <a-tree-node key="0-0-0-1" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                  </a-tree-node>
                  <a-tree-node key="0-0-0-2" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                  </a-tree-node>
                </a-tree-node>
                <a-tree-node key="0-0-1" title="parent 1-1">
                  <a-icon slot="icon" type="carry-out" />
                  <a-tree-node key="0-0-1-0" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                  </a-tree-node>
                </a-tree-node>
                <a-tree-node key="0-0-2" title="parent 1-2">
                  <a-icon slot="icon" type="carry-out" />
                  <a-tree-node key="0-0-2-0" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                  </a-tree-node>
                  <a-tree-node key="0-0-2-1" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                    <a-icon slot="switcherIcon" type="form" />
                  </a-tree-node>
                </a-tree-node>
              </a-tree-node>
            </a-tree>
          </div>
        </a-drawer>
        <div class="right">
          <a-row style="white-space: nowrap">
            <a-col :xs="2" :sm="4" :md="6" :lg="4" :xl="20">
              <span style="font-size: 17px">自定义报表</span>
              <a-button
                size="small"
                style="background: #7f8592; color: #fff; margin-left: 4px"
                shape="circle"
                icon="?"
              />
            </a-col>
            <a-col :xs="2" :sm="4" :md="6" :lg="2" :xl="2" :offset="2">
              <a-button type="primary">导出报表</a-button>
            </a-col>
          </a-row>
          <a-divider class="xian" />
          <a-tabs type="card" @change="callback">
            <a-tab-pane key="1" tab="电量表计报器">
              <one-column />
            </a-tab-pane>
            <a-tab-pane key="2" tab="电量时段报表">
              <two-column />
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import oneColumn from './components/oneColumn'
  import twoColumn from './components/twoColumn'
  import popup from './components/popup'
  export default {
    props: {},
    data() {
      return {
        isDrawerShow: true,
        showLine: true, //树
        showIcon: false, // 树
        ModalText: 'Content of the modal', // 弹出层
        visible: false, //弹出层
        confirmLoading: false, //弹出层
      }
    },
     computed: {},
     created() {},
     mounted() {},
     watch: {},
     methods: {
      onClose() {},
      toggleDrawer() {
        this.isDrawerShow = !this.isDrawerShow
      },
      // 搜索框
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
      //树
      onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info)
      },
      // 切换
      callback(key) {
        console.log(key)
      },

      // 弹出层
      showModal() {
        this.visible = true
      },
      handleOk(e) {
        this.ModalText = 'The modal will be closed after two seconds'
        this.confirmLoading = true
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
        }, 2000)
      },
      handleCancel(e) {
        console.log('Clicked cancel button')
        this.visible = false
      },
    },
    components: {
      oneColumn,
      twoColumn,
      popup,
    },
  }
</script>

<style scoped lang="less">
  .customReport-box {
    margin-top: -60px;
    margin-left: -40px;
  }

   .box  {
    display: flex;
  }

  .left  {
    position: relative;
    width: 100%;
    height: 880px;
    // background: rgb(240, 202, 175);
  }
  .ant-divider-horizontal {
    margin-top: -27px;
  }
  .right  {
    flex: 1;
    width: 100%;
    height: 880px;
    margin-left: 17px;
    padding: 18px;
    margin-top: 26px;

    .xian {
      margin-top: 20px;
    }
  }
  .tree-first {
    font-size: 17px;
    font-weight: 600;
  }
  .ant-tree-title {
    font-weight: 800;
  }
</style>
<style lang="less">
  .left-drawer {
    z-index: 0;
    .ant-drawer-content-wrapper {
      top: 64px;
      left: 250px;
      .ant-drawer-content {
        overflow: unset;
      }
      .ant-drawer-wrapper-body {
        overflow: unset;
        top: 0;
        width: 253px;
        margin-top: -55px;
        height: 300px;
      }
      .left-Button {
        transform: translate(200px, 300px);
        background-color: rgb(92, 116, 128);
        border-radius: 90px;
        color: #ffff;
      }
    }
    .left-a {
      position: absolute;
      top: 13px;
      right: 9px;
    }
  }
</style>

<style lang="less">
  .ant-modal {
    width: 70%;
  }

  .ant-transfer-list {
     width: 47%;
    height: 331px;
  }

  .ant-modal-content {
    width: 900px;
    height: 500px;
  }
</style>
