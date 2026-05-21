import uvicorn
from fastapi import FastAPI
from app.config import setup_cors, APP_HOST, APP_PORT
from app.routes import router

app = FastAPI(title="Scrap Fassy API")

setup_cors(app)

app.include_router(router)

if __name__ == "__main__":
    uvicorn.run("main:app", host=APP_HOST, port=APP_PORT, reload=True)
