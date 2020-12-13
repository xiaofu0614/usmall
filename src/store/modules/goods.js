import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { reqgoodsList } from "../../util/request";
const state = {
  // 商品分类列表list
  list: []
};
const mutations = {
  reqList(state, arr) {
    state.list = arr;
  }
};
const actions = {
  getgoodList(context) {
    reqgoodsList({}).then(res => {
      context.commit("reqList", res.data.list);
    });
  }
};
const getters = {
  list(state) {
    return state.list;
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
