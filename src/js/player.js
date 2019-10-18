const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let player = {
    posX: 0,
    posY: 0,
    dx: 50,
    dy: 50,
    width: 50,
    height: 50,
    alive: true,

    move(key) {
        switch (key) {
            case 'w':
                player.posY -= player.dy
                break
            case 's':
                player.posY += player.dy
                break
            case 'a':
                player.posX -= player.dx
                break
            case 'd':
                player.posX += player.dx
                break
        }
    },

    draw() {
        c.beginPath()
        c.fillStyle = 'black'
        c.fillRect(this.posX, this.posY, this.width, this.height)
    },

    die() {
        console.log('died')
        this.alive = false;
    },

    drawCollision() {
        // Hit the wall
        let wallReactionForce = 5;
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
}

export default player;