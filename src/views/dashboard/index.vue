<template>
  <!-- TODO: CPU 占用率，内存占用率，总览信息， -->
  <div class="dashboard">
    <h2 class="dashboard-title">调度系统监控信息</h2>
    <div class="pie-container">
      <v-chart class="chart" :option="option1" autoresize />
      <v-chart class="chart" :option="option2" autoresize />
    </div>
    <div class="overview">
      {{ data.length }}
    </div>
  </div>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref } from '@vue/composition-api'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

export default ({
  name: 'Dashboard',
  components: {
    VChart
  },
  data() {
    return {
      data: ''
    }
  },
  provide: {
    [THEME_KEY]: 'light'
  },
  // TODO：上线时使用
  // created() {
  //   this.load()

  //   // 设置定时器，每隔一分钟调用 load()
  //   setInterval(this.load, 60000)
  // },
  setup() {
    const option1 = ref({
      title: {
        text: 'CPU 占用率',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/> {b}: {c} ({d}%)'
      },
      // 示意
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Search Engines']
      },
      // 饼图本体
      series: [
        {
          name: 'CPU 占用率',
          type: 'pie',
          radius: '48%',
          center: ['50%', '40%'],
          data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 451, name: 'Search Engines' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.5)'
            }
          }
        }
      ]
    })
    const option2 = ref({
      title: {
        text: '内存占用率',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/> {b}: {c} ({d}%)'
      },
      // 示意
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Search Engines']
      },
      // 饼图本体
      series: [
        {
          name: '内存占用率',
          type: 'pie',
          radius: '48%', // 控制饼图的半径
          center: ['50%', '40%'],
          data: [
            { value: 141, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 417, name: 'Search Engines' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.5)'
            }
          }
        }
      ]
    })

    return { option1, option2 }
  },
  methods: {
    load() {
      this.$store
        .dispatch('waf/queryWafInfo', 1, 100, '')
        .then((res) => {
          if (res.code === 200) {
            this.data = res.data.list
            // 提取name和cpu
            const nameAndCpuPairs = res.data.list.map(item => {
              return { name: item.name, value: item.cpu }
            })

            // 提取name和memory
            const nameAndMemoryPairs = res.data.list.map(item => {
              return { name: item.name, value: item.memory }
            })

            // 更新option1的数据
            this.option1.legend.data = nameAndCpuPairs.map(item => item.name)
            this.option1.series[0].data = nameAndCpuPairs

            // 更新option2的数据
            this.option2.legend.data = nameAndMemoryPairs.map(item => item.name)
            this.option2.series[0].data = nameAndMemoryPairs
          }
        })
        .catch(error => {
          this.$message({
            message: error,
            type: 'error'
          })
        })
    }
  }
})
</script>

<style scoped>
.chart {
  flex: 1;
  height: 100vh;
}
.dashboard-title {
  text-align: center;
  margin-top: 20px;
  z-index: 1;
}
.chart {
  flex: 1;
  max-height: 80vh;
}
.pie-container {
  display: flex;
  justify-self: space-between;
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
