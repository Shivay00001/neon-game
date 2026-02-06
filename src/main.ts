import Phaser from 'phaser';
import MenuScene from './scenes/menu_scene';
import GameScene from './scenes/game_scene';
import GameOverScene from './scenes/gameover_scene';
import UIScene from './scenes/ui_scene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#0a0a1f',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MenuScene, GameScene, UIScene, GameOverScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// Remove loading message
const loadingEl = document.querySelector('.loading');
if (loadingEl) {
    loadingEl.remove();
}

// Initialize game
const game = new Phaser.Game(config);

// Export for debugging
(window as any).game = game;
