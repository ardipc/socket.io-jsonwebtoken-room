require('dotenv').config();

var server  = require('http').createServer();
var io      = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on('connection', (socket) => {
  socket.on('send', (msg) => {
    io.emit('message', msg);
  });
});

server.listen(process.env.NODE_PORT, () => console.log(`Socket started...`));
