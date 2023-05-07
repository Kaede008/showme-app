<!--  -->
<template>
  <h1>Admin page</h1>
  <button @click="onclick">点我</button>
  <div></div>
  <input class="score-input" @keyup.enter="handleInput" placeholder="点击输入分数" />
</template>

<script>
import { wss } from "../admin_websocket";
import _ from "lodash";

export default {
  name: "Admin",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleInput(event) {
      const score = event.target.value;
      event.target.value = "";
      // event.target.blur();
      const data = {
        type: "score",
        id: 10,
        score: score,
      };
      wss.send(JSON.stringify(data));
    },
    onclick() {
      console.log("click!");
      const playerId = _.random(1, 30);
      const data = {
        type: "player",
        id: playerId,
      };
      wss.send(JSON.stringify(data));
    },
    init() {},
  },
};
</script>
<style scoped>
.score-input {
  margin-top: 16px;
  color: #626262;
  height: 20px;
  border: none;
  outline: none;
  width: 200px;
  box-shadow: 0 0 24px rbga(0, 0, 0, 0.08);
}
</style>
