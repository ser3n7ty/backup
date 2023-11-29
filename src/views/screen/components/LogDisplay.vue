<template>
  <div ref="logContainer" class="log-container" @scroll="handleScroll">
    <table class="sticky-header-table" :class="{ 'no-scrollbar': !showScrollbar }">
      <thead>
        <tr>
          <th>访问时间</th>
          <th>访问IP</th>
          <th>处理方式</th>
          <th>执行结果</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, index) in displayedLogs" :key="index">
          <td>{{ log.time }}</td>
          <td>{{ log.ip }}</td>
          <td>{{ getPattern(log.pattern) }}</td>
          <td>{{ getResult(log.result) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logs: [], // 存储所有日志信息的数组
      displayedLogs: [], // 当前展示的日志信息数组
      logsPerPage: 1, // 每页展示的日志数量
      currentPage: 0, // 当前页数
      isLoading: false, // 标识是否正在加载数据
      showScrollbar: false
    }
  },
  computed: {
    isTableOverflow() {
      // 计算表格内容高度是否超出容器高度
      const container = this.$refs.logContainer
      if (container) {
        const table = container.querySelector('table')
        return table.scrollHeight > container.clientHeight
      }
      return false
    }
  },
  watch: {
    isTableOverflow(newVal) {
      this.showScrollbar = newVal
    }
  },
  mounted() {
    this.fetchLogs()
    this.$nextTick(() => {
      this.setTableHeaderPosition()
    })
    window.addEventListener('resize', this.setTableHeaderPosition)
  },
  destroyed() {
    window.removeEventListener('resize', this.setTableHeaderPosition)
  },
  methods: {
    async fetchLogs() {
      const logs = await this.getLogsFromBackend() // 这里假设有一个从后端获取日志的函数

      this.logs = logs

      // 每秒加载一个日志数据
      this.loadLogsInterval = setInterval(() => {
        if (this.currentPage * this.logsPerPage < this.logs.length) {
          const start = this.currentPage * this.logsPerPage
          const end = start + this.logsPerPage
          this.displayedLogs = this.displayedLogs.concat(this.logs.slice(start, end))
          this.currentPage++
          this.$refs.logContainer.scrollTop = this.$refs.logContainer.scrollHeight // 滚动到底部
        } else {
          clearInterval(this.loadLogsInterval) // 加载完所有日志后停止加载
        }
      }, 1000)
    },
    getLogsFromBackend() {
      // 这里是模拟的示例数据，你需要使用实际的后端接口来获取日志数据
      // 假设 logs 是从后端获取的所有日志数据数组
      return new Promise(resolve => {
        setTimeout(() => {
          const logs = [
            { time: '23-11-05 11:45', ip: '192.168.1.12', pattern: 0, result: '0' },
            { time: '23-11-05 11:45', ip: '192.168.1.23', pattern: 1, result: '1' },
            { time: '23-11-05 11:45', ip: '192.168.1.10', pattern: 0, result: '0' },
            { time: '23-11-05 11:45', ip: '192.168.1.10', pattern: 0, result: '0' },
            { time: '23-11-05 11:45', ip: '192.168.1.23', pattern: 1, result: '1' },
            { time: '23-11-05 11:45', ip: '192.168.1.23', pattern: 1, result: '1' },
            { time: '23-11-05 11:45', ip: '192.168.1.23', pattern: 1, result: '1' },
            { time: '23-11-05 11:45', ip: '192.168.1.23', pattern: 1, result: '1' },
            { time: '23-11-05 11:45', ip: '192.168.1.23', pattern: 1, result: '1' },
            { time: '23-11-05 11:45', ip: '192.168.1.23', pattern: 1, result: '1' },
            { time: '23-11-05 11:45', ip: '192.168.1.23', pattern: 1, result: '1' },
            { time: '23-11-05 11:45', ip: '192.168.1.23', pattern: 1, result: '1' },
            { time: '23-11-05 11:45', ip: '192.168.1.23', pattern: 1, result: '1' },
            { time: '23-11-05 11:45', ip: '192.168.1.23', pattern: 1, result: '1' }
          ]
          resolve(logs)
        }, 2000) // 模拟获取数据的延迟，你可以根据实际情况调整
      })
      // TODO:上线时使用
      // this.$store.dispatch('screen/getLogs')
      //   .then(data => {
      //     this.logs = data
      //   })
    },
    getPattern(pattern) {
      return pattern === 0 ? '串行' : '并行'
    },
    getResult(result) {
      return result === '0' ? '成功' : '失败'
    },
    handleScroll() {
      const container = this.$refs.logContainer
      if (
        container.scrollTop + container.clientHeight >= container.scrollHeight &&
        !this.isLoading
      ) {
        this.isLoading = true
        this.loadMoreLogs().then(() => {
          this.isLoading = false
        })
      }
    },
    setTableHeaderPosition() {
      const thead = this.$el.querySelector('thead')
      if (thead) {
        thead.style.position = 'sticky'
        thead.style.top = '0'
        thead.style.zIndex = '1'
        thead.style.background = '#f2f2f2'
      }
    }
  }
}
</script>

<style>
.log-container {
  height: 200px; /* 设置日志容器的高度，使其可以滚动 */
  overflow-y: auto; /* 设置垂直滚动 */
  position: relative;
}
.sticky-header-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.sticky-header-table thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #f2f2f2;
}
.no-scrollbar {
  overflow: hidden;
}
/* 其他样式可以根据需要进行添加 */
</style>
