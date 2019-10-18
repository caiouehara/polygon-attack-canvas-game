const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

class EnemyCircle {
    constructor(posX, posY, rad) {
        this.displayGrid = false,
        this.posX = posX
        this.posY = posY
        this.rad = rad
        this.dx = 5
        this.dy = 5
        this.color = 'rgb(102, 255, 51, 0.7)'
    }

    draw(){
        c.beginPath()
        c.fillStyle = this.color
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
        if(this.displayGrid){
            this.collisionGrid(char)
        }
    }

    wallCollision(){
        // Change direction
        if(this.posX > canvas.width || this.posX < 0){
            this.dx =  -this.dx;
        }
        if(this.posY > canvas.height || this.posY < 0){
            this.dy = -this.dy;
        }
    }

    charCollision(char){
        let x = char.posX + char.height/2
        let y = char.posY + char.height/2
        let distance = this.getDistance( x, y, this.posX, this.posY)
        if( distance < this.rad + char.width/2){
            this.color = "red";
            char.die()
        }
    }  

    getDistance(x1, y1, x2, y2){
        let xDistance = x2 - x1
        let yDistance = y2 - y1
        return Math.sqrt(xDistance**2 + yDistance**2)
    }

    collisionGrid(char){
        let x = char.posX + char.height/2
        let y = char.posY + char.height/2
        c.beginPath()
        c.strokeStyle = "white"
        c.moveTo(this.posX, this.posY)
        c.lineTo(x, y)
        c.stroke()
    }
}

export default EnemyCircle;