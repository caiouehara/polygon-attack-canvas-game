import scenario from './scenario/main'
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