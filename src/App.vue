<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root {
  --firstColor: rgb(48, 80, 95);
  --secondColor: rgb(49, 60, 76);
  --buttonColorOne: rgb(188, 220, 158);
  --buttonColorTwo: rgb(68, 199, 238);
  --buttonColorThree: rgb(197, 114, 198);
  --buttonColorFour: rgb(197, 225, 118);
  --alreadyHaveBtn: rgb(130, 144, 165);
}
#app {
  height: 100vh;
  background-image: linear-gradient(
    -45deg,
    var(--firstColor),
    var(--secondColor)
  );
}
* {
  padding: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
}
</style>
