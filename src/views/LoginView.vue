<template>
  <body>
    <div class="box-login">
      <div class="card-body p-5">
        <h1 class="fs-4 card-title fw-bold mb-4">Login</h1>
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors, isSubmitting }"
        >
          <div class="form-group">
            <label class="form-label">Nome de Usuário</label>
            <Field
              name="username"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.username }"
            />
            <div class="invalid-feedback">{{ errors.username }}</div>
          </div>
          <div class="form-group">
            <label class="form-label">Senha</label>
            <Field
              name="password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
            />
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>
          <hr class="my-4" />
          <div class="d-grid col-6 mx-auto">
            <button
              class="btn btn-outline-primary btn-lg px-5"
              :disabled="isSubmitting"
            >
              <span v-show="isSubmitting"></span>
              Login
            </button>
          </div>
          <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">
            {{ errors.apiError }}
          </div>
        </Form>
      </div>
    </div>
  </body>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../stores";
import { Field, Form } from "vee-validate";
export default {
  name: "LoginView",
  components: {
    Field,
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
  },

  computed: {
    ...mapState(useAuthStore, ["token"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["doLogin"]),

    onSubmit({ username, password }) {
      this.doLogin(username, password);
      this.$router.push("/");
    },
  },
};
</script>
<style>
.box-login {
  width: 400px;
  margin: auto;
  box-shadow: 3px 4px 2px rgb(0 5 0 / 80%);
  border: 2px solid #ddd;
  margin-top: 120px;
  background-color: #fff;
}
.btn-outline-primary {
  border-color: #FF8800;
  color: #C66300;
}

.btn-outline-primary:hover {
  color: #fff;
  background-color: #FF8800;
  border-color: #C66300;;
}

</style>
