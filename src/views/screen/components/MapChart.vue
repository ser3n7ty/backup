<template>
  <div class="container">
    <canvas id="cartoon"> 您的浏览器不支持 canvas </canvas>
  </div>
</template>

<script>

export default {
  name: 'MapChart',
  data() {
    return {
      timer: null,
      requestIp: null,
      wafArr: null
    }
  },
  mounted() {
    this.initData()
    // this.startUpdatingData()
  },
  beforeDestroy() {
    this.stopUpdatingData()
  },
  methods: {
    initData() {
      this.requestIp = '210.56.12.54'
      this.wafArr = [
        [
          {
            wafName: 'a',
            wafIp: '192.168.2.1',
            addrResult: '0'
          }
        ],
        [
          {
            wafName: 'b',
            wafIp: '192.168.2.2',
            addrResult: '1'
          }
        ],
        [
          {
            wafName: 'c',
            wafIp: '192.168.2.3',
            addrResult: null
          }
        ]
      ]
    },
    startUpdatingData() {
      this.updateAnimationData()
      this.timer = setInterval(this.updateAnimationData, 9000) // 每隔9秒刷新数据
    },
    updateAnimationData() {
      this.$store.dispatch('screen/gainAnimationData')
        .then(data => {
          this.requestIp = data.requestIp
          this.wafArr = data.wafArray
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
    }
  }
}
</script>

<style>

</style>
