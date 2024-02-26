import { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { v4 } from "uuid";
import { z } from "zod";
import { WSInputSchema } from "../types/ws.types";
/**
 * Init of the Websockets
 * https://github.com/websockets/ws?tab=readme-ov-file#simple-server
 */

// const wss = new WebSocketServer({ port: 8080 });
type WSMetadata = {
  id: string;
  color: number;
};
export const buildWebsocket = (server: Server) => {
  const heartbeat = () => {
    console.log("heartbeat");

    return true;
  };

  const clients = new Map<WebSocket, WSMetadata>();
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws, request) => {
    const id = v4();
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color };

    clients.set(ws, metadata);

    console.log("started client interval");

    ws.on("message", async (data) => {
      const resultParse = await WSInputSchema.safeParseAsync(data);
      if (!resultParse.success) {
        ws.send("Error");
        return;
      }

      console.log("received: %s", data);
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(`Ici on fait des tests: ${v4()}`);
        }
      });

      ws.on("pong", (data) => {
        console.log("Ping received with data? ", data);
        ws.send("Answer to your pong");
      });
      ws.on("ping", (data) => {
        console.log("Ping received with data? ", data);
        ws.send("Answer to your ping");
      });
      ws.on("error", (error) => ws.send(`Error WS: ${error}`));

      ws.on("close", (code: number, reason: Buffer) => {
        console.log("code: ", code);
        console.log("reasno : ", reason.toString());
        console.log("stopping client interval");
        clients.delete(ws);
        clearInterval(id);
      });
    });
  });
  return {
    wss,
  };
};
