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
        this.animate()
    },

    animate() {
        if (game.running && player.alive) {
            requestAnimationFrame(game.animate)
            c.clearRect(0, 0, canvas.width, canvas.height)
            scenario.update()
            hud.update()
        }
        else {
            game.stop()
        }
    },

    setDifficulty() {
        let points = hud.userPoints
        let phase1 = ( points % 100 === 0)

        if (phase1) {
            scenario.spawnEnemy()
            hud.pointsReward += 10;
        }
    },

    stop() {
        this.running = false
        window.clearInterval(hud.pointsTimer)
    }
}

export default game;