<template>
  <div ref="trafficChart" style="width: 600px; height: 400px;" />
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
      totalRequests: [], // 存储总请求数数据
      maliciousRequests: [] // 存储恶意请求数据
    }
  },
  mounted() {
    this.initChart()
    this.generateInitialData() // 初始化数据
    this.updateChartData() // 更新图表展示初始化数据
    // 模拟数据更新
    setInterval(this.updateChartData, 600000) // 每隔10分钟更新一次数据（模拟实时数据更新）
  },
  methods: {
    initChart() {
      this.trafficChart = echarts.init(this.$refs.trafficChart)

      // 图表配置
      const option = {
        title: {
          text: '流量统计折线图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['总请求', '恶意请求']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}次'
          }
        },
        series: [
          {
            name: '总请求',
            type: 'line',
            data: this.totalRequests
          },
          {
            name: '恶意请求',
            type: 'line',
            data: this.maliciousRequests,
            lineStyle: {
              color: 'red'
            },
            itemStyle: {
              color: 'red'
            }
          }
        ]
      }

      this.trafficChart.setOption(option)
    },
    generateInitialData() {
      // 生成初始数据
      for (let i = 0; i < 10; i++) {
        const now = new Date()
        const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

        // 模拟随机生成数据
        const total = Math.floor(Math.random() * 100) + 50 // 总请求数量（50-150）
        const malicious = Math.floor(Math.random() * 20) // 恶意请求数量（0-20）

        this.xAxisData.push(time)
        this.totalRequests.push(total)
        this.maliciousRequests.push(malicious)
      }
    },
    updateChartData() {
      // 更新数据
      const now = new Date()
      const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

      const total = Math.floor(Math.random() * 100) + 50 // 总请求数量（50-150）
      const malicious = Math.floor(Math.random() * 20) // 恶意请求数量（0-20）

      this.xAxisData.push(time)
      this.totalRequests.push(total)
      this.maliciousRequests.push(malicious)

      if (this.xAxisData.length > 20) {
        this.xAxisData.shift()
        this.totalRequests.shift()
        this.maliciousRequests.shift()
      }

      // 更新图表
      this.trafficChart.setOption({
        xAxis: {
          data: this.xAxisData
        },
        series: [
          {
            name: '总请求',
            data: this.totalRequests
          },
          {
            name: '恶意请求',
            data: this.maliciousRequests
          }
        ]
      })
    }
  }
}
</script>

<style>
/* 在这里可以添加样式 */
</style>
