<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-dark text-white">
                <h3>Edit Product</h3>
            </div>
            <div class="card-body">
                <form @submit.prevent="updateProduct">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" v-model="name" @input="clearErrors('name')"
                            placeholder="Enter product name">
                        <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
                    </div>
                    <div class="form-group mt-3">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" v-model="description" rows="5"
                            @input="clearErrors('description')" placeholder="Enter product description"></textarea>
                        <small class="text-danger" v-if="errors.description">{{ errors.description[0] }}</small>
                    </div>
                    <div class="form-group mt-3">
                        <label for="price">Price</label>
                        <input type="number" class="form-control" id="price" v-model="price"
                            @input="clearErrors('price')" placeholder="Enter product price">
                        <small class="text-danger" v-if="errors.price">{{ errors.price[0] }}</small>
                    </div>
                    <div class="form-group mt-3">
                        <label for="stock">Stock</label>
                        <input type="number" class="form-control" id="stock" v-model="stock"
                            @input="clearErrors('stock')" placeholder="Enter product stock">
                        <small class="text-danger" v-if="errors.stock">{{ errors.stock[0] }}</small>
                    </div>
                    <div class="row justify-content-between mt-4">
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Update Product</button>
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
    name: 'UpdateProduct',
    data() {
        return {
            id: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            errors: {}
        };
    },
    mounted() {
        const productId = this.$route.params.id;
        this.fetchProduct(productId).then(() => {
        this.product = true;
    })
},
    methods: {
        async fetchProduct(id) {
            try {
                const response = await axios.get(`${this.$root.$data.apiUrl}/edit/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const [product] = response.data;
                this.id = id;
                this.name = product.name;
                this.description = product.description;
                this.price = product.price;
                this.stock = product.stock;
            } catch (error) {
                console.error('Error fetching product:', error);
                alert('Failed to load product data', error);
            }
        },

        async updateProduct() {
            try {
                const response = await axios.put(`${this.$root.$data.apiUrl}/update/${this.id}`, {
                    name: this.name,
                    description: this.description,
                    price: this.price,
                    stock: this.stock,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    alert('Product updated successfully!');
                    this.$router.push('/products');
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    this.errors = error.response.data.errors;
                }
            }
        },
        clearErrors(field) {
            this.errors[field] = null;
        }
    },

};
</script>