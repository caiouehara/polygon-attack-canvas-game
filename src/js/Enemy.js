export class Enemy {
    constructor(posX, posY, rad) {
        this.displayGrid = false
        this.posX = posX
        this.posY = posY
        this.rad = rad
        this.dx = 5
        this.dy = 5
        this.color = 'rgb(102, 255, 51, 0.7)'
        this.routeType = 0
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