from fastapi import FastAPI
from register_webhook import register_webhook, unregister_webhook

app = FastAPI()

app.include_router(register_webhook)
app.include_router(unregister_webhook)


