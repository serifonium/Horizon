var Evolution = {
    /* Factor: 
        Reaserch (every time reaserch is done: +number of previous reaserches)
        Ores Mined +0.001
        Buildings Placed +0.02

    */ 
   spawnCooldown: 10000
}

class Enemy extends Hitbox {
    constructor(x, y) {
        super(x, y, 48, 48)
        this.renderColor = "#ff5555"
        this.target = null
        this.update = () => {
            if(Math.hypot(Player.x - this.x, Player.y - this.y) < 600 && this.target === null) {
                this.target = Player
            }
            if(this.target !== null) {
                if(this.x > this.target.x-24) {
                    this.x += -2
                }if(this.x < this.target.x-24) {
                    this.x += 2
                } if(this.y > this.target.y-24) {
                    this.y += -2
                }if(this.y < this.target.y-24) {
                    this.y += 2
                }
                if(Math.hypot(this.target.x - this.x, this.target.y - this.y) > 1400) {

                }
            }
        }
    }
}
class Hive extends Hitbox {
    constructor(x, y) {
        super(x, y, 192, 192)
        this.spawnCooldown = Evolution.spawnCooldown
        this.renderColor = "#ff5555"
        this.lastTick = Date.now()
        this.tick = Date.now()
        this.spawnArea = new Hitbox(this.x - 128, this.y - 128, this.w + 256, this.h + 256)
        this.spawnArea.id = "spawnArea"
        this.spawnArea.world.metadata.hitboxes.push(this.spawnArea)
        this.spawnArea.renderColor = "#ff0000"
        this.update = () => {
            this.tick = Date.now()
            this.spawnCooldown += -(this.tick - this.lastTick)
            if(this.spawnCooldown < 0) {
                let success = false // was the spawn successful?
                for(let r = 0; r < 10; r++) {
                    if(!success) {
                        let overlap = false // is the selection overlapping something else?
                        let loc = {x: Math.floor(Math.random()*(this.spawnArea.w - 48)+this.spawnArea.x), y: Math.floor(Math.random()*(this.spawnArea.h - 48)+this.spawnArea.y), w: 48, h: 48}
                        for(let h of this.world.metadata.hitboxes) {
                            if (overlapping(loc, h)) {
                                if(h.id !== "spawnArea") {
                                    overlap = true
                                }
                            }
                        }
                        if (!overlap) {
                            this.world.metadata.hitboxes.push(new Enemy(loc.x, loc.y))
                            success = true
                        }
                    }
                

                    
                }
                this.spawnCooldown = Evolution.spawnCooldown
            }
            this.lastTick = Date.now()
        } 
        this.render = () => {
            if(debugActive) {
                ctx.fillStyle = "#ffffff"
                ctx.fillText(this.spawnCooldown, this.x+cx + 64, this.y+cy + 64)
            }
        }
    }
}
addBuild(new Enemy(8, 64+8))





class Defender extends Hitbox {
    constructor(x, y) {
        super(x, y, 48, 48)
        this.follow = Player
        this.lifespan = 10*1000
    }
}