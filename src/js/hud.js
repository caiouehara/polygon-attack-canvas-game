import game from './game'
import scenario from './scenario/main'
const buttonStart = document.querySelector('#button-start')
const buttonDisplayGrid = document.querySelector('#button-display-grid-collision')
const hudElement = document.querySelector('#hud')
const scoreboardElement = document.querySelector('h2')

let hud = {
    userPoints: 50,
    pointsReward: 10,
    displayGrid: false,

    init() {
        buttonStart.addEventListener('click', () => {
            this.handleStart()
        })
        buttonDisplayGrid.addEventListener('click', () => {
            this.handleGrid()
        })
        window.setInterval(() => {
            this.userPoints += this.pointsReward;
            game.setDifficulty()
        }, 1000)
    },

    update() {
        this.setGrid(this.displayGrid)
        scoreboardElement.innerHTML = this.userPoints;
    },

    handleGrid() {
        this.displayGrid = !this.displayGrid
        this.displayGrid ? buttonDisplayGrid.innerHTML = "Turn Off" : buttonDisplayGrid.innerHTML = "Display Grid"
    },

    handleStart() {
        game.start()
    },

    setGrid(value) {
        scenario.enemys.forEach((en) => {
            en.displayGrid = value;
        })
    },

    remake() {
        this.userPoints = 50
        this.pointsReward = 10
    }
}

export default hud;