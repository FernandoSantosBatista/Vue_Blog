<template>
  <div class="container-fluid">
    <div>
      <h2 class="text-center"><strong>Pagina Home</strong></h2>
    </div>
    <div class="container d-flex justify-content-center flex-column">
      <div v-for="(article, index) in articles" :key="index">
        <h3 class="h3">{{ article.title }}</h3>
        <img class="img-fluid" :src="article.get_image" />
        <p>{{ article.description }}</p>
        <div>
          <h4>
            <a :href="`/post/${article.slug}`">
              <p class="text-center">ver mais...</p></a
            >
          </h4>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useArticlesStore } from "../stores/articles.store";
export default {
  name: "HomeView",

  computed: {
    ...mapState(useArticlesStore, ["articles"]),
  },
  methods: {
    ...mapActions(useArticlesStore, ["getData"]),
  },
  mounted() {
    this.getData();
  },
};
</script>
<style>
.container-fluid {
  padding-right: unset;
  padding-left: unset;
}
.container,
.container-lg,
.container-md,
.container-sm {
  max-width: 960px;
  margin-top: 20px;
  margin-bottom: 40px;
  background-color: white;
}

p {
  text-align: justify;
}

.h3 {
  margin-top: 25px;
}

.card {
  width: 55rem;
  background-color: white;
  border: 1px solid #fff;
}

a {
  text-decoration: none;
  color: rgb(255, 81, 0);
}
a:hover {
  text-decoration: none;
  color: rgb(255, 0, 0);
}
</style>
