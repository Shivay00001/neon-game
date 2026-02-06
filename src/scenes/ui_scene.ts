import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create(): void {
    // This scene is optional and can be used for overlay UI
    // Currently not needed for basic game
  }
}