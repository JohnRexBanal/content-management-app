<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Beta Mart</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/home" class="nav-link active" aria-current="page">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">Manage Product</router-link>
          </li>
          <li v-if="isAdmin" class="nav-item">
            <router-link to="/userList" class="nav-link">Manage User</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" @click.prevent="logout" class="nav-link">Log out</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NavBar',

  computed: {
    isAdmin() {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.is_admin;

    }
  },
  methods: {
    async logout() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(this.$root.$data.apiUrl + '/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response && response.data && response.data.message) {
          console.log(response.data.message);
          localStorage.removeItem('token');
          this.$router.push('/');
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error logging out:', error);
        if (error.response && error.response.data && error.response.data.message) {
          this.errors = error.response.data.message;
        } else {
          this.errors = 'An unexpected error occurred. Please try again.';
        }
      }
    },
  },
};
</script>
