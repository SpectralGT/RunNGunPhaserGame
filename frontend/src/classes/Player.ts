export default class Player extends Phaser.Physics.Arcade.Sprite {
	private keyA!: Phaser.Input.Keyboard.Key;
	private keyD!: Phaser.Input.Keyboard.Key;
	private keySpace!: Phaser.Input.Keyboard.Key;

	private speed: number = 200;
	private jumpforce: number = 300;
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, "player");

		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.setScale(1.6, 1.6);
		this.initControls();

		this.initAnimations();
	}

	update(): void {
		if (this.keyD.isDown) {
			this.setVelocityX(this.speed);
			this.flipX = false;
			this.play("player-run", true);
		} else if (this.keyA.isDown) {
			this.setVelocityX(-this.speed);
			this.flipX = true;
			this.play("player-run", true);
		} else {
			this.setVelocityX(0);
			this.play("player-idle", true);
		}
	}

	initControls(): void {
		this.keyA = this.scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.A
		);
		this.keyD = this.scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.D
		);
		this.keySpace = this.scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.SPACE
		);

		this.keySpace.onDown = () => {
			this.jump();
		};
	}

	initAnimations(): void {
		this.anims.create({
			key: "player-idle",
			frames: this.anims.generateFrameNumbers("player-idle", {
				frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			}),
			frameRate: 20,
			repeat: -1,
			duration: 100,
		});

		this.anims.create({
			key: "player-run",
			frames: this.anims.generateFrameNumbers("player-run", {
				frames: [0, 1, 2, 4, 5, 6, 7, 8, 9],
			}),
			frameRate: 20,
			repeat: -1,
			duration: 100,
		});
	}

	jump(): void {
		if ((this.body as Phaser.Physics.Arcade.Body).onFloor()||
			(this.body as Phaser.Physics.Arcade.Body).onWall()) {
			this.setVelocityY(-this.jumpforce);
		}
	}
}
