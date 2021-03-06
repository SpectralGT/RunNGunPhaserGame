export default class LoadingScene extends Phaser.Scene {
	constructor() {
		super("LoadingScene");
	}

	preload(): void {
		this.load.image("terrain", "src/public/Terrain(16x16).png");
		this.load.tilemapTiledJSON("map", "src/public/tilemap.json");

		this.load.spritesheet(
			"player-idle",
			"src/public/Player-Idle (32x32).png",
			{ frameWidth: 32, frameHeight: 32 }
		);
		this.load.spritesheet(
			"enemy-idle",
			"src/public/Enemy-Idle (32x32).png",
			{ frameWidth: 32, frameHeight: 32 }
		);

		this.load.spritesheet(
			"player-run",
			"src/public/Player-Run (32x32).png",
			{ frameWidth: 32, frameHeight: 32 }
		);
	}

	create(): void {
		this.scene.start("Level1");
		console.log("loading scene");
	}
}
