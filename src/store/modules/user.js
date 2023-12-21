/* eslint-disable no-throw-literal */
import { login, register, query, getUserInfo, deleteUser, updateInfo, changePassword, logout, sendVerifyCode, changeCurrentPassword } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 定义 token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

// TODO:统一错误处理的逻辑
const actions = {
  // user login
  login({ commit }, info) {
    return new Promise((resolve, reject) => {
      login({ info })
        .then(response => {
          const { token, userInfo } = response.data
          commit('SET_TOKEN', token)
          commit('SET_ID', userInfo.id)
          commit('SET_USERNAME', userInfo.username)
          commit('SET_EMAIL', userInfo.email)
          commit('SET_ROLES', userInfo.roles)
          commit('SET_PERMISSIONS', userInfo.permissions)
          setToken(token)
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },

  // user register
  register({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      register(userInfo)
        .then(response => {
          if (response.code !== 200) {
            const { data } = response
            commit('SET_TOKEN', data.token)
            setToken(data.token)
            resolve()
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // query all users
  query({ pageNum, pageSize, search }) {
    return new Promise((resolve, reject) => {
      query({ pageNum, pageSize, search })
        .then(({ code, list }) => {
          if (code === 200) {
            resolve(list)
          } else {
            throw '网络请求出错！！'
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 查询当前用户信息
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(response => {
          const { data } = response.data
          if (!data) {
            return reject('Something error while getting current user info')
          }

          commit('SET_ID', data.id)
          commit('SET_USERNAME', data.name)
          commit('SET_EMAIL', data.email)
          commit('SET_ROLES', data.roles)
          commit('SET_PERMISSIONS', data.permissions)

          resolve(data)
        })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // 删除用户
  deleteUser(id) {
    return new Promise((resolve, reject) => {
      deleteUser(id)
        .then(response => {
          if (response.code !== 200) {
            reject('Something error while deleting user')
            this.$message({
              message: response.msg + ':' + response.status,
              type: 'error'
            })
          } else {
            resolve()
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 更新某个用户信息
  updateInfo(form) {
    return new Promise((resolve, reject) => {
      updateInfo(form)
        .then(response => {
          if (response.code === 200) {
            resolve(response)
          } else {
            reject(new Error(response.msg + ':' + response.status))
          }
        })
        .catch(error => {
          reject(new Error(error.message || '更新用户信息出错'))
        })
    })
  },

  // 修改用户密码
  changePassword({ newPassword }) {
    return new Promise((resolve, reject) => {
      changePassword(newPassword)
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          }
        })
        .catch(error => {
          reject(new Error(error.message || '修改密码出错'))
        })
    })
  },

  // 修改当前用户的密码
  changeCurrentPassword({ oldPassword, newPassword }) {
    return new Promise((reject) => {
      changeCurrentPassword(oldPassword, newPassword)
        .then(response => {
          if (response.code !== 200) {
            reject(new Error(response.msg + ':' + response.status))
          }
        })
        .catch(error => {
          reject(new Error(error.message || '修改密码出错'))
        })
    })
  },

  // 发送验证码
  sendVerifyCode(email) {
    return new Promise((resolve, reject) => {
      sendVerifyCode(email)
        .then(response => {
          if (response.code !== 200) {
            reject('Something error while sending auth code')
            this.$message({
              message: response.msg + ':' + response.status,
              type: 'error'
            })
          } else {
            resolve()
          }
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

