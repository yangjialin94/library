import hashlib

import socketio

# Create a Socket.IO server instance
sio_server = socketio.AsyncServer(
    async_mode="asgi", cors_allowed_origins=["http://localhost:3000"]
)

# Create a Socket.IO ASGI app
sio_app = socketio.ASGIApp(socketio_server=sio_server, socketio_path="/sockets")


# Define a Socket.IO event handler for connection
@sio_server.event
async def connect(sid, environ, auth):
    print(f"Client connected: {sid}")

    # Emit a "join" event with the SID and a random username
    await sio_server.emit("join", {"sid": sid, "username": convert_to_username(sid)})


# Define a Socket.IO event handler for disconnection
@sio_server.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

    # Emit a "leave" event with the SID and a random username
    await sio_server.emit("leave", {"sid": sid, "username": convert_to_username(sid)})


# Define a Socket.IO event handler for chat messages
@sio_server.event
async def chat(sid, message):
    print(f"Message from {sid}: {message}")

    # Emit the message to all connected clients
    await sio_server.emit(
        "chat",
        {"sid": sid, "username": convert_to_username(sid), "message": message},
    )


# Helper function to convert a random string to a username
def convert_to_username(random_string):
    words = [
        "Alpha",
        "Bravo",
        "Charlie",
        "Delta",
        "Echo",
        "Foxtrot",
        "Golf",
        "Hotel",
        "India",
        "Juliet",
        "Kilo",
        "Lima",
        "Mike",
        "November",
        "Oscar",
        "Papa",
        "Quebec",
        "Romeo",
        "Sierra",
        "Tango",
        "Uniform",
        "Victor",
        "Whiskey",
        "X-ray",
        "Yankee",
        "Zulu",
    ]

    # Extract letters and numbers separately
    numbers = "".join(filter(str.isdigit, random_string))
    letters = "".join(filter(str.isalpha, random_string))

    hash_digest = hashlib.md5(random_string.encode()).hexdigest()

    first_index = int(hash_digest[:8], 16) % len(words)
    second_index = int(hash_digest[8:16], 16) % len(words)

    first_word = words[first_index]
    second_word = words[second_index]

    return f"{first_word}{second_word}{numbers}"
