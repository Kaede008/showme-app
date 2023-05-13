<template>
  <main>
    <div class="container" v-if="isPlayer">
      <!-- <div class="avatar">
        <img src="images/avatar.jpg" alt="" />
      </div> -->
      <h1>{{ player.groupName }}</h1>
      <h1>{{ player.name }}</h1>
      <p class="score">最终得分：{{ player.score }}</p>
      <input class="score-input" @keyup.enter="handleInput" />
    </div>

    <div class="group-container" v-if="!isPlayer">
      <h2 class="title">{{ groupTitle }}得分排名</h2>
      <div class="group" v-for="(group, index) in orderedGroups" :key="group.groupName">
        {{ index + 1 }}、 {{ group.groupName }}: {{ group.groupScore }}
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
        <p class="player" @click="toggle">总得分</p>
        <p class="player" @click="firstPart">第一环节</p>
        <p class="player" @click="secondPart">第二环节</p>
        <p class="player" @click="firstSecondePart">第一、第二环节</p>
        <p class="player" @click="thirdPart">第三环节</p>
      </div>
    </div>
  </main>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import _ from "lodash";

import { groups as g, players as p } from "../config";
import { wss } from "../client_websocket";

const PLAYER_KEY = "players";

export default {
  name: "HelloWorld",
  // name: "App",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      // player: { id: 0, name: "", groupId: 0, score: 0, part: "" },
      player: p[0],
      isPlayer: true,
      players: p,
      groups: g,
      orderedGroups: g,
      groupTitle: "",
    };
  },
  methods: {
    handleInput(event) {
      this.player.score = _.floor(parseFloat(event.target.value), 2);
      event.target.value = "";
      window.localStorage.setItem(PLAYER_KEY, JSON.stringify(this.players));
      event.target.blur();
    },
    clickPlayer(player) {
      this.player = player;
      this.isPlayer = true;
    },
    toggle() {
      _.forEach(this.groups, group => {
        group.groupScore = 0;
        _.forEach(this.players, player => {
          if (group.groupId == player.groupId)
            group.groupScore = _.floor(parseFloat(group.groupScore) + parseFloat(player.score), 2);
        });
      });
      this.orderedGroups = _.orderBy(this.groups, ["groupScore"], ["desc"]);
      this.groupTitle = "总得分";
      this.isPlayer = false;
    },
    firstPart() {
      _.forEach(this.players, player => {
        if (player.part == "第一环节") {
          _.forEach(this.groups, group => {
            if (player.groupId == group.groupId) group.groupScore = parseFloat(player.score);
          });
        }
      });
      this.orderedGroups = _.orderBy(this.groups, ["groupScore"], ["desc"]);
      this.groupTitle = "第一环节";
      this.isPlayer = false;
    },
    secondPart() {
      _.forEach(this.players, player => {
        if (player.part == "第二环节") {
          _.forEach(this.groups, group => {
            if (player.groupId == group.groupId) group.groupScore = parseFloat(player.score);
          });
        }
      });
      this.orderedGroups = _.orderBy(this.groups, ["groupScore"], ["desc"]);
      this.groupTitle = "第二环节";
      this.isPlayer = false;
    },
    firstSecondePart() {
      _.forEach(this.groups, group => {
        group.groupScore = 0;
        _.forEach(this.players, player => {
          if (group.groupId == player.groupId && (player.part == "第一环节" || player.part == "第二环节"))
            group.groupScore = _.floor(parseFloat(group.groupScore) + parseFloat(player.score), 2);
        });
      });
      this.groupTitle = "一、二环节";
      this.orderedGroups = _.orderBy(this.groups, ["groupScore"], ["desc"]);
      this.isPlayer = false;
    },
    thirdPart() {
      _.forEach(this.players, player => {
        if (player.part == "第三环节") {
          _.forEach(this.groups, group => {
            if (player.groupId == group.groupId) group.groupScore = parseFloat(player.score);
          });
        }
      });
      this.orderedGroups = _.orderBy(this.groups, ["groupScore"], ["desc"]);
      this.groupTitle = "第三环节";
      this.isPlayer = false;
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
      //   player.score = _.floor(_.random(10.0, 30.0, true), 2);
      // });
    }

    // 接收 admin 页面的通信
    wss.onmessage = res => {
      console.log(res.data);
      const { type } = JSON.parse(res.data);
      if (type == "player") {
        const { id } = JSON.parse(res.data);
        this.player = this.players.find(p => p.id == id);
      }

      if (type == "score") {
        const { id, score } = JSON.parse(res.data);
        this.players.find(p => p.id == id).score = score;
        window.localStorage.setItem(PLAYER_KEY, JSON.stringify(this.players));
      }

      if (type == "toggle") {
        this.toggle();
      }
    };
  },
};
</script>

<style scoped>
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
  /* background: rgb(203, 210, 240); */
  background-image: url("../../public/images/bg2.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

main .bottom {
  align-self: end;
  text-align: center;
  color: transparent;
  font-size: 14px;
  display: flex;
}
main .bottom:hover {
  color: #414873;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
  background-color: rgba(245, 246, 252, 0.7);
}

main .bottom .group {
  margin: 0 7px;
}

main .bottom .group .player {
  cursor: pointer;
}

main .bottom .group .player:hover {
  text-decoration: underline;
}

.container {
  margin-top: 100px;
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
  font-size: 48px;
  color: #414873;
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
  font-size: 48px;
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
