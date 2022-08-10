<template>
  <body>
    <div class="container col-md-12 col-lg-8 col-xl-6 py-5 h-100">
      <form @submit.prevent="updatedata" enctype=" multipart/form-data">
        <div class="mb-3">
          <label for="title" class="form-label">Titúlo</label>
          <input
            type="text"
            v-model="article.title"
            class="form-control"
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
          <label for="image" class="form-label">Image</label>
          <input
            type="file"
            class="form-control"
            id="image"
            @change="selectImage"
          />
        </div>
        <div class="d-md-flex justify-content-md-end">
          <button class="btn btn-outline-primary px-5" @click="save">
            Atualizar
          </button>
        </div>
      </form>
    </div>
  </body>
</template>
<script>
import { mapActions, mapState } from "pinia";
import Swal from "sweetalert2";
import { useAuthStore } from "../stores/auth.store";
export default {
  name: "UpdateArticle",

  computed: {
    ...mapState(useAuthStore, ["article"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["updateData", "onFileChange", "getById"]),

    updatedata() {
      this.updateData(this.article);
      Swal.fire({
        icon: "success",
        title: "Post atualizado com sucesso!",
        confirmButtonColor: "##FF8800",
        animate: true,
      })
      this.$router.push("/edit");
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
body {
  background-color: #fff;
}
</style>
