import Background from "./classes/Background.js"
import Enemy from "./classes/Enemy.js"
import Game from "./classes/Game.js"
import Player from "./classes/Player.js"
import getRandomNumber from "./functions/getRandomNumber.js"
import loadImage from "./functions/loadImage.js"

const canvas = document.getElementById('game-screen')
const ctx = canvas.getContext('2d')

const gameMusic = new Audio('audio/track1.mp3');

const game = new Game(ctx, canvas)
const background = new Background(ctx, canvas)
//Enemy Sprites
const enemySprite1 = await loadImage('img/enemy.png')
//Background Setup
background.generateBackground(500)
game.setBackground(background)
//Player Setup
const player = new Player(ctx, canvas, game)
//Spawn Enemies
function spawnEnemy(ctx, canvas, game, sprite) {
    let x, overlap;
    do {
        x = getRandomNumber(0, canvas.width - sprite.width);
        overlap = false;
        for (let enemy of game.enemies) {
            if (x < enemy.x + enemy.width && x + sprite.width > enemy.x) {
                overlap = true;
                break;
            }
        }
    } while (overlap);

    let enemy = new Enemy(ctx, canvas);
    enemy.setPos(x, 0);
    enemy.setSprite(sprite);
    game.addEnemy(enemy);
}


game.addPlayer(player)
game.player.setSprite(await loadImage('img/player.png'))
game.player.input()
game.player.setInitPos()
function gameLoop() {
    gameMusic.play()
    if (game.enemies.length <= 4) {
        spawnEnemy(ctx, canvas, game, enemySprite1)
    }
    game.update()
    requestAnimationFrame(gameLoop)
}
gameLoop()