import { setWallCollision, setCharCollision, changeObjDirection, getDistance, freezeEnemys, spawn, setEnemyRoutes } from './game-functions'

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

    player: {
        posX: 50,
        posY: 50,
        dx: 10,
        dy: 10,
        width: 50,
        height: 50,
        color: 'white',
    },

    enemys: [],
    bananas: [],

    update() {
        setWallCollision.call(this.player)

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

    start() {
        this.running = true;
        spawn('enemy')
        this.pointTimer = setInterval(() => {
            // Handle Spawns
            let condToSpawnEnemy = (this.user.points % 100 === 0)
            let condToSpawnBanana = (this.user.points % 200 === 0)

            this.user.points += this.user.pointsReward;

            if (condToSpawnEnemy) {
                spawn('enemy')
                this.user.pointsReward + 10;
            }
            if (condToSpawnBanana) {
                spawn('banana')
            }
        }, 1000)
    },

    handleKeyboard(key) {
        if(!this.running) return
        switch (key) {
            case 'w':
                this.player.posY -= this.player.dy
                break
            case 's':
                this.player.posY += this.player.dy
                break
            case 'a':
                this.player.posX -= this.player.dx
                break
            case 'd':
                this.player.posX += this.player.dx
                break
        }
    },

    stop() {
        this.running = false
        clearInterval(this.pointTimer)

        // creating Log
        this.hud.scoreHistory.push(`<p> Score: ${this.user.points} </p>`)
        // remake
        this.user = { points: 10, pointsReward: 30 }
        
        this.enemys = []
        this.bananas = []

        this.player.posX = 0;
        this.player.posY = 0;
    }
}

export default game