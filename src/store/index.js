import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dishes: [{
        _id: 1,
        name: "Ají de gallina",
        price: 40,
        img: "#",
        type: "Entrada",
      },
      {
        _id: 1,
        name: "Caldo de res",
        price: 40,
        img: "#",
        type: "Entrada",
      }
    ]
  },
  mutations: {
    createDish(state) {
      state.dishes
    }
  },
  actions: {},
  modules: {}
});