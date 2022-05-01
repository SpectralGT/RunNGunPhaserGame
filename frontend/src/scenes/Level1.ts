import Player from "../classes/Player";
import { io, Socket } from "socket.io-client";
import Enemy from "../classes/Enemy";
export default class Level1 extends Phaser.Scene {
	private map!: Phaser.Tilemaps.Tilemap;
	private tileset!: Phaser.Tilemaps.Tileset;
	private groundLayer!: Phaser.Tilemaps.TilemapLayer;
	private player!: Player;
	private oldPlayerPosX: number = 0;
	private oldPlayerPosY: number = 0;
	private socket!: Socket;
	private enemyGroup!: Phaser.GameObjects.Group;

	constructor() {
		super("Level1");
	}

	create(): void {
		this.player = new Player(this, 50, 50);
		this.enemyGroup = this.add.group();
		this.initCamera();
		this.intiTileMap();
		this.initCollision();
		this.initSocket();
	}
	update(): void {
		this.player.update();
		this.updatePlayerPos();
	}

	initSocket(): void {
		const self = this;
		const enemy_ref = this.enemyGroup;
		this.enemyGroup;
		this.socket = io("http://localhost:8080");

		this.socket.on("actualPlayers", function (players) {
			Object.keys(players).forEach(function (id) {
				if (players[id].player_id != self.socket.id) {
					const enemy = new Enemy(
						self,
						players[id].x,
						players[id].y,
						players[id].player_id
					);
					self.enemyGroup.add(enemy);
					self.physics.add.collider(enemy, self.player);
				}
			});
		});

		this.socket.on("new_player", function (pInfo) {
			const enemy = new Enemy(self, pInfo.x, pInfo.y, pInfo.player_id);
			self.enemyGroup.add(enemy);
			self.physics.add.collider(enemy, self.player);
		});

		this.socket.on("enemy_moved", (playerData) => {
			enemy_ref.getChildren().forEach((enemy) => {
				if ((enemy as Enemy).id == playerData.player_id) {
					(enemy as Enemy).setPosition(playerData.x, playerData.y);
				}
			});
		});
	}

	updatePlayerPos(): void {
		if (
			this.oldPlayerPosX != this.player.x ||
			this.oldPlayerPosY != this.player.y
		) {
			this.socket.emit("player_moved", { x: this.player.x, y: this.player.y });
		}
	}

	initCamera(): void {
		this.cameras.main.setZoom(1.2, 1.2);
		this.cameras.main.startFollow(this.player, false, 5, 5);
	}

	intiTileMap(): void {
		this.map = this.make.tilemap({ key: "map", tileHeight: 16, tileWidth: 16 });
		this.tileset = this.map.addTilesetImage("Terrain", "terrain");
		this.groundLayer = this.map.createLayer("Tile Layer 1", this.tileset, 0, 0);
		this.groundLayer.setCollisionByProperty({ collides: true });
		this.groundLayer.setScale(2, 2);
	}

	initCollision(): void {
		this.physics.add.collider(this.player, this.groundLayer);
		this.physics.add.collider(this.player, this.enemyGroup);
		this.physics.add.collider(this.groundLayer, this.enemyGroup);
	}
}
