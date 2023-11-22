<template>
  <div ref="radarChart" style="width: 400px; height: 300px;" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'SystemInformation',
  data() {
    return {
      radarChart: null,
      radarData: [
        { name: '负载均衡', max: 100 },
        { name: '内存', max: 100 },
        { name: '带宽', max: 100 },
        { name: '磁盘', max: 100 },
        { name: 'CPU', max: 100 }
      ],
      indicatorValues: [70, 80, 90, 60, 70] // 用于表示各个维度的值
    }
  },
  mounted() {
    this.initRenderChart()
    // TODO：上线时使用
    // this.updateData()
    // setInterval(this.updateData, 600000) // 十分钟更新一次
  },
  methods: {
    initRenderChart() {
      this.radarChart = echarts.init(this.$refs.radarChart)
      this.renderChart()
    },
    renderChart() {
      const option = {
        title: {
          text: '系统性能'
        },
        // 设置大小
        grid: {
          width: '38%',
          height: '38%'
        },
        tooltip: {},
        radar: {
          indicator: this.radarData
        },
        series: [{
          name: '维度分析',
          type: 'radar',
          data: [
            {
              value: this.indicatorValues,
              name: '使用率'
            }
          ]
        }]
      }
      this.radarChart.setOption(option)
    },
    updateData() {
      this.$store.dispatch('screen/gainSystemInfo')
        .then(data => {
          this.indicatorValues[0] = data['loadBalancing']
          this.indicatorValues[1] = data['memory']
          this.indicatorValues[2] = data['storage']
          this.indicatorValues[3] = data['bandwidth']
          this.indicatorValues[4] = data['cpu']
        })
        .catch(error => {
          this.$$message({
            message: error,
            type: 'error'
          })
        })
    },
    // 增量更新
    updateChartWithData() {
      this.radarChart.setOption({
        series: [{
          data: [{
            value: this.indicatorValues,
            name: '使用率'
          }]
        }]
      })
    }
  }
}
</script>
