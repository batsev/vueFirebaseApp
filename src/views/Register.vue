<template>
  <div>
    <LoginRegisterComp
      msg1="Register"
      msg2="Don't have account?"
      msg3="/login"
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
        .createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            alert(`Account created`);
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
