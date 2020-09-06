import { getItemsFromBase } from '../dbAPI/items/getItems'
import { createItemInBase } from '../dbAPI/items/createItem'
import { removeItemsFromBase } from '../dbAPI/items/removeItems'

const state = {
  items: []
}

const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

const actions = {
  getItems ({ commit }) {
    getItemsFromBase().then(items => {
      commit('setItems', items)
    });
  },
  
  createItem ({ commit, dispatch }, item) {
    createItemInBase(item).then(result => {
      dispatch('getItems')
    });
  },
  removeItems ({ commit, dispatch }, items) {
    removeItemsFromBase(items).then(result => {
      dispatch('getItems')
    });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
