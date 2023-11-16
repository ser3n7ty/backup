<template>
  <div class="waf-info">
    <h2>WAF 池信息</h2>
    <div class="waf-count">
      <p>当前 WAF 数量: {{ currentWafCount }}</p>
      <p>上线数量: {{ onlineCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentWafCount: 0,
      onlineCount: 0
    }
  },
  // 在这里添加获取 WAF 池信息的方法，例如使用 API 请求或其他方式获取数据
  created() {
    // 示例数据，你需要替换为实际获取数据的逻辑
    this.currentWafCount = 50 // 当前 WAF 数量
    this.onlineCount = 30 // 上线数量
  }
}
</script>

<style>
/* 根据你的需求进行样式调整 */
.waf-info {
  text-align: center;
  margin: 20px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
