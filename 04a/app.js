import express from 'express';

const app = express();

app.use(express.static('public'));

app.get("/synchronizetime", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });

    const intervalId = setInterval(() => sendTimeToClient(res), 1000);

    req.on("close", () => {
        clearInterval(intervalId);
        res.end();
    });
});

function sendTimeToClient(res) {
    const time = new Date().toISOString(); // Rigtig metode til at få ISO-tid
    res.write(`data: ${time}\n\n`);
}

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));


// start server op se den siger connect og sluk serveren igen for at se den ikke kan connect.... 

// sende fra 3 steder: browser html / js , direkte i browser consolen. rest i api client. Server-sent events (SSE))

// husk pros and cons ved SSE, short polling og long polling.

// Det virker!""