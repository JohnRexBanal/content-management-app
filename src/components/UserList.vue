<template>
    <NavBar></NavBar>
    <div class="row">
        <div class="col-12 mb-2 text-end"></div>
        <div class="col-12">
            <div class="card m-2">
                <div class="card-header">
                    <div class="d-grid gap-2 d-md-flex justify-content-between">
                        <h4>Users</h4>
                        <router-link to="/register" class="btn btn-primary">Register</router-link>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr class="table-dark">
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th width="15%">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="users.length > 0">
                                <tr v-for="user in users" :key="user.id">
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <div class="d-grid gap-2 d-md-flex justify-content-center">
                                            <router-link :to="'/viewUser/' + user.id"
                                                class="btn btn-primary">View</router-link>
                                            <router-link :to="'/updateUser/' + user.id"
                                                class="btn btn-success">Edit</router-link>
                                            <button @click="deleteUser(user.id)" class="btn btn-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="3" align="center">No Users Found.</td>
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
    name: "UserList",
    components: {
        NavBar,
    },
    data() {
        return {
            users: [],
            isLoggedIn: false,
        };
    },
    async mounted() {
        await this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    this.$root.$data.apiUrl + "/users/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    this.users = response.data;
                } else {
                    throw new Error("Failed to fetch users");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
        async deleteUser(id) {
            if (confirm("Are you sure you want to delete this user?")) {
                try {
                    await axios.delete(`${this.$root.$data.apiUrl}/users/delete/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    this.users = this.users.filter((user) => user.id !== id);
                } catch (error) {
                    console.error("Error deleting user:", error);
                    if (error.response && error.response.status === 403) {
                        alert(
                            "Unauthorized: You do not have permission to delete this user."
                        );
                    } else {
                        alert("An error occurred while deleting the user.");
                    }
                }
            }
        },
    },
};
</script>