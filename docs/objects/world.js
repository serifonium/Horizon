var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var Fortune = 1

class Tile {
    constructor(x, y, type, world) {
        this.x = x
        this.y = y
        this.type = type
        this.metadata = {
            world: world
        }
        this.render = () => {
            if(tile.type === "grass") {
                ctx.drawImage(Data.images.grass, a*64, b*64)
            }
        }
    }
}

class World {
    constructor(w, h, startup) {
        this.width = w
        this.height = h
        this.grid = []
        for(let a = 0; a < w; a++) {
            this.grid[a] = []
            for(let b = 0; b < h; b++) {
                this.grid[a][b] = new Tile(a, b, "grass", this)
            }
        }
        this.startup = startup
        this.metadata = {
            trains: [],
            hitboxes: [],
            rocks: []
        }
        

        this.render = () => {
            ctx.fillStyle = "#111111"
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
            for(let a = 0; a < this.width; a++) {
                for(let b = 0; b < this.height; b++) {
                    let tile = this.grid[a][b]
                    if(tile.type === "grass") {
                        ctx.drawImage(Data.images.grass, (a*64+cx)*Zoom, (b*64+cy)*Zoom, Data.images.grass.width*Zoom, Data.images.grass.height*Zoom)
                    } if(tile.type === "metal") {
                        ctx.drawImage(Data.images.metal, (a*64+cx)*Zoom, (b*64+cy)*Zoom, Data.images.metal.width*Zoom, Data.images.metal.height*Zoom)
                    } if(tile.type === "void") {
                        ctx.fillStyle = "#111111"
                        ctx.fillRect((a*64+cx)*Zoom, (b*64+cy)*Zoom, 64*Zoom, 64*Zoom)
                    }
                    if(tile.type === undefined) {
                        ctx.fillStyle = "#ffffff"
                        ctx.fillRect((a*64+cx)*Zoom, (b*64+cy)*Zoom, 64*Zoom, 64*Zoom)
                    }
                }
            }
            for(let a = 0; a < this.width; a++) {
                for(let b = 0; b < this.height; b++) {
                    let tile = this.grid[a][b]
                    if(tile.decor === "rail") {
                        ctx.drawImage(Data.images.rail, a*64+cx, b*64+cy)
                    }
                }
            }
            
            for (let t of this.metadata.trains) {
                t.render()
            }
        }
        this.update = () => {
            for (let h of this.metadata.hitboxes) {
                h.update(h)
                if(h.render !== undefined) h.render(h)
                h.debugRender(h)
            }
        }
        if(this.startup !== undefined) {
            this.startup(this)
        }
    }
}
currentWorld = new World(200, 150)
/*
for(let a = 2; a < 3; a++) {
    for(let b = 3; b < 14; b += 2) {
        currentWorld.grid[a][b].decor = "rail"
    }
}*/

Player.metadata.currentWorld = currentWorld












class Rock extends Hitbox {
    constructor(x, y, type) {
        if(type === "small") {
            super(x+8, y+8, 48, 48)
            this.health = 500
        } else if (type === "medium") {
            super(x+8, y+8, 112, 112)
            this.health = 2000
        } else if (type === "large") {
            super(x-8, y-8, 64*3+16, 64*2+16)
            this.health = 5000
        }
        this.update = () => {

        }
        this.world = Player.metadata.currentWorld
        this.onBreak = () => {
            if(Math.random() < 0.25) {
                let r = Math.random()*100
                if(r < 20) { // Supply Chest

                } else if (r < 35) { // Enemy

                } else if (r < 45) { // Small Ore Vein

                } else if (r < 50) { // Big Ore Vein

                } else if (r < 55) { // Mine

                } else if (r < 60) { // Common Quest

                } else if (r < 62.5) { // Rare Quest

                } else if (r < 63) { // Legendary Quest

                }
                for(let y in this.world.metadata.rocks) {
                    if(this.world.metadata.rocks[y] === this) {
                        this.world.metadata.rocks.splice(y, 1)
                    }
                }
            }
            
        }
        //this.renderColor = "#543d35"
        document.addEventListener("mousedown", (e) => {
            if(overlapping({x: e.clientX, y: e.clientY, w: 1, h: 1}, this)) {
                
            }
        })
    }
}

/* 
    25% chance of output {
        20% Supply Chest
        25% Enemy
        10% Small Ore Vein
        5% Big Ore Vein
        5% Mine
        5% Common Quest
        2.5% Rare Quest
        0.5% Legendary Quest

    }
*/ 