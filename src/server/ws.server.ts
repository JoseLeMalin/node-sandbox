import { Server } from "http";
import { WebSocketServer } from "ws";
/**
 * Init of the Websockets
 * https://github.com/websockets/ws?tab=readme-ov-file#simple-server
 */

// const wss = new WebSocketServer({ port: 8080 });

export const buildWebsocket = (server: Server) => {
  const heartbeat = () => {
    console.log("heartbeat");
    
    return true;
  };

  // const wss = new WebSocketServer({
  //   clientTracking: false,
  //   noServer: true,
  //   port: 8080,
  // });

  const wss = new WebSocketServer({ server });
  wss.on("connection", function (ws) {
    const id = setInterval(function () {
      ws.send(JSON.stringify(process.memoryUsage()), function () {
        //
        // Ignore errors.
        //
      });
    }, 100);
    console.log("started client interval");
    
    ws.on('pong', heartbeat);
    ws.on('ping', heartbeat);
    ws.on("error", console.error);

    ws.on("close", function () {
      console.log("stopping client interval");
      clearInterval(id);
    });
  });

  return {
    wss,
  };
};


