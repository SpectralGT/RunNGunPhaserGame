export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene:Phaser.Scene,x:number,y:number) {
        super(scene, x, y, "player");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }
    update(): void{
        
    }
}