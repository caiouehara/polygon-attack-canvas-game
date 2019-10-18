import player from './player'
import scenario from './scenario/main'
const canvas = document.querySelector('canvas')
const interfaceElement = document.querySelector('#interface')
let c = canvas.getContext('2d')

let game = {
    interface:{
        userPoints: 0,
    },

    init() {
        canvas.width = 800;
        canvas.height = 600;
        console.log(canvas)
        this.handleInterface()
        this.handleKeyBoard()
        this.animate()
        
    },

    handleKeyBoard() {
        window.addEventListener('keydown', (e) => {
            player.move(e.key);
            player.drawCollision()
        })
    },

    handleInterface(){
        let h2Element = interfaceElement.children[0];
        window.setInterval(()=>{
            this.interface.userPoints += 1;
            h2Element.innerHTML = this.interface.userPoints;
        }, 1000)
    },

    animate() {
        requestAnimationFrame(game.animate)
        c.clearRect(0, 0, canvas.width, canvas.height)
        scenario.update()
    },
}

game.init()