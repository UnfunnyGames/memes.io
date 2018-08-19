$(function() {
  $('.username').text(username)

  $('.button-left').click( function() { socket.emit('player wants to move', 'left'); } );
  $('.button-up').click( function() { socket.emit('player wants to move', 'up'); } );
  $('.button-right').click( function() { socket.emit('player wants to move', 'right'); } );
  $('.button-down').click( function() { socket.emit('player wants to move', 'down'); } );
  $('.button-punch').click( function() { socket.emit('player wants to punch'); } );
});

// Prompt for setting a username
var socket = io();

var username = `user-${Math.floor(Math.random()*1000000)}`;

var connected = false;

const addPlayer = (player) => {
  $('body').append(`<div class="grim" id="${player.username}"></div>`);
  processMove(player)
}

const removePlayer = (player) => {
  $(`#${player.username}`).remove();
}

const processLogin = (world) => {
  connected = true;
  console.log('> login', world);
  world.players.forEach(player => addPlayer(player));
}

const processDisconnect = () => {
  console.log('> disconnect');
};

const processReconnect = () => {
  console.log('> reconnect');
  emitLogin()
};

const processReconnectError = (e) => {
  console.log('> reconnect error', e);
};

const processMove = (player) => {
  console.log('> move', player)
  $(`#${player.username}`).css({
    position: "absolute",
    left: `${player.x}px`,
    top: `${player.y}px`
  });
}

const processUserJoined = (player) => {
  console.log(`> user ${player.username} joined`);
  addPlayer(player);
};

const processUserLeft = (player) => {
  console.log(`> user ${player.username} left`);
  removePlayer(player);
};

const processPunch = (data) => {
  console.log(`> punch`);
};

const emitLogin = () => {
  if (username) {
    console.log('< add user');
    socket.emit('add user', username);
  }
}

const emitMove = (move) => {
  console.log(username)
  if (username) {
    console.log(`< move ${move}`);
    socket.emit('player wants to move', move);
  }
}

emitLogin();

// event API
socket.on('login', processLogin);
socket.on('disconnect', processDisconnect);
socket.on('reconnect', processReconnect);
socket.on('reconnect_error', processReconnectError);

socket.on('player move', processMove);
socket.on('player punch', processPunch);
socket.on('player joined', processUserJoined);
socket.on('player left', processUserLeft);

var mapKeys = {};
onkeydown = onkeyup = function(e){
  e = e || event; // to deal with IE
  mapKeys[e.keyCode] = e.type == 'keydown';

  // DO NOT optimize this bit, sometimes multiple buttons are pressed at the same time
  if (mapKeys[65]) { emitMove('left'); }
  if (mapKeys[68]) { emitMove('right'); }
  if (mapKeys[87]) { emitMove('up'); }
  if (mapKeys[83]) { emitMove('down'); }
}