<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    console.log(this.$moment);
  },
};
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
  min-height: 800px;
  min-width: 1080px;
}
* {
  padding: 0;
  margin: 0;
}
</style>
