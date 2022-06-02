<script>
import { RouterLink, useRouter } from "vue-router";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useToast } from "vue-toastification";
import HeaderComponent from "@/components/auth/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
  },
  setup() {
    let user = reactive({
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    const validation = ref([]);

    const router = useRouter();

    const toast = useToast();

    function register() {
      const btnRegister = document.querySelector(".btn-register");
      btnRegister.removeChild(btnRegister.children[0]);
      btnRegister.innerHTML = `
        <div>
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          <span>Loading...</span>
        </div>
      `;
      axios
        .post("http://127.0.0.1:8000/api/register", this.user)
        .then(() => {
          router.push({
            name: "login.admin",
          });
          toast.success("Registrasi berhasil!", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        })
        .catch((err) => {
          validation.value = err.response.data;
          btnRegister.removeChild(btnRegister.children[0]);
          btnRegister.innerHTML = `
            <span><i class="bi bi-person-plus"></i> Register</span>
          `;
        });
    }

    return {
      user,
      validation,
      router,
      register,
    };
  },
};
</script>

<template>
  <HeaderComponent />
  <div class="container">
    <div class="row d-flex registrasi-form-page">
      <div class="col-6 d-none d-lg-block d-xl-block d-xxl-block">
        <div class="">
          <img src="./../../assets/images/vectors/vector-login.png" class="img-fluid" alt="Gambar Vector" />
        </div>
      </div>
      <div class="col-10 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
        <h4 class="mb-4 text-center text-uppercase">Registrasi</h4>
        <form action="" @submit.prevent="register">
          <div class="mb-4">
            <input type="text" v-model="user.name" class="form-control border-0 shadow" placeholder="Nama" autofocus required />
            <div v-if="validation.name" class="text-danger">
              {{ validation.name[0] }}
            </div>
          </div>
          <div class="mb-4">
            <input type="text" v-model="user.username" class="form-control border-0 shadow" placeholder="Username" required />
            <div v-if="validation.username" class="text-danger">
              {{ validation.username[0] }}
            </div>
          </div>
          <div class="mb-4">
            <input type="email" v-model="user.email" class="form-control border-0 shadow" placeholder="Email" required />
            <div v-if="validation.email" class="text-danger">
              {{ validation.email[0] }}
            </div>
          </div>
          <div class="mb-4">
            <input type="password" v-model="user.password" class="form-control border-0 shadow" placeholder="Password" required />
            <div v-if="validation.password" class="text-danger">
              {{ validation.password[0] }}
            </div>
          </div>
          <div class="mb-4">
            <input type="password" v-model="user.password_confirmation" class="form-control border-0 shadow" placeholder="Konfirmasi Password" required />
            <div v-if="validation.password_confirmation" class="text-danger">
              {{ validation.password_confirmation[0] }}
            </div>
          </div>
          <div class="mb-4 text-center">
            <button type="submit" class="btn btn-success shadow text-uppercase btn-register">
              <span><i class="bi bi-person-plus"></i> Register</span>
            </button>
          </div>
        </form>
        <hr class="mb-4" />
        <div class="text-center">
          <span>Sudah punya akun? <router-link :to="{ name: 'login.admin' }" class="text-success text-decoration-none">Login</router-link></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import "@/assets/css/auth/auth.css";
</style>
