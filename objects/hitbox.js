class Hitbox {
    constructor(x, y, w, h, startup = () => {}, update = () => {}, rigid = false) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.startup = startup  
        this.update = update
        this.debugRender = () => {
            if(debugActive) {
                ctx.fillStyle = this.renderColor
                ctx.fillRect(this.x+cx, this.y+cy, this.w, 4)
                ctx.fillRect(this.x+cx, this.y+h-4+cy, this.w, 4)
                ctx.fillRect(this.x+w-4+cx, this.y+cy, 4, this.h)
                ctx.fillRect(this.x+cx, this.y+cy, 4, this.h)
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