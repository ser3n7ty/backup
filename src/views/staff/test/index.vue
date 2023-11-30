<template>
  <ve-table
    :max-height="200"
    :fixed-header="true"
    :columns="columns"
    :table-data="tableData"
    :virtual-scroll-option="virtualScrollOption"
    :row-style-option="rowStyleOption"
  />
</template>

<script>
export default {
  data() {
    return {
      virtualScrollOption: {
        enable: true
      },
      rowStyleOption: {
        stripe: true,
        hoverHighlight: true
      },
      columns: [
        {
          field: '',
          key: 'a',
          title: '',
          width: 50,
          alien: 'center',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return ++rowIndex
          }
        },
        {
          field: 'time',
          key: 'b',
          title: '访问时间',
          align: 'center'
        },
        {
          field: 'ip',
          key: 'b',
          title: '源IP',
          align: 'center'
        },
        {
          field: 'pattern',
          key: 'b',
          title: '处理模式',
          align: 'center'
        },
        {
          field: 'result',
          key: 'b',
          title: '响应结果',
          align: 'center'
        }

      ],
      tableData: [
        {
          time: '2023-12-14 15:51',
          ip: '192.168.54.2',
          pattern: 1,
          result: '0'
        },
        {
          time: '2023-12-14 15:51',
          ip: '192.168.54.2',
          pattern: 1,
          result: '0'
        },
        {
          time: '2023-12-14 15:51',
          ip: '192.168.54.2',
          pattern: 1,
          result: '0'
        }
      ]
    }
  },
  created() {
    this.initTableData()
  },
  methods: {
    initTableData() {
      const data = []
      for (let i = 0; i < 15; i++) {
        data.push({
          rowKey: i,
          time: i,
          ip: i,
          pattern: i,
          result: i
        })
      }
      this.tableData = data
    }
  }
}
</script>
