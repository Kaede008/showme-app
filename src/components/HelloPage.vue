<!-- backup page -->
<template>
  <main>
    <div class="container" v-if="isPlayer">
      <div class="avatar">
        <img src="images/avatar.jpg" alt="" />
      </div>
      <h1>姓名: {{ player.name }}</h1>
      <h2>{{ player.groupName }}</h2>
      <p class="score">最终得分：{{ player.score }}</p>
      <input class="score-input" @keyup.enter="handleInput" />
    </div>

    <div class="group-container" v-if="!isPlayer">
      <h1 class="title">各个队伍得分情况</h1>
      <div class="group" v-for="group in orderedGroups" :key="group.groupName">
        {{ group.groupName }}: {{ group.groupScore }}
      </div>
    </div>

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
// import HelloWorld from "./components/HelloWorld.vue";
import _ from "lodash";

import { groups as g, players as p } from "../config";

const PLAYER_KEY = "players";

export default {
  name: "HelloPage",
  components: {},
  data() {
    return {
      player: { id: 0, name: "", groupId: 0, score: 0, part: "" },
      isPlayer: true,
      players: p,
      groups: g,
      orderedGroups: g,
    };
  },
  methods: {
    handleInput(event) {
      this.player.score = event.target.value;
      event.target.value = "";
      window.localStorage.setItem(PLAYER_KEY, JSON.stringify(this.players));
      event.target.blur();
    },
    clickPlayer(player) {
      this.player = player;
    },
    toggle() {
      _.forEach(this.groups, group => {
        group.groupScore = 0;
        _.forEach(this.players, player => {
          if (group.groupId == player.groupId) group.groupScore = parseInt(group.groupScore) + parseInt(player.score);
        });
      });
      this.orderedGroups = _.orderBy(this.groups, ["groupScore"], ["desc"]);
      this.isPlayer = !this.isPlayer;
    },
  },
  mounted() {
    if (window.localStorage.getItem(PLAYER_KEY)) {
      // 已存在 players 数据
      console.log("读取数据");
      this.players = JSON.parse(window.localStorage.getItem(PLAYER_KEY));
    } else {
      console.log("不存在数据");
      // _.forEach(this.players, player => {
      //   player.score = _.random(30);
      // });
    }
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Helvetica, "PingFang SC", "Microsoft Yahei" sans-serif;
}

main {
  width: 100vw;
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
  background: rgb(203, 210, 240);
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
  max-width: 500px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  padding: 48px 28px;
  background-color: rgb(245, 246, 252);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  text-align: center;
  margin: 0 0 24px 0;
}

.group-container {
  width: 70%;
  max-width: 1000px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  padding: 48px 28px;
  background-color: rgb(245, 246, 252);
  display: flex;
  flex-direction: column;
}

.group-container .group {
  background: #ffffff;
  padding: 14px;
  border-radius: 8px;
  color: #626262;
  margin: 5px 0;
}

h1 {
  margin: 20px 0 10px 0;
  font-size: 28px;
  color: #414873;
}

h2 {
  font-size: 20px;
  color: #414873;
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

.score-input {
  margin-top: 16px;
  color: #626262;
  height: 20px;
  border: none;
  outline: none;
  width: 40px;
  box-shadow: 0 0 24px rbga(0, 0, 0, 0.08);
}
</style>
