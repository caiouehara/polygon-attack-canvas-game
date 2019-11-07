import game from './game'
import { Banana } from './Banana'
import { Enemy } from './Enemy'

const canvas = document.querySelector('canvas')

export function setEnemyRoutes() {
    for (let enemyID in game.enemys) {
        const enemy = game.enemys[enemyID]
        if (enemyID % 5 === 0) {
            enemy.routeType = 0
        }
        else if (enemyID % 2 === 0) {
            enemy.routeType = 1
        }
        else {
            enemy.routeType = 2
        }
    }
}

export function spawn(obj) {
    const enemyRadBetween = [75, 25]
    const preventSpawnDistance = 25

    const spawnPosX = Math.random() * canvas.width
    const spawnPosY = Math.random() * canvas.height
    const randomRad = Math.random() * (enemyRadBetween[0] - enemyRadBetween[1]) + enemyRadBetween[1]
    const bananaWidht = new Banana().width
    const distance = getDistance(game.player.posX, game.player.posY, spawnPosX, spawnPosY)

    let isProtect = false

    switch (obj) {
        case 'enemy':
            isProtect = (distance > preventSpawnDistance + game.player.width + randomRad)
            isProtect ? game.enemys.push(new Enemy(spawnPosX, spawnPosY, randomRad)) : spawn('enemy')
            setEnemyRoutes()
            break
        case 'banana':
            isProtect = (distance > preventSpawnDistance + game.player.width + bananaWidht)
            isProtect ? game.bananas.push(new Banana(spawnPosX, spawnPosY)) : spawn('banana')
            break

    }
}

export function freezeEnemys(time, defaultSpeedX, defaultSpeedY) {
    // declaring Default Speed in case isn't passed
    if (!defaultSpeedX || !defaultSpeedY) {
        defaultSpeedX = 5
        defaultSpeedY = 5
    }
    // Updating
    for (let enemy of game.enemys) {
        enemy.dx = 0
        enemy.dy = 0
    }
    // Set Default
    setTimeout(() => {
        for (let enemy of game.enemys) {
            enemy.dx = defaultSpeedX
            enemy.dy = defaultSpeedY
        }
    }, time)
}

export function setWallCollision() {
    let wallReactionForce = 0;
    if (this.posX <= 0) {
        this.posX += this.dx + wallReactionForce;
    }
    if (this.posX >= canvas.width - this.width) {
        this.posX -= this.dx + wallReactionForce;
    }
    if (this.posY <= 0) {
        this.posY += this.dy + wallReactionForce;
    }
    if (this.posY >= canvas.height - this.height) {
        this.posY -= this.dy + wallReactionForce;
    }
}

export function setCharCollision(objectSize, cb) {
    let x = game.player.posX + game.player.height / 2
    let y = game.player.posY + game.player.height / 2

    let distance = getDistance(x, y, this.posX, this.posY)
    // Condtion for all types of Object (object size have to be 1/2 of original)
    let cond = distance < objectSize + game.player.width / 2

    if (cond) {
        // Set a callback after Collid
        if (cb) {
            cb()
        }
        // Default Collid Trigger
        else {
            this.color = "red";
            game.stop()
        }
    }
}

export function changeObjDirection() {
    if (this.posX > canvas.width || this.posX < 0) {
        this.dx = -this.dx;
    }
    if (this.posY > canvas.height || this.posY < 0) {
        this.dy = -this.dy;
    }
}

export function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1
    let yDistance = y2 - y1
    return Math.sqrt(xDistance ** 2 + yDistance ** 2)
}