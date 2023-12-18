<template>
  <div ref="responseTimeChart" style="width: 500px; height: 300px;" />
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
      timer: null, // 添加 timer 属性存储计时器
      data: null,
      xAxisData: [], // 存储横轴数据
      seriesData: [] // 存储折线图数据
    }
  },
  mounted() {
    this.initChart()
    this.startUpdatingData()
  },
  beforeDestroy() {
    this.stopUpdatingData()
  },
  methods: {
    initChart() {
      this.responseTimeChart = echarts.init(this.$refs.responseTimeChart)
      const option = {
        title: {
          text: '平均响应时间'
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
        ],
        grid: {
          left: '8%',
          containLabel: true
        }
      }

      this.responseTimeChart.setOption(option)
    },
    startUpdatingData() {
      this.updateChartData()// 初始化后立即更新数据
      this.timer = setInterval(this.updateChartData, 3000) // 更新一次数据（模拟实时数据更新）
    },
    updateChartData() {
      const now = new Date()
      const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

      // 随机生成模拟数据
      const aveTime = Math.floor(Math.random() * 100) + 80

      // TODO：调用 api 获取最新数据
      // if (this.data === null) {
      //   const aveTime = this.seriesData[this.seriesData.length - 1]
      // } else {
      //   const aveTime = this.data
      // }

      // 更新数据
      this.xAxisData.push(time)
      this.seriesData.push(aveTime)

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
    },
    gainData() {
      this.$store.dispatch('screen/gainAverageTime')
        .then(data => {
          this.data = data
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
