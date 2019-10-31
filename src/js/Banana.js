export class Banana {
    constructor(posX, posY) {
        this.displayGrid = false
        this.posX = posX
        this.posY = posY
        this.dx = 5
        this.dy = 5
    }

    move(){
        switch(this.routeType) {
            case 1:
                this.posX += this.dx;
                this.dy = 0;
                break;
            case 2:
                this.posY += this.dy;
                this.dx = 0;
                break;
            default:
                this.posX += this.dx;
                this.posY += this.dy;
        }

    }
}