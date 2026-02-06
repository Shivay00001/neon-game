import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private gameSpeed: number = 200;
  private spawnTimer!: Phaser.Time.TimerEvent;

  constructor() {
    super('GameScene');
  }

  create(): void {
    // Background
    this.cameras.main.setBackgroundColor('#0a0a1f');

    // Create ground
    const ground = this.add.rectangle(400, 550, 800, 100, 0x222244);

    // Create player (simple rectangle)
    this.player = this.add.rectangle(100, 500, 40, 40, 0x00ffff);
    this.physics.add.existing(this.player);
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    playerBody.setCollideWorldBounds(true);
    playerBody.setGravityY(600);

    // Create obstacles group
    this.obstacles = this.physics.add.group();

    // Score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    // Instructions
    const instructions = this.add.text(400, 50, 'Arrow Keys to Move | Space to Jump | ESC to Menu', {
      fontSize: '16px',
      color: '#888888',
      fontFamily: 'Arial'
    });
    instructions.setOrigin(0.5);

    // Input
    const cursors = this.input.keyboard!.createCursorKeys();
    this.input.keyboard!.on('keydown-SPACE', () => {
      if (playerBody.touching.down) {
        playerBody.setVelocityY(-400);
      }
    });

    this.input.keyboard!.on('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });

    // Movement
    this.input.keyboard!.on('keydown-LEFT', () => {
      playerBody.setVelocityX(-200);
    });

    this.input.keyboard!.on('keydown-RIGHT', () => {
      playerBody.setVelocityX(200);
    });

    this.input.keyboard!.on('keyup-LEFT', () => {
      if (playerBody.velocity.x < 0) playerBody.setVelocityX(0);
    });

    this.input.keyboard!.on('keyup-RIGHT', () => {
      if (playerBody.velocity.x > 0) playerBody.setVelocityX(0);
    });

    // Spawn obstacles
    this.spawnTimer = this.time.addEvent({
      delay: 2000,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    // Collision
    this.physics.add.overlap(
      this.player,
      this.obstacles,
      this.gameOver as any,
      undefined,
      this
    );

    // Score increase
    this.time.addEvent({
      delay: 100,
      callback: () => {
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);

        // Increase difficulty
        if (this.score % 500 === 0) {
          this.gameSpeed += 20;
        }
      },
      loop: true
    });
  }

  update(): void {
    // Move obstacles
    this.obstacles.children.entries.forEach((obstacle) => {
      const obs = obstacle as Phaser.GameObjects.Rectangle;
      obs.x -= this.gameSpeed * 0.016;

      // Remove off-screen obstacles
      if (obs.x < -50) {
        obs.destroy();
      }
    });

    // Player rotation for visual effect
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    this.player.rotation = Phaser.Math.Clamp(playerBody.velocity.y * 0.001, -0.5, 0.5);
  }

  spawnObstacle(): void {
    const height = Phaser.Math.Between(40, 100);
    const obstacle = this.add.rectangle(850, 500 - height / 2, 40, height, 0xff0066);
    this.physics.add.existing(obstacle);
    this.obstacles.add(obstacle);
  }

  gameOver(): void {
    this.scene.start('GameOverScene', { score: this.score });
  }
}