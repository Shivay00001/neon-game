import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create(): void {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Background
    this.cameras.main.setBackgroundColor('#0a0a1f');

    // Title
    const title = this.add.text(centerX, 150, 'NEON BEAT DASH', {
      fontSize: '64px',
      color: '#00ffff',
      fontFamily: 'Arial Black',
      stroke: '#ff00ff',
      strokeThickness: 6
    });
    title.setOrigin(0.5);

    // Subtitle
    const subtitle = this.add.text(centerX, 230, 'Rhythm Runner Game', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    subtitle.setOrigin(0.5);

    // Play button
    const playButton = this.add.text(centerX, centerY, '▶ PLAY', {
      fontSize: '48px',
      color: '#00ff00',
      fontFamily: 'Arial Black',
      backgroundColor: '#001100',
      padding: { x: 40, y: 20 }
    });
    playButton.setOrigin(0.5);
    playButton.setInteractive({ useHandCursor: true });

    playButton.on('pointerover', () => {
      playButton.setScale(1.1);
      playButton.setColor('#00ff88');
    });

    playButton.on('pointerout', () => {
      playButton.setScale(1);
      playButton.setColor('#00ff00');
    });

    playButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    // Instructions
    const instructions = this.add.text(centerX, 500, 'Use Arrow Keys ← → to move\nSpace to jump', {
      fontSize: '20px',
      color: '#888888',
      fontFamily: 'Arial',
      align: 'center'
    });
    instructions.setOrigin(0.5);

    // Version
    const version = this.add.text(10, 580, 'v1.0.0', {
      fontSize: '14px',
      color: '#444444',
      fontFamily: 'Arial'
    });

    // Pulse animation
    this.tweens.add({
      targets: title,
      scale: 1.05,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }
}