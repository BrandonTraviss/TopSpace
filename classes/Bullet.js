export default class Bullet {
    constructor(x, y, speed, type) {
        this.x = x;
        this.y = y;
        this.width = 3;
        this.height = 3;
        this.speed = speed;
        this.type = type; // 'player' or 'enemy'
        this.color = type === 'player' ? 'rgba(8, 255, 0, 1)' : 'red'; // Different colors for player and enemy bullets
    }

    move() {
        this.y += this.type === 'player' ? -this.speed : this.speed; // Player bullets move up, enemy bullets move down
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    isOffScreen(canvasHeight) {
        return this.y < 0 || this.y > canvasHeight;
    }
}