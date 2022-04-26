export default class Level1 extends Phaser.Scene {
	constructor() {
		super("Level1");
	}

	create(): void {
		this.physics.add
			.sprite(0, 0, "player")
			.setCollideWorldBounds(true, 1, 1)
			.setVelocityX(100);
	}
}
