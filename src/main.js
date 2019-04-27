import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import store from "./store";
import "firebase/firestore";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

Vue.config.productionTip = false;

var config = {
  apiKey: "AIzaSyDJV25LnuCM12HSxUveCowe1NPN-t1nRAs",
  authDomain: "vuefirebaseapp-426ec.firebaseapp.com",
  databaseURL: "https://vuefirebaseapp-426ec.firebaseio.com",
  projectId: "vuefirebaseapp-426ec",
  storageBucket: "vuefirebaseapp-426ec.appspot.com",
  messagingSenderId: "891755584670"
};
firebase.initializeApp(config);

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});

// 1 - Форма чтобы не написали чего не надо
// 2 - Функция поиска
// 3 - Фильтр по жанру
// 4 - добавление в любимые
