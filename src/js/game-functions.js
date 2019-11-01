import game from './game' // One import another
const canvas = document.querySelector('canvas')

export function setWallCollision() {
    let wallReactionForce = 10;
    if (this.posX <= 0) {
        this.posX += this.dx + wallReactionForce;
    }
    if (this.posX >= canvas.width - this.width) {
        this.posX -= this.dx + wallReactionForce;
    }
    if (this.posY <= 0) {
        this.posY += this.dy + wallReactionForce;
    }
    if (this.posY >= canvas.height - this.height) {
        this.posY -= this.dy + wallReactionForce;
    }
}

export function setCharCollision(objectSize, cb) {
    for(let playerID in game.players){
        const player = game.players[playerID]

        // Set Player pivot in center (expects a square player)
        let x = player.posX + player.height / 2
        let y = player.posY + player.height / 2
        
        let distance = getDistance(x, y, this.posX, this.posY)
        // Condtion for all types of Object
        let cond = distance < objectSize + player.width / 2

        if (cond) {
            // Set a callback after Collid
            if(cb){
                cb()
            }
            // Default Collid Trigger
            else{
                this.color = "red";
                player.color = "red";
                player.alive = false;
            }
        }
    }  
}

export function changeObjDirection() {
    if (this.posX > canvas.width || this.posX < 0) {
        this.dx = -this.dx;
    }
    if (this.posY > canvas.height || this.posY < 0) {
        this.dy = -this.dy;
    }
}

export function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1
    let yDistance = y2 - y1
    return Math.sqrt(xDistance ** 2 + yDistance ** 2)
}