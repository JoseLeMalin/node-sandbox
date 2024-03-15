// import { WebSocketServer } from "ws";
// import { createServer } from "http";

// export const buildWebsocket = (app: Express) => {
//   const server = createServer(app);
//   const heartbeat = () => {
//     return true;
//   };
//
//   const wss = new WebSocketServer({ port: 8080 });
//
//   wss.on("connection", function connection(ws) {
//     ws.qsd = true;
//     ws.isAlive = true;
//     ws.on("error", console.error);
//     ws.on("pong", () => (ws.isAlive = heartbeat));
//   });
//
//   const interval = setInterval(function ping() {
//     wss.clients.forEach((ws) => {
//       if (ws.isAlive === false) return ws.terminate();
//
//       ws.isAlive = false;
//       ws.ping();
//     });
//   }, 30000);
//
//   wss.on("close", function close() {
//     clearInterval(interval);
//   });
// };
