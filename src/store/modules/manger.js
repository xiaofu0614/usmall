import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { requserList, requserCount } from "../../util/request";
const state = {
  list: [],
  total: 0,
  size: 2,  //页数
  page: 1  //第几页
};
const mutations = {
  reqList(state, arr) {
    state.list = arr;
  },
  reqCount(state, num) {
    state.total = num;
  },
  reqpages(state, page) {
    state.page = page;
  }
};
const actions = {
  getmangerList(context) {
    requserList({
      page: context.state.page,
      size: context.state.size
    }).then(res => {
      context.commit("reqList", res.data.list);
    });
  },
  getmangerCount(context) {
    requserCount().then(res => {
      context.commit("reqCount", res.data.list[0].total);
    });
  },
  getmangerPages(context, page) {
      context.commit("reqpages", page);
      context.dispatch("getmangerList");
  }
};
const getters = {
  list(state) {
    return state.list;
  },
  total(state) {
    return state.total;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
