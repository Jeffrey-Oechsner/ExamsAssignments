from fastapi import FastAPI, Request
import json

app = FastAPI()

WEBHOOKS_FILE = "webhooks.json"


@app.post("/register")
async def register(request: Request):
    body = await request.json()
    with open(WEBHOOKS_FILE, "r") as f:
        webhooks = json.load(f)
    webhooks.append(body)
    with open(WEBHOOKS_FILE, "w") as f:
        json.dump(webhooks, f)
    return {"message": "Webhook registered."}


@app.post("/unregister")
async def unregister(request: Request):
    body = await request.json()
    with open(WEBHOOKS_FILE, "r") as f:
        webhooks = json.load(f)
    webhooks = [w for w in webhooks if w["url"] != body["url"]]
    with open(WEBHOOKS_FILE, "w") as f:
        json.dump(webhooks, f)
    return {"message": "Webhook unregistered."}


@app.get("/ping")
async def ping():
    return {"message": "pong"}
