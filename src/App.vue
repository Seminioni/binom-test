<template>
  <div
    class="container mx-auto p-5"
    id="app"
  >
    <div id="nav">
      <router-link
        class="text-2xl"
        to="/"
      >
        The MovieDB Finder
        <span class="text-base">(Alpha 0.1)</span>
      </router-link>
    </div>
    <keep-alive :exclude="['Movie']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  export default {
    props: ['configuration', 'genres'],

    provide() {
      return {
        configuration: this.configuration,
        genres: this.genres,
      };
    },
  };
</script>

<style>
  body {
    background-color: yellow;
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
