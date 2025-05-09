from fastapi import APIRouter
from pydantic import BaseModel
import requests

register_webhook = APIRouter()
unregister_webhook = APIRouter()

EXPOSEE_URL = "http://127.0.0.1:8000"  # exposee kører på port 8000

class Webhook(BaseModel):
    url: str
    event: str

@register_webhook.post("/register-webhook")
def register(webhook: Webhook):
    response = requests.post(f"{EXPOSEE_URL}/register", json=webhook.model_dump())
    return {"message": "Webhook registered via integrator."}

@unregister_webhook.post("/unregister-webhook")
def unregister(webhook: Webhook):
    response = requests.post(f"{EXPOSEE_URL}/unregister", json=webhook.model_dump())
    return {"message": "Webhook unregistered via integrator."}

@register_webhook.get("/ping")
def test_ping():
    return {"message": "Integrator er klar og lytter!"}
