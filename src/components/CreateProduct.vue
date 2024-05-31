<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header bg-dark text-white">
          <h3>Add a New Product</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="addProduct">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" v-model="name" @input="clearErrors('name')" placeholder="Enter product name">
              <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
            </div>
            <div class="form-group mt-3">
              <label for="description">Description</label>
              <textarea class="form-control" id="description" v-model="description" rows="5" @input="clearErrors('description')" placeholder="Enter product description"></textarea>
              <small class="text-danger" v-if="errors.description">{{ errors.description[0] }}</small>
            </div>
            <div class="form-group mt-3">
              <label for="price">Price</label>
              <input type="number" class="form-control" id="price" v-model="price" @input="clearErrors('price')" placeholder="Enter product price">
              <small class="text-danger" v-if="errors.price">{{ errors.price[0] }}</small>
            </div>
            <div class="form-group mt-3">
              <label for="stock">Stock</label>
              <input type="number" class="form-control" id="stock" v-model="stock" @input="clearErrors('stock')" placeholder="Enter product stock">
              <small class="text-danger" v-if="errors.stock">{{ errors.stock[0] }}</small>
            </div>
            <div class="row justify-content-between mt-4">
              <div class="col-auto">
                <button type="submit" class="btn btn-primary btn-lg btn-block">Add Product</button>
              </div>
              <div class="col-auto">
                <router-link to="/products" class="btn btn-danger btn-lg btn-block">Discard</router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CreateProduct',
    data() {
      return {
        name: '',
        description: '',
        price: '',
        stock: '',
        errors: {},
        products: [],
      };
    },
    methods: {
      async addProduct() {
        try {
          const response = await axios.post(this.$root.$data.apiUrl + '/products/create', {
            name: this.name,
            description: this.description,
            price: this.price,
            stock: this.stock,
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.status === 201) {
            this.products.push(response.data);
            alert('Product added successfully!');
            this.$router.push('/products');
          }
        } catch (error) {
          this.errors = error.response.data.errors;
        }
      },
      clearErrors(field) {
        this.errors[field] = null;
      }
    }
  }
  </script>
  