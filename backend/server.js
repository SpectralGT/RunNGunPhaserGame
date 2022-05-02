var players = {};

var io = require("socket.io")(8080, {
	cors: {
		origin:["http://localhost:3000"],
	},
});

io.on("connection", function (socket) {
	console.log("new Player");

	players[socket.id] = {
		player_id: socket.id,
		x: 0,
		y: 0,
		flipX: false
	};

	socket.emit("actualPlayers", players);

	socket.broadcast.emit("new_player", players[socket.id]);

	socket.on("player_moved", function (movement_data) {
		players[socket.id].x = movement_data.x;
		players[socket.id].y = movement_data.y;
		players[socket.id].flipX = movement_data.flipX;
		socket.broadcast.emit("enemy_moved", players[socket.id]);
	});

	socket.on("disconnect", function () {
		console.log("someone has disconnected");
		delete players[socket.id];
		socket.broadcast.emit("player_disconnect", socket.id);
	});
});