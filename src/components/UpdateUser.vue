<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header bg-dark text-white">
          <h3>Edit User</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateUser">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="name"
                @input="clearErrors('name')"
                placeholder="Enter user name"
              />
              <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
            </div>
            <div class="form-group mt-3">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                @input="clearErrors('email')"
                placeholder="Enter user email"
              />
              <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
            </div>
            <div class="form-group mt-3">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                @input="clearErrors('password')"
                placeholder="Enter new password"
              />
              <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
            </div>
            <div class="form-group mt-3">
              <label for="password_confirmation">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="password_confirmation"
                v-model="password_confirmation"
                @input="clearErrors('password_confirmation')"
                placeholder="Confirm new password"
              />
              <small class="text-danger" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</small>
            </div>
            <div class="row justify-content-between mt-4">
              <div class="col-auto">
                <button type="submit" class="btn btn-primary btn-lg btn-block">Update User</button>
              </div>
              <div class="col-auto">
                <router-link to="/userList" class="btn btn-danger btn-lg btn-block">Discard</router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "UpdateUser",
    data() {
      return {
        id: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        errors: {}
      };
    },
    mounted() {
      const userId = this.$route.params.id;
      this.fetchUser(userId);
    },
    methods: {
      async fetchUser(id) {
        try {
          const response = await axios.get(`${this.$root.$data.apiUrl}/users/view/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          const user = response.data;
          this.id = id;
          this.name = user.name;
          this.email = user.email;
        } catch (error) {
          console.error("Error fetching user:", error);
          alert("Failed to load user data");
        }
      },
      async updateUser() {
        try {
          const response = await axios.put(`${this.$root.$data.apiUrl}/users/update/${this.id}`, {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          if (response.status === 200) {
            alert("User updated successfully!");
            this.$router.push("/userList");
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
    }
  };
  </script>
  