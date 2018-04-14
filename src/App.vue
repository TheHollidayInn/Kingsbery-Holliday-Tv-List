<template>
  <div id="app">
    <b-navbar toggleable="md" type="light">
      <div class='container'>
        <b-navbar-brand href="#">
          <!-- <img class='logo' src='./assets/logo.jpg' /> -->
          Kingsbery-Holliday Tv List
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item :to="{name: 'HelloWorld'}">Home</b-nav-item>
            <b-nav-item to="queue">Queue</b-nav-item>
            <b-nav-item to="watched">Watched</b-nav-item>
          </b-navbar-nav>
        </b-collapse>

        <!-- <button class='btn btn-primary' @click='goToChat()'>Chat on Facebook</button> -->
      </div>
    </b-navbar>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goToChat () {
      window.location.href = 'https://www.facebook.com/groups/782738621899037';
    },
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Poppins');

  .logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  body {
    color: #444;
    background-color: #f6f9fc !important;
    font-weight: 300;
    font-family: 'Poppins', sans-serif;
    background-repeat: no-repeat;
    background-size: cover;
  }

  #app {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .navbar {
    background: #fff;
  }
</style>
