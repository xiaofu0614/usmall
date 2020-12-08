import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    list: sessionStorage.getItem('list')?JSON.parse(sessionStorage.getItem('list')):{},//请求回来的数据

}
const mutations = {
    changeList(state, obj) {
        state.list = obj
        sessionStorage.setItem('list',JSON.stringify(obj))
    },

}
const actions = {
    requestuserList(context,obj) {
        // console.log(obj)
       context.commit('changeList',obj)
    },

}
const getters = {
    list(state) {
        return state.list
    },

}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}