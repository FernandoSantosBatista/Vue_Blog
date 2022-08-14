<template>
  <div class="container-fluid">
    <div>
      <h2 class="text-center"><strong>Pagina Editar</strong></h2>
    </div>
    <div class="container d-flex justify-content-center flex-column">
      <div v-for="(article, index) in articles" :key="index">
        <h3 class="h3">{{ article.title }}</h3>
        <img class="img-fluid" :src="article.get_image" />
        <p>{{ article.description }}</p>
        <div>
          <div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
              <router-link
                class="btn btn-outline-primary px-5"
                :to="`/posts/${article.slug}`"
                >Editar</router-link
              >
              <button
                class="btn btn-outline-primary px-5"
                @click="deletedata(article.slug)"
              >
                Deletar
              </button>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import Swal from "sweetalert2";
import { useArticlesStore } from "../stores/articles.store";
export default {
  name: "EditView",

  computed: {
    ...mapState(useArticlesStore, ["articles"]),
  },
  methods: {
    ...mapActions(useArticlesStore, ["getData", "deleteData"]),
    deletedata(article) {
      Swal.fire({
        icon: "question",
        title: "Deseja mesmo excluir ?",
        text: `O post ${article} esta ação é irreversível.`,
        showCancelButton: true,
        confirmButtonColor: "#FF8800",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        animate: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteData(article)
            .then(() => {
              let indice = this.article.findIndex(
                (p) => p.slug == article.slug
              );
              this.article.slug.splice(indice, 1);

              this.$swal({
                icon: "success",
                title: "Cadastro deletado com sucesso!",
                confirmButtonColor: "#0039A8",
                animate: true,
              });
            })
            .catch((error) => {
              console.log(error);
            });
          this.$router.push("/");
        }
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style>
p {
  text-align: justify;
}
h2 {
  margin-top: 40px;
}
.card {
  width: 55rem;
  background-color: white;
  border: 1px solid #fff;
}
.h3{
  margin-top: 25px;
}

</style>
