const wss = new WebSocket("wss://gm6d7s.laf.run/__websocket__");

wss.onopen = socket => {
  console.log("connected");
};

wss.onmessage = res => {
  // console.log("收到了新的信息......");
  // console.log(res.data);
};

wss.onclose = () => {
  console.log("closed");
};

export { wss };
