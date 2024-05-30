<template>
  <NavBar></NavBar>
  <div class="row">
    <div class="col-12 mb-2 text-end"></div>
    <div class="col-12">
      <div class="card m-2">
        <div class="card-header">
          <div class="d-grid gap-2 d-md-flex justify-content-between">
            <h4>Products</h4>
            <router-link to="/create" class="btn btn-primary"
              >Create</router-link
            >
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-bordered">
              <thead>
                <tr class="table-dark">
                  <th>Name</th>
                  <th>Description</th>
                  <th width="15%">Price</th>
                  <th width="15%">Stock</th>
                  <th width="15%">Action</th>
                </tr>
              </thead>
              <tbody v-if="products.length > 0">
                <tr v-for="product in products" :key="product.id">
                  <td>{{ product.name }}</td>
                  <td>{{ product.description }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.stock }}</td>
                  <td>
                    <div class="d-grid gap-2 d-md-flex justify-content-center">
                      <router-link
                        :to="'/view/' + product.id"
                        class="btn btn-primary"
                        >View</router-link
                      >
                      <router-link
                        :to="'/update/' + product.id"
                        class="btn btn-success"
                        >Edit</router-link
                      >
                      <button
                        @click="deleteProduct(product.id)"
                        class="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" align="center">No Products Found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "./Navbar.vue";

export default {
  name: "ProductList",
  components: {
    NavBar,
  },
  data() {
    return {
      products: [],
      isLoggedIn: false,
    };
  },
  async mounted() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.$root.$data.apiUrl + "/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          this.products = response.data;
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async deleteProduct(id) {
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          await axios.delete(`${this.$root.$data.apiUrl}/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          this.products = this.products.filter((product) => product.id !== id);
        } catch (error) {
          console.error("Error deleting product:", error);
          if (error.response && error.response.status === 403) {
            // Forbidden: User doesn't have permission to delete the post
            alert(
              "Unauthorized: You do not have permission to delete this product."
            );
          } else {
            alert("An error occurred while deleting the product.");
          }
        }
      }
    },
  },
};
</script>
