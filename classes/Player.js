import Bullet from "./Bullet.js";
const laser = new Audio('audio/laser.mp3');

export default class Player {
    constructor(ctx, canvas, game) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.map = new Map();
        this.canvasHeight = canvas.height;
        this.canvasWidth = canvas.width;
        this.speed = 5;
        this.bullets = [];
        this.bulletSpeed = 9;
        this.canShoot = true
        this.lastShotTime = 0;
        this.health = 4
        this.game = game

    }
    checkLife() {
        if (this.health == 0) {
            console.log("Dead")
            this.game.state = 'gameover'
        }
    }
    setSprite(sprite) {
        this.sprite = sprite;
        console.log(this.sprite, "Sprite Set");
        this.width = sprite.width;
        this.height = sprite.height;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    setInitPos() {
        this.x = this.canvasWidth / 2 - this.width / 2;
        this.y = this.canvasHeight - this.height - 20;
    }

    input() {
        window.addEventListener('keydown', (e) => {
            if (!this.map.get(e.code) || this.map.get(e.code) === 'released') {
                this.map.set(e.code, 'pressed');
            }
        });
        window.addEventListener('keyup', (e) => {
            if (!this.map.get(e.code) || this.map.get(e.code) === 'pressed') {
                this.map.set(e.code, 'released');
            }
        });
    }

    move() {
        if (this.map.get('KeyW') === 'pressed') {
            if (this.y >= 400) {
                this.y -= this.speed;
            }
        }

        if (this.map.get('KeyA') === 'pressed') {
            if (this.x >= 0) {
                this.x -= this.speed;
            }
        }

        if (this.map.get('KeyS') === 'pressed') {
            if (this.y <= this.canvasHeight - this.height) {
                this.y += this.speed;
            }
        }

        if (this.map.get('KeyD') === 'pressed') {
            if (this.x <= this.canvasWidth - this.width) {
                this.x += this.speed;
            }
        }

        if (this.map.get('Space') === 'pressed') {
            this.shoot('player');
        }

    }

    shoot(type) {
        const currentTime = Date.now();
        if (currentTime - this.lastShotTime >= 200) { // 100ms cooldown
            const bulletX = this.x + this.width / 2 - 1; // Center of the player
            const bulletY = this.y; // Top of the player
            const bullet = new Bullet(bulletX, bulletY, this.bulletSpeed, type);
            this.bullets.push(bullet);
            this.lastShotTime = currentTime;
            currentTime; laser.currentTime = 0;
            laser.play()
        }
    }


    updateBullets() {
        this.bullets = this.bullets.filter(bullet => {
            bullet.move();
            bullet.draw(this.ctx);
            return !bullet.isOffScreen(this.canvasHeight);
        });
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.x, this.y);
    }

    update() {
        this.checkLife()
        this.move();
        this.updateBullets();
        this.draw();
    }
}
