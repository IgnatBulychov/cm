import { getItemFromBaseByCode } from '../dbAPI/items/getItemByCode'
import { getItemFromBaseByBarcode } from '../dbAPI/items/getItemByBarcode'

const state = {
  items: [],
  activeItem: null,
  alert: {
    show: false,
    text: ''
  }
}

const mutations = {
  addItemToCheck (state, item) {
    state.items.unshift(item);
    state.activeItem = item
  },
  removeItem(state, item) {    
    state.items.forEach(function(itemBefore, i, arr) {
      if (item._id == itemBefore._id) { 
        if (arr.length == 1) {
          arr.splice(i, 1)
          if (state.activeItem._id == itemBefore._id) {
            state.activeItem = state.items[0]
          }
          state.activeItem = null
          return
        }       
        arr.splice(i, 1)
        if (state.activeItem._id == itemBefore._id) {
          state.activeItem = state.items[0]
        }

      }
    });
  },
  setQuantity(state, [ itemForChange, quantity ]) {
    if (quantity == "") {
      return
    }
    state.items.find(item => item._id == itemForChange._id).quantity = quantity
  },
  quantityPlusOne(state, item) {
    state.items.forEach(function(itemBefore, i, arr) {
      if (item._id == itemBefore._id) {
        arr[i].quantity++;
      }
    });
    state.activeItem = item
  },
  quantityMinusOne(state, item) {
    state.items.forEach(function(itemBefore, i, arr) {
      if (item._id == itemBefore._id) {
        if (arr[i].quantity > 1) {
          arr[i].quantity--;
        }        
      }
    });
    state.activeItem = item
  },
  clearCheck(state) {
    state.items = [];
    activeItem = null
  },
  changePosition(state, direction) {
    let currentPosition = 0
    state.items.forEach(function(item, i, arr) {
      if (item._id == state.activeItem._id) {
        currentPosition = i
      }
    });

    if (direction == "up") {
      if (currentPosition == 0) {
        state.activeItem = state.items[state.items.length-1]
      } else {
        state.activeItem = state.items[currentPosition-1]       
      }      
    } else if (direction == "down") {
      if (currentPosition == state.items.length-1) {
        state.activeItem = state.items[0]
      } else {
        state.activeItem = state.items[currentPosition+1]
      }
    }
  },
  setAlert(state, alert) {
    state.alert = alert
  }
}

const actions = {
  getItem ({ commit, state }, inputCode) {
    //проверка введеного кода на тип
    //
    if (inputCode.length == 13) {
      //если это штрихкод
      // проверяем есть ли в чеке такой же товар
      if (state.items.find(item => item.barcode == inputCode)) {
        // если есть ищем его 
        let item = state.items.find(item => item.barcode == inputCode)
        // и увеличиваем его количество на 1
        commit('quantityPlusOne', item)
      } else { 
        getItemFromBaseByBarcode(inputCode).then(item => {
          // если товара нет в чеке назначаем ему количество равное одному
          item.quantity = 1;
          // и добавляем в state, в чек
          commit('addItemToCheck', item)
        });
      }
    } else if (inputCode.length < 7) {
      // если это внутренний код
      // проверяем есть ли в чеке такой же товар
      if (state.items.find(item => item.code == inputCode)) {
        // если есть ищем его 
        let item = state.items.find(item => item.code == inputCode)
        // и увеличиваем его количество на 1
        commit('quantityPlusOne', item)
      } else { 
        getItemFromBaseByCode(inputCode).then(item => {
          // если товара нет в чеке назначаем ему количество равное одному
          item.quantity = 1;
          // и добавляем в state, в чек
          commit('addItemToCheck', item)
        });
      }
    } else if (inputCode.length > 20) {
      // если это код маркировки
    }
  },
  setQuantity({ commit }, [ item, quantity ]) {
    commit('setQuantity', [ item, quantity ] )
  },
  removeItem({ commit }, item) {
    commit('removeItem', item)
  },
  changeQuantity({ commit }, [ item, changing ] ) {
    if (changing) {
      commit('quantityPlusOne', item)
    } else {
      commit('quantityMinusOne', item)
    }        
  },
  changePosition({ commit }, direction ) {    
    commit('changePosition', direction)            
  } 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
