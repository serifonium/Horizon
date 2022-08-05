class Hitbox {
    constructor(x, y, w, h, startup = () => {}, update = () => {}, rigid = false) {
        this.id = newId()
        this.pos = v(x, y)
        this.chunkPos = v(
            Math.floor(this.pos.x/64/Player.metadata.currentWorld.grid.options.rows),
            Math.floor(this.pos.y/64/Player.metadata.currentWorld.grid.options.columns)
        )
        this.w = w
        this.h = h
        this.id = newId()
        this.startup = startup  
        this.update = update
        this.debugRender = () => {
            if(debugActive) {
                ctx.fillStyle = this.renderColor
                ctx.fillRect((this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom, this.w*Zoom, 4*Zoom)
                ctx.fillRect((this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom+(h-4)*Zoom, this.w*Zoom, 4*Zoom)
                ctx.fillRect((this.pos.x+cx)*Zoom+(w-4)*Zoom, (this.pos.y+cy)*Zoom, 4*Zoom, this.h*Zoom)
                ctx.fillRect((this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom, 4*Zoom, this.h*Zoom)

                ctx.fillText(`${this.chunkPos.x},${this.chunkPos.y}`, (this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom)
            }
        }
        this.rigid = rigid
        this.self = this
        if(this.startup !== undefined) {
            this.startup(this)
        }
        this.renderColor = "#44dd44"
        this.world = Player.metadata.currentWorld

        this.tiles = [];
        this.getCurrentTile = ()=>{
            this.updateTiles()
            return this.tiles
        }
        this.updateTiles = ()=>{
            var tilePos = v(Math.floor(this.pos.x*64), Math.floor(this.pos.y/64)),
                tile = this.world.grid.requestTile(tilePos.x, tilePos.y)

            this.tiles.push(tile)
            var xC = (64-(this.pos.x%64)) < this.w,
                yC = (64-(this.pos.y%64)) < this.h

            if (xC) {
                this.tiles.push(this.world.grid.requestTile(tilePos.x+1, tilePos.y))
            }
            if (yC) {
                this.tiles.push(this.world.grid.requestTile(tilePos.x, tilePos.y+1))
            }
            if (xC && yC) {
                this.tiles.push(this.world.grid.requestTile(tilePos.x+1, tilePos.y+1))

            }
            
        }
    }
}

class Button {
    constructor(x, y, w, h, onClick) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.onClick = onClick
        document.addEventListener("mousedown", (e) => {
            if(overlapping(this, {x:e.clientX,y:e.clientY,w:1,h:1})) {
                this.onClick()
            }
        })
    }
}

class Inventory {
    constructor() {
        this.contents = []
        this.limit = 16
        this.stackSize
        this.addItem = (item) => {
            let itemsLeft = item.amount
            //
            for(let i in this.contents) {
                if(item.name === this.contents[i].name) {
                    if(this.contents[i].amount === this.stackSize) {

                    } else if(this.contents[i].amount < this.stackSize) {
                        if(this.contents[i].amount + itemsLeft <= this.stackSize) {
                            this.contents[i].amount += itemsLeft
                            return 0 
                        } else {
                            
                        }
                    }
                } else {
                    
                }
                
            }
            return itemsLeft
        }
    }
}