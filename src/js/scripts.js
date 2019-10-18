import player from './player'
import scenario from './scenario/main'
import EnemyCircle from './enemys/EnemyCircle'
import hud from './hud'
const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let game = {
    running: false,

    handleKeyBoard() {
        window.addEventListener('keydown', (e) => {
            player.move(e.key);
            player.drawCollision()
        })
    },

    start() {
        this.running = true
        player.alive = true
        hud.startPoints()
        this.animate()
    },

    animate() {
        if(game.running && player.alive){
            requestAnimationFrame(game.animate)
            hud.update()
            c.clearRect(0, 0, canvas.width, canvas.height)
            scenario.update()
        }
        else{
            game.restart()
        }
    },

    restart(){
        this.running = false;
        window.clearInterval(hud.pointsTimer)
        hud.userPoints = 50
        hud.pointsReward = 10
        player.posX = 0
        player.poY = 0
        scenario.enemys = [ new EnemyCircle( Math.random()*800 , Math.random()*600, Math.random()*50) ]
    }
}

{
    canvas.width = 800
    canvas.height = 600
    console.log(canvas)
    game.handleKeyBoard()
    hud.init()
}

export default game;