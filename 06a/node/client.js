import { WebSocket } from "ws";
import readline from "readline";

// Opret forbindelse til WebSocket-serveren
const ws = new WebSocket("ws://localhost:8080");

// Opret en interface til at læse brugerinput fra terminalen
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Når WebSocket er åben, giv brugeren mulighed for at skrive beskeder
ws.on("open", () => {
    console.log("Forbundet til WebSocket-serveren. Skriv en besked:");

    rl.on("line", (input) => {
        ws.send(input);  // Send input til WebSocket-serveren
    });
});

// Når der modtages en besked fra serveren
ws.on("message", (message) => {
    console.log(`Modtaget fra serveren: ${message}`);
});
