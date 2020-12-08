import { reqroleList } from "../../util/request";
const state = {
  list: []
};
const mutations = {
  reqList(state, arr) {
    state.list = arr;
  }
};
const actions = {
    getroleList(context) {
        reqroleList().then(res => {
            context.commit("reqList", res.data.list);
        })
    }
};
const getters = {
    list(state) {
        return state.list
    }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
