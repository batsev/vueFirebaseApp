<template>
  <nav>
    <v-toolbar flat class="grey lighten-4" height="50">
      <v-toolbar-side-icon @click="drawer= !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-btn flat style="text-transform: capitalize; font-size:1.3rem;" to="/">Home</v-btn>
      <v-menu offset-y open-on-hover transition="slide-x-transition">
        <v-btn
          flat
          style="text-transform: capitalize; font-size:1.3rem;"
          class="hidden-sm-and-down"
          slot="activator"
        >Filter By Genre</v-btn>
        <v-list v-if="genres">
          <v-list-tile v-for="genre in genres" :key="genre" @click="filterMovies(genre)">
            <v-list-tile-title style="text-transform: capitalize;">{{ genre }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn
        class="hidden-sm-and-down"
        flat
        style="text-transform: capitalize; font-size:1.3rem;"
        to="/moderator"
      >Add Movies</v-btn>
      <v-spacer></v-spacer>
      <input class="toolbarSearch" v-model="searchInput" type="text" placeholder="Search..">
      <v-btn
        class="hidden-sm-and-down"
        style="text-transform: capitalize; font-size:1.3rem;"
        flat
        v-on:click="logout()"
      >
        Logout
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer class="grey lighten-1" app absolute temporary v-model="drawer">
      <v-list>
        <v-list-tile>
          <v-menu offset-y open-on-hover transition="slide-x-transition">
            <v-btn
              flat
              style="text-transform: capitalize; font-size:1.3rem;"
              slot="activator"
            >Filter By Genre</v-btn>
            <v-list v-if="genres">
              <v-list-tile v-for="genre in genres" :key="genre" @click="filterMovies(genre)">
                <v-list-tile-title style="text-transform: capitalize;">{{ genre }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-list-tile>
        <v-list-tile>
          <v-btn
            flat
            style="text-transform: capitalize; font-size:1.3rem;"
            to="/moderator"
          >Moderator</v-btn>
        </v-list-tile>

        <v-list-tile>
          <v-btn style="text-transform: capitalize; font-size:1.3rem;" flat v-on:click="logout()">
            Logout
            <v-icon right>exit_to_app</v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>


<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  props: ["genres"],
  data: () => ({
    drawer: false,
    searchInput: ""
  }),
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    },
    filterMovies(genre) {
      this.$store.commit("setMovie", genre);
    }
  },
  watch: {
    searchInput: function(newVal) {
      this.$store.commit("getSearch", newVal);
    }
  }
};
</script>

<style>
.toolbarSearch {
  background-color: white;
  font-size: 1rem;
  height: 3rem;
  width: 12rem;
  padding: 0 0.5rem;
  margin: 0.5rem;
  border: none;
  outline: none;
  border-radius: 0.3rem;
}
</style>
