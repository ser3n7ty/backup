<template>
  <!-- TODO: CPU 占用率，内存占用率 -->
  <div class="dashboard">
    <h3 class="dashboard-title">调度系统监控信息</h3>
    <div class="pie">
      <v-chart class="chart" :option="option1" autoresize />
      <v-chart class="chart" :option="option2" autoresize />
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
  provide: {
    [THEME_KEY]: 'light'
  },
  // TODO：组件挂载后立即查询监测数据
  // TODO：设置定时器自动更新数据
  created() {

  },
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
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: 'DIrect' },
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
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: 'DIrect' },
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

    return { option1, option2 }
  }
})
</script>

<style scoped>
.chart {
  height: 100vh;
}
.dashboard-title {
  text-align: center;
  margin-top: 20px;
  z-index: 1;
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
