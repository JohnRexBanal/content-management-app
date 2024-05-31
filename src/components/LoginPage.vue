<template>
    <div class="container mt-5 col-3">
      <div class="row">
        <h4>Enter your email and password</h4>
        <form @submit.prevent="loginUser" class="col-12">
          <div class="form-group mt-3">
            <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" required @input="clearErrors">
          </div>
          <div class="form-group mt-3">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required @input="clearErrors">
  
          </div>
          <button type="submit" class="btn btn-primary mt-3 w-100">Login</button>
        </form>
        </div>
    </div>
  </template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: null
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(this.$root.$data.apiUrl + '/login', {
          email: this.email,
          password: this.password
        });
        if (response.status === 201) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.$router.push('/home');
        }
      } catch (error) {
        this.errors = error.response.data.message;
      }
    },
    clearErrors() { 
      this.errors = null;
    }

  }
};
</script>