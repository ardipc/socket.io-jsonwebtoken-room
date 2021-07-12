require('dotenv').config();

var jwt     = require('jsonwebtoken');
var server  = require('http').createServer();
var io      = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

function checkEmail(value) {
  var split = value.split('@');
  return split[1] === 'carsworld.co.id';
}

io.on('connection', (socket) => {
  
  socket.on('send', (msg) => {
    var { token, payload } = msg;
    if(token) {
      if(checkEmail(token)) {
        io.emit('message', payload);
      }
      else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return new Error('Permission Denied');
          }
          else {
            io.emit('message', payload);
          }
        });
      }
    }
    else {
      return new Error('Token Required');
    }
  });

});

server.listen(process.env.NODE_PORT, () => console.log(`Socket started...`));
