<template>
  <div>
    <LoginRegisterComp
      msg1="Login"
      msg2="Already have account?"
      msg3="/register"
      v-on:pass-values="catchValues"
    />
  </div>
</template>

<script>
import LoginRegisterComp from "../components/LoginRegisterComp.vue";
import firebase from "firebase";
export default {
  components: {
    LoginRegisterComp
  },
  methods: {
    catchValues(email, password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => {
            this.$router.push("/");
          },
          err => {
            alert(err.message);
          }
        );
    }
  }
};
</script>

