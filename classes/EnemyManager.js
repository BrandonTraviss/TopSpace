export default class EnemyManager {
    constructor(ctx, canvas, player) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.player = player;
        this.enemies = [];
        this.lastShotTime = 0;
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    shootIfInRange(enemy) {
        const currentTime = Date.now();
        if (this.player.x >= enemy.fireMin && this.player.x <= enemy.fireMax) {
            if (currentTime - this.lastShotTime >= 600) { // 600ms cooldown
                enemy.shoot('enemy');
                this.lastShotTime = currentTime;
            }
        }
    }

    update() {
        this.enemies.forEach(enemy => {
            this.shootIfInRange(enemy);
            enemy.updateBullets();
            enemy.move();
            enemy.draw();
        });
    }
}
