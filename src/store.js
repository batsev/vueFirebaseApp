import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieGenre: ""
  },
  mutations: {
    setMovie(state, payload) {
      state.movieGenre = payload;
    }
  },
  getters: {
    movieGenre(state) {
      return state.movieGenre;
    }
  }
});
