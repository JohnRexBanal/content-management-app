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
    methods: {
      async fetchProduct(id) {
        try {
          const response = await axios.get(`${this.$root.$data.apiUrl}/products/view/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.product = response.data;
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    },
    mounted() {
      const productId = this.$route.params.id;
      this.fetchProduct(productId);
    }
  }


</script>


