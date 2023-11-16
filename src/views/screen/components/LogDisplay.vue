<template>
  <div class="log-container">
    <div class="log-header">
      <h3>请求记录</h3>
    </div>
    <div class="log-content">
      <ul>
        <li v-for="log in logs" :key="log.id" class="log-item">
          <span class="timestamp">{{ log.timestamp }}</span>
          <span class="sourceIP">{{ log.sourceIP }}</span>
          <span class="responseStatus">{{ log.responseStatus }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logs: [] // 存储日志数据的数组
    }
  },
  mounted() {
    this.fetchLogs()
    setInterval(this.fetchLogs, 30000) // 每隔30秒更新一次日志信息（模拟实时数据更新）
  },
  methods: {
    fetchLogs() {
      // TODO: 获取最近30分钟的日志数据，可以通过接口请求或读取日志文件等方式获取
      // 这里是一个示例，模拟获取日志数据
      const currentTime = new Date().getTime()
      for (let i = 0; i < 8; i++) {
        const logTime = new Date(currentTime - i * 60000).toLocaleTimeString()
        const sourceIP = `192.168.1.${i + 1}`
        const responseStatus = Math.random() < 0.8 ? 200 : 404 // 模拟响应状态

        this.logs.unshift({
          id: i + 1,
          timestamp: logTime,
          sourceIP: sourceIP,
          responseStatus: responseStatus
        })
      }

      // 只保留最近30分钟的日志数据
      if (this.logs.length > 30) {
        this.logs = this.logs.slice(0, 30)
      }
    }
  }
}
</script>

<style scoped>
.log-container {
  width: 400px;
  height: 300px;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.log-header {
  background-color: #3498db;
  color: white;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  border-radius: 7px 7px 0 0;
}

.log-header h3 {
  margin: 0;
  font-size: 18px;
}

.log-content {
  padding: 10px;
  overflow-y: auto;
}

.log-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.timestamp {
  flex: 1;
  color: #555;
}

.sourceIP,
.responseStatus {
  flex: 2;
  text-align: center;
  color: #333;
}
</style>
