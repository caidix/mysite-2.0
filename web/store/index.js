import Vuex from "vuex";
const store = new Vuex.Store({
  state: () => ({
    pageLoading: true,
  }),

  getters: {
    getPageLoading: (state) => state.pageLoading,
  },

  mutations: {
    changePageStatus(state, status) {
      state.pageLoading = status;
    },
  },

  actions: {},
});

// 需要返回一个函数
export default () => {
  return store;
};
