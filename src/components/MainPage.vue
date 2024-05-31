<template>
  <div>
    <NavBar></NavBar>
    <div class="flex-grow-1 p-3">
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Products</h5>
              <p class="card-text">{{ productCount }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Users</h5>
              <p class="card-text">{{ userCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from './Navbar.vue';

export default {
  name: 'MainPage',
  components: {
    NavBar
  },
  data() {
    return {
      productCount: 0,
      userCount: 0
    };
  },
  methods: {
    async fetchProductCount() {
      try {
        const response = await axios.get(`${this.$root.$data.apiUrl}/products/count`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.productCount = response.data.count;
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    },
    async fetchUserCount() {
      try {
        const response = await axios.get(`${this.$root.$data.apiUrl}/users/count`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.userCount = response.data.count;
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    }
  },
  mounted() {
    this.fetchProductCount();
    this.fetchUserCount();
  }
}
</script>