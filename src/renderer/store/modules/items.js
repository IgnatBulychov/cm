import { getItemsFromBase } from '../dbAPI/items/getItems'
import { createItemInBase } from '../dbAPI/items/createItem'
import { removeItemsFromBase } from '../dbAPI/items/removeItems'

import { getFoldersFromBase } from '../dbAPI/items/getFolders'
import { createFolderInBase } from '../dbAPI/items/createFolder'
import { removeFoldersFromBase } from '../dbAPI/items/removeFolders'

const state = {
  items: [],
  folders: [],
  currentFolder: null
}

const getters = {
  /*
  getFoldersAndItems (state) {
    return state.folders.concat(state.items)
  }
  */
}

const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setFolders (state, folders) {
    state.folders = folders
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
  },


  getFolders ({ commit }, parent) {
    getFoldersFromBase(parent).then(folders => {
      commit('setFolders', folders)
    });
  },  
  createFolder ({ commit, dispatch }, folder) {
    createFolderInBase(folder).then(result => {
      dispatch('getFolders', "root")
    });
  },
  removeFolders ({ commit, dispatch }, folders) {
    removeFoldersFromBase(folders).then(result => {
      dispatch('getFolders', "root")
    });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
