import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import App from "./App.vue";
import router from "./router";
axios.defaults.baseURL = "https://vue-blog-backend.herokuapp.com";

const app = createApp(App);

app.use(VueSweetalert2);
app.use(createPinia());
app.use(router);
app.mount("#app");
