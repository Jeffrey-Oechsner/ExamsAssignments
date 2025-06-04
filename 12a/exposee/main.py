from fastapi import FastAPI, Request
import json
import requests

app = FastAPI()
WEBHOOKS_FILE = "webhooks.json"

@app.post("/register")
async def register(request: Request):
    # her sker integration: integrator modtager webhook-data fra eksterne systemer og gemmer dem, så andre systemer kan blive notificeret senere
    body = await request.json()
    with open(WEBHOOKS_FILE, "r") as f:
        webhooks = json.load(f)
    webhooks.append(body)
    with open(WEBHOOKS_FILE, "w") as f:
        json.dump(webhooks, f)
    return {"message": "Webhook registered."}

@app.post("/unregister")
async def unregister(request: Request):
    # her sker integration: integrator fjerner webhook-data for eksterne systemer, så de ikke længere får beskeder
    body = await request.json()
    with open(WEBHOOKS_FILE, "r") as f:
        webhooks = json.load(f)
    webhooks = [w for w in webhooks if w["url"] != body["url"]]
    with open(WEBHOOKS_FILE, "w") as f:
        json.dump(webhooks, f)
    return {"message": "Webhook unregistered."}

@app.post("/ping")
async def post_ping():
    # her sker integration: integrator sender POST-request ud til alle registrerede webhooks, så eksterne systemer får besked om en event
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
    # her sker integration: integrator sender POST-request ud til alle registrerede webhooks, så eksterne systemer får besked om en event
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


