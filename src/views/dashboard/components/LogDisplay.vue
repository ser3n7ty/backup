<template>
  <!-- TODO: element ui 重写这个组件 -->
  <div class="lf-btm">
    <el-table
      v-loading="loading"
      :data="tableData"
      :max-height="maxHeight"
      style="width: 100%"
      border
      stripe
      header-row-class-name="table-header"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.key"
        :prop="column.field"
        :label="column.title"
        :width="column.width"
        :fixed="column.fixed"
        :align="column.align"
      >
        <template v-if="column.renderBodyCell" slot-scope="{ row }">
          <span>{{ column.renderBodyCell({ row, column }) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      maxHeight: 290,
      columns: [
        {
          field: 'index',
          key: 'a',
          title: '',
          width: 50,
          align: 'center',
          fixed: 'left'
        },
        {
          field: 'ip',
          key: 'b',
          title: '源IP',
          align: 'center'
        },
        { field: 'time', key: 'c', title: '访问时间', align: 'center' },
        {
          field: 'pattern',
          key: 'd',
          title: '处理模式',
          align: 'center',
          renderBodyCell: ({ row, column }) => {
            const pattern = row[column.field]
            const text = pattern === '1' ? '串行' : '并行'
            return text
          }
        },
        {
          field: 'result',
          key: 'e',
          title: '响应结果',
          align: 'center',
          fixed: 'right',
          renderBodyCell: ({ row, column }) => {
            const result = row[column.field]
            const text = result === '1' ? '拦截' : '放行'
            return text
          }
        }
      ]
    }
  },
  mounted() {
    console.log('开始更新页面')
    this.startUpdatingData()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    startUpdatingData() {
      this.timer = setInterval(this.updateData, 6000)
    },
    updateData() {
      // 模拟新数据
      const newData = [
        {
          ip: '192.168.202.198',
          time: '2023.12.12 15:51',
          pattern: '0',
          result: '0'
        },
        {
          ip: '192.168.2.1',
          time: '2023.12.12 15:51',
          pattern: '1',
          result: '0'
        },
        {
          ip: '192.168.2.1',
          time: '2023.12.12 15:51',
          pattern: '1',
          result: '1'
        }
      ]

      // 合并原有数据和新数据
      this.tableData = [...newData, ...this.tableData.slice(0, 2)]
    }
  }
}
</script>

<style scoped>
/* 用于调整表格头样式 */
.table-header {
  background-color: #f5f7fa;
  color: #303133;
  font-weight: bold;
}
</style>
