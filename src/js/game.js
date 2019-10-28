import scenario from './scenario/main'
import hud from './hud'
import player from './player'

const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let game = {
    running: false,

    start() {
        if (!this.running) {
            scenario.spawnEnemy()
            this.running = true
            this.startCoutingPoints()
            this.loop()
        }
        else {
            alert('Game is already running')
        }
    },

    startCoutingPoints() {
        this.pointTimer = setInterval(() => {
            hud.userPoints += hud.pointsReward;
            this.setDifficulty()
        }, 1000)
    },

    loop() {
        if (game.running && player.alive) {
            requestAnimationFrame(game.loop)
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
        let phase1 = (points % 100 === 0)

        if (phase1) {
            scenario.spawnEnemy()
            hud.pointsReward += 10;
        }
    },

    stop() {
        this.running = false
        hud.remake()
        scenario.remake()
        clearInterval(this.pointTimer)
    }
}

export default game;