import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sockets import sio_app

# Create the FastAPI app
app = FastAPI()

# Mount the Socket.IO ASGI app
app.mount("/", app=sio_app)


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define the base route
@app.get("/")
async def root():
    return {"message": "Hello World"}


# Run the app with Uvicorn: `python3 main.py` or `python3 -m main`
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
