import EnemyCircle from '../enemys/EnemyCircle'
import player from '../player'

const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let scneario = {
    displayGrid: false,

    enemys: [
        new EnemyCircle( Math.random()*800 , Math.random()*600, Math.random()*50),
    ],

    update(){
        this.setGrid(this.displayGrid)
        this.updateEnemys()
        player.draw()
        player.drawCollision()
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

    spawnEnemys(){
        let newEnemy = new EnemyCircle( Math.random()*800 , Math.random()*600, Math.random()*50)
        this.enemys.push(newEnemy)
    },

    setGrid(value){
        this.enemys.forEach((en)=>{
            en.displayGrid = value;
        })
    },
}

export default scneario;