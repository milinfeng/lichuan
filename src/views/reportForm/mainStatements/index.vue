<template>
  <div>
    <a-row>
       <a-col :xs="2" :sm="4" :md="6" :lg="4" :xl="4">
        <span>电量时段报表</span>
        <a-button
          size="small"
          style="background: #7f8592; color: #fff; margin-left: 4px"
          shape="circle"
          icon="?"
        />
      </a-col>
      <a-col :xs="4" :sm="5" :md="5" :lg="2" :xl="5" :offset="5">
        <span>选择变电站:</span>
        <a-select
          label-in-value
          :default-value="{ key: 'lucy' }"
          style="width: 140px"
          @change="handleChange"
        >
          <a-select-option value="jack">Jack (100)</a-select-option>
          <a-select-option value="lucy">Lucy (101)</a-select-option>
        </a-select>
      </a-col>
        <a-col :xs="2" :sm="6" :md="6" :lg="2" :xl="5" :offset="0">
        <span>选择日期:</span>
        <a-date-picker @change="onChange" />
      </a-col>
       <a-col :xs="2" :sm="4" :md="6" :lg="2" :xl="3" :offset="0">
        <time-select @time-selected="timeSelected" />
      </a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="2" :xl="2" :offset="0">
        <a-button type="primary">导出报表</a-button>
      </a-col>
    </a-row>
    <a-divider />
    <div>
      <a-row>
        <a-col :xs="{ span: 24, offset: 0 }" :lg="{ span: 24 }">
          <a-table class="teble-box"
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 1500, y: 600 }"
          >
            <a slot="action" slot-scope="text">action</a>
          </a-table>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import timeSelect from '@/components/TimeSelect'
  const columns = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
    { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
    { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
    { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
    { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
    { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
    { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
    { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      scopedSlots: { customRender: 'action' },
    },
  ]

  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    })
  }
  export default {
    props: {},
    data() {
      return {
        data,
        columns,
      }
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {
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
 
</style>
