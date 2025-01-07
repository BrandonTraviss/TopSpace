import Bullet from "./Bullet.js"
const laser = new Audio('audio/laser.mp3');

export default class Enemy {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.x = 200;
        this.y = 0;
        this.bullets = [];
        this.bulletSpeed = 9;
        this.canShoot = true;
        this.lastShotTime = 0;
        this.health = 3
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    setSprite(sprite) {
        console.log(sprite);
        this.sprite = sprite;
        this.width = sprite.width;
        this.height = sprite.height;
    }

    shoot(type, game) {
        const currentTime = Date.now();
        if (currentTime - this.lastShotTime >= 600) { // 600ms cooldown
            const bulletX = this.x + this.width / 2 - 1; // Center of the enemy
            const bulletY = this.y; // Top of the enemy
            const bullet = new Bullet(bulletX, bulletY, this.bulletSpeed, type);
            this.bullets.push(bullet);
            game.enemyBullets.push(bullet)
            this.lastShotTime = currentTime;
            laser.currentTime = 0;
            laser.play();
        }
    }

    move() {
        if (this.y < 200) {
            this.y += 1;
        }
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.x, this.y);
    }

    update(player, game) {
        const fireMin = this.x - 50;
        const fireMax = this.x + 50;

        // Update shooting condition for individual enemy
        if (player.x >= fireMin && player.x <= fireMax) {
            this.shoot('enemy', game); // Ensure shooting with type 'enemy'
        }
        // this.updateBullets(game);
        this.move();
        this.draw();
    }
}
