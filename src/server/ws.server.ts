import { WebSocketServer } from 'ws';
/**
 * Init of the Websockets
 * https://github.com/websockets/ws?tab=readme-ov-file#simple-server
 */

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data: string) {
    console.log('received: %s', data);
  });

  ws.send('something');
});