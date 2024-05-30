<template>
    <div>
      <NavBar></NavBar>
      <div class="flex-grow-1 p-3">
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from './Navbar.vue';
  
  export default {
    name: 'MainLayout',
    components: {
      NavBar
    }
  }
  </script>
  