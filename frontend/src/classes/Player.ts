export default class Player extends Phaser.Physics.Arcade.Sprite {
	private keyA: Phaser.Input.Keyboard.Key;
	private keyD: Phaser.Input.Keyboard.Key;
	private keySpace: Phaser.Input.Keyboard.Key;

    private speed: number = 200;
    private jumpforce: number = 200;
	constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "player");
        
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);

		
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
    update(): void {
        if (this.keyD.isDown) {
            this.setVelocityX(this.speed);
        }
        else if (this.keyA.isDown) {
            this.setVelocityX(-this.speed);
        } else{
            this.setVelocityX(0);
        }
        
    }

    jump(): void {
			this.setVelocityY(-this.jumpforce)
		
	}
}
