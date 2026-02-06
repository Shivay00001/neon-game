import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  private score: number = 0;

  constructor() {
    super('GameOverScene');
  }

  init(data: { score: number }): void {
    this.score = data.score || 0;
  }

  create(): void {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Background
    this.cameras.main.setBackgroundColor('#1a0a2e');

    // Game Over title
    const gameOverText = this.add.text(centerX, centerY - 150, 'GAME OVER', {
      fontSize: '72px',
      color: '#ff0066',
      fontFamily: 'Arial Black',
      stroke: '#ffffff',
      strokeThickness: 4
    });
    gameOverText.setOrigin(0.5);

    // Score display
    const scoreText = this.add.text(centerX, centerY - 30, `Score: ${this.score}`, {
      fontSize: '48px',
      color: '#00ffff',
      fontFamily: 'Arial Black'
    });
    scoreText.setOrigin(0.5);

    // High score (stored in local storage)
    const highScore = this.getHighScore();
    if (this.score > highScore) {
      this.saveHighScore(this.score);
      const newRecordText = this.add.text(centerX, centerY + 50, 'NEW HIGH SCORE!', {
        fontSize: '32px',
        color: '#00ff00',
        fontFamily: 'Arial',
        stroke: '#004400',
        strokeThickness: 2
      });
      newRecordText.setOrigin(0.5);

      // Pulse animation
      this.tweens.add({
        targets: newRecordText,
        scale: 1.2,
        duration: 500,
        yoyo: true,
        repeat: -1
      });
    } else {
      const highScoreText = this.add.text(centerX, centerY + 50, `High Score: ${highScore}`, {
        fontSize: '24px',
        color: '#888888',
        fontFamily: 'Arial'
      });
      highScoreText.setOrigin(0.5);
    }

    // Play Again button
    const playAgainButton = this.add.text(centerX, centerY + 130, '▶ PLAY AGAIN', {
      fontSize: '36px',
      color: '#00ff00',
      fontFamily: 'Arial Black',
      backgroundColor: '#001100',
      padding: { x: 30, y: 15 }
    });
    playAgainButton.setOrigin(0.5);
    playAgainButton.setInteractive({ useHandCursor: true });

    playAgainButton.on('pointerover', () => {
      playAgainButton.setScale(1.1);
    });

    playAgainButton.on('pointerout', () => {
      playAgainButton.setScale(1);
    });

    playAgainButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    // Menu button
    const menuButton = this.add.text(centerX, centerY + 210, 'MENU', {
      fontSize: '28px',
      color: '#8888ff',
      fontFamily: 'Arial',
      backgroundColor: '#111133',
      padding: { x: 30, y: 10 }
    });
    menuButton.setOrigin(0.5);
    menuButton.setInteractive({ useHandCursor: true });

    menuButton.on('pointerover', () => {
      menuButton.setScale(1.1);
    });

    menuButton.on('pointerout', () => {
      menuButton.setScale(1);
    });

    menuButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }

  getHighScore(): number {
    const stored = localStorage.getItem('neonBeatDash_highScore');
    return stored ? parseInt(stored, 10) : 0;
  }

  saveHighScore(score: number): void {
    localStorage.setItem('neonBeatDash_highScore', score.toString());
  }
}