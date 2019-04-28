import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieGenre: "",
    searchValue: ""
  },
  mutations: {
    setMovie(state, payload) {
      state.movieGenre = payload.toLowerCase();
    },
    getSearch(state, payload) {
      state.searchValue = payload.toLowerCase();
    }
  }
});
