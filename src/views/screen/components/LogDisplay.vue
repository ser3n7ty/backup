<template>
  <div ref="logContainer" class="log-container">
    <ve-table
      ref="tableRef"
      :fixed-header="true"
      :max-height="300"
      :columns="columns"
      :table-data="tableData"
      :cell-style-option="cellStyleOption"
      :row-style-option="rowStyleOption"
      :virtual-scroll-option="virtualScrollOption"
    />
  </div>
</template>
<style>
.table-header-cell-class {
  background: #91d5ff !important;
  color: #fff !important;
}
</style>

<script>

export default ({
  name: 'MapChart',
  data() {
    return {
      virtualScrollOption: {
        enable: true
      },
      cellStyleOption: {
        headerCellClass: ({ column, rowIndex }) => {
          if (rowIndex === 0) {
            return 'table-header-cell-class'
          }
        },
        bodyCellClass: ({ row, column, rowIndex }) => {
          if (column.field === 'result') {
            if (row[column.field] === '1') {
              return 'table-header-cell-class'
            }
          }
        }

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
          align: 'center',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return ++rowIndex
          }
        },
        { field: 'time', key: 'b', title: '访问时间', align: 'center' },
        { field: 'ip', key: 'c', title: '源IP', align: 'center' },
        {
          field: 'pattern',
          key: 'd',
          title: '处理模式',
          align: 'center',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            const data = row[column.field]
            return data === 0 ? '并行' : '串行'
          }
        },
        {
          field: 'result',
          key: 'e',
          title: '响应结果',
          align: 'center',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            const data = row[column.field]
            return data === '0' ? '放行' : '拦截'
          }
        }
      ],
      tableData: [
        {
          time: '2023-12-14 14:41',
          ip: '192.168.59.1',
          pattern: 1,
          result: '1'
        },
        {
          time: '2023-12-14 14:41',
          ip: '192.168.59.1',
          pattern: 0,
          result: '0'
        },
        {
          time: '2023-12-14 14:41',
          ip: '192.168.59.1',
          pattern: 1,
          result: '1'
        },
        {
          time: '2023-12-14 14:41',
          ip: '192.168.59.1',
          pattern: 0,
          result: '0'
        },
        {
          time: '2023-12-14 14:41',
          ip: '192.168.59.1',
          pattern: 1,
          result: '1'
        },
        {
          time: '2023-12-14 14:41',
          ip: '192.168.59.1',
          pattern: 0,
          result: '0'
        },
        {
          time: '2023-12-14 14:41',
          ip: '192.168.59.1',
          pattern: 0,
          result: '1'
        },
        {
          time: '2023-12-14 14:41',
          ip: '192.168.59.1',
          pattern: 1,
          result: '0'
        },
        {
          time: '2023-12-14 14:41',
          ip: '192.168.59.1',
          pattern: 0,
          result: '1'
        }
      ]
    }
  }
})
</script>
