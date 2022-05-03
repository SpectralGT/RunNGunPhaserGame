import Phaser, { AUTO } from "phaser";
import Level1 from "./scenes/Level1";
import LoadingScene from "./scenes/LoadingScene";
var config: Phaser.Types.Core.GameConfig = {
	type: AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 500},
		},
	},
	pixelArt: true,
	scene: [LoadingScene,Level1],
};

new Phaser.Game(config);