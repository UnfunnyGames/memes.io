// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

//--- STATE ---

// State of the world
var WORLD_WIDTH = 500;
var WORLD_HEIGHT = 500;

var world = {
  players: [],
};

// Templates
var createPlayer = (username) => {
  return {
    username,
    x: Math.floor(Math.random()*WORLD_WIDTH),
    y: Math.floor(Math.random()*WORLD_HEIGHT),
    move: null,
  }
}

//--- EVENTS ---

io.on('connection', (socket) => {
  // this one tells if the user already managed to register
  // (imagine the same user losing the connection and reconnecting
  // to the same world. The server should be able to return the user
  // to the same state)
  var existingUser = false;
  var intervalRender;
  var lastUpdateTime = (new Date()).getTime();
  
  var processMove = (move) => {
    if (existingUser) {
      world.players.forEach(p => {
        if (p.username === socket.username) {
          p.move = move;
        }
      });
    }
  };

  var processPunch = () => {
    emitPunch();
  }

  var processConnect = (username) => {
    if (!existingUser) {
      socket.username = username;
      existingUser = true;
      const player = createPlayer(username);
      world.players.push(player);

      emitLogin();
    }
  }

  var processDisconnect = () => {
    clearInterval(intervalRender)

    world.players = world.players.filter(player => (player.username !== socket.username));
    if (existingUser) {
      emitLogout()
    }
  }

  // send events back to the client(s)
  var emitLogin = () => {
    socket.emit('login', world);
    socket.broadcast.emit('player joined', world.players.find(p => p.username === socket.username));
  }

  var emitLogout = () => {
    socket.broadcast.emit('player left', world.players.find(p => p.username === socket.username));
  }

  var emitCoordinates = (player) => {
    socket.emit('player move', player);
  }

  var refresh = () => {
    if (existingUser) {
      var currentTime = (new Date()).getTime();
      var timeDifference = currentTime - lastUpdateTime;
      lastUpdateTime = currentTime;

      world.players.forEach(p => {
        if (p.move) {
          let dx = 0;
          let dy = 0;

          switch (p.move) {
            case 'left':
              dx = -timeDifference;
              break;

            case 'right':
              dx = timeDifference;
              break;

            case 'up':
              dy = -timeDifference;
              break;

            case 'down':
              dy = timeDifference;
              break;

            default: break;
          }

          p.x += dx;
          p.y += dy;

          emitCoordinates(p);
          
          p.move = null;
        }
      });
    }
  };
  
  var emitPunch = () => {
    socket.emit('player punch');
    socket.broadcast.emit('player punch');
  }

  // event API
  socket.on('player wants to move', processMove);
  socket.on('player wants to punch', processPunch);
  socket.on('add user', processConnect);
  socket.on('disconnect', processDisconnect);  

  // render
  intervalRender = setInterval(refresh, 1000 / 60);
});