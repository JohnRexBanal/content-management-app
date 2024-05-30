<template>
    <div class="container mt-5">
      <router-link to="/products" class="btn btn-primary mb-3">Back</router-link>
      <div class="card" v-if="product">
        <div class="card-header bg-dark text-white">
          <h3>{{ product.name }}</h3>
        </div>
        <div class="card-body">
          <h5>Description: {{ product.description }}</h5>
          <p>Price: ${{ product.price }}</p>
          <p>Stocks: {{ product.stock }}</p>
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
    name: 'ViewProduct',
    data() {
      return {
        product: null,
      };
    },
  }


</script>


