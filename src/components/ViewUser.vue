<template>
    <div class="container mt-5">
      <router-link to="/userList" class="btn btn-primary mb-3">Back</router-link>
      <div class="card" v-if="user">
        <div class="card-header bg-dark text-white">
          <h3>{{ user.name }}</h3>
        </div>
        <div class="card-body">
          <h5>Email: {{ user.email }}</h5>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ViewUser',
    data() {
      return {
        user: null,
      };
    },
    methods: {
      async fetchUser(id) {
        try {
          const response = await axios.get(`${this.$root.$data.apiUrl}/users/view/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    },
    mounted() {
      const userId = this.$route.params.id;
      console.log(`Fetching user with ID: ${userId}`);
      this.fetchUser(userId);
    }
  }
  </script>
  