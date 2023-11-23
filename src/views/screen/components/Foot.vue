<template>
  <div class="waf-info" style="width:600px; height: 120px">
    <h2>WAF 池信息</h2>
    <div class="waf-count">
      <p>当前 WAF 数量: {{ currentWafCount }} 上线数量: {{ onlineCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      currentWafCount: 0,
      onlineCount: 0
    }
  },
  mounted() {
    this.currentWafCount = 10
    this.onlineCount = 6
    // TODO: 上线时使用
    // this.startUpdatingData()
  },
  beforeDestroy() {
    this.stopUpdatingData()
  },
  methods: {
    startUpdatingData() {
      this.updateInfo()
      this.timer = setInterval(this.updateInfo, 60000)
    },
    updateInfo() {
      this.$store.dispatch('screen/gainWafNumber')
        .then(data => {
          this.currentWafCount = data['total']
          this.onlineCount = data['online']
        })
    },
    stopUpdatingData() {
      clearInterval(this.timer)
    }

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
