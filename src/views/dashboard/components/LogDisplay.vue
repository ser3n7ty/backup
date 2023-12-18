<template>
  <div class="lf-btm">
    <ve-table
      fixed-header
      :max-height="290"
      :columns="columns"
      :table-data="tableData"
      :row-style-option="rowStyleOption"
      :virtual-scroll-option="virtualScrollOption"
    />
  </div>
</template>

<script>
export default {
  name: 'LogDisplay',
  data() {
    return {
      temp: null,
      timer: null,
      virtualScrollOption: {
        // 开启虚拟滚动
        enable: true
      },
      rowStyleOption: {
        stripe: true,
        hoverHighlight: true,
        clickHighlight: true
      },
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
          renderBodyCell: ({ row, column, rowIndex }) => {
            const pattern = row[column.field]
            const text = pattern === '1' ? '串行' : '并行'
            return <span> {text} </span>
          }
        },
        {
          field: 'result',
          key: 'e',
          title: '响应结果',
          align: 'center',
          fixed: 'right',
          renderBodyCell: ({ row, column, rowIndex }) => {
            const result = row[column.field]
            const text = result === '1' ? '拦截' : '放行'
            return <span> {text} </span>
          }
        }
      ],
      tableData: [
      ]
    }
  },
  mounted() {
    console.log('开始更新界面')
    this.startUpdatingData()
  },
  methods: {
    startUpdatingData() {
      this.timer = setInterval(this.updateData, 6000)
    },
    updateData() {
      const newData = []
      this.temp = [
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
      // this.$store.dispatch('screen/getLogs')
      //   .then(data => {
      //     this.temp = data
      //   })
      for (let i = this.temp.length - 1; i >= 0; i--) {
        newData.push(this.temp[i])
      }
      for (let i = 0; i <= this.tableData.length - 1; i++) {
        newData.push(this.tableData[i])
      }
      for (let i = 0; i <= newData.length - 1; ++i) {
        newData[i]['index'] = i + 1
      }
      this.tableData = newData
      console.log('更新完成')
    }
  }
}
</script>

<style scoped>

.ve-table {
  width: 100%;
  height: 100%;
}
</style>
