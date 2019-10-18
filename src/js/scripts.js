import player from './player'
import scenario from './scenario/main'
const canvas = document.querySelector('canvas')
const interfaceElement = document.querySelector('#interface')
const buttonStart = document.querySelector('#button-start')
let c = canvas.getContext('2d')

{
    canvas.width = 800;
    canvas.height = 600;
    console.log(canvas)
}

let interfaceData = {
    userPoints: 50,
    pointsReward: 10,
}

let game = {
    init() {
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
            interfaceData.userPoints += interfaceData.pointsReward;
            h2Element.innerHTML = interfaceData.userPoints;
        }, 1000)
    },

    animate() {
        requestAnimationFrame(game.animate)
        c.clearRect(0, 0, canvas.width, canvas.height)
        scenario.update()
    },
}

buttonStart.addEventListener('click', ()=>{
    game.init()
})

export { interfaceData };