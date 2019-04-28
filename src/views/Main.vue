<template>
  <v-container fluid>
    <Nav/>
    <Navbar v-bind:genres="filterGenres"/>
    <div class="wrapper">
      <MovieCell v-bind:key="movie.id" v-for="movie in getSearch" v-bind:movie="movie"/>
    </div>
  </v-container>
</template>

<script>
import Nav from "../components/Nav.vue";
import Navbar from "../components/Navbar.vue";
import MovieCell from "../components/MovieCell.vue";
import firebase from "firebase";
import { mapState } from "vuex";
export default {
  components: {
    Nav,
    Navbar,
    MovieCell
  },
  computed: {
    //Добавление всех жанров в Тулбар
    filterGenres() {
      return this.genres
        .filter((item, index) => {
          return this.genres.indexOf(item) >= index;
        })
        .sort();
    },
    //Фильтр по жанрам
    getMoviesByGenre() {
      return this.movieGenre == "all"
        ? this.movies
        : this.movies.filter(movie => {
            return movie.genre.includes(this.movieGenre);
          });
    },
    getSearch() {
      return this.searchValue == ""
        ? this.getMoviesByGenre
        : this.getMoviesByGenre.filter(movie => {
            return (
              movie.genre.toLowerCase().includes(this.searchValue) ||
              movie.name.toLowerCase().includes(this.searchValue) ||
              movie.rating.toLowerCase().includes(this.searchValue) ||
              movie.about.toLowerCase().includes(this.searchValue)
            );
          });
    },
    ...mapState(["movieGenre", "searchValue"])
  },
  data: () => ({
    movies: [],
    genres: ["All"]
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
            .forEach(el => {
              if (el != "") this.genres.push(el);
            });
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
@media (max-width: 992px) {
  .wrapper {
    padding-top: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
}
</style>

