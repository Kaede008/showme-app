<!--  -->
<template>
  <main>
    <h1>Admin page</h1>

    <div class="container">
      <h1>{{ player.groupName }}</h1>
      <h1>姓名: {{ player.name }}</h1>
      <p class="score">最终得分：{{ player.score }}</p>
      <input class="score-input" @keyup.enter="handleInput" placeholder="点击输入当前选手得分" />
    </div>
    <button @click="onclick">点我</button>
    <!-- <div></div> -->
    <div class="bottom">
      <div class="group" v-for="group in groups" :key="group.groupName">
        <p>{{ group.groupName }}</p>
        <template v-for="player in players" :key="player.name">
          <p class="player" @click="clickPlayer(player)" v-if="player.groupName == group.groupName">
            {{ player.name }}
          </p>
        </template>
      </div>
      <div class="group">
        <p class="player" @click="toggle">切换显示</p>
      </div>
    </div>
  </main>
</template>

<script>
import { wss } from "../admin_websocket";
import _ from "lodash";

import { groups as g, players as p } from "../config";

export default {
  name: "Admin",
  components: {},
  data() {
    return {
      players: p,
      groups: g,
      player: { id: 0, name: "", groupId: 0, score: 0, part: "" },
    };
  },
  mounted() {},
  methods: {
    clickPlayer(player) {
      this.player = player;
      const playerId = player.id;
      // const data = {
      //   type: "player",
      //   id: playerId,
      // };
      const data = {
        type: "ppt",
        content: "一段文字讯息",
      };
      wss.send(JSON.stringify(data));
    },
    toggle() {
      const data = {
        type: "toggle",
      };
      wss.send(JSON.stringify(data));
    },
    handleInput(event) {
      const score = event.target.value;
      this.player.score = score;
      event.target.value = "";
      event.target.blur();
      const data = {
        type: "score",
        id: this.player.id,
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
main {
  width: 100vw;
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
  background: rgb(203, 210, 240);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

main .bottom {
  align-self: end;
  text-align: center;
  color: #414873;
  font-size: 14px;
  display: flex;
}

main .bottom .group {
  margin: 0 7px;
}

main .bottom .group .player {
  cursor: pointer;
}

.container {
  width: 60%;
  max-width: 750px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  padding: 48px 28px;
  background-color: rgb(245, 246, 252);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container h1 {
  margin: 20px 0 10px 0;
  font-size: 36px;
  color: #414873;
}
.score-input {
  margin-top: 16px;
  padding: 0px 4px;
  color: #626262;
  height: 40px;
  border: 1px solid blue;
  outline: none;
  width: 200px;
  box-shadow: 0 0 24px rbga(0, 0, 0, 0.08);
}

.bottom {
  align-self: end;
  text-align: center;
  color: #414873;
  font-size: 14px;
  display: flex;
}

.bottom .group {
  margin: 0 7px;
}

.bottom .group .player {
  cursor: pointer;
}

.score {
  margin-top: 20px;
  line-height: 80px;
  font-size: 40px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #ffffff;
}
</style>
