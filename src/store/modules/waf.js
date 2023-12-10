import { add, queryInfo, updateWaf, deleteWaf, changeEnable, queryLog } from '@/api/waf'

const state = {}

const mutations = {}

// TODO:优化 resolve()
const actions = {

  // 导入 Waf
  // data: {name, ip, port, configUrl, desc}
  addWaf(data) {
    return new Promise((resolve, reject) => {
      add(data)
        .then(response => {
          response.code = undefined
          if (response.code !== 200) {
            reject('Something error while importing new')
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
  queryWafInfo(data) {
    return new Promise((resolve, reject) => {
      queryInfo(data)
        .then(response => {
          if (response.code === 200) {
            resolve(response.data)
          } else {
            reject('Something error while querying all new')
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 更新 new 基本信息
  // data: { name, ip, port, configUrl, desc}
  updateWaf(data) {
    return new Promise((resolve, reject) => {
      updateWaf(data)
        .then(response => {
          if (response.code !== 200) {
            reject('Something error while updating new info')
            this.$message({
              message: response.msg,
              type: 'error'
            })
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 删除 new
  deleteWaf(id) {
    return new Promise((resolve, reject) => {
      deleteWaf(id)
        .then(response => {
          if (response.code !== 200) {
            reject('Something error while deleting new')
            this.$message({
              message: response.msg + ':' + response.status,
              type: 'error'
            })
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 改变 new 使用状态
  // enable: 1 表示启用，0 表示禁用
  changeEnable({ id, enable }) {
    return new Promise((resolve, reject) => {
      changeEnable({ id, enable })
        .then(response => {
          response.code = undefined
          if (response.code !== 200) {
            reject('Something error while changing new status')
            this.$message({
              message: response.msg + ':' + response.status,
              type: 'error'
            })
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  queryWafLog({ pageNum, pageSize, search }) {
    return new Promise((resolve, reject) => {
      queryLog(({ pageNum, pageSize, search }))
        .then((response) => {
          response.code = undefined
          if (response.code !== 200) {
            reject('Something error while querying new log')
            this.$message({
              message: response.msg + ':' + response.status,
              type: 'error'
            })
          } else {
            resolve(response.data)
          }
        })
        .catch(error => {
          this.$message({
            message: error,
            type: 'error'
          })
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
