exposee: kør en terminal port 8000
cd 12a/exposee
poetry run uvicorn main:app --reload

integrator: kør en terminal på port 8001
cd 12a/integrator
poetry run uvicorn server:app --port 8001 --reload

Gå til browser:

    http://127.0.0.1:8000/docs (modtager = exposee)

    http://127.0.0.1:8001/docs (sender = integrator)