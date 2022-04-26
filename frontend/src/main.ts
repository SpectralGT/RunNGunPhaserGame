import Phaser, { AUTO } from "phaser";
import Level1 from "./scenes/Level1";
var config: Phaser.Types.Core.GameConfig = {
	type: AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 100 },
			debug: true,
		},
	},
	pixelArt: true,
	scene: [Level1],
	input: true,
};

new Phaser.Game(config);