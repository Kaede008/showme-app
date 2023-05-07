const wss = new WebSocket("wss://gm6d7s.laf.run/__websocket__");

wss.onopen = socket => {
  console.log("client connected");
};

wss.onclose = () => {
  console.log("closed");
};

export { wss };
