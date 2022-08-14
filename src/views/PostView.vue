<template>
  <div class="container-fluid">
    <div>
      <h2 class="text-center"><strong>Pagina Posts</strong></h2>
    </div>
    <div class="container d-flex justify-content-center flex-column">
      <h3 class="h3">{{ article.title }}</h3>
      <img class="img-fluid" :src="article.get_image" />
      <p>{{ article.description }}</p>
      <p>{{ article.body }}</p>
      <div></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useArticlesStore } from "../stores/articles.store";
export default {
  name: "PostView",
  computed: {
    ...mapState(useArticlesStore, ["article"]),
  },
  methods: {
    ...mapActions(useArticlesStore, ["getById"]),
  },
  mounted() {
    this.getById(this.$route.params.slug);
  },
};
</script>
<style>
.article-top {
  margin-top: 40px;
}
</style>
