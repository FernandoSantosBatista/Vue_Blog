import { defineStore } from "pinia";
import axios from "axios";
import Articles from "../models/Articles";

export const useArticlesStore = defineStore({
  id: "articles",
  state: () => {
    return {
      isAuthenticated: false,
      token: "",
      username: "",
      article: new Articles(),
      articles: [],
      search: "",
    };
  },

  getters: {
    filteredPost(state) {
      return state.articles.filter((a) =>
        a.slug.toLowerCase().includes(state.search.toLowerCase())
      );
    },
  },
  actions: {
    login(token) {
      this.isAuthenticated = true;
      this.token = token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    },
    storeData() {
      let token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        this.login(token);

        let formData = new FormData();
        Object.keys(this.article).forEach((key) => {
          formData.append(key, this.article[key]);
        });

        axios
          .post(`/article/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            console.log("Successfully uploaded: ", response.data);
          })
          .catch((err) => {
            console.error("error occurred: ", err);
          });
      }
    },
    getData() {
      axios.get(`/article/`).then((response) => {
        this.articles = response.data;
      });
    },

    updateData(post) {
      let token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        this.login(token);

        let formData = new FormData();
        Object.keys(this.article).forEach((key) => {
          formData.append(key, this.article[key]);
          formData.append("_method", "PUT");
        });
        this.article = post;
        axios
          .put(`/article/${post.slug}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            console.log("Successfully uploaded: ", response.data);
          })
          .catch((err) => {
            console.error("error occurred: ", err);
          });
      }
    },
    onFileChange(e) {
      let file = e.target.files[0];
      this.article.image = file;
    },
    deleteData(slug) {
      let token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        this.login(token);
        axios.delete(`article/${slug}/`);
        this.articles = this.articles.filter(
          (article) => article.slug !== slug
        );
      }
    },
    getById(slug) {
      axios
        .get(`/article/${slug}/`)
        .then((response) => {
          this.article = response.data;
        })
        .catch((err) => {
          console.error("error occurred: ", err);
        });
    },
    onStart() {
      let token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        // axios
        // .get("/api/auth/users/me/")
        // .then(() => {
        this.login(token);
        //   })
        //  .catch(() => {
        //  this.logout();
        // });
      }
    },
  },
});
