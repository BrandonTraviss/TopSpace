export default class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.enemies = [];
        this.state = 'menu'; // Initial state
        this.enemyBullets = []
        this.score = 0
    }

    init() {
        // Initialize or reset the game state
        this.enemies = [];
        this.player = null;
        this.background = null;
        this.state = 'playing';
    }
    updateBullets() {
        this.enemyBullets = this.enemyBullets.filter(bullet => {
            bullet.move();
            bullet.draw(this.ctx);
            return !bullet.isOffScreen(this.canvas.height);
        });
    }
    update() {
        if (this.state === 'menu') {
            this.background.update();
            this.ctx.fillStyle = 'white'
            this.ctx.font = "20px serif";
            this.ctx.fillText("Press Enter...", this.canvas.width / 2 - 40, this.canvas.height / 2 + 20);
            this.ctx.font = "48px serif";
            this.ctx.fillText("Start Game", this.canvas.width / 2 - 100, this.canvas.height / 2);
        }

        if (this.state === 'playing') {
            this.background.update();

            this.enemies.forEach((enemy, index) => {
                enemy.update(this.player, this);
            });
            this.updateBullets()
            this.player.update();
            this.checkCollisions();
            this.ctx.fillStyle = 'white'
            this.ctx.font = "20px serif";
            this.ctx.fillText(`Health : ${this.player.health}`, 30, 40);

            this.ctx.fillStyle = 'white'
            this.ctx.font = "20px serif";
            this.ctx.fillText(`Score : ${this.score}`, 275, 40);
        }
        if (this.state === 'gameover') {
            this.background.update();
            this.ctx.fillStyle = 'white'
            this.ctx.font = "48px serif";
            this.ctx.fillText("Game Over", this.canvas.width / 2 - 110, this.canvas.height / 2);
            this.ctx.font = "20px serif";
            this.ctx.fillText("Press Enter...", this.canvas.width / 2 - 50, this.canvas.height / 2 + 30);
            this.ctx.fillStyle = 'white'
            this.ctx.font = "48px serif";
            this.ctx.fillText(`Score ${this.score}`, this.canvas.width / 2 - 110, this.canvas.height / 2 - 100);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.draw();
        this.enemies.forEach(enemy => {
            enemy.draw();
        });
        this.player.draw();
    }

    setBackground(background) {
        this.background = background;
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    addPlayer(player) {
        this.player = player;
    }

    checkCollisions() {
        // Check collisions between player bullets and enemies
        this.player.bullets.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (this.isColliding(bullet, enemy)) {
                    // Handle collision (remove bullet, reduce enemy health)
                    this.player.bullets.splice(bulletIndex, 1);
                    enemy.health -= 1;
                    if (enemy.health <= 0) {
                        this.enemies.splice(enemyIndex, 1);
                        this.score += 100
                    }
                }
            });
        });

        // Check collisions between enemy bullets and player
        this.enemyBullets.forEach((bullet, bulletIndex) => {
            if (this.isColliding(bullet, this.player)) {
                // Handle collision (e.g., remove bullet, reduce player health)
                this.enemyBullets.splice(bulletIndex, 1);
                // Apply damage or other logic
                this.player.health -= 1
            }
        });
    }

    isColliding(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y;
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    start() {
        this.init();
        this.gameLoop();
    }
}
