<template>
  <nav class="navbar navbar-expand justify-content-center">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a href="/"> Home </a>
      </li>
      <li v-if="isAuthenticated" class="nav-item">
        <a href="/add">Adicionar</a>
      </li>
      <li v-if="isAuthenticated">
        <a href="/edit"> Editar</a>
      </li>

      <li v-if="isAuthenticated">
        <a href="" @click.prevent="logout">logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "../stores";
export default {
  name: "NavBar",
  computed: {
    ...mapState(useAuthStore, ["isAuthenticated"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["doLogout", "onStart"]),

    logout() {
      this.doLogout();
      this.$router.push("/login");
    },
  },
  mounted() {
    this.onStart();
  },
};
</script>
<style>
.navbar {
  background-color: #fff;
  font-size: 22px;
  font-weight: bold;
}

nav a {
  text-decoration: none;
  color: #ff8800;
  padding: 10px;
  display: inline-block;
}

a {
  text-decoration: none;
  color: #ff8800;
}
nav a:hover {
  text-decoration: none;
  color: #f84904;
}
</style>
