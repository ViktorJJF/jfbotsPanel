import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dishes: [],
    //global state
    showErrMessage: false,
    errMessage: null,
    showSuccessMessage: false,
    successMessage: null,
    loadingScreen: false,
  },
  mutations: {
    getDishes(state, dishes) {
      state.dishes = dishes;
    },
    createDish(state, data) {
      state.dishes.push(data);
    },
    updateDish(state, { id, data }) {
      let dishIndex = state.dishes.findIndex((dish) => dish._id == id);
      state.dishes.splice(dishIndex, 1, data);
    },
    deleteDish(state, id) {
      let dishIndex = state.dishes.findIndex((dish) => dish._id == id);
      state.dishes.splice(dishIndex, 1);
    },
    //global mutations
    showSuccess(state, msg = "Actualización completada") {
      state.showSuccessMessage = true;
      state.successMessage = msg;
    },
    showErr(state, msg = "Algo salió mal...") {
      state.showErrMessage = true;
      state.errMessage = msg;
    },
    showLoadingScreen(state, value = true) {
      state.loadingScreen = value;
    },
  },
  actions: {
    //dishes module
    async getDishes({ commit }) {
      try {
        let dishes = (await api.getDishes()).data.payload;
        commit("getDishes", dishes);
        return dishes;
      } catch (error) {
        commit("showErr");
      }
    },
    async createDish({ commit }, data) {
      try {
        let createdDish = (await api.createDish(data)).data.payload;
        commit("createDish", data);
        commit("showSuccess");
        return createdDish;
      } catch (error) {
        commit("showErr");
      }
    },
    async updateDish({ commit }, { id, data }) {
      try {
        let updatedDish = (await api.updateDish(id, data)).data.payload;
        commit("updateDish", {
          id,
          data,
        });
        commit("showSuccess");
        console.log("todo salio bien gaa");
        return updatedDish;
      } catch (error) {
        console.log("algo salio mal..:", error);
        commit("showErr");
      }
    },
    async deleteDish({ commit }, id) {
      try {
        let deletedDish = (await api.deleteDish(id)).data.payload;
        commit("deleteDish", id);
        commit("showSuccess");
        return deletedDish;
      } catch (error) {
        commit("showErr");
      }
    },
    //global actions
  },
  getters: {
    getDishesByType: (state) => (typeId) => {
      return state.dishes.filter((dish) => dish.typeId == typeId) || [];
    },
  },
  modules: {},
});
