<template>
  <v-container fluid>
    <Nav/>
    <Navbar v-bind:genres="null"/>
    <v-card class="myMovieCard">
      <v-card-text>
        <div class="movieContext">
          <v-img class="cardImage" width="225" :src="img_url"></v-img>
          <div class="movieHeader">
            <p class="viewMovieTitle">{{name}}</p>
            <div style="display: inline-block;">
              <v-icon style="position: relative; left: 12px;" large color="yellow">star</v-icon>
              <span class="ratingMovie">
                {{rating}}
                <span
                  style="color: #ccc; font-size:1rem; position: relative; right: 10px;"
                >/5</span>
              </span>
            </div>
          </div>
          <div class="genreAndAbout">
            <span class="genreAboutTitle">Genre:</span>
            <p>{{genre}}</p>
            <span class="genreAboutTitle">About:</span>
            <p>{{about}}</p>
          </div>
        </div>
        <div style="text-align:center;">
          <v-btn class="myCardButton" :to="`/edit/${movie_id}`" color="orange darken-2" dark>Edit</v-btn>
        </div>
      </v-card-text>
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
.genreAboutTitle {
  font-size: 1.7rem;
  font-weight: bold;
}
.myMovieCard {
  margin-top: 1rem;
}
.cardImage {
  grid-row: 1/6;
}
.genreAndAbout {
  grid-column: 2;
  grid-row: 2;
}
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
  font-size: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
.ratingMovie {
  color: white;
  font-size: 2rem;
  font-family: Arial, Helvetica, sans-serif;
}
.movieContext {
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-column-gap: 1rem;
  font-size: 1.5rem;
}
@media (max-width: 640px) {
  .movieContext {
    font-size: 1rem;
    grid-row-gap: 1rem;
  }
  .viewMovieTitle {
    font-size: 1.4rem;
  }
  .genreAboutTitle {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .genreAndAbout {
    grid-column: 1/3;
    grid-row: 3;
  }
  .cardImage {
    grid-column: 1/3;
    grid-row: 2;
    display: block;
    margin: auto;
  }
  .movieHeader {
    grid-column: 1/3;
    grid-row: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 0 0.5rem;
  }
}
</style>
