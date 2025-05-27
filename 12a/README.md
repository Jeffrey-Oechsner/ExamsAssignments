# Webhook Integration: Exposee & Integrator

This project demonstrates a simple webhook integration between two FastAPI services:

- **Exposee** (Receiver): Handles webhook registration, unregistration, and event notifications.
- **Integrator** (Sender): Registers/unregisters webhooks with Exposee and can be extended to receive events.

## How the Code Works

### Exposee (`12a/exposee/main.py`)
- **Endpoints:**
  - `/register`: Registers a webhook (saves URL and event type to `webhooks.json`).
  - `/unregister`: Removes a webhook by URL.
  - `/ping` (POST/GET): Sends a POST request to all registered webhook URLs with the event type.
- **Storage:**
  - Webhooks are stored in `webhooks.json` as a list of objects: `{ "url": ..., "event": ... }`.

### Integrator (`12a/integrator/register_webhook.py`, `12a/integrator/server.py`)
- **Endpoints:**
  - `/register-webhook`: Registers a webhook with Exposee by calling its `/register` endpoint.
  - `/unregister-webhook`: Unregisters a webhook by calling Exposee's `/unregister` endpoint.
  - `/ping`: Simple health check.
- **Integration Point:**
  - The integration happens where the Integrator makes HTTP requests to Exposee's endpoints using the `requests` library. See the comment in `register_webhook.py` for the exact location.

## Where the Integration Happens

- **File:** `12a/integrator/register_webhook.py`
- **Lines:**
  - In the `register` and `unregister` functions, the following lines perform the integration:
    ```python
    response = requests.post(f"{EXPOSEE_URL}/register", json=webhook.model_dump())
    response = requests.post(f"{EXPOSEE_URL}/unregister", json=webhook.model_dump())
    ```
  - These lines send HTTP requests from Integrator to Exposee, registering or unregistering webhooks.

## Pros and Cons

### Pros
- **Simple and Clear:** Easy to understand and extend for learning or prototyping.
- **Decoupled Services:** Integrator and Exposee are independent; they communicate via HTTP.
- **Extensible:** Easy to add new event types or endpoints.

### Cons
- **No Authentication:** Anyone can register/unregister webhooks.
- **No Error Handling:** Integrator does not check if Exposee returns an error.
- **File-based Storage:** Not suitable for production (use a database for scalability).
- **Synchronous Calls:** Sending webhooks is blocking and may slow down the service if a webhook is slow or unavailable.

## How to Run

1. **Start Exposee (Receiver):**
   ```powershell
   cd 12a/exposee
   poetry run uvicorn main:app --reload
   ```
   (Runs on port 8000)

2. **Start Integrator (Sender):**
   ```powershell
   cd 12a/integrator
   poetry run uvicorn server:app --port 8001 --reload
   ```
   (Runs on port 8001)

3. **API Docs:**
   - Exposee: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   - Integrator: [http://127.0.0.1:8001/docs](http://127.0.0.1:8001/docs)

---

## Code Comment: Integration Point

A comment will be added in `register_webhook.py` to clearly mark where the integration (HTTP call to Exposee) happens.