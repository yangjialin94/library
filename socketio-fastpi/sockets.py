import socketio

# Create a Socket.IO server instance
sio_server = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=["*"])

# Create a Socket.IO ASGI app
sio_app = socketio.ASGIApp(socketio_server=sio_server, socketio_path="/sockets")


# Define a Socket.IO event handler for connection
@sio_server.event
async def connect(sid, environ, auth):
    print(f"Client connected: {sid}")


# Define a Socket.IO event handler for disconnection
@sio_server.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")
