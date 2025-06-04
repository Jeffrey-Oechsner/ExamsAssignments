import express from 'express';

const app = express();

app.use(express.static('public'));

app.get("/synchronizetime", (req, res) => {// her sker integrationen fordi denne route opretter en SSE-forbindelse til klienten og sender data løbende
    res.writeHead(200, {
        "Content-Type": "text/event-stream", // Angiver at dette er en Server-Sent Events (SSE) stream
        "Cache-Control": "no-cache", // Forhindrer caching så klienten altid får nyeste data
        "Connection": "keep-alive" // Holder forbindelsen åben mellem klient og server
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