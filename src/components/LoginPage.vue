<template>
    <div class="container mt-5 col-3">
      <div class="row">
        <h4>Enter your email and password</h4>
          <div class="form-group mt-3">
            <input type="email" class="form-control" id="email"  placeholder="Enter email" >
          </div>
          <div class="form-group mt-3">
            <input type="password" class="form-control" id="password" placeholder="Password" >
  
          </div>
          <button type="submit" class="btn btn-primary mt-3 w-100">Login</button>
      </div>
      <div class="row">
        <div class="col-12">
            <p class="mt-3 text-left">Don't have an account? <router-link to="/register">Register here!</router-link></p>
        </div>
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