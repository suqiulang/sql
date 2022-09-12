
import Vue from 'vue'
import Vuex from 'vuex'
import {get} from '@/utils/http'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    row:{},
    role:''
  },
  getters: {
  },
  mutations: {
    getRole(state,payload){
       state.role=payload
    }
  },
  actions: {
   async GetRole({commit}){
       const {role}=await get('/role')
       commit('getRole',role)
    }
  },
  modules: {
  }
})
