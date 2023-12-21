import { gainSystemInfo, gainTrafficData, gainAverageTime, gainWafNumber, gainAnimationData, initCart, getLogs } from '@/api/screen'

const state = {}

const mutations = {}

const actions = {
  // 获取 screen/SystemInfo 组件需要的 5 个性能数据
  gainSystemInfo() {
    return new Promise((resolve, reject) => {
      gainSystemInfo()
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '获取系统数据出错'))
        })
    })
  },
  // 获取 screen/TrafficStatistics 组件需要的 总请求数 和 恶意请求数
  gainTrafficData() {
    return new Promise((resolve, reject) => {
      gainTrafficData()
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '获取请求统计信息出错'))
        })
    })
  },
  gainAverageTime() {
    return new Promise((resolve, reject) => {
      gainAverageTime()
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '获取平均响应时间出错'))
        })
    })
  },
  gainWafNumber() {
    return new Promise((resolve, reject) => {
      gainWafNumber()
        .then(response => {
          if (response.code !== 200) {
            reject('Something error while gaining new number')
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  gainAnimationData() {
    return new Promise((resolve, reject) => {
      gainAnimationData()
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '获取动画数据出错'))
        })
    })
  },
  initCart() {
    return new Promise((resolve, reject) => {
      initCart()
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '初始化动画出错'))
        })
    })
  },
  getLogs() {
    return new Promise((resolve, reject) => {
      getLogs()
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '获取显示日志数据出错'))
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
