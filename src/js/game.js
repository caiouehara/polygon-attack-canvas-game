import scenario from './scenario/main'
import hud from './hud'
import player from './player'

const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let game = {
    running: false,

    start() {
        hud.remake()
        scenario.remake()
        this.running = true
        hud.startPoints()
        this.animate()
    },

    animate() {
        if(game.running && player.alive){
            requestAnimationFrame(game.animate)
            c.clearRect(0, 0, canvas.width, canvas.height)
            scenario.update()
            hud.update()
        }
        else{
            game.stop()
        }
    },

    stop(){
        this.running = false;
        // Não consigo parar o timer
        hud.pointsTimer = window.clearInterval(hud.pointsTimer)
    }
}

export default game;