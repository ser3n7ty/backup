<template>
  <div ref="radarChart" style="width: 600px; height: 400px;" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'SystemInformation',
  data() {
    return {
      // 示例数据
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
    this.renderChart()
  },
  methods: {
    renderChart() {
      const radarChart = echarts.init(this.$refs.radarChart)

      const option = {
        title: {
          text: '系统性能'
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

      radarChart.setOption(option)
    }
  }
}
</script>

<style>
/* 在这里可以添加样式 */
</style>
