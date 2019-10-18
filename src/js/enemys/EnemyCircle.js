const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

class EnemyCircle {
    constructor(posX, posY, rad) {
        this.posX = posX
        this.posY = posY
        this.rad = rad
        this.dx = 5
        this.dy = 5
    }

    draw(){
        c.beginPath()
        c.fillStyle = 'rgb(102, 255, 51, 0.7)'
        c.arc(this.posX, this.posY, this.rad, 0, Math.PI * 2)
        c.fill()
    }

    move(){
        this.posX += this.dx;
        this.posY += this.dy;
    }

    drawCollision(char){
        this.wallCollision()
        this.charCollision(char)
    }

    wallCollision(){
        // Change direction
        if(this.posX > canvas.width || this.posY < 0){
            this.dx =- this.dx;
        }
        if(this.posY > canvas.height || this.posY < 0){
            this.dy =- this.dy;
        }
    }

    charCollision(char){        
        let distance = this.getDistance(char.posX, char.posY, this.posX, this.posY)
        if( distance < this.rad + char.width){
            char.die()
        }
    }  

    getDistance(x1, y1, x2, y2){
        let xDistance = x2 - x1
        let yDistance = y2 - y1
        return Math.sqrt(xDistance**2 + yDistance**2)
    }
}

export default EnemyCircle;