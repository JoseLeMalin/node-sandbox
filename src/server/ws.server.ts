import { IncomingMessage, Server } from "http";
import { WebSocket, WebSocketServer, RawData } from "ws";
import { v4 } from "uuid";
import { WSInputSchema } from "../types/ws.types";
// import { verify } from "jsonwebtoken";

/**
 * Init of the Websockets
 * https://github.com/websockets/ws?tab=readme-ov-file#simple-server
 */

// const wss = new WebSocketServer({ port: 8080 });
type WSMetadata = {
  id: string;
  color: number;
  isAlive: boolean;
};
type WSOutput = {
  code: number;
  payload: object;
};

/*
 * Create a class that will be used to add parameters/function to the Websocket option of the WS Server
 * https://github.com/websockets/ws/blob/master/test/websocket-server.test.js
 */
class CustomWebSocket extends WebSocket.WebSocket {
  isAlive: boolean = false; // Used to detect and close broken connections
}

// class CustomWebSocket extends WebSocket.WebSocket {
//   get foo() {
//     return 'foo';
//   }
// }

export const buildWebsocket = (server: Server) => {
  const clients = new Map<WebSocket, WSMetadata>();
  const wss = new WebSocketServer({
    server,
    verifyClient: (info, cb) => {
      const resultVerif = handleTokenVerification(info);
      cb(resultVerif);
    },
    WebSocket: CustomWebSocket,
  });
  const heartbeat = () => true;

  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on("connection", (ws, request) => {
    ws.isAlive = true;
    const id = v4();
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color, isAlive: true };

    clients.set(ws, metadata);
    ws.onmessage = async (event) => {
      try {
        const data = event.data;
        console.log("Event dans onmessage: ", event);
        console.log("Data dans onmessage: ", data);
        // console.log("isBinary: ", isBinary);

        const parsedMessage = JSON.parse(data.toString());

        const reponse = await setMessageHandlers(parsedMessage);
        console.log(ws.isAlive);
        ws.send(JSON.stringify(reponse));
      } catch (error) {
        ws.send(JSON.stringify(error));
      }
    };

    // ws.on("message", async (data, isBinary) => {
    //   try {
    //     console.log("isBinary: ", isBinary);
    //
    //     const parsedMessage = JSON.parse(data.toString());
    //
    //     const reponse = await setMessageHandlers(parsedMessage);
    //     ws.send(JSON.stringify(reponse));
    //   } catch (error) {
    //     ws.send(JSON.stringify(error));
    //   }
    // });

    ws.on("ping", (data) => {
      console.log("Ping received with data? ", data);
      ws.send("Answer to your ping");
    });
    ws.on("pong", (data) => {
      console.log("Ping received with data? ", data);
      ws.isAlive = heartbeat();
      ws.send("Answer to your pong");
    });
    ws.on("error", (error) => ws.send(`Error WS: ${error}`));

    ws.on("close", (code: number, reason: Buffer) => {
      console.log("code: ", code);
      console.log("reasno : ", reason.toString());
      console.log("stopping client interval");
      clients.delete(ws);
      clearInterval(interval);
    });
  });

  const handleTokenVerification = (info: {
    origin: string;
    secure: boolean;
    req: IncomingMessage;
  }) => {
    return true;
    // const token = info.req.headers.token;
    // if (!token) {
    //   cb(false, 401, "Unauthorized");
    // } else {
    //   // Remove string[] possibility for jwt.verify
    //   if (token instanceof Array) {
    //     cb(false, 401, "Unauthorized");
    //     return;
    //   }
    //   // verify(token, "secret-key", (err, decoded) => {
    //   //   if (err) {
    //   //     cb(false, 401, "Unauthorized");
    //   //   } else {
    //   //     info.req.user = decoded;
    //   //     cb(true);
    //   //   }
    //   // });
    // }
  };

  const setMessageHandlers = async (data: object): Promise<WSOutput> => {
    try {
      const resultParse = await WSInputSchema.safeParseAsync(data);
      if (!resultParse.success) {
        return {
          code: 404,
          payload: {},
        };
      }
      switch (resultParse.data.action) {
        case "Create":
          console.log("Create: ", resultParse.data.action);
          return {
            code: 200,
            payload: {
              content: `Create: , ${resultParse.data.action}`,
            },
          };

          break;
        case "Lorem":
          console.log("Lorem: ", resultParse.data.action);
          return {
            code: 200,
            payload: {
              content: `Lorem: , ${resultParse.data.action}`,
            },
          };

          break;
        case "Lorem2":
          console.log("Lorem2: ", resultParse.data.action);
          return {
            code: 200,
            payload: {
              content: `Lorem2: , ${resultParse.data.action}`,
            },
          };
          break;

        default:
          console.log("Default: ", resultParse.data.action);
          return {
            code: 404,
            payload: {},
          };
          break;
      }
    } catch (error) {
      return {
        code: 404,
        payload: {
          error: ``,
        },
      };
    }
  };

  return {
    wss,
  };
};
