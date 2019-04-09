<template>
  <div class="full">
    <button v-on:click="logout" class="Register">Logout</button>
    <p style="color: white;">{{userEmail}}</p>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    isLoggedIn: false,
    currentUser: false,
    userEmail: ""
  }),
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    }
  },
  created() {
    this.userEmail = firebase.auth().currentUser.email;
  }
};
</script>

<style>
.full {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  height: 100vh;
}
</style>
