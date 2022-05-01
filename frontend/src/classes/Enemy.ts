export default class Enemy extends Phaser.Physics.Arcade.Sprite{

    id: string;
    constructor(scene:Phaser.Scene, x:number, y:number, id:string) {
        super(scene, x, y, 'enemy');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setPushable(false);
        this.setGravityY(0);
        this.setScale(1.6, 1.6);
        this.anims.create({
					key: "player-idle",
					frames: this.anims.generateFrameNumbers("player-idle", {
						frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
					}),
					frameRate: 20,
					repeat: -1,
					duration: 100,
				});
        this.anims.play('player-idle');
        this.id = id;
    }
}