import { WebSocketServer } from "ws";

const PORT = 8080;
const server = new WebSocketServer({ port: PORT });

console.log(`WebSocket Server kører på ws://localhost:${PORT}`);

server.on("connection", (ws) => {
    console.log("Ny klient tilsluttet");

    ws.on("message", (message) => {
        console.log(`Modtaget besked: ${message}`);

        // Send beskeden til ALLE tilsluttede klienter
        server.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(`Server siger: ${message}`);
            }
        });
    });

    ws.on("close", () => console.log("Klient afbrød forbindelsen"));
});

