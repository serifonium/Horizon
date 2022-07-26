class Train {
    constructor(wagons) {
        this.wagons = wagons;
        this.update = () => {
            
        }
        this.render = () => {
            for(let w of this.wagons) {
                ctx.fillStyle = "#aaaaaa"
                ctx.fillRect(w.x + 4+cx, w.y+cy, 128 - 8, 192)
            }
        }
        this.world = new World(23, 13, (w) => {
            function area(x1, y1, x2, y2, run) {
                for(let a = x1; a < x2; a++) {
                    for(let b = y1; b < y2; b++) {
                        let tile = w.grid[a][b]
                        run(a, b, tile)
                    }
                }
            }
            area(0, 0, w.width, w.height, (x, y, tile) => {tile.type = "void"})
            area(1, 1, w.width - 1, w.height - 1, (x, y, tile) => {tile.type = "metal"})
            area(8, 0, 15, 13, (x, y, tile) => {tile.type = "metal"})
            area(0, 5, 1, 8, (x, y, tile) => {tile.type = "metal"})
            
            w.metadata.hitboxes.push(new Hitbox(0*64, 5*64, 64, 3*64, (h) => {

            }, (h) => {
                if(overlapping({x:Player.x, y:Player.y, w: 1, h: 1}, h)) {
                    Player.metadata.currentWorld = currentWorld
                    Player.x = 96
                    Player.y = 96
                }
            }))

        })
        this.addNewWagon = () => {
            let wNum = this.wagons.length - 1
            this.wagons.push(new Wagon(this.wagons[wNum].x, this.wagons[wNum].y + 200, this, wNum + 1))
            let h = this.world.height
            this.world.height += 13

            let w = this.world
            function area(x1, y1, x2, y2, run) {
                for(let a = x1; a < x2; a++) {
                    for(let b = h+y1; b < h+y2; b++) {
                        run(a, b)
                    }
                }
            }
            area(0, 0, 23, 13, (x, y) => {
                w.grid[x].push(new Tile(x, y, "grass", w))
            })
            area(0, 0, w.width, 13, (x, y) => {
                let tile = w.grid[x][y]
                tile.type = "void"
            })
            area(1, 1, w.width - 1,13 - 1, (x, y) => {
                let tile = w.grid[x][y]
                tile.type = "metal"
            })
            area(8, 0, 15, 13, (x, y) => {
                let tile = w.grid[x][y]
                tile.type = "metal"
            })
            area(0, 5, 1, 8, (x, y) => {
                let tile = w.grid[x][y]
                tile.type = "metal"
            })
            this.world.metadata.hitboxes.push(new Hitbox(0, this.wagons[wNum].id*13*64+5*64, 64, 192, () => {}, (h) => {
                if(overlapping({x:Player.x, y:Player.y, w: 1, h: 1}, h)) {
                    Player.metadata.currentWorld = currentWorld
                    Player.x = 96
                    Player.y = 96
                }
            }))
        }
    }
}
class Wagon {
    constructor(x, y, t, id) {
        this.x = x
        this.y = y
        this.w = 128
        this.h = 192
        this.onClick = () => {
            Player.metadata.currentWorld = this.metadata.train.world
            Player.x = 112
            Player.y = 6*64 + this.metadata.id*64*13 + 32
        }
        this.metadata = {
            train: t,
            id: id
        }
        document.addEventListener("mousedown", (e) => {
            let x = e.clientX + cx
            let y = e.clientY + cy
            if(overlapping(this, {x:x,y:y,w:1,h:1})) {
                this.onClick()
                
            }
        })
        currentWorld.metadata.hitboxes.push(new Hitbox(this.x - 64, this.y, this.w + 128, this.h, () => {}, (h) => {
            if(overlapping({x:Player.x, y:Player.y, w: 1, h: 1}, h)) {
                if(currentKeys.includes("Enter")) {
                    this.onClick()
                }
            }
        }))
    }
}
//let placeholder = new Train([new Wagon(128, 192, undefined, 0)])
//placeholder.wagons[0].metadata.train = placeholder
//Player.metadata.currentWorld.metadata.trains.push(placeholder)