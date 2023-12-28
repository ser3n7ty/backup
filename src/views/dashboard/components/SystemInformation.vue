<template>
  <div ref="barChart" style="width: 400px; height: 300px;" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'SystemInformation',
  data() {
    return {
      timer: null,
      barChart: null,
      xAxisData: ['负载均衡', '内存', '磁盘', 'CPU'], // X 轴数据
      indicatorValues: [70, 80, 90, 60] // 用于表示各个维度的值
    }
  },
  mounted() {
    this.initRenderChart()
    // TODO：上线时使用
    // this.startUpdatingData()
  },
  beforeDestroy() {
    this.stopUpdatingData()
  },
  methods: {
    initRenderChart() {
      this.barChart = echarts.init(this.$refs.barChart)
      this.renderChart()
    },
    renderChart() {
      const option = {
        title: {
          text: '系统性能'
        },
        tooltip: {},
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: this.xAxisData
        },
        grid: {
          left: '8%', // 调整图表向右偏移
          containLabel: true // 自动计算标签宽度
        },
        series: [{
          type: 'bar',
          data: this.indicatorValues,
          barWidth: 20
        }]
      }
      this.barChart.setOption(option)
    },
    startUpdatingData() {
      this.updateData()
      this.timer = setInterval(this.updateData, 600000) // 十分钟更新一次
    },
    updateData() {
      this.$store.dispatch('screen/gainSystemInfo')
        .then(res => {
          this.indicatorValues[0] = res.data['loadBalancing']
          this.indicatorValues[1] = res.data['memory']
          this.indicatorValues[2] = res.data['storage']
          this.indicatorValues[4] = res.data['cpu']
          this.updateChartWithData() // 更新柱形图数据
        })
        .catch(error => {
          this.$$message({
            message: error,
            type: 'error'
          })
        })
    },
    updateChartWithData() {
      this.barChart.setOption({
        series: [{
          data: this.indicatorValues
        }]
      })
    },
    stopUpdatingData() {
      clearInterval(this.timer)
    }
  }
}
</script>
