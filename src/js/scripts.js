import player from './player'
import scenario from './scenario/main'
import EnemyCircle from './enemys/EnemyCircle'
const canvas = document.querySelector('canvas')
const interfaceElement = document.querySelector('#interface')
const buttonStart = document.querySelector('#button-start')
let c = canvas.getContext('2d')

let interfaceData = {
    userPoints: 50,
    pointsReward: 10,
}

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
        player.alive = true;
        this.startPoints()
        this.animate()
    },

    startPoints(){
        let h2Element = interfaceElement.children[0];
        this.pointsTimer = window.setInterval(()=>{
            interfaceData.userPoints += interfaceData.pointsReward;
            h2Element.innerHTML = interfaceData.userPoints;
        }, 1000)
    },

    animate() {
        if(game.running && player.alive){
            requestAnimationFrame(game.animate)
            c.clearRect(0, 0, canvas.width, canvas.height)
            scenario.update()
        }
        else{
            game.restart()
        }
    },

    restart(){
        this.running = false;
        window.clearInterval(this.pointsTimer)
        interfaceData.userPoints = 50
        interfaceData.pointsReward = 10
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
    buttonStart.addEventListener('click', ()=>{
        game.start()
    })
}

export { interfaceData };