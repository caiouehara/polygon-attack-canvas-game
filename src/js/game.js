import { Enemy } from './Enemy'
import { Player } from './Player'
import { Banana } from './Banana'
import { setWallCollision, setCharCollision, changeObjDirection, getDistance, freezeEnemys } from './game-functions'

const canvas = document.querySelector('canvas')

let game = {
    running: false,
    user: {
        points: 10,
        pointsReward: 30,
    },
    hud: {
        displayGrid: false,
        scoreHistory: [],
    },

    players: {
        player1: new Player(),
    },
    enemys: [new Enemy(200, 200, 25)],
    bananas: [new Banana(200, 200)],

    update() {
        for (let playerID in this.players) {
            const player = this.players[playerID]
            // Checking if all players are alive
            if (!player.alive) {
                game.stop()
            }
            setWallCollision.call(player)
        }
        for (let enemy of this.enemys) {
            changeObjDirection.call(enemy)
            setCharCollision.call(enemy, enemy.rad)
            enemy.move()
        }
        for (let banana of this.bananas) {
            setCharCollision.call(banana, banana.width, () => {
                freezeEnemys(500)
            })
            changeObjDirection.call(banana)
            banana.move()
        }
    },

    startCoutingPoints() {
        // set pointTimer reference on global (to use "game.stop()")
        window.pointTimer = setInterval(() => {
            // Handle Spawns
            let phase1 = (this.user.points % 100 === 0)

            this.user.points += this.user.pointsReward;

            if (phase1) {
                this.spawn('enemy')
                this.user.pointsReward + 10;
            }
        }, 1000)
    },

    spawn(obj) {
        let enemyRadBetween = [75, 25]
        let preventSpawnDistance = 25

        let spawnPosX = Math.random() * canvas.width
        let spawnPosY = Math.random() * canvas.height
        let randomRad = Math.random() * (enemyRadBetween[0] - enemyRadBetween[1]) + enemyRadBetween[1]
        let bananaWidht = new Banana().width

        let isProtect = false

        // protecting all players
        for (let player in this.players) {
            let distance = getDistance(player.posX, player.posY, spawnPosX, spawnPosY)
            switch (obj) {
                case 'enemy':
                    isProtect = !(distance > preventSpawnDistance + player.width + randomRad)
                    isProtect ? this.enemys.push(new Enemy(spawnPosX, spawnPosY, randomRad)) && this.setEnemyRoutes() : this.spawn('enemy')
                    break
                case 'banana':
                    isProtect = !(distance > preventSpawnDistance + player.width + bananaWidht )
                    isProtect ? this.bananas.push(new Banana(spawnPosX, spawnPosY)) : this.spawn('banana')
                    break
            }
        }
    },

    setEnemyRoutes() {
        for (let enemyID in this.enemys) {
            const enemy = this.enemys[enemyID]
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
    },

    stop() {
        // stop loops
        this.running = false // stop animationFrame loop 
        clearInterval(pointTimer)
        // creating Log
        this.hud.scoreHistory.push(`<p> Score: ${this.user.points} </p>`)
        // remake
        this.user = { points: 10, pointsReward: 30 },
            this.enemys = [new Enemy(200, 200, 25)]
        this.players.player1 = new Player() // have to change to userID
    }
}

export default game