<script>
import { RouterLink, useRouter } from "vue-router";
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import HeaderComponent from "@/components/auth/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
  },
  setup() {
    const user = reactive({
      username: "",
      password: "",
    });

    const token = localStorage.getItem("token");

    const router = useRouter();

    const validation = ref([]);

    const toast = useToast();

    onMounted(() => {
      if (token) {
        return router.push({
          name: "dashboard.admin",
        });
      }
    });

    function login() {
      const btnLogin = document.querySelector(".btn-login");
      btnLogin.removeChild(btnLogin.children[0]);
      btnLogin.innerHTML = `
        <div>
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          <span>Loading...</span>
        </div>
      `;
      axios
        .post("http://127.0.0.1:8000/api/login", this.user)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            return router.push({
              name: "dashboard.admin",
            });
          }

          toast.error("Username atau password salah!", {
            type: "error",
            position: "top-right",
            duration: 5000,
            dismissible: true,
          });
          btnLogin.removeChild(btnLogin.children[0]);
          btnLogin.innerHTML = `<span><i class="bi bi-box-arrow-in-right"></i> login</span>`;
        })
        .catch((err) => {
          validation.value = err.response.data;
          btnLogin.removeChild(btnLogin.children[0]);
          btnLogin.innerHTML = `<span><i class="bi bi-box-arrow-in-right"></i> login</span>`;
        });
    }

    return {
      user,
      router,
      validation,
      login,
    };
  },
};
</script>

<template>
  <div class="d-block d-lg-none d-xl-none d-xxl-none">
    <HeaderComponent />
  </div>
  <div class="container">
    <div class="row d-flex login-form-page">
      <div class="col-6 d-none d-lg-block d-xl-block d-xxl-block">
        <div class="">
          <img src="./../../assets/images/vectors/vector-login.png" class="img-fluid" alt="Gambar Vector" />
        </div>
      </div>
      <div class="col-10 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
        <h4 class="mb-4 text-uppercase text-center">selamat datang</h4>
        <form @submit.prevent="login">
          <div class="mb-4">
            <input type="text" v-model="user.username" class="form-control border-0 shadow" placeholder="Username" autofocus required />
            <div v-if="validation.username" class="text-danger">
              {{ validation.username[0] }}
            </div>
          </div>
          <div class="mb-4">
            <input type="password" v-model="user.password" class="form-control border-0 shadow" placeholder="Password" />
            <div v-if="validation.password" class="text-danger">
              {{ validation.password[0] }}
            </div>
          </div>
          <div class="mb-4 text-center">
            <button type="submit" class="btn btn-success shadow text-uppercase btn-login">
              <span><i class="bi bi-box-arrow-in-right"></i> login</span>
            </button>
          </div>
        </form>
        <hr class="mb-4" />
        <div class="text-center">
          <span>Belum punya akun? <router-link :to="{ name: 'register.admin' }" class="text-success text-decoration-none">Register</router-link></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import "@/assets/css/auth/auth.css";
</style>
