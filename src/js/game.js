import scenario from './scenario/main'
import hud from './hud'
import player from './player'

const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let game = {
    running: false,

    start() {
        if(!this.running){
            hud.remake()
            scenario.remake()
            scenario.spawnEnemy()
            this.running = true
            this.startCoutingPoints()
            this.animate()
        }
        else{
            alert('Game is already running')
        }
    },

    startCoutingPoints(){
        window.setInterval(() => {
            hud.userPoints += hud.pointsReward;
            this.setDifficulty()
        }, 1000)
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
        window.clearInterval(window.pointsTimer)
    }
}

export default game;