import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";

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
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
