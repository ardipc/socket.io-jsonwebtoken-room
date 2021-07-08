require('dotenv').config();

var server  = require('http').createServer();
var io      = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:3000", "http://jual-instant.ved.carsworld.id", "https://jual-instant.ved.carsworld.id"],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('send', (msg) => {
    io.emit('message', msg);
  });
});

server.listen(process.env.NODE_PORT, () => console.log(`Socket started...`));
