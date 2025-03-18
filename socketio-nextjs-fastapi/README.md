# About

A real-time chat application built with Next.js and FastAPI, powered by Socket.IO for instant message delivery.

## Tech Stack

### **Frontend:**

- **Next.js** – React-based framework for server-side rendering (SSR).
- **Tailwind CSS** – Utility-first CSS framework for styling and responsiveness.
- **TypeScript** – Ensures type safety and better maintainability.
- **Socket.IO (Client)**  – Enables real-time bidirectional communication with the backend.
- **clsx** – Utility for conditionally managing CSS classes.
- **React Hooks (useState, useEffect, useRef)** – Manages UI state, side effects, and auto-scrolling for chat.
**ESLint & Prettier** – Linting and code formatting.

### **Backend:**

- **FastAPI** – High-performance Python web framework for handling API requests.
- **Socket.IO (Python-SocketIO)** – Enables real-time WebSocket-based communication.
- **Uvicorn** – ASGI server to run FastAPI efficiently.

## Folder Structure

```txt
socketio-nextjs-fastapi/
│-- client                    # Client
    │-- src                   # Root folder
        │-- app               # Pages
            │-- layout.tsx    # Root layout
            │-- page.tsx      # Home page
        │-- components        # Components
            │-- Chat.tsx      # Chat component
            │-- Message.tsx   # Message component
│-- server                    # Server
    │-- main.py               # Entry point for the FastAPI server
    │-- sockets.py            # Defines the Socket.IO event handlers
│-- README.md                 # Documentation for the project
```

## Dependencies

### Client

| Package                   | Purpose                                                      |
|---------------------------|--------------------------------------------------------------|
| `socket.io-client`        | a JavaScript client library for Socket.IO, a real-time communication framework. It allows you to establish a bidirectional event-based communication between the browser and the server. |

### Server

| Package            | Purpose                                                      |
|--------------------|--------------------------------------------------------------|
| `fastapi`          | A high-performance Python web framework for building APIs with async support. |
| `uvicorn`          | An ASGI (Asynchronous Server Gateway Interface, a modern Python web server interface) server that runs FastAPI apps efficiently. |
| `python-socketio`  | A Python implementation of the Socket.IO protocol to build real-time applications using websockets |

## How to Run

### Server

```sh
cd socketio-nextjs-fastapi/server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 -m main
```

### Client

```sh
cd socketio-nextjs-fastapi/client
npm install
npm run dev
```

## How to Stop

### Server

```sh
control + C
deactivate
```

### Client

```sh
control + C
```
