<template>
  <div class="container">
    <ve-table
      fixed-header
      :max-height="360"
      :columns="columns"
      :table-data="tableData"
      row-key-field-name="rowKey"
      :row-style-option="rowStyleOption"
      :virtual-scroll-option="virtualScrollOption"
      :clipboard-option="clipboardOption"
      :cell-style-option="cellStyleOption"
    />
  </div>
</template>

<script>
export default {
  name: 'LogDisplay',
  data() {
    return {
      cellStyleOption: {
        headerCellClass: ({ rowIndex }) => {
          if (rowIndex === 0) {
            return 'table-header-cell-class'
          }
        },
        bodyCellClass: ({ row, column, rowIndex }) => {
          const colName = 'result'
          const result = row[colName.field]
          if (result === '1') {
            return 'table-body-cell-class'
          }
          if (column.field === 'result' && result === '1') {
            return 'forbidden-class'
          }
        }
      },
      virtualScrollOption: {
        // 开启虚拟滚动
        enable: true
      },
      clipboardOption: {
        copy: true,
        beforeCopy: ({ data, selectionRangeIndexes, selectionRangeKeys }) => {
          console.log('beforeCopy')
          this.log({ data, selectionRangeIndexes, selectionRangeKeys })
        },
        afterCopy: ({ data, selectionRangeIndexes, selectionRangeKeys }) => {
          console.log('afterCopy')
          this.log({ data, selectionRangeIndexes, selectionRangeKeys })
        }
      },
      rowStyleOption: {
        stripe: true,
        hoverHighlight: true,
        clickHighlight: true
      },
      columns: [
        {
          field: '',
          key: 'a',
          title: '',
          width: 50,
          align: 'center',
          fixed: 'left',
          renderBodyCell: ({ rowIndex }) => {
            return ++rowIndex
          }
        },
        { field: 'ip', key: 'b', title: '源IP', align: 'center' },
        { field: 'time', key: 'c', title: '访问时间', align: 'center' },
        {
          field: 'pattern',
          key: 'd',
          title: '处理模式',
          align: 'center',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
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
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            const result = row[column.field]
            const text = result === '1' ? '拦截' : '放行'
            return <span> {text} </span>
          }
        }
      ],
      tableData: [
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
        },
        {
          ip: '192.168.2.1',
          time: '2023.12.12 15:51',
          pattern: '0',
          result: '1'
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
          result: '0'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .table-header-cell-class {
    background: #1171ad !important;
    color: #fff !important;
  }
  .table-body-cell-class {
    background: #91d5ff !important;
    color: #fff !important;
  }
  .forbidden-class {
    color: red !important;
  }
</style>
