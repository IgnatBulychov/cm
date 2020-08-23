
const remote = require('electron').remote
const application = remote.app

var Datastore = require('nedb')
var dbItems = new Datastore({ filename: `${application.getPath('userData')}/items.db`})

dbItems.loadDatabase(function (err) { 
});

import { getItemFromBase } from '../dbAPI/items/getItem'

const state = {
  checkItems: []
}

const mutations = {
  addItemToCheck (state, item) {
    state.checkItems.push(item)
  }
}

const actions = {
  addItemToCheck ({ commit }, code) {
    getItemFromBase(dbItems, code).then(item => {
      console.log(item)
      commit('addItemToCheck', item)
    });
  },
 /* 
  getItems ({ commit }) {
    getItemsFromBase(dbItems).then(items => {
      console.log(items)
      commit('setItems', items)
    });
  },
  addItem ({ commit, dispatch }, item) {
    createItemInBase(dbItems, item).then(result => {
      dispatch('getItems')
    });
  },
  removeItem ({ commit, dispatch }, items) {
    removeItemsFromBase(dbItems, items).then(result => {
      dispatch('getItems')
    });
  },*/

  /*
  
  getFiscalRegisters ({ commit }) {
    getFiscalRegistersFromBase(dbFRSettings).then(result => {
      console.log(result)
      commit('SET_FISCAL_REGISTERS', result)
    });
  },
  
  deleteFiscalRegister ({ commit, dispatch }, id) {
    deleteFiscalRegisterFromBase(dbFRSettings, id).then(result => {
      dispatch('getFiscalRegisters')
    });
  },
  saveCurrentFR({ commit }, fr) {
    console.log(fr)
    commit('SET_CURRENT_FR', fr)
  },
  getCurrentFR({ commit }) {
    getCurrentFiscalRegisterFromBase(dbMain).then(result => {
      commit('SET_CURRENT_FR', result)
    });
  },
  setCurrentFR({ commit }, id) {
    setCurrentFiscalRegisterToBase(dbMain, id).then(result => {
      commit('SET_CURRENT_FR', result)
    });
  },
  setCurrentFRSettings({ commit, state }) {
    getCurrentFRSettings(dbFRSettings, state.currentFR ).then(result => {
      commit('SET_CURRENT_FR_SETTINGS', result)
    });
  }*/
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
