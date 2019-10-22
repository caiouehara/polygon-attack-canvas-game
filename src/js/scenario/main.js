import EnemyCircle from '../enemys/EnemyCircle'
import player from '../player'
const canvas = document.querySelector('canvas')

let scneario = {
    preventSpawnDistance: 125,
    enemys: [],
    enemyRadBetween: [75, 25],

    update(){
        this.updateEnemys()
        this.updatePlayers()
    },

    updateEnemys(){
        this.enemys.forEach((currentValue ,index)=>{
            // Define Routes
            if(index % 5 === 0){
                currentValue.move()
            }
            else if (index % 2 === 0){
                currentValue.move(1)
            }
            else{
                currentValue.move(2)
            }   
            currentValue.draw()
            currentValue.drawCollision(player)
        })  
    },

    updatePlayers(){
        player.draw()
        player.drawCollision()
    },

    spawnEnemy(){
        let spawnPosX = Math.random() * canvas.width
        let spawnPosY = Math.random() * canvas.height
        let randomRad = Math.random() * (this.enemyRadBetween[0] - this.enemyRadBetween[1]) + this.enemyRadBetween[1]
        let distance = this.getDistance(player.posX, player.posY, spawnPosX, spawnPosY)
        if(distance > this.preventSpawnDistance + player.width + randomRad){
            let newEnemy = new EnemyCircle( spawnPosX , spawnPosY, randomRad)
            this.enemys.push(newEnemy)
        }
        else {
            this.spawnEnemy()
        }
    },

    getDistance(x1, y1, x2, y2){
        let xDistance = x2 - x1
        let yDistance = y2 - y1
        return Math.sqrt(xDistance**2 + yDistance**2)
    },

    remake(){
        player.alive = true
        player.posX = 0
        player.posY = 0
        this.enemys = []
    }
}

export default scneario;