import hud from './hud'
import player from './player'
import game from './game'
const buttonStart = document.querySelector('#button-start')
const buttonDisplayGrid = document.querySelector('#button-display-grid-collision')
const canvas = document.querySelector('canvas')

canvas.width = 800
canvas.height = 600
console.log(canvas)

window.addEventListener('keydown', (e) => {
    player.move(e.key);
    player.drawCollision()
})

function init() {
    buttonStart.addEventListener('click', () => {
        game.start()
    })
    buttonDisplayGrid.addEventListener('click', () => {
        hud.handleGrid()
    })
}

init()