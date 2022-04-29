import Player from "../classes/Player";

export default class Level1 extends Phaser.Scene {
	private map!: Phaser.Tilemaps.Tilemap;
	private tileset!: Phaser.Tilemaps.Tileset;
	private platforms!: Phaser.Physics.Arcade.StaticGroup;
	private groundLayer!: Phaser.Tilemaps.TilemapLayer;
	private player!: Player;
	constructor() {
		super("Level1");
	}

	create(): void {
		this.player = new Player(this, 50, 50);
		this.intiTileMap();
		this.initCollision();
	}
	update(): void {
		this.player.update();
	}

	intiTileMap(): void{
		this.map = this.make.tilemap({ key: "map", tileHeight: 16, tileWidth: 16 });
		this.tileset = this.map.addTilesetImage("Terrain", "terrain");
		this.groundLayer = this.map.createLayer("Tile Layer 1", this.tileset, 0, 0);
		this.groundLayer.setCollisionByProperty({ collides: true });
		this.groundLayer.setScale(2,2);
	}

	initCollision(): void{
		this.physics.add.collider(this.player, this.groundLayer);
		
	}
}
