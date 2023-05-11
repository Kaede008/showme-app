<!--  -->
<template>
  <main>
    <!-- <div class="container">
      {{ content }}
    </div> -->
    <textarea class="container" rows="40" placeholder="输入内容"></textarea>
  </main>
</template>

<script>
import { wss } from "../admin_websocket";

export default {
  name: "Admin_ppt",
  components: {},
  data() {
    return {
      content: "",
    };
  },
  mounted() {},
  methods: {
    send_content() {
      const data = {
        type: "ppt",
        content: this.content,
      };
      wss.send(JSON.stringify(data));
    },
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
  background-image: url("../../public/images/bg2.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.container {
  width: 90%;
  max-width: 2000px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  padding: 48px 28px;
  background-color: rgb(245, 246, 252);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #414873;
}
</style>
