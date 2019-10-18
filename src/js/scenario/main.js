import EnemyCircle from '../enemys/EnemyCircle'
import { interfaceData } from '../scripts';
import player from '../player'

const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let scneario = {
    enemys: [
        new EnemyCircle( Math.random()*800 , Math.random()*600, Math.random()*50),
    ],

    update(){
        this.spawnEnemys()
        this.enemys.forEach((value,index)=>{
            this.enemys[index].drawCollision(player)
            this.enemys[index].move()
            this.enemys[index].draw()
        })
        player.draw()
        player.drawCollision()
    },

    spawnEnemys(){
        let points = interfaceData.userPoints;
        let newEnemy = new EnemyCircle( Math.random()*800 , Math.random()*600, Math.random()*50)
        let phase1 = (
            points === 100 && this.enemys.length <= 1 || 
            points === 200 && this.enemys.length <= 2 || 
            points === 300 && this.enemys.length <= 3 || 
            points === 400 && this.enemys.length <= 4)

        if(phase1){
            this.enemys.push(newEnemy)
            interfaceData.pointsReward += 10;
            console.log(this.enemys)
        }
    }
}

export default scneario;