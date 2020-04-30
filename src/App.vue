<template>
  <div
    class="container mx-auto"
    id="app"
  >
    <div id="nav">
      <router-link to="/">Movie Finder</router-link>
    </div>
    <keep-alive :exclude="['Movie']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  export default {
    props: ['configuration'],

    provide() {
      return {
        configuration: this.configuration,
      };
    },
  };
</script>

<style>
  body {
    font-size: 16px;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
