<script>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const token = localStorage.getItem("token");

    const router = useRouter();

    const user = ref("");

    onMounted(() => {
      if (!token) {
        return router.push({
          name: "login.admin",
        });
      }

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      axios
        .get("http://127.0.0.1:8000/api/user")
        .then((response) => {
          user.value = response.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });

    function logout() {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      axios
        .post("http://127.0.0.1:8000/api/logout")
        .then((response) => {
          if (response.data.success) {
            localStorage.removeItem("token");
            return router.push({
              name: "login.admin",
            });
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }

    function dropdownUser() {
      const dropdown = document.querySelector(".dropdown-user");
      dropdown.classList.toggle("active");
    }

    return {
      token,
      user,
      router,
      logout,
      dropdownUser,
    };
  },
};
</script>

<template>
  <div class="header d-flex">
    <div class="icon-toggle d-flex align-items-center ps-4">
      <i class="bi bi-list"></i>
    </div>
    <div class="user-info ms-auto d-flex align-items-center pe-4">
      <div class="dropdown-header">
        <button type="button" class="border-0 bg-transparent toggle-dropdown" @click="dropdownUser">{{ user.name }}</button>
        <ul class="dropdown-user shadow">
          <li>
            <router-link :to="{ name: 'dashboard.admin' }" class="text-decoration-none text-underline-none text-dark"><i class="bi bi-layout-text-window-reverse"></i> Dashboard</router-link>
          </li>
          <li @click.prevent="logout"><i class="bi bi-box-arrow-left text-danger"></i> <span class="text-dark">Logout</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import "@/assets/css/layouts/header.css";
</style>
