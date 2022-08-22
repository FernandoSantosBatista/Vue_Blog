<template>
  <div id="app">
    <nav-bar v-if="!['login'].includes($route.name)" />
    <router-view />
  </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "./stores";

export default {
  name: "App",
  components: { NavBar },

  computed: {
    ...mapState(useAuthStore, ["token"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["onStart"]),
  },
  mounted() {
    this.onStart();
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500&display=swap");
body {
  margin: 0;
  padding: 0;
  font-family: "Josefin Sans", sans-serif;
  font-size: 18px;
  background-color: #f3f3f3;
}
</style>
