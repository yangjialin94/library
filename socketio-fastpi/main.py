import uvicorn
from fastapi import FastAPI

from sockets import sio_app

# Create the FastAPI app
app = FastAPI()

# Mount the Socket.IO app to the FastAPI app
app.mount("/", app=sio_app)


# Define the base route
@app.get("/")
async def root():
    return {"message": "Hello World"}


# Run the app with Uvicorn: `python3 main.py` or `python3 -m main`
if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
