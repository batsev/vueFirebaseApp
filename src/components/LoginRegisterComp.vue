<template>
  <div class="myContainer">
    <form>
      <input v-model="email" type="text" class="myInput" placeholder="Email">
      <input v-model="password" type="password" class="myInput" placeholder="Password">
      <button v-on:click="$emit('pass-values', email, password)" :class="msg1">{{ msg1 }}</button>
      <router-link :to="msg3">
        <button class="haveAccountButton">{{ msg2 }}</button>
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginRegisterComp",
  props: {
    msg1: String,
    msg2: String,
    msg3: String
  },
  data: () => ({
    email: "",
    password: ""
  })
};
</script>

<style>
.myContainer {
  padding: 0;
  margin: 0;
  height: 100vh;
  background-image: linear-gradient(
    -45deg,
    var(--firstColor),
    var(--secondColor)
  );
}
form {
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  height: 100vh;
}
.myInput {
  background-color: white;
  font-size: 0.9rem;
  height: 3rem;
  width: 19rem;
  padding: 0 0.5rem;
  margin: 0.5rem;
  border: none;
  outline: none;
  border-radius: 1.5rem;
}
.myInput::placeholder {
  opacity: 0.5;
  text-align: center;
}
.Login {
  outline: none;
  font-size: 1rem;
  border: none;
  height: 3rem;
  width: 19rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem;
  border-radius: 1.5rem;
  background-image: linear-gradient(
    -45deg,
    var(--buttonColorOne),
    var(--buttonColorTwo)
  );
}

.Register {
  outline: none;
  font-size: 1rem;
  border: none;
  height: 3rem;
  width: 19rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem;
  border-radius: 1.5rem;
  background-image: linear-gradient(
    -45deg,
    var(--buttonColorThree),
    var(--buttonColorFour)
  );
}

.haveAccountButton {
  color: var(--alreadyHaveBtn);
  height: 3rem;
  width: 19rem;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}
</style>
