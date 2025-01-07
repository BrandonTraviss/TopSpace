import getRandomNumber from "../functions/getRandomNumber.js"

getRandomNumber

export default class Background {
    constructor(ctx, canvas) {
        this.ctx = ctx
        this.canvas = canvas
        this.width = canvas.width
        this.height = canvas.height
        this.colors = [
            'rgba(255, 255, 255, 0.3)',
            'rgba(255, 177, 41, 0.3)',
            'rgba(255, 41, 41, 0.3)',
            'rgba(213, 255, 41, 0.3)',
            'rgba(8, 0, 255, 0.3)',
            'rgba(255, 255, 255, 0.4)',
            'rgba(255, 177, 41, 0.4)',
            'rgba(255, 41, 41, 0.4)',
            'rgba(213, 255, 41, 0.4)',
            'rgba(8, 0, 255, 0.4)',
            'rgba(255, 255, 255, 0.5)',
            'rgba(255, 177, 41, 0.5)',
            'rgba(255, 41, 41, 0.5)',
            'rgb(212, 255, 41, 0.5)',
            'rgba(8, 0, 255, 0.5)',
            'rgba(255, 255, 255, 0.6)',
            'rgba(255, 177, 41, 0.6)',
            'rgba(255, 41, 41, 0.6)',
            'rgba(213, 255, 41, 0.6)',
            'rgba(8, 0, 255, 0.6)'
        ]
        this.scrollSpeed = 3
    }
    generateBackground(number) {
        this.background = []
        for (let i = 0; i < number; i++) {
            this.background.push({
                id: i,
                x: getRandomNumber(0, this.canvas.width),
                y: getRandomNumber(0, this.canvas.height),
                color: this.colors[getRandomNumber(0, this.colors.length - 1)],
                size: getRandomNumber(1, 2)
            })
        }
    }
    clear() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.width, this.height)
    }
    scroll() {
        this.background.forEach(star => {
            star.y += this.scrollSpeed
            if (star.y > this.height) {
                star.y = 0
                star.x = getRandomNumber(0, this.canvas.width)
                star.color = this.colors[getRandomNumber(0, this.colors.length - 1)]
                star.size = getRandomNumber(1, 2)
            }
        })
    }
    update() {
        this.clear()
        this.scroll()
        this.draw()
    }
    draw() {
        this.background.forEach(star => {
            this.ctx.fillStyle = star.color
            this.ctx.fillRect(star.x, star.y, star.size, star.size)
        })
    }
    log() {
        console.log(this.background)
    }
}