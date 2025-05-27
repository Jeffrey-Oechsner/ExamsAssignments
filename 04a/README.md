# Server-Sent Events (SSE) Example

This project demonstrates the use of Server-Sent Events (SSE) to send real-time updates from the server to the client. The example synchronizes the current server time with the client in real-time.

## How the Code Works

### Server (`app.js`)
1. **Express Setup**:
   - The server is created using the Express framework.
   - Static files are served from the `public` directory.

2. **SSE Endpoint**:
   - The `/synchronizetime` endpoint is defined to handle SSE connections.
   - The server sets the appropriate headers for SSE:
     - `Content-Type: text/event-stream`
     - `Cache-Control: no-cache`
     - `Connection: keep-alive`
   - A `setInterval` function sends the current server time to the client every second using the `sendTimeToClient` function.
   - The connection is closed and the interval is cleared when the client disconnects (`req.on("close")`).

3. **Helper Function**:
   - `sendTimeToClient(res)` formats the current time in ISO format and sends it to the client.

### Client (`index.html`)
1. **HTML Structure**:
   - The page contains two `<div>` elements to display the connection status and the synchronized time.

2. **JavaScript Integration**:
   - An `EventSource` object is created to connect to the `/synchronizetime` endpoint.
   - Event listeners handle the following events:
     - `message`: Updates the time displayed on the page.
     - `open`: Indicates that the connection is established.
     - `error`: Handles connection errors and updates the status accordingly.

### Integration Point
The integration between the client and server happens at the `/synchronizetime` endpoint. The client connects to this endpoint using the `EventSource` API, and the server sends real-time updates to the client.

## Pros and Cons of SSE

### Pros
- **Simple to Implement**: SSE is easy to set up and use with native browser support.
- **Efficient for One-Way Communication**: Ideal for scenarios where the server needs to push updates to the client.
- **Automatic Reconnection**: The browser automatically attempts to reconnect if the connection is lost.

### Cons
- **One-Way Communication**: SSE only supports server-to-client communication.
- **Limited Browser Support**: Not supported in older browsers or Internet Explorer.
- **Connection Limits**: Limited to a small number of open connections per browser.
- **No Binary Data**: SSE only supports text-based data.

## How to Run
1. Install dependencies using `npm install`.
2. Start the server using `node app.js`.
3. Open `index.html` in a browser to see the real-time updates.

---

This project demonstrates the simplicity and effectiveness of SSE for real-time updates in web applications.
