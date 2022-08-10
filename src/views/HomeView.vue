<template>
  <body>
    <div class="container-fluid" align="center">
      <div class="container-fluid">
        <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <h2 class="article"><strong>Página Home</strong></h2>
        </div>
      </div>
      <div class="container">
        <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12" align="center">
          <div v-for="(article, index) in articles" :key="index">
            <div class="card card-img-top article-top">
              <h3>{{ article.title }}</h3>
              <img class="img-fluid" :src="article.get_image"/>
              <div class="card card-body text-justify">
                <p>{{ article.description }}</p>
                <p></p>
                <div>
                  <h4>
                    <a :href="`/post/${article.slug}`">ver mais...</a>
                  </h4>
                </div>
                <hr />
              </div>
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
  name: "HomeView",

  computed: {
    ...mapState(useAuthStore, ["articles"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["getData"]),
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

h3 {
  text-align: justify;
  padding: 20px;
}
.article {
  margin-top: 40px;
}

.card {
  width: 55rem;
  background-color: white;
  border: 1px solid #fff;
}

body {
  background-color: #f3f3f3;
  
}

a{
  text-decoration: none;
  color: rgb(255, 81, 0);
  
}
a:hover {
  text-decoration: none;
  color: rgb(255, 0, 0);
}
</style>
