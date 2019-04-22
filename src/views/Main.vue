<template>
  <v-container>
    <Nav/>
    <Navbar v-bind:genres="filterGenres"/>
    <div class="wrapper">
      <MovieCell v-bind:key="movie.id" v-for="movie in movies" v-bind:movie="movie"/>
    </div>
  </v-container>
</template>

<script>
import Nav from "../components/Nav.vue";
import Navbar from "../components/Navbar.vue";
import MovieCell from "../components/MovieCell.vue";
import firebase from "firebase";
export default {
  components: {
    Nav,
    Navbar,
    MovieCell
  },
  computed: {
    // getMoviesByGenre() {
    //   return this.movies.filter(movie => {
    //     const myGenres = movie.genre.replace(/\s/g, "").split(",");
    //     return myGenres.includes(this.genre);
    //   });
    // },
    filterGenres() {
      return this.genres.filter((item, index) => {
        return this.genres.indexOf(item) >= index;
      });
    }
  },
  data: () => ({
    movies: [],
    genres: [],
    genre: ""
  }),
  created() {
    var db = firebase.firestore();
    db.collection("Movies")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = {
            id: doc.id,
            movie_id: doc.data().movie_id,
            name: doc.data().name,
            about: doc.data().about,
            genre: doc.data().genre,
            rating: doc.data().rating,
            img_url: doc.data().imgUrl
          };
          doc
            .data()
            .genre.toLowerCase()
            .replace(/\s/g, "")
            .split(",")
            .forEach(el => this.genres.push(el));
          this.movies.push(data);
        });
      });
  }
};
</script>

<style>
.wrapper {
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}
@media (max-width: 768px) {
  .wrapper {
    padding-top: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
}
</style>

