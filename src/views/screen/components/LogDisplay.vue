<template>
  <div class="container">
    <div class="header">
      <h4>访问时间——源IP——处理模式——响应结果</h4>
    </div>
    <div ref="logContainer" class="log-container">
      <ul>
        <li v-for="(log, index) in visibleLogs" :key="index">{{ log }}</li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  // TODO:增加事件监听，支持用户手动滚动。当无动作5秒后自动滚动到末尾
  data() {
    return {
      logs: [], // 存储日志信息的数组
      visibleLogs: [], // 存储可见的日志信息的数组
      timer: null, // 定时器用于模拟获取数据
      containerHeight: 300 // 容器高度
    }
  },
  mounted() {
    this.startFetchingLogs()
  },
  beforeDestroy() {
    this.stopFetchingLogs()
  },
  methods: {
    async startFetchingLogs() {
      this.timer = setInterval(() => {
        this.fetchLogs()
      }, 1000)
    },
    stopFetchingLogs() {
      clearInterval(this.timer)
    },
    async fetchLogs() {
      const currentTime = new Date().toLocaleTimeString()
      const sourceIP = '192.168.1.1' // 替换为实际获取的源IP
      const processingMode = 'Mode A' // 替换为实际获取的处理模式
      const response = 'Success' // 替换为实际获取的响应结果
      this.updateLogs(`${currentTime} - ${sourceIP} - ${processingMode} - ${response}`)
      // try {
      //   const data = await this.$store.dispatch('screen/getLogs')
      //   this.updateLogs(data)
      // } catch (error) {
      //   this.$message({
      //     message: 'Failed to fetch logs' + ',' + error,
      //     type: 'error'
      //   })
      // }
    },
    updateLogs(newLogs) {
      this.logs = this.logs.concat(newLogs)

      // 只显示最后容器高度可容纳的部分日志
      const startIndex = Math.max(this.logs.length - this.containerHeight / 20, 0)
      this.visibleLogs = this.logs.slice(startIndex)

      this.scrollLogContainerToBottom()
    },
    scrollLogContainerToBottom() {
      // 仅当滚动条在底部时才自动滚动
      const logContainer = this.$refs.logContainer
      const isScrolledToBottom = logContainer.scrollHeight - logContainer.clientHeight <= logContainer.scrollTop + 1
      if (isScrolledToBottom) {
        logContainer.scrollTop = logContainer.scrollHeight - logContainer.clientHeight
      }
    }
  }
}
</script>

<style>
.log-container {
  height: 285px; /* 设置日志容器的高度 */
  overflow-x: hidden; /* 隐藏横向滚动条 */
  border: 1px solid #ccc; /* 边框样式 */
  padding: 10px; /* 内边距 */
}

.log-container ul {
  list-style: none; /* 去除列表样式 */
  border: none;
  padding: 0;
  margin: 0;
  font-family: Arial, sans-serif; /* 字体样式 */
}

.log-container ul li {
  margin-bottom: 5px; /* 日志项之间的间距 */
}
</style>
