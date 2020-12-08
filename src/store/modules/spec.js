import Vue from 'vue'
import Vuex from 'vuex'
import { reqspescList } from "../../util/request";
Vue.use(Vuex)

const state = {
    list:[]
}
const mutations = {
    reqlist(state, arr) {
        state.list = arr
    }
}
const actions = {
    getspecList(context) {
        reqspescList({
            size:5,
            page:1
        }).then(res => {
            let arr = res.data.list
            arr.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
            });
            context.commit("reqlist", arr);
        });
    }
}
const getters = {
    list(state) {
        return state.list
    }
}

export default ({
    state,
    mutations,
    actions,
    getters,
    namespaced:true
})