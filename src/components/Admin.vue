<!--  -->
<template>
  <h1>Admin page</h1>
  <button @click="onclick">点我</button>
</template>

<script>
let id = 1;
export default {
  name: "Admin",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onclick() {
      console.log("click!");
      localStorage.setItem("playerId", id);
      id = id + 1;
    },
  },
};
</script>
<style scoped></style>
