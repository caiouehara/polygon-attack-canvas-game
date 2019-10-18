import game from './game'
import scenario from './scenario/main'
const buttonStart = document.querySelector('#button-start')
const buttonDisplayGrid = document.querySelector('#button-display-grid-collision')
const hudElement = document.querySelector('#hud')

let hud = {
    userPoints: 50,
    pointsReward: 10,
    pointsTimer: undefined,
    displayGrid: false,

    init(){
        buttonStart.addEventListener('click', ()=>{
            game.start()
            this.startPoints()
        })
        buttonDisplayGrid.addEventListener('click', ()=>{
            this.handleGrid()
        })
    },

    update(){
        this.setGrid(this.displayGrid)
    },

    startPoints(){
        let h2Element = hudElement.children[0];
        this.pointsTimer = window.setInterval(()=>{
            this.handlePoints()
            hud.userPoints += hud.pointsReward;
            h2Element.innerHTML = hud.userPoints;
        }, 1000)
    },

    handleGrid(){
        this.displayGrid = !this.displayGrid
        this.displayGrid ? buttonDisplayGrid.innerHTML = "Turn Off" : buttonDisplayGrid.innerHTML = "Display Grid"
    },

    handlePoints(){
        let points = hud.userPoints;
        let phase1 = ( points % 100 === 0 )
        if(phase1){
            scenario.spawnEnemy()
            hud.pointsReward += 10;
            console.log(this.enemys)
        }
    },

    setGrid(value){
        scenario.enemys.forEach((en)=>{
            en.displayGrid = value;
        })
    },
}

export default hud;