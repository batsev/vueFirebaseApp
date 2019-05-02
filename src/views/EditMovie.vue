<template>
  <v-container fluid>
    <Nav/>
    <Navbar v-bind:genres="null"/>
    <div style="text-align: center; padding-top: 2rem;">
      <span style="font-size: 3rem; font-style: italic;">Edit movie</span>
    </div>
    <v-form style="justify-content: flex-start;">
      <v-text-field disabled class="formInput" v-model="movie_id" label="Movie ID" required></v-text-field>
      <v-text-field class="formInput" v-model="name" label="Name" required></v-text-field>
      <v-text-field :rules="genreRules" class="formInput" v-model="genre" label="Genre" required></v-text-field>
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
      <div>
        <v-btn :to="`/movie/${movie_id}`" color="grey darken-2" dark>
          Back
          <v-icon dark right>keyboard_backspace</v-icon>
        </v-btn>
        <v-btn @click="updateMovie" color="orange darken-2" dark>
          Update
          <v-icon dark right>replay</v-icon>
        </v-btn>
        <v-btn @click="deleteMovie" color="red darken-2" dark>
          Delete
          <v-icon dark right>delete</v-icon>
        </v-btn>
      </div>
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
    rating: null,
    img_url: "",
    genreRules: [
      v =>
        /^[a-zA-Z][a-zA-Z\s\,]*[a-zA-Z]$/.test(v) ||
        "Genres should be divided by comma"
    ]
  }),
  methods: {
    updateMovie() {
      var db = firebase.firestore();
      db.collection("Movies")
        .where("movie_id", "==", this.$route.params.movie_id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref
              .update({
                movie_id: this.movie_id,
                name: this.name,
                about: this.about,
                genre: this.genre,
                rating: this.rating.toString(),
                imgUrl: this.img_url
              })
              .then(() => {
                this.$router.push(`/movie/${this.movie_id}`);
              });
          });
        });
    },
    fetchData() {
      var db = firebase.firestore();
      db.collection("Movies")
        .where("movie_id", "==", this.$route.params.movie_id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.movie_id = doc.data().movie_id;
            this.name = doc.data().name;
            this.about = doc.data().about;
            this.genre = doc.data().genre;
            this.rating = parseFloat(doc.data().rating);
            this.img_url = doc.data().imgUrl;
          });
        });
    },
    deleteMovie() {
      var db = firebase.firestore();
      db.collection("Movies")
        .where("movie_id", "==", this.$route.params.movie_id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.delete();
            this.$router.push("/");
          });
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    var db = firebase.firestore();
    db.collection("Movies")
      .where("movie_id", "==", to.params.movie_id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          next(vm => {
            vm.movie_id = doc.data().movie_id;
            vm.name = doc.data().name;
            vm.about = doc.data().about;
            vm.rating = parseFloat(doc.data().rating);
            vm.genre = doc.data().genre;
            vm.img_url = doc.data().imgUrl;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  }
};
</script>