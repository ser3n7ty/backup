import { add, queryInfo, updateWafInfo, deleteWaf, changeWafStatus, queryLog } from '@/api/waf'

const state = {}

const mutations = {}

const actions = {

  // 导入 Waf
  // data: {name, ip, port, configUrl, desc}
  addWaf(data) {
    return new Promise((resolve, reject) => {
      add(data)
        .then(response => {
          response.code = undefined
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          }
        })
        .catch(error => {
          reject(new Error(error.message || '导入 Waf 出错'))
        })
    })
  },
  // 查询某页 Waf 信息
  // data: {pageNum, pageSize, search}
  queryWafInfo(data) {
    return new Promise((resolve, reject) => {
      queryInfo(data)
        .then(response => {
          if (response.code === 200) {
            resolve(response.data)
          } else {
            reject(new Error(response.msg + ':' + response.status))
          }
        })
        .catch(error => {
          reject(new Error(error.message || '查询 Waf 出错'))
        })
    })
  },
  // 更新 Waf 基本信息
  // data: { name, ip, port, configUrl, desc}
  updateWafInfo(form) {
    return new Promise((resolve, reject) => {
      updateWafInfo(form)
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '更新 Waf 基本信息出错'))
        })
    })
  },
  // 删除 new
  deleteWaf(id) {
    return new Promise((resolve, reject) => {
      deleteWaf(id)
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '移除 Waf 出错'))
        })
    })
  },

  // 改变 Waf 状态
  // op: 0 上线， 1 下线
  changeWafStatus({ id, op }) {
    return new Promise((resolve, reject) => {
      changeWafStatus({ id, op })
        .then(response => {
          response.code = null
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '更新 Waf 状态出错'))
        })
    })
  },

  // Query 参数
  queryWafLog({ pageNum, pageSize, search }) {
    return new Promise((resolve, reject) => {
      queryLog(({ pageNum, pageSize, search }))
        .then((response) => {
          response.code = null
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '请求日志出错'))
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
