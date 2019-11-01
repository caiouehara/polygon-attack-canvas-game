import game from './game'

// Elements
const canvas = document.querySelector('canvas')

const buttonStart = document.querySelector('#button-start')
const buttonDisplayGrid = document.querySelector('#button-display-grid-collision')

const hudElement = document.querySelector('#hud')
const logElement = document.querySelector("#log")
const scoreboardElement = document.querySelector('h2')
const bananaImage = document.querySelector('#banana-image')

// Canvas
let c = canvas.getContext('2d')
canvas.width = 800
canvas.height = 600
canvas.style.backgroundColor = 'black';

// Rendering
function loop() {
    // set animationFrame reference on global (to use "game.stop()")
    window.animationFrame = requestAnimationFrame(loop)

    if (!game.running) {
        clearInterval(pointTimer)
        cancelAnimationFrame(animationFrame)
        return null;
    }

    c.clearRect(0, 0, canvas.width, canvas.height)
    game.update()
    updateHud()
    for (let playerID in game.players) {
        const player = game.players[playerID]
        c.beginPath()
        c.fillStyle = player.color
        c.fillRect(player.posX, player.posY, player.width, player.height)
    }
    for (let enemyID in game.enemys) {
        const enemy = game.enemys[enemyID]
        c.beginPath()
        c.fillStyle = enemy.color
        c.arc(enemy.posX, enemy.posY, enemy.rad, 0, Math.PI * 2)
        c.fill()
    }
    for (let bananaID in game.bananas) {
        const banana = game.bananas[bananaID]
        c.drawImage(bananaImage, banana.posX, banana.posY);
    }
}

function updateHud() {
    scoreboardElement.innerHTML = game.user.points // Scoreboard
    logElement.innerHTML = game.hud.scoreHistory.join(' ') // Log

    let playerID = game.players.player1 //have to use UserID
    // Display hud
    if (game.hud.displayGrid) {
        game.enemys.forEach( cv => {
            createGrid(playerID, cv)
        })
        game.bananas.forEach( cv => {
            createGrid(playerID, cv)
            // Create Collision Square
            c.beginPath()
            c.strokeStyle = "white"
            c.strokeRect(cv.posX, cv.posY, cv.width, cv.height)
        })
    }
}

function createGrid(char1, char2){
    // expects that char1 it's a circle
    // expects that char2 it's a circle
    let x = char1.posX + char1.height/2
    let y = char1.posY + char1.height/2
    c.beginPath()
    c.strokeStyle = "white"
    c.moveTo(char2.posX, char2.posY)
    c.lineTo(x, y)
    c.stroke()
}

// Inputs

addEventListener('keydown', (e) => {
    // set INPUT to "player1"
    // have to change to "playerID"
    let player = game.players.player1;
    switch (e.key) {
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
})

buttonStart.addEventListener('click', () => {
    if (!game.running) {
        game.running = true;
        game.start()
    }
})
buttonDisplayGrid.addEventListener('click', () => {
    game.hud.displayGrid = !game.hud.displayGrid
    game.hud.displayGrid ? buttonDisplayGrid.innerHTML = "Turn Off" : buttonDisplayGrid.innerHTML = "Display Grid"
})

// Init Game
loop()