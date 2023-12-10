import { gainSystemInfo, gainTrafficData, gainAverageTime, gainWafNumber, gainAnimationData, initCart, getLogs } from '@/api/screen'

const state = {}

const mutations = {}

const actions = {
  // 获取 screen/SystemInfo 组件需要的 5 个性能数据
  gainSystemInfo() {
    return new Promise((resolve, reject) => {
      gainSystemInfo()
        .then(response => {
          response.code = undefined
          if (response.code !== 200) {
            reject('Something error while gaining system info')
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取 screen/TrafficStatistics 组件需要的 总请求数 和 恶意请求数
  gainTrafficData() {
    return new Promise((resolve, reject) => {
      gainTrafficData()
        .then(response => {
          if (response.code !== 200) {
            reject('Something error while gaining traffic statistics')
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  gainAverageTime() {
    return new Promise((resolve, reject) => {
      gainAverageTime()
        .then(response => {
          if (response.code !== 200) {
            reject('Something error while gaining average address time')
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(error)
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
        .then()(response => {
          if (response.code !== 200) {
            reject('Something error while gaining animation data')
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  initCart() {
    return new Promise((resolve, reject) => {
      initCart()
        .then()(response => {
          if (response.code !== 200) {
            reject('Something error while gaining initial data')
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getLogs() {
    return new Promise((resolve, reject) => {
      getLogs()
        .then()(response => {
          if (response.code !== 200) {
            reject('Something error while getting logs')
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(error)
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
