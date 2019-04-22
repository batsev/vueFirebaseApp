<template>
  <div class="myCell">
    <p class="movieTitle" @click="goTo(movie.movie_id)">{{movie.name}}</p>
    <v-img
      @click="goTo(movie.movie_id)"
      style="grid-row:2/6; cursor: pointer; width: 100%"
      width="125"
      :src="movie.img_url"
    ></v-img>
    <div>
      <div class="stars-outer">
        <div class="stars-inner" :style="width"></div>
      </div>
    </div>
    <p style="opacity: 0.7; grid-column: 2/3; margin-left: 1rem; padding-top: 1rem;">{{movie.about}}</p>
    <p style="opacity: 0.4; grid-column: 2/3; text-align: right; grid-row: 5;">{{movie.genre}}</p>
  </div>
</template>

<script>
export default {
  name: "MovieCell",
  props: ["movie"],
  data: () => ({
    width: ""
  }),
  created() {
    const starsPercentage = (this.movie.rating / 5) * 100;
    this.width = `width: ${Math.round(starsPercentage / 10) * 10}%`;
  },
  methods: {
    goTo: function(movie_id) {
      this.$router.push(`/movie/${movie_id}`);
    }
  }
};
</script>

<style>
.myCell {
  background-color: #eee;
  border-radius: 0.3rem;
  padding: 2rem;
  margin: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.movieTitle {
  cursor: pointer;
  font-weight: 600;
  grid-column: 1/3;
  text-align: center;
  font-size: 1.3rem;
}

.movieTitle:hover {
  text-decoration: underline;
}

.stars-outer {
  margin: 0.5rem 1rem 0;
  position: relative;
  display: inline-block;
  grid-column: 2/3;
  align-self: start;
}
.stars-inner {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}

.stars-outer::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #ccc;
}
.stars-inner::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #f8ce0b;
}
</style>
