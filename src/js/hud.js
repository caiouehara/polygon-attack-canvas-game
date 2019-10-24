import game from './game'
import scenario from './scenario/main'
const buttonStart = document.querySelector('#button-start')
const buttonDisplayGrid = document.querySelector('#button-display-grid-collision')
const scoreboardElement = document.querySelector('h2')

let hud = {
    userPoints: 50,
    pointsReward: 10,
    displayGrid: false,
    log: {
        element: document.querySelector("#log"),
        scoreHistory: [],
    },

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

    updateLog(){
        let log = this.log
        log.scoreHistory.push(`<p> Score: ${this.userPoints} </p>`)
        log.element.innerHTML = log.scoreHistory.join(' ')
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
        this.updateLog()
        this.userPoints = 50
        this.pointsReward = 10
    }
}

export default hud;