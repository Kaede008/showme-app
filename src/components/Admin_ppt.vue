<!--  -->
<template>
  <main>
    <!-- <div class="container">
      {{ content }}
    </div> -->
    <textarea v-model="content" class="container" rows="40" placeholder="输入内容"></textarea>
    <button @click="send_content" class="btn">发送</button>
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

.btn {
  background: #eb94d0;
  /* 创建渐变 */
  background-image: -webkit-linear-gradient(top, #eb94d0, #2079b0);
  background-image: -moz-linear-gradient(top, #eb94d0, #2079b0);
  background-image: -ms-linear-gradient(top, #eb94d0, #2079b0);
  background-image: -o-linear-gradient(top, #eb94d0, #2079b0);
  background-image: linear-gradient(to bottom, #eb94d0, #2079b0);
  /* 给按钮添加圆角 */
  border-radius: 28px;
  text-shadow: 3px 2px 1px #9daef5;
  box-shadow: 6px 5px 24px #666666;
  font-family: Arial;
  color: #fafafa;
  font-size: 27px;
  padding: 19px;
  text-decoration: none;
}
/* 悬停样式 */
.btn:hover {
  background: #2079b0;
  background-image: -webkit-linear-gradient(top, #2079b0, #eb94d0);
  background-image: -moz-linear-gradient(top, #2079b0, #eb94d0);
  background-image: -ms-linear-gradient(top, #2079b0, #eb94d0);
  background-image: -o-linear-gradient(top, #2079b0, #eb94d0);
  background-image: linear-gradient(to bottom, #2079b0, #eb94d0);
  text-decoration: none;
}
</style>
