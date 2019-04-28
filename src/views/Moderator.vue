<template>
  <v-container fluid>
    <Nav/>
    <Navbar v-bind:genres="null"/>
    <div style="text-align: center; padding-top: 2rem;">
      <span style="font-size: 3rem; font-style: italic;">Add A Movie!</span>
    </div>
    <v-form style="justify-content: flex-start;">
      <v-text-field class="formInput" v-model="movie_id" label="Movie ID" required></v-text-field>
      <v-text-field class="formInput" v-model="name" label="Name" required></v-text-field>
      <v-text-field
        :rules="genreRules"
        class="formInput"
        value="Example"
        v-model="genre"
        label="Genre"
        required
      ></v-text-field>
      <v-slider
        label="Movie rating"
        max="5"
        style="width: 50%; flex: none !important;"
        step="0.1"
        thumb-label="always"
        v-model="rating"
      ></v-slider>
      <v-textarea class="formInput" v-model="about" label="About" required></v-textarea>
      <v-text-field class="formInput" v-model="img_url" label="Image URL" required></v-text-field>
      <v-btn @click="submit" color="blue darken-2" dark>
        Add movie
        <v-icon dark right>control_point</v-icon>
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import Nav from "../components/Nav.vue";
import Navbar from "../components/Navbar.vue";
import firebase from "firebase";
export default {
  components: {
    Nav,
    Navbar
  },
  data: () => ({
    movie_id: "",
    name: "",
    about: "",
    genre: "",
    rating: 5,
    img_url: "",
    genreRules: [
      v =>
        /^[a-zA-Z][a-zA-Z,]*[a-zA-Z]$/.test(v) ||
        "Genres should be divided by comma"
    ]
  }),
  methods: {
    submit() {
      var db = firebase.firestore();
      db.collection("Movies")
        .add({
          movie_id: this.movie_id,
          name: this.name,
          about: this.about,
          genre: this.genre,
          rating: this.rating.toString(),
          imgUrl: this.img_url
        })
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>

<style>
.formInput {
  flex: none !important;
  width: 50%;
  margin: 10px 0;
}

@media (max-width: 768px) {
  .formInput {
    width: 90%;
  }
}
</style>
