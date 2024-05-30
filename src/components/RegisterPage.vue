<template>
    <div class="container mt-5 w-25">
      <h4>Registration Form</h4>
      <form @submit.prevent="registerUser">
        <div class="form-group mb-3">
          <input type="text" class="form-control" id="name" v-model="name" @input="clearErrors('name')" placeholder="Enter name" required>
        </div>
        <div class="form-group mb-3">
          <input type="email" class="form-control" id="email" v-model="email" @input="clearErrors('email')" placeholder="Enter email" required>
          <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
        </div>
        <div class="form-group mb-3">
          <input type="password" class="form-control" id="password" v-model="password" @input="clearErrors('password')" placeholder="Password" required>
          <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
        </div>
        <div class="form-group mb-3">
          <input type="password" class="form-control" id="confirm" v-model="confirm" placeholder="Confirm Password" required>
        </div>
        <button type="submit" class="btn btn-primary mt-3 w-100">Register</button>
      </form>
    </div>
  </template>

  