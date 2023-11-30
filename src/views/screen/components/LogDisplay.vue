<template>
  <div class="container">
    <div class="header">
      <table>
        <thead>
          <th>访问时间</th>
          <th>源IP</th>
          <th>处理模式</th>
          <th>处理结果</th>
        </thead>
      </table>
    </div>
    <br>
    <div class="display">
      <vue-seamless-scroll
        ref="seamlessScroll"
        :data="listData"
        :class-option="classOption"
        class="warp"
      >
        <ul class="item">
          <li v-for="(item, index) in listData" :key="index" :class="{ 'intercepted': item.result === '1' }">
            <span class="communal" v-text="item.time" />
            <span class="communal" v-text="item.ip" />
            <span class="communal" v-text="getPattern(item.pattern)" />
            <span class="communal" v-text="getResult(item.result)" />
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  name: 'Example10Basic',
  components: {
    vueSeamlessScroll
  },
  data() {
    return {
      interval: null,
      classOption: {
        step: 0.1,
        waitTime: 2000,
        hoverStop: true,
        direction: 1,
        limitMoveNum: 6,
        singleHeight: 30
      },
      listData: [
        {
          'time': '2023-12-12 15:45',
          'ip': '192.65.12.122',
          pattern: 0,
          result: '1'
        }, {
          'time': '2023-12-12 15:45',
          'ip': '192.65.12.122',
          pattern: 0,
          result: '1'
        }, {
          'time': '2023-12-12 15:45',
          'ip': '192.65.12.122',
          pattern: 0,
          result: '1'
        }, {
          'time': '2023-12-12 15:45',
          'ip': '192.65.12.122',
          pattern: 0,
          result: '1'
        }, {
          'time': '2023-12-12 15:45',
          'ip': '192.65.12.122',
          pattern: 0,
          result: '1'
        }, {
          'time': '2023-12-12 15:45',
          'ip': '192.65.12.122',
          pattern: 0,
          result: '1'
        }, {
          'time': '2023-12-12 15:45',
          'ip': '192.65.12.122',
          pattern: 0,
          result: '1'
        }, {
          'time': '2023-12-12 15:45',
          'ip': '192.65.12.122',
          pattern: 0,
          result: '1'
        }, {
          'time': '2023-12-12 15:45',
          'ip': '192.65.12.122',
          pattern: 0,
          result: '1'
        }]
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      console.log('追加数据')
      const data = [
        {
          'time': '2023-12-12 15:45',
          'ip': '192.65.12.122',
          pattern: 0,
          result: '0'
        },
        {
          'time': '2023-12-12 15:45',
          'ip': '192.65.12.122',
          pattern: 0,
          result: '0'
        }
      ]
      // this.fetchLogs()
      // this.listData = this.listData.concat(this.fetchData)
      this.listData = this.listData.concat(data)
      this.$refs.seamlessScroll.reset()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    getPattern(pattern) {
      return pattern === 0 ? '并行' : '串行'
    },
    getResult(result) {
      return result === '0' ? '放行' : '拦截'
    }
    // fetchLogs() {
    //   this.$store.dispatch('screen/getLogs')
    //     .then(data => {
    //       this.fetchData = data
    //     })
    // }
  }
}
</script>

<style lang="scss" scoped>
  .warp {
    height: 270px;
    width: 360px;
    margin: 0 auto;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      li,
      a {
        display: block;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        &.intercepted {
          color: red;
        }
      }
    }
  }
</style>
