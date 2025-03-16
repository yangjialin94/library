# About

## Folder Structure

```txt
socketio-fastpi/
│-- main.py             # Entry point for the FastAPI server
│-- sockets.py          # Defines the Socket.IO event handlers
│-- client.py           # Simple Socket.IO client for testing
│-- README.md           # Documentation for the project
```

## File Descriptions

### `main.py`

This is the main entry point for the FastAPI server. It:

- Initializes a FastAPI instance.
- Mounts the Socket.IO app (`sio_app`) to handle WebSocket connections.
- Defines a basic root route (`/`) that returns a "Hello World" message.
- Runs the FastAPI app using `uvicorn`.

### `sockets.py`

This file handles the WebSocket communication using Socket.IO. It:

- Creates an asynchronous Socket.IO server instance.
- Configures CORS to allow all origins (`*`).
- Defines event handlers for:
  - `connect`: Logs when a client connects.
  - `disconnect`: Logs when a client disconnects.
- Exposes `sio_app`, which is mounted in `main.py`.

### `client.py`

A simple Python client that connects to the Socket.IO server. It:

- Initializes an asynchronous Socket.IO client.
- Defines event handlers for:
  - `connect`: Logs when successfully connected to the server.
  - `disconnect`: Logs when disconnected from the server.
- Contains a `main()` function to:
  - Connect to the WebSocket server.
  - Disconnect from the server after connecting.
- Uses `asyncio.run(main())` to execute the client logic.

## Install dependencies

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

| Package            | Purpose                                                      |
|--------------------|--------------------------------------------------------------|
| `fastapi`          | A high-performance Python web framework for building APIs with async support. |
| `uvicorn`          | An ASGI (Asynchronous Server Gateway Interface, a modern Python web server interface) server that runs FastAPI apps efficiently. |
| `python-socketio[asyncio_client]` | An extension for `python-socketio` that provides an asyncio-based client for Socket.IO. |

## How to Run the Server

```sh
python3 main.py
```

or

```sh
python3 -m main
```

## How to Run the Client

```sh
python client.py
```

or

```sh
python3 -m client
```

## How to Stop

```sh
control + C
deactivate
```
