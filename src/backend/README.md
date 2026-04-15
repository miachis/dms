# BACKEND FOR DM'S

### Rest API

The Rest API runs on port 3000 and exposes some endpoints that are needed for the frontend to run properly and fetch certain data.

Rest APIs were built using expressjs and typescript

[REST APIs](https://github.com/miachis/dms/tree/main/src/backend/src/api/rest)

### Websocket API

WebSocket API is on port 4000 and enables bi-directional communication between two users at the same time, Websockets were used to prevent latency and allow messages to be sent in real time

Websocket APIs were built using socket.io and typescript

[WEBSOCKET API](https://github.com/miachis/dms/blob/main/src/backend/src/webSocketServer.ts)
