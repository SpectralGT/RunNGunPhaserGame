var players = {};

var io = require("socket.io")(8080, {
	cors: {
		origin:["http://localhost:3000"],
	},
});

io.on("connection", function (socket) {
	console.log("Someone has connected");

	players[socket.id] = {
		player_id: socket.id,
		x: 0,
		y: 0,
	};

	socket.emit("actualPlayers", players);

	socket.broadcast.emit("new_player", players[socket.id]);

	socket.on("player_moved", function (movement_data) {
		players[socket.id].x = movement_data.x;
		players[socket.id].y = movement_data.y;

		socket.broadcast.emit("enemy_moved", players[socket.id]);
	});

	socket.on("new_bullet", function (bullet_data) {
		socket.emit("new_bullet", bullet_data);
		socket.broadcast.emit("new_bullet", bullet_data);
	});

	socket.on("disconnect", function () {
		console.log("someone has disconnected");
		delete players[socket.id];
		socket.broadcast.emit("player_disconnect", socket.id);
	});
});