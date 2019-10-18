import player from './player'
import scenario from './scenario/main'
const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let game = {
    init() {
        canvas.width = 800;
        canvas.height = 600;
        console.log(canvas)
        this.handleKeyBoard()
        this.animate()
        
    },

    handleKeyBoard() {
        window.addEventListener('keydown', (e) => {
            player.move(e.key);
            player.drawCollision()
        })
    },

    animate() {
        requestAnimationFrame(game.animate)
        c.clearRect(0, 0, canvas.width, canvas.height)
        scenario.update()
    },
}

game.init()