<template>
  <div class="container">
    <canvas ref="canvas"> 您的浏览器不支持 canvas </canvas>
  </div>
</template>

<script>

export default {
  name: 'MapChart',
  data() {
    return {
      canvas: null,
      ctx: null,
      timer: null,
      playlist: null,
      wafArr: null,
      idArr: null
    }
  },
  mounted() {
    // this.initCart()
    this.initData()
    // this.startUpdatingData()
  },
  beforeDestroy() {
    this.stopUpdatingData()
  },
  methods: {
    // 获取 waf 和 ID 之间的对应关系
    initCart() {
      this.$store.dispatch('screen/initCart')
        .then(data => {
          this.wafArr = data.waf
          this.idArr = data.id
        })
    },
    drawStatic() {
      this.canvas = this.$refs.canvas
      if (!this.canvas.getContext) return
      this.ctx = this.canvas.getContext('2d')
      this.drawWaf()
      this.drawClient()
      this.drawServer()
      this.drawSchedule()
    },
    initData() {
    },
    startUpdatingData() {
      this.updateAnimationData()
      this.timer = setInterval(this.updateAnimationData, 9000) // 每隔9秒刷新数据
    },
    updateAnimationData() {
      this.$store.dispatch('screen/gainAnimationData')
        .then(data => {
          this.playlist = this.playlist.concat(data)
        })
        .catch(error => {
          this.$message({
            message: error,
            type: 'error'
          })
        })
    },
    stopUpdatingData() {
      clearInterval(this.timer)
    },
    drawWaf() {

    },
    drawClient() {

    },
    drawSchedule() {

    },
    drawServer() {

    }
  }
}
</script>

<style>

</style>
