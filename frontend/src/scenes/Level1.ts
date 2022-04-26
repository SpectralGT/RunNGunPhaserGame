import Player from "../classes/Player";

export default class Level1 extends Phaser.Scene {
	private player!: Player;
	constructor() {
		super("Level1");
	}

	create(): void {
		this.player = new Player(this,50,50);
	}
	update(): void {
		this.player.update();
	}
}
