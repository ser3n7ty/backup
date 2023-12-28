import { changeWeight, uploadImage, modifyProtectionMode, acquireSiteInfo, updateSiteInfo, deleteSite } from '@/api/scheduler'

const state = {}

const mutations = {}

const actions = {
  // 修改 waf 的选择权重
  changeWeight(data) {
    return new Promise((resolve, reject) => {
      changeWeight(data)
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '修改权重出错'))
        })
    })
  },

  uploadImage(data) {
    return new Promise((resolve, reject) => {
      uploadImage(data)
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '上传镜像文件失败'))
        })
    })
  },
  modifyProtectionMode(data) {
    return new Promise((resolve, reject) => {
      modifyProtectionMode(data)
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '修改防护模式失败'))
        })
    })
  },
  acquireSiteInfo(data) {
    return new Promise((resolve, reject) => {
      acquireSiteInfo(data)
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '获取网站信息失败'))
        })
    })
  },
  updateSiteInfo(data) {
    return new Promise((resolve, reject) => {
      updateSiteInfo(data)
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '更新站点失败'))
        })
    })
  },
  deleteSite(data) {
    return new Promise((resolve, reject) => {
      deleteSite(data)
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          reject(new Error(error.message || '删除站点失败'))
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
