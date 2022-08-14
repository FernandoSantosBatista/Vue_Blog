import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore({
  id: "users",
  state: () => ({
    isAuthenticated: false,
    token: "",
    username: "",
  }),
  actions: {
    login(token) {
      this.isAuthenticated = true;
      this.token = token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    },
    logout() {
      this.isAuthenticated = false;
      this.token = "";
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
    },
    doLogin(username, password) {
      axios
        .post("/api/auth/token/login/", { username, password })
        .then((response) => {
          this.login(response.data.auth_token);
        });
    },
    doLogout() {
      axios.post("/api/auth/token/logout/").then((response) => {
        this.logout(response.data.auth_token);
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
