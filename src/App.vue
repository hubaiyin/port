<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
/* html, body {
	width: 100%;
	height: 100%;
} */
#app {
  height: 100vh;
  width: 100vw;
  min-height: 800px;
  min-width: 1180px;
}
* {
  padding: 0;
  margin: 0;
}
</style>
