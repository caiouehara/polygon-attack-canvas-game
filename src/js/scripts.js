import hud from './hud'
import player from './player'
const canvas = document.querySelector('canvas')

{
    canvas.width = 800
    canvas.height = 600
    console.log(canvas)
    
    window.addEventListener('keydown', (e) => {
        player.move(e.key);
        player.drawCollision()
    })

    hud.init()
}
