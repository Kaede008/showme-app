<!--  -->
<template>
  <main>
    <div id="container">
      {{ content }}
    </div>
  </main>
</template>

<script>
import { wss } from "../client_websocket";

export default {
  name: "Ppt",
  components: {},
  data() {
    return {
      content: "",
      intervalTimer: null,
      timeoutTimer: null,
    };
  },
  mounted() {
    // 接收页面通信
    wss.onmessage = res => {
      clearInterval(this.intervalTimer);
      clearTimeout(timeoutTimer);
      const { type } = JSON.parse(res.data);
      if (type == "ppt") {
        const { content } = JSON.parse(res.data);
        this.content = content;
        const container = document.querySelector("#container");
        const height = container.clientHeight;
        let top = 0;
        timeoutTimer = setTimeout(() => {
          this.intervalTimer = setInterval(() => {
            if (window.scrollY >= height) window.scrollY = 0;
            else window.scrollTo({ top: top++ });
          }, 60);
        }, 5000);
      }
    };
  },
  methods: {},
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
  background-image: url("../../public/images/bg2.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

#container {
  width: 90%;
  max-width: 2000px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  padding: 48px 28px;
  background-color: rgb(245, 246, 252);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 60px;
  color: #414873;
}
</style>
