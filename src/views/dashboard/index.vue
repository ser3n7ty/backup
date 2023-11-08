<template>
  <div class="dashboard">
    <span>监控信息面板</span>
    <div ref="charts" class="echarts" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default ({
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }

})
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
