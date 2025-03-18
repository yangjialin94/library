import asyncio

import socketio

# Create a Socket.IO client instance
sio_client = socketio.AsyncClient()


# Define a Socket.IO event handler for connection
@sio_client.event
async def connect():
    print("Connected to server")


# Define a Socket.IO event handler for disconnection
@sio_client.event
async def disconnect():
    print("Disconnected from server")


# Define the main function to run the client
async def main():
    # Connect to the Socket.IO server
    await sio_client.connect(url="http://localhost:8000", socketio_path="/sockets")

    # Disconnect from the server
    await sio_client.disconnect()


# Run the main function: `python3 client.py` or `python3 -m client`
asyncio.run(main())
