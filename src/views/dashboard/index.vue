<template>
  <div class="container">
    <div class="lf">
      <div class="lf-top">
        <map-chart />
      </div>
    </div>
    <div class="lf-btm">
      <log-display />
    </div>
    <div class="rg">
      <div class="rf-top">
        <traffic-statistics />
      </div>
      <div class="rg-btm">
        <request-time />
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import RequestTime from './components/RequestTime.vue'
import MapChart from './components/MapChart.vue'
import TrafficStatistics from './components/TrafficStatistics.vue'
import LogDisplay from './components/LogDisplay.vue'

export default {
  name: 'Dashboard',
  router,
  components: {
    RequestTime,
    MapChart,
    TrafficStatistics,
    LogDisplay
  },
  data() {
    return {
    }
  },
  methods: {
  }

}

</script>

<style>
@import "./index.scss";
</style>
