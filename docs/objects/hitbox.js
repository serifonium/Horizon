class Hitbox {
    constructor(x, y, w, h, startup = () => {}, update = () => {}, rigid = false) {
        this.id = newId()
        this.pos = v(x, y)
        this.w = w
        this.h = h
        this.startup = startup  
        this.update = update
        this.debugRender = () => {
            if(debugActive) {
                ctx.fillStyle = this.renderColor
                ctx.fillRect((this.x+cx)*Zoom, (this.y+cy)*Zoom, this.w*Zoom, 4*Zoom)
                ctx.fillRect((this.x+cx)*Zoom, (this.y+cy)*Zoom+(h-4)*Zoom, this.w*Zoom, 4*Zoom)
                ctx.fillRect((this.x+cx)*Zoom+(w-4)*Zoom, (this.y+cy)*Zoom, 4*Zoom, this.h*Zoom)
                ctx.fillRect((this.x+cx)*Zoom, (this.y+cy)*Zoom, 4*Zoom, this.h*Zoom)
            }
        }
        this.rigid = rigid
        this.self = this
        if(this.startup !== undefined) {
            this.startup(this)
        }
        this.renderColor = "#44dd44"
        this.world = Player.metadata.currentWorld
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