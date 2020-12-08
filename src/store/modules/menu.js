import { reqmenuList } from "../../util/request";
const state = {
    // 菜单列表list
    list:[]
}
const mutations = {
    reqList(state, arr) {
        state.list=arr
    }
}
const actions = {
    getmenuList(context) {
        reqmenuList({ istree: true }).then(res => {
          context.commit("reqList", res.data.list);
        });
    }
}
const getters = {
    list(state) {
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}