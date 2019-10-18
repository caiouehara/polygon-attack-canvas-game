import EnemyCircle from '../enemys/EnemyCircle'
import player from '../player'

let scneario = {
    enemys: [
        new EnemyCircle( Math.random()*800 , Math.random()*600, Math.random()*50),
    ],

    update(){
        this.updateEnemys()
        this.updatePlayers()
    },

    updateEnemys(){
        this.enemys.forEach((value,index)=>{
            // Define Routes
            if (index % 2 === 0){
                this.enemys[index].move(1)
            }
            else if(index % 5 === 0){
                this.enemys[index].move(2)
            }
            else{
                this.enemys[index].move()
            }
            this.enemys[index].draw()
            this.enemys[index].drawCollision(player)
        })  
    },

    updatePlayers(){
        player.draw()
        player.drawCollision()
    },

    spawnEnemy(){
        let newEnemy = new EnemyCircle( Math.random()*800 , Math.random()*600, Math.random()*50)
        this.enemys.push(newEnemy)
    },

    remake(){
        player.alive = true
        player.posX = 0
        player.posY = 0
        this.enemys = [ new EnemyCircle( Math.random()*800 , Math.random()*600, Math.random()*50) ]
    }
}

export default scneario;