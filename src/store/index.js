import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import waf from './modules/waf'
import screen from './modules/screen'
import scheduler from './modules/scheduler'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    waf,
    screen,
    scheduler
  },
  getters
})

export default store
