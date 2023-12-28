<template>
  <div ref="trafficChart" style="width: 500px; height: 300px" />
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
      timer: null,
      data: null,
      xAxisData: [], // 存储横轴数据
      totalRequests: [], // 存储总请求数数据
      maliciousRequests: [] // 存储恶意请求数据
    }
  },
  mounted() {
    this.initChart()
    // TODO：上线时使用
    this.startUpdatingData()
  },
  beforeDestroy() {
    this.stopUpdatingData()
  },
  methods: {
    initChart() {
      this.trafficChart = echarts.init(this.$refs.trafficChart)

      // 图表配置
      const option = {
        title: {
          text: '流量统计'
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
        ],
        grid: {
          left: '8%',
          containLabel: true
        }
      }

      this.trafficChart.setOption(option)
    },
    startUpdatingData() {
      this.updateChartData() // 更新图表展示初始化数据
      this.timer = setInterval(this.updateChartData, 3000) // 每隔10分钟更新一次数据（模拟实时数据更新）
    },
    updateChartData() {
      // 更新数据
      const now = new Date()
      const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

      const total = Math.floor(Math.random() * 100) + 50 // 总请求数量（50-150）
      const malicious = Math.floor(Math.random() * 20) // 恶意请求数量（0-20）

      // 调用 api 获取最新数据
      // const total = this.data['total']
      // const malicious = this.data['malicious']

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
    },
    gainTrafficData() {
      this.$store.dispatch('screen/gainTrafficData')
        .then(res => {
          this.data = res.data
        })
        .catch(error => {
          this.$message.error(error.msg | '获取统计数据出错')
        })
    },
    stopUpdatingData() {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
