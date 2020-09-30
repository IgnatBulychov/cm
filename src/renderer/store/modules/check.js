import { getItemFromBase } from '../dbAPI/items/getItem'

const state = {
  items: [],
  activeItem: null
}

const mutations = {
  addItemToCheck (state, item) {
    state.items.push(item);
    state.activeItem = item._id
  },
  changeQuantity(state, item) {
    state.items.forEach(function(itemBefore, i, arr) {
      if (item._id == itemBefore._id) {
        arr[i].quantity++;
      }
    });
    state.activeItem = item._id
  },
  clearCheck(state) {
    state.items = []
  },
  changePosition(state, position) {
    state.activeItem = position._id
  }
}

const actions = {
  getItem ({ commit, state }, inputCode) {
    //проверка введеного кода на тип
    //
    if (inputCode.length == 13) {
      //если это штрихкод
      
    } else if (inputCode.length < 7) {
      // если это внутренний код

    } else if (inputCode.length > 20) {
      // если это код маркировки

    }
      // проверяем есть ли в чеке такой же товар
      if (state.items.find(item => item.barcode == inputCode)) {
        // если есть ищем его 
        let item = state.items.find(item => item.barcode == inputCode)
        // и увеличиваем его количество на 1
        commit('changeQuantity', item)
      } else { 
        getItemFromBase(inputCode).then(item => {
          // если товара нет в чеке назначаем ему количество равное одному
          item.quantity = 1;
          // и добавляем в state, в чек
          commit('addItemToCheck', item)
        });
      }
    
  },
  changePosition({ state, commit }, position) {
    console.log(position)
    let key = 0
    state.items.forEach(function(item, i, arr) {
      if (item._id == position._id) {
        key = i
      }
    });
    
    commit('changePosition', position)
  }
 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
