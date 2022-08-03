var Evolution = {
    /* Factor: 
        Reaserch (every time reaserch is done: +number of previous reaserches)
        Ores Mined +0.001
        Buildings Placed +0.02
        Time +0.009 per minute
    */ 
   spawnCooldown: 7000,
   enemySpeed: 2
}

class Enemy extends Hitbox {
    constructor(x, y, w) {
        super(x, y, 48, 48)
        this.world = w
        this.renderColor = "#ff5555"
        this.target = null
        this.vx = 0
        this.vy = 0
        this.speed = Evolution.enemySpeed
        this.update = () => {
            function wander(e) {
                let seed = Math.random()
                if(seed < 0.025) {
                    console.log(seed)
                    if(seed < 0.005) {
                        e.vx = e.speed
                    }
                    else if(seed < 0.010) {
                        e.vx = -e.speed
                    }
                    else if(seed < 0.015) {
                        e.vy = e.speed
                    }
                    else if(seed < 0.020) {
                        e.vy = -e.speed
                    }
                    else {
                        e.vx = 0
                        e.vy = 0
                    }
                }
            }

            if(Math.hypot(Player.x - this.x, Player.y - this.y) < 60 && this.target === null) {
                this.target = Player
            }
            if(this.target !== null) {
                if(this.x > this.target.x) {
                    this.vx = -this.speed
                }if(this.x < this.target.x) {
                    this.vx = this.speed
                } if(this.y > this.target.y) {
                    this.vy = -this.speed
                }if(this.y < this.target.y) {
                    this.vy = this.speed
                }
                if(Math.hypot(this.target.x - this.x, this.target.y - this.y) > 800) {
                    this.target = null
                }
                
                
            } else {
                wander(this)
            }
            let movex = true
                let movey = true
                for(let h of this.world.metadata.hitboxes) {
                    if(h.id !== "spawnArea" && h !== this) {
                        if(overlapping(h, {x: this.x + this.vx, y: this.y, w: this.w, h: this.h})) {
                            movex = false
                        }
                        if(overlapping(h, {x: this.x, y: this.y + this.vy, w: this.w, h: this.h})) {
                            movey = false
                        }
                    }
                }
            if (movex) {
                this.x += this.vx
            } 
            if (movey) {
                this.y += this.vy
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
                            this.world.metadata.hitboxes.push(new Enemy(loc.x, loc.y, this.world))
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
                ctx.fillText(this.spawnCooldown, (this.x+cx + 64)*Zoom, (this.y+cy + 64)*Zoom)
            }
        }
    }
}

addBuild(new Enemy(14*64,14*64, Player.metadata.currentWorld))

/*
for(let i = 0; i < 500; i++) {
    let x = Math.floor( Math.random() * (currentWorld.width - 3) * 64)
    let y = 64*currentWorld.height - Math.floor( Math.random() * 24 * 64 ) -192
    let c = false
    for(let h of currentWorld.metadata.hitboxes) {
        if(overlapping(h, {x:x, y:y, w:3*64, h:3*64}) && h.id !== "spawnArea") {
            c = true
        }
    }

    if(!c) {
        currentWorld.metadata.hitboxes.push(new Hive(x, y))
    }
}*/

class Defender extends Hitbox {
    constructor(x, y) {
        super(x, y, 48, 48)
        this.follow = Player
        this.lifespan = 10*1000
    }
}