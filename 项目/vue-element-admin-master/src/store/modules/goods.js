import { getAllCates } from "@/api/goods";

const state = {
  cates: []
}

const mutations = {
  SetCates(state, list) {
    state.cates = list
  }
}

const actions = {
  getCates({ commit }) {
    getAllCates().then(res => {
      if (res.data.list) {
        commit("SetCates", res.data.list)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}