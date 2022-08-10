<template>
  <body>
    <div class="article-top container-fluid">
      <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12" align="center">
        <div>
          <div class="card card-img-top">
            <h3>{{ article.title }}</h3>
            <img class="img-fluid" :src="article.get_image" />
            <div class="card card-body text-justify">
              <p>{{ article.description }}</p>
              <p class="text-break">
                {{ article.body }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../stores/auth.store";
export default {
  name: "UpdateArticle",
  computed: {
    ...mapState(useAuthStore, ["article"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["updateData", "getById"]),
    updatedata() {
      this.updateData(this.article);
    },
    selectImage(e) {
      this.onFileChange(e);
    },
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
