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