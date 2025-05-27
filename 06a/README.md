# WebSocket Chat Application

This project demonstrates a simple WebSocket-based chat application. It consists of two main components:

1. **Server**: A WebSocket server that listens for incoming connections and broadcasts messages to all connected clients.
2. **Client**: A WebSocket client that connects to the server and allows users to send and receive messages.

## How the Code Works

### Server (`server.js`)
- The server is implemented using the `ws` library.
- It listens on port `8080` for incoming WebSocket connections.
- When a client connects, the server logs the connection and listens for messages from the client.
- Upon receiving a message, the server broadcasts it to all connected clients, including the sender.
- The integration point where the server sends messages to all clients is in the following code block:

```javascript
server.clients.forEach(client => {
    if (client.readyState === ws.OPEN) {
        client.send(`Server siger: ${message}`);
    }
});
```

### Client (`client.js`)
- The client connects to the WebSocket server at `ws://localhost:8080`.
- It uses the `readline` module to read user input from the terminal.
- When the user types a message, it is sent to the server.
- The client listens for messages from the server and displays them in the terminal.
- The integration point where the client sends messages to the server is in the following code block:

```javascript
rl.on("line", (input) => {
    ws.send(input);  // Send input til WebSocket-serveren
});
```

## Pros and Cons

### Pros
- **Real-time Communication**: Enables instant message exchange between clients.
- **Simple Implementation**: The code is straightforward and easy to understand.
- **Scalable**: Can handle multiple clients simultaneously.

### Cons
- **No Authentication**: Lacks user authentication, making it insecure for production use.
- **Broadcast Overhead**: Messages are broadcast to all clients, which may not scale well for large numbers of clients.
- **Error Handling**: Minimal error handling is implemented, which could lead to crashes or undefined behavior.

## Comments in the Code

To highlight the integration points, comments have been added in both `server.js` and `client.js` where the integration happens.

### Example Comment in `server.js`
```javascript
// Integration point: Broadcasting messages to all connected clients
server.clients.forEach(client => {
    if (client.readyState === ws.OPEN) {
        client.send(`Server siger: ${message}`);
    }
});
```

### Example Comment in `client.js`
```javascript
// Integration point: Sending user input to the WebSocket server
rl.on("line", (input) => {
    ws.send(input);  // Send input til WebSocket-serveren
});
```
