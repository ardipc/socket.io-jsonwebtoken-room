require('dotenv').config();

var jwt     = require('jsonwebtoken');
var server  = require('http').createServer();
var io      = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.use((socket, next) => {
  if(process.env.JWT_ENABLE === "true") {

    if (socket.handshake.query && socket.handshake.query.token){
      var { token } = socket.handshake.query;
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(new Error('Authentication error'));
        socket.user = decoded;
        next();
      });
    }
    else {
      next(new Error('Authentication error'));
    }
    
  }
  else {
    socket.user = { name: 'Anonymous' };
    next();
  }
}).on('connection', (socket) => {
  var { room } = socket.handshake.query;
  socket.join(room);

  socket.on('disconnect', () => {
    socket.leave(room)
  });

  socket.on('message', (msg) => {
    io.to(room).emit('message', msg);
  });

});

server.listen(process.env.NODE_PORT);
