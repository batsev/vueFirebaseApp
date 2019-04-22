<template>
  <v-container>
    <Nav/>
    <Navbar/>
    <v-card style="margin-top: 1rem;">
      <v-card-text>
        <div class="movieContext">
          <v-img style="grid-row:1/6;" width="225" :src="img_url"></v-img>
          <div class="movieHeader">
            <p class="viewMovieTitle">{{name}}</p>
            <div style="display: inline-block;">
              <v-icon style="position: relative; left: 12px;" large color="yellow">star</v-icon>
              <span class="viewMovieTitle">
                {{rating}}
                <span
                  style="color: #ccc; font-size:1rem; position: relative; right: 10px;"
                >/5</span>
              </span>
            </div>
          </div>
          <div style="grid-column: 2;grid-row:2; padding-left:2rem;">
            <span style="font-size: 2rem; font-weight: bold">Genre:</span>
            <p>{{genre}}</p>
            <span style="font-size: 2rem; font-weight: bold">About:</span>
            <p>{{about}}</p>
          </div>
        </div>
      </v-card-text>
      <v-btn
        style="position: absolute; right:0.8rem; top:1rem;"
        :to="`/edit/${movie_id}`"
        color="orange darken-2"
        dark
        small
        fab
      >
        <v-icon dark>edit</v-icon>
      </v-btn>
    </v-card>
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
    movie_id: null,
    name: null,
    about: null,
    genre: null,
    rating: null,
    img_url: ""
  }),
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
            vm.rating = doc.data().rating;
            vm.genre = doc.data().genre;
            vm.img_url = doc.data().imgUrl;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
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
            this.rating = doc.data().rating;
            this.img_url = doc.data().imgUrl;
          });
        });
    }
  }
};
</script>

<style>
.movieHeader {
  background-color: #333333;
  padding: 1rem 0;
  grid-column: 2;
  grid-row: 1;
  display: flex;
  justify-content: space-around;
  border-radius: 0.3rem;
  width: 90%;
}
.viewMovieTitle {
  color: white;
  font-size: 2.5rem;
  font-family: Arial, Helvetica, sans-serif;
}
.movieContext {
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-column-gap: 1rem;
  font-size: 1.5rem;
}
</style>
