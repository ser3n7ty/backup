import { add, query, updateWaf, deleteWaf, changeEnable } from '@/api/waf'

const state = {}

const mutations = {}

const actions = {

  // 导入 Waf
  // data: {name, ip, port, configUrl, desc}
  addWaf({ commit }, data) {
    return new Promise((resolve, reject) => {
      add(data)
        .then(response => {
          if (response.code !== 200) {
            reject('Something error while importing waf')
          } else {
            resolve()
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 查询某页 Waf 信息
  // data: {pageNum, pageSize, search}
  queryAllWaf({ commit }, data) {
    return new Promise((resolve, reject) => {
      query(data)
        .then(({ code, data }) => {
          if (code === 200) {
            resolve(data)
          } else {
            reject('Something error while querying all waf')
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 更新 waf 基本信息
  // data: { name, ip, port, configUrl, desc}
  updateWaf({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateWaf(data)
        .then(response => {
          if (response.code !== 200) {
            reject('Something error while updating waf info')
          } else {
            resolve()
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 删除 waf
  deleteWaf({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteWaf(id)
        .then(response => {
          if (response.code !== 200) {
            reject('Something error while deleting waf')
          } else {
            resolve()
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 改变 waf 使用状态
  // enable: 1 表示启用，0 表示禁用
  changeEnable({ commit }, enable) {
    return new Promise((resolve, reject) => {
      changeEnable(enable)
        .then(response => {
          if (response.code !== 200) {
            reject('Something error while changing waf status')
          } else {
            resolve()
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
