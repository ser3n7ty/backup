<template>
  <div ref="responseTimeChart" style="width: 600px; height: 400px;" />
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  LineChart,
  CanvasRenderer
])

export default {
  data() {
    return {
      xAxisData: [], // 存储横轴数据
      seriesData: [] // 存储折线图数据
    }
  },
  mounted() {
    this.initChart()
    this.updateChartData()// 初始化后立即更新数据
    setInterval(this.updateChartData, 3000) // 每隔3秒更新一次数据（模拟实时数据更新）
  },
  methods: {
    initChart() {
      this.responseTimeChart = echarts.init(this.$refs.responseTimeChart)

      const option = {
        title: {
          text: '平均响应时间趋势图'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}：{c}ms'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}ms'
          }
        },
        series: [
          {
            name: '平均响应时间',
            type: 'line',
            data: this.seriesData
          }
        ]
      }

      this.responseTimeChart.setOption(option)
    },
    updateChartData() {
      // 模拟实时数据更新
      const now = new Date()
      const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

      // 随机生成模拟数据
      const randomTime = Math.floor(Math.random() * 200) + 100

      // 更新数据
      this.xAxisData.push(time)
      this.seriesData.push(randomTime)

      // 限制数据长度，只保留最近的20个数据点
      if (this.xAxisData.length > 20) {
        this.xAxisData.shift()
        this.seriesData.shift()
      }

      // 更新图表
      this.responseTimeChart.setOption({
        xAxis: {
          data: this.xAxisData
        },
        series: [
          {
            data: this.seriesData
          }
        ]
      })
    }
  }
}
</script>

<style>
</style>
