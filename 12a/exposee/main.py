from fastapi import FastAPI, Request
import json
import requests

app = FastAPI()
WEBHOOKS_FILE = "webhooks.json"

@app.post("/register")
async def register(request: Request):
    # INTEGRATION POINT: Her sker integrationen ved at modtage webhook-data fra eksterne systemer
    body = await request.json()
    with open(WEBHOOKS_FILE, "r") as f:
        webhooks = json.load(f)
    webhooks.append(body)
    with open(WEBHOOKS_FILE, "w") as f:
        json.dump(webhooks, f)
    return {"message": "Webhook registered."}

@app.post("/unregister")
async def unregister(request: Request):
    # INTEGRATION POINT: Her sker integrationen ved at fjerne webhook-data fra eksterne systemer
    body = await request.json()
    with open(WEBHOOKS_FILE, "r") as f:
        webhooks = json.load(f)
    webhooks = [w for w in webhooks if w["url"] != body["url"]]
    with open(WEBHOOKS_FILE, "w") as f:
        json.dump(webhooks, f)
    return {"message": "Webhook unregistered."}

@app.post("/ping")
async def post_ping():
    with open(WEBHOOKS_FILE, "r") as f:
        webhooks = json.load(f)

    for webhook in webhooks:
        try:
            requests.post(webhook["url"], json={"event": webhook["event"]})
        except Exception as e:
            print(f"Fejl ved webhook {webhook['url']}: {e}")

    return {"message": "POST-ping sendt til alle registrerede webhooks."}

@app.get("/ping")
async def get_ping():
    with open(WEBHOOKS_FILE, "r") as f:
        webhooks = json.load(f)

    for webhook in webhooks:
        try:
            # INTEGRATION POINT: Her sker integrationen til eksterne systemer
            # Serveren sender et HTTP POST-request til hver registreret webhook-URL
            requests.post(webhook["url"], json={"event": webhook["event"]})
        except Exception as e:
            print(f"Fejl ved webhook {webhook['url']}: {e}")

    return {"message": "GET-ping sendt til alle registrerede webhooks."}


