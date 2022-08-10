<template>
  <body>
    <div class="container col-md-12 col-lg-8 col-xl-6 py-5 h-100">
      <form method="post" @submit.prevent="store" enctype="multipart/form-data">
        <div class="mb-3">
          <label for="title" class="form-label">Titulo</label>
          <input
            type="text"
            v-model="article.title"
            class="form-control"
            autocomplete="off"
            id="title"
          />
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Descrição</label>

          <textarea
            class="form-control"
            v-model="article.description"
            id="description"
            rows="3"
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="content" class="form-label">Texto</label>

          <textarea
            class="form-control"
            v-model="article.body"
            id="content"
            rows="6"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Imagem</label>
          <input
            type="file"
            class="form-control"
            id="image"
            @change="selectImage"
          />
        </div>
        <div class="d-md-flex justify-content-md-end">
          <button class="btn btn-outline-primary btn-lg px-5">
            Add Article
          </button>
        </div>
      </form>
    </div>
  </body>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../stores/auth.store";
export default {
  name: "AddView",
  computed: {
    ...mapState(useAuthStore, ["token", "article", "isAuthenticated"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["storeData", "onFileChange"]),
    store() {
      this.storeData(
        (this.article.slug = this.article.title
          .replaceAll(" ", "-")
          .toLowerCase())
      );
      this.$swal({
        icon: "success",
        title: "Sua postagem foi adicionada com sucesso",
        confirmButtonColor: "#FF8800",
        animate: true,
      })
      this.$router.push("/edit");
    },
    selectImage(e) {
      this.onFileChange(e);
    },
  },
};
</script>
<style>
body {
  background-color: #fff;
}
</style>
