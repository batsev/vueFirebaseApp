<template>
  <div class="myJumbotron">
    <span class="myNav">Cool</span>
    <img src="../assets/noun_Movie.png" style="height: 130px;" alt="movieLogo">
    <span class="myNav">Flicks</span>
  </div>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style>
.myNav {
  font-size: 3.5rem;
}
.myJumbotron {
  width: 30%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 3rem 0;
}
</style>
