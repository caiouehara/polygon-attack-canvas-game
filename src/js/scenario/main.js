import EnemyCircle from '../enemys/EnemyCircle'
import player from '../player'

const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let scneario = {
    enemys: {
        en1: new EnemyCircle(200, 100, 50),
    },
    update(){
        this.enemys.en1.drawCollision(player)
        player.drawCollision()
        this.draw()
        this.enemys.en1.move()
    },

    draw(){
        player.draw()
        this.enemys.en1.draw()
    },
}

export default scneario;