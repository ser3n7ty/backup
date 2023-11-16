<template>
  <div class="screen-container">
    <div ref="screenRef" class="screen-content">
      <div class="screen-header">
        <div class="header-lf">
          <span class="header-index" @click="Jump">首页</span>
        </div>
        <div class="header-ct">
          <div class="header-ct-title">
            <span>拟态调度可视化平台</span>
          </div>
        </div>
        <div class="header-ri">
          <span class="header-time">当前时间：{{ time }}</span>
        </div>
      </div>
      <div class="screen-main">
        <div class="screen-lf">
          <div class="screen-top">
            <div class="screen-chart">
              <SystemInformation />
            </div>
          </div>
          <div class="screen-btm">
            <div class="logDisplay">
              <LogDisplay />
            </div>
          </div>
        </div>
        <div class="screen-ct">
          <div class="screen-map">
            <div class="screen-map-title">
              拟态架构展示
            </div>
            <MapChart />
          </div>
          <div class="ct-btm">
            <div class="foot">
              <Foot />
            </div>
          </div>
        </div>
        <div class="screen-rg">
          <div class="screen-top">
            <div class="statistics">
              <TrafficStatistics />
            </div>
          </div>
          <div class="screen-btm">
            <div class="screen-chart">
              <RequestTime />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></template>

<script>
import router from '@/router'
import SystemInformation from './components/SystemInformation.vue'
import RequestTime from './components/RequestTime.vue'
import MapChart from './components/MapChart.vue'
import Foot from './components/Foot.vue'
import TrafficStatistics from './components/TrafficStatistics.vue'
import LogDisplay from './components/LogDisplay.vue'

export default {
  name: 'Screen',
  router,
  components: {
    SystemInformation,
    RequestTime,
    MapChart,
    Foot,
    TrafficStatistics,
    LogDisplay
  },
  data() {
    return {
      time: '',
      timer: null
    }
  },
  created() {
    this.nowTime()
    console.log(this.$router)
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  methods: {
    nowTime() {
      this.timeFormate(new Date())
      this.timer = setTimeout(this.nowTime, 1000)
    },
    timeFormate(timeStamp) {
      const year = new Date(timeStamp).getUTCFullYear()
      const month = new Date(timeStamp).getMonth() + 1 < 10
        ? '0' + (new Date(timeStamp).getMonth() + 1)
        : new Date(timeStamp).getMonth() + 1
      const day = new Date(timeStamp).getDate() + 1 < 10
        ? '0' + (new Date(timeStamp).getDate() + 1)
        : new Date(timeStamp).getDate() + 1
      const hh = new Date(timeStamp).getHours() + 1 < 10
        ? '0' + (new Date(timeStamp).getHours() + 1)
        : new Date(timeStamp).getHours() + 1
      const mm = new Date(timeStamp).getMinutes() + 1 < 10
        ? '0' + (new Date(timeStamp).getMinutes() + 1)
        : new Date(timeStamp).getMinutes() + 1
      const ss = new Date(timeStamp).getSeconds() + 1 < 10
        ? '0' + (new Date(timeStamp).getSeconds() + 1)
        : new Date(timeStamp).getSeconds() + 1
      this.time = year + '年' + month + '月' + day + '日' + hh + '时' + mm + '分' + ss + '秒'
    },
    Jump() {
      this.$router.push('/dashboard')
    }
  }

}

</script>

<style>
@import "./index.scss"
</style>
