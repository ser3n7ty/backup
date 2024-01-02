<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    height="100%"
    :row-class-name="tableRowClassName"
    :row-key="row => row.uniqueIdentifier"
  >
    >
    <el-table-column
      type="index"
      label=""
      width="50"
      align="center"
      fixed
    />
    <el-table-column
      prop="ip"
      label="源IP"
      align="center"
      fixed
    />
    <el-table-column
      prop="time"
      label="访问时间"
      align="center"
      fixed
    />
    <el-table-column
      prop="pattern"
      label="处理模式"
      align="center"
      fixed
    >
      <template slot-scope="scope">
        <span>{{ scope.row.pattern === '1' ? '并行' : '串行' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="result"
      label="响应结果"
      align="center"
      fixed="right"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.result === '1' ? '放行' : '拦截' }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
  .el-table .warning-row {
    background: rgb(245, 203, 203);
  }
</style>
<script>
export default {
  data() {
    return {
      uniqueIdCounter: 0,
      tableData: [],
      timer: null,
      activeRowIndex: null,
      hoverRowIndex: null

    }
  },
  mounted() {
    this.startUpdatingData()
  },
  methods: {
    startUpdatingData() {
      this.updateData()
      this.timer = setInterval(this.updateData, 5000)
    },
    updateData() {
      let newData = []
      // this.$store.dispatch('screen/getLogs')
      //   .then(response => {
      //     newData = response.data
      //   })
      //   .catch(err => {
      //     this.$message.error(err)
      //   })
      newData = [
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
      // 为新增的数据添加唯一标识符
      for (let i = 0; i < newData.length; i++) {
        newData[i].uniqueIdentifier = `unique${this.uniqueIdCounter++}`
      }
      this.tableData = [...newData, ...this.tableData]
    },
    tableRowClassName({ row }) {
      if (row.result === '0') {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>
