# Socket.io + Jsonwebtoken
Socket.io with Jsonwebtoken support Room

## Feature
- Authentication Jsonwebtoken
- Support Room on Socket

## Installation
- Install the dependencies and start the server.
- Set NODE_PORT in .env
- Set JWT_SECRET in .env

```sh
git clone https://github.com/ardipc/socket.io-jsonwebtoken-room.git
cd socket.io-jsonwebtoken-room
cp .env.example .env
nano .env
npm i
npm start
```

## How to connect
```sh
<script src="http://localhost:3000/socket.io/socket.io.js"></script>
```

```sh
var socket = io('http://localhost:3000/', {query: {room: 'ROOM', token: 'TOKEN'} })
socket.emit('message', { message: 'Hello' })

socket.on('message', function(data) {
    console.log(data)
})
```
