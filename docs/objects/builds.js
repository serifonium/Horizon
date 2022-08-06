class TileObject {

}

class LogisticsNetwork {
    constructor() {
        this.stations = []
    }
}
class LogisticsStation extends Hitbox {
    constructor(x, y) {
        super(x, y, 2*64, 2*64, () => {}, () => {

        })
        let g = true
        this.world = Player.metadata.currentWorld
        this.contents = []
        
        for(let h of this.world.metadata.hitboxes) {
            //if(h.constuctor !== undefined) {
                if(h instanceof LogisticsStation) {
                    if(overlapping(this, {x:h.radius.x - h.radius.w/2, y:h.radius.y - h.radius.h/2, w: h.radius.w*2, h: h.radius.h*2})) {
                        this.network = h.network
                        g = false
                    }
                } 
            //}
        }
        if (g) {
            this.network = new LogisticsNetwork()
        }
        this.network.stations.push(this)
        
        this.radius = new Hitbox(x - 4*64, y - 4*64, 10*64, 10*64, () => {}, () => {

        })
        Player.metadata.currentWorld.metadata.hitboxes.push(this.radius)
        this.radius.renderColor = "#cccc00"
        
        
        this.robots = {
            total: 0,
            avalible: 0,
            maximum: 200
        }
        this.addRobot = (x) => {
            if(this.robots.total + x > this.robots.maximum) {
                if(this.robots.total == this.robots.maximum) {
                    return x
                } else {
                    let y = x - (this.robots.maximum - this.robots.total)
                    this.robots.total = this.robots.maximum
                    return y
                }
            } else {
                this.robots.total += x
                return 0
            }
        }
    }
}

class LogisticsChest extends Hitbox {
    constructor (x, y, t, arg) {
        super(x, y, 1*64, 1*64, () => {}, (t) => {
            if(t.type === "requester") {
                for(let b of t.station.contents) {
                    if(b.type === "supplier") {
                        for(let i of b.items) {
                            for(let l of t.requests) {
                                if(i.name == l.name) {

                                }
                            }
                        }
                    }
                }
            }
        })
        this.world = Player.metadata.currentWorld
        this.config = {}
        for(let h of this.world.metadata.hitboxes) {
            if(h instanceof LogisticsStation) {
                if(overlapping(this, h.radius)) {
                    h.contents.push(this)
                    this.station = h
                }
            } 
        }
        this.type = t
        this.items = []
        if (this.type === "supplier") {
            this.items = [
                {name:"test", amount: 3}
            ]
            this.renderColor = "#ff0000"
        } else if (this.type === "requester") {
            this.requests = [
                {name:"test", amount: 3}
            ]
            this.renderColor = "#0000ff"
        }
    }
}

class Assembly extends Hitbox {
    constructor(x, y, r) {
        super(x, y, 3*64, 3*64, () => {}, () => {
            this.tick = Date.now()
            if(!this.crafting) {
                for(let i of this.contents) {
                    for (let r of this.recipe.ing) {
                        if(i.name === r.name) {
                            if(i.amount >= r.amount) {
                                i.amount += -r.amount
                                this.crafting = true
                            }
                        }
                    }
                }
            } else {
                if(this.timeRemaining < 0) {
                    this.output = this.recipe.prod
                    this.crafting = false
                    this.timeRemaining = this.recipe.time
                } else {
                    this.timeRemaining += -(this.tick - this.lastTick)
                }
            }
            if(debugActive) {
                ctx.fillStyle = "#ffffff"
                ctx.fillText(String(this.recipe.prod[0].name), (this.pos.x+ this.w/2+cx)*Zoom, (this.pos.y+ this.h/2-30+cy)*Zoom)
                ctx.fillText(String(this.timeRemaining), (this.pos.x+ this.w/2+cx)*Zoom, (this.pos.y+ this.h/2+cy)*Zoom)
            }
            this.lastTick = Date.now()
        })
        this.tileObject = true

        this.rotation = r

        this.lastTick = Date.now()
        this.world = Player.metadata.currentWorld
        this.contents = []
        this.output = {name: "Iron Gear", amount: 1}
        this.recipe = Data.recipes.ironCog
        this.timeRemaining = 500
        this.crafting = false
        this.config = {}
        

        var iH = rotate(v(this.w/2, this.h/2), v(30+16, 10+16), this.rotation*90),
            oH = rotate(v(this.w/2, this.h/2), v(80+16, 10+16), this.rotation*90)


        this.inputHitbox = new Hitbox(this.pos.x+(iH.x-16), this.pos.y+(iH.y-16), 32, 32)
        this.outputHitbox = new Hitbox(this.pos.x+(oH.x-16), this.pos.y+(oH.y-16), 32, 32)
        



        this.render = () => {

            var img = Data.images.assembly,
                pos = v((this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom)
                
            rotateimg(img, pos.x, pos.y, this.rotation*90)

            this.inputHitbox.debugRender()
            this.outputHitbox.debugRender()
            //ctx.fillStyle = "#ffffff"
            //ctx.fillRect((this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom, this.width*Zoom, this.height*Zoom)
        }
        /*document.addEventListener("mousedown", (e) => {
            if(overlapping({x:(this.pos.x+cx)*Zoom,y:(this.pos.y+cy)*Zoom,w:this.width*Zoom,h:this.height*Zoom}, {x: e.clientX, y: e.clientY, w: 1, h: 1})) {
                
                console.log(this)
            }
        })*/
    }
}

class Item extends Hitbox {
    constructor(x, y, i, img) {
        super(x, y, 32, 32, () => {}, () => {
            let a = true
            for(let h of Player.metadata.currentWorld.metadata.hitboxes) {
                if(h instanceof Inserter) {
                    if (this === h.heldItem) {
                        a = false
                        this.vy = 0
                        this.vx = 0
                    }
                }
            }
            
            for(let h of Player.metadata.currentWorld.metadata.hitboxes) {
                if(h instanceof Belt && a === true) {
                    if(overlapping(this, h)) {
                        if(h.rotation === 0) {
                            this.vy = -1
                            a = false
                        } if(h.rotation === 1) {
                            this.vx = 1
                            a = false
                        } if(h.rotation === 2) {
                            this.vy = 1
                            a = false
                        } if(h.rotation === 3) {
                            this.vx = -1
                            a = false
                        }
                    }
                }
                if(h instanceof Assembly && a === true) {
                    if(overlapping(this, h)) {
                        let b = false
                        for(let i of h.recipe.ing) {
                            if(i.name === this.item.name) {
                                let c = true
                                for(let g of h.contents) {
                                    if(g.name === this.item.name && c) {
                                        c = false
                                        g.amount += 1
                                    } 
                                } 
                                if(c) h.contents.push(this.item)
    
                                for(let g in Player.metadata.currentWorld.metadata.hitboxes){
                                    if(Player.metadata.currentWorld.metadata.hitboxes[g] === this) {
                                        Player.metadata.currentWorld.metadata.hitboxes.splice(g, 1)
                                    }
                                }
                            }
                        }
                    }
                } if(h instanceof Chest && a === true) {
                    if(overlapping(this, h)) {
                        for(let i of h.contents) {
                            if(i.name === this.item.name) {
                                i.amount += this.item.amount
                            } else {
                                h.contents.push(this.item)
                            }
                            for(let g in Player.metadata.currentWorld.metadata.hitboxes){
                                if(Player.metadata.currentWorld.metadata.hitboxes[g] === this) {
                                    Player.metadata.currentWorld.metadata.hitboxes.splice(g, 1)
                                }
                            }
                        }
                    }
                }
                
            }
            function e() {}
            for(let h of this.world.metadata.hitboxes) {
                if(h instanceof Item) {
                    if(overlapping({x: this.pos.x+this.vx, y: this.pos.y+this.vy, w: 32, h:32}, h) && this !== h) {
                        let a = false
                        for(let i of this.world.metadata.hitboxes) {
                            if(i instanceof Inserter) if(i.heldItem == h) a = true
                        }
                        if(!a) {
                            this.vx = 0
                            this.vy = 0
                        }
                    }
                }
            }
            this.pos.x += this.vx
            this.pos.y += this.vy
            
        })
        this.vy = 0
        this.vx = 0
        this.world = Player.metadata.currentWorld
        this.renderColor = "#484848"
        this.item = i
        this.config = {
            looseItem:true,
        }
        this.render = () => {
            ctx.drawImage(img, (this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom, img.width*Zoom, img.height*Zoom)
        }
    }
}
/*
class Belt extends Hitbox {
    constructor(x, y, r) {
        super(x, y, 64, 64, () => {}, () => {
           
        })
        this.world = Player.metadata.currentWorld
        this.rotation = r
        this.config = {}
        this.render = () => {
            let a = r*90
            rotateimg(Data.images.belt, (this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom, a)
        }
        
            0
        3       1
            2
        
    }
}*/

class Belt extends Hitbox {
    constructor(t, r) {
        super(t.pos.x*64, t.pos.y*64, 64, 64)

        this.tileObject = true

        this.tile = t
        this.rotation = r
        this.update = () => {
            var chunks = Player.metadata.currentWorld.grid.requestChunks(this.chunkPos.x-1, this.chunkPos.y, 1, 1),
                chunkMobiles = Player.metadata.currentWorld.grid.getMobiles(chunks).mobs

                for (let i = 0; i < chunkMobiles.length; i++) {
                const mob = chunkMobiles[i];
                if (mob.config.looseItem) {
                    if (overlapping(mob, this) && mob.id != this.id && !mob.captured) {
                        
                        var beltMovementStr = 0

                        if (this.rotation%2==0) {
                            var a = ((this.pos.x+(this.w/2))-(mob.pos.x+(mob.w/2)))/32
                            mob.pos.x += a
                            beltMovementStr += a

                        } else {
                            var a = ((this.pos.y+(this.h/2))-(mob.pos.y+(mob.h/2)))/32
                            mob.pos.y += a
                            beltMovementStr += a

                        }
                        beltMovementStr = 1-((Math.abs(beltMovementStr)*0.6667))

                        var movement = [
                            v(0, -1),
                            v(1, 0),
                            v(0, 1),
                            v(-1, 0)
                        ][this.rotation]
                        
                        mob.pos.x += movement.x * beltMovementStr
                        mob.pos.y += movement.y * beltMovementStr

                    }
                }
            }
        }; this.render = () => {
            rotateimg(Data.images.belt, this.tile.pos.x*64+cx, this.tile.pos.y*64+cy, this.rotation*90)
        }
    }
}

class Inserter extends Hitbox {
    constructor(x, y, r) {
        var d = [v(32, 128), v(128, 32)][r%2]
        super(x, y, d.x, d.y, () => {}, () => {
            var chunks = Player.metadata.currentWorld.grid.requestChunks(this.chunkPos.x-2, this.chunkPos.y-1, 3, 3),
                chunkMobiles = Player.metadata.currentWorld.grid.getMobiles(chunks).mobs

            if(this.heldItem === undefined) {

                var inputTiles = this.recivingHitbox.getCurrentTile()
                for (let i = 0; i < inputTiles.length; i++) {
                    const iT = inputTiles[i];

                    if (iT.buildObject instanceof Chest) {
                        if(iT.buildObject.output !== undefined) {
                            let e = new Item(this.recivingHitbox.pos.x, this.recivingHitbox.pos.y, iT.buildObject.output, Data.images.ironPlate)
                            addBuild(e.chunkPos.x, e.chunkPos.y, e)
                            this.heldItem = e
                            this.heldItem.captured = true
                            iT.buildObject.output = undefined
                        }
                    }
                }
                if (this.heldItem == undefined) {
                    for (let i = 0; i < chunkMobiles.length; i++) {
                        const mob = chunkMobiles[i];
                        if (overlapping(mob, this.recivingHitbox)) console.log("catch")
                        if (mob.config.looseItem && overlapping(mob, this.recivingHitbox)) {
                            this.heldItem = mob
                            this.heldItem.captured = true
                            break
                        }
                    }
                }

                

/*
                let a = true
                
                for(let h of chunkMobiles) {

                    if(h instanceof Assembly && a === true) {

                        if(overlapping(this.recivingHitbox, h)) {
                            if(h.output !== undefined) {
                                let e = new Item(this.recivingHitbox.x, this.recivingHitbox.y, h.output, Data.images.ironPlate)
                                addBuild(e)
                                this.heldItem = this.world.metadata.hitboxes[this.world.metadata.hitboxes.length-1]
                                h.output = undefined
                            }
                        }
                    }
                    if(h instanceof Chest && a === true) {

                        if(overlapping(this.recivingHitbox, h)) {
                            if(h.output !== undefined) {
                                let e = new Item(this.recivingHitbox.pos.x, this.recivingHitbox.pos.y, h.output, Data.images.ironPlate)
                                addBuild(e.chunkPos.x, e.chunkPos.y, e)
                                this.heldItem = e
                                h.output = undefined
                            }
                        }
                    }
                }
            } else {
                
                

            }
            */
            } else {
                if(!overlapping(this.heldItem, this)) {
                    delete this.heldItem.captured
                    this.heldItem = undefined
                } else {

                    if(this.rotation === 0) {
                            this.heldItem.pos.y += -3
                    } else if(this.rotation === 1) {
                        
                            this.heldItem.pos.x += 3
                        
                    }  else if(this.rotation === 2) {
                        
                            this.heldItem.pos.y += 3
                        
                    }  else if(this.rotation === 3) {
                        
                            this.heldItem.pos.x += -3
                        
                    }


                    var outputTiles = this.outputHitbox.getCurrentTile()
                    for (let i = 0; i < outputTiles.length; i++) {
                        const oT = outputTiles[i];
                        if (oT.buildObject instanceof Assembly) {
                            if (overlapping(oT.buildObject.inputHitbox, this.outputHitbox)) {
                                if (overlapping(this.heldItem, this.outputHitbox)) {
                                    addItemToContainer(oT.buildObject, this.heldItem.item, 1)
                                    Player.metadata.currentWorld.grid.removeMob(this.heldItem.chunkPos.x, this.heldItem.chunkPos.y, this.heldItem)
                                    delete this.heldItem.captured
                                    this.heldItem = undefined
                                }
                            }
                        }
                    }
                }
            }
        })
        this.heldItem = undefined
        this.world = Player.metadata.currentWorld
        this.rotation = r
        this.config = {}

        var ioHitboxs = 64

        if(this.rotation === 0) {
            this.recivingHitbox = new Hitbox(this.pos.x, this.pos.y + ioHitboxs, 32, 32)
            Player.metadata.currentWorld.metadata.hitboxes.push(this.recivingHitbox)
            this.recivingHitbox.renderColor = "#cccc00"
            this.outputHitbox = new Hitbox(this.pos.x, this.pos.y - ioHitboxs, 32, 32)
            Player.metadata.currentWorld.metadata.hitboxes.push(this.outputHitbox)
            this.outputHitbox.renderColor = "#00cccc"
        } if(this.rotation === 1) {
            this.recivingHitbox = new Hitbox(this.pos.x - ioHitboxs, this.pos.y, 32, 32)
            Player.metadata.currentWorld.metadata.hitboxes.push(this.recivingHitbox)
            this.recivingHitbox.renderColor = "#cccc00"
            this.outputHitbox = new Hitbox(this.pos.x + ioHitboxs, this.pos.y, 32, 32)
            Player.metadata.currentWorld.metadata.hitboxes.push(this.outputHitbox)
            this.outputHitbox.renderColor = "#00cccc"
        } if(this.rotation === 2) {
            this.recivingHitbox = new Hitbox(this.pos.x, this.pos.y - ioHitboxs, 32, 32)
            Player.metadata.currentWorld.metadata.hitboxes.push(this.recivingHitbox)
            this.recivingHitbox.renderColor = "#cccc00"
            this.outputHitbox = new Hitbox(this.pos.x, this.pos.y + ioHitboxs, 32, 32)
            Player.metadata.currentWorld.metadata.hitboxes.push(this.outputHitbox)
            this.outputHitbox.renderColor = "#00cccc"
        } if(this.rotation === 3) {
            this.recivingHitbox = new Hitbox(this.pos.x + ioHitboxs, this.pos.y, 32, 32)
            Player.metadata.currentWorld.metadata.hitboxes.push(this.recivingHitbox)
            this.recivingHitbox.renderColor = "#cccc00"
            this.outputHitbox = new Hitbox(this.pos.x - ioHitboxs, this.pos.y, 32, 32)
            Player.metadata.currentWorld.metadata.hitboxes.push(this.outputHitbox)
            this.outputHitbox.renderColor = "#00cccc"
        }

        d = [v(0, -32), v(-64, 0),v(0, -64), v(-32, 0)][r]
        this.pos.x += d.x
        this.pos.y += d.y

        this.render = () => {
            let a = (this.rotation * 90 -90)//+(((new Date().getTime()%1000)/1000)*360),
                ctx = canvas.getContext('2d');  

            //rotateimg(Data.images.inserter, (this.pos.x+cx-(this.w/2))*Zoom, (this.pos.y+cy)*Zoom, a)
            var img = Data.images.inserter

            ctx.save();  

            var pos = v(this.pos.x+cx + (-img.width/2) + (this.w/2), this.pos.y+cy + (-img.height/2) + (this.h/2))
            
            ctx.translate(img.width * 0.5  + (pos.x), img.height * 0.5  + (pos.y));  
            ctx.rotate(DegToRad(a));  
            ctx.translate(-(img.width * 0.5  + (pos.x)), -(img.height * 0.5 + (pos.y)));  
            
            ctx.drawImage(img, pos.x, pos.y, img.width, img.height);  
            ctx.restore();   
        }
    }
}

class Chest extends Hitbox {
    static stackSize = 50
    static chestSize = 15
    constructor(x, y) {

        super(x, y, 64, 64, () => {}, () => {
            for(let i in this.contents) {
                if(this.contents[i].amount === 0) {
                    this.contents.splice(i, 1)
                } else if(this.output === undefined) {
                    this.output = {name: this.contents[i].name, amount: 1}
                    this.contents[i].amount += -1
                }
                
            }
            if(debugActive) {
                ctx.fillStyle = "#ffffff"
                ctx.fillText(String(this.contents[0].amount), (this.pos.x+ this.w/2-27+cx)*Zoom, (this.pos.y+ this.h/2+cy)*Zoom)
            }
        })

        this.tileObject = true

        this.world = Player.metadata.currentWorld
        this.contents = [
            {name: "Iron", amount: 10000}
        ]
        this.output = {name: "Iron", amount: 1}
        this.config = {}

        this.addItem = (item) => {
            let itemsLeft = item.amount
            //
            for(let i in this.contents) {
                if(item.name === this.contents[i].name) {
                    if(this.contents[i].amount === Chest.stackSize) {

                    }
                } else {
                    
                }
                
            }
            return itemsLeft
        }
        this.render = () => {
            ctx.drawImage(Data.images.woodChest, (this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom, Data.images.woodChest.width*Zoom, Data.images.woodChest.height*Zoom)
        }
    }
}

class Fabricator extends Hitbox {
    constructor(x, y) {
        super(x, y, 2*64, 2*64)
        this.render = () => {ctx.drawImage(Data.images.fabricator, (this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom, Data.images.fabricator.width*Zoom, Data.images.fabricator.height*Zoom)}
    }
}
class StorageTank extends Hitbox {
    constructor(x, y) {
        super(x, y, 3*64, 3*64)
        this.render = () => {ctx.drawImage(Data.images.storageTank, (this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom, Data.images.storageTank.width*Zoom, Data.images.storageTank.height*Zoom)}
    }
}
class WaterCollector extends Hitbox {
    constructor(x, y) {
        super(x, y, 1*64, 2*64)
        this.contents = {name: "water", amount: 100}
        this.update = () => {
            this.contents.amount = 100
        }; this.render = () => {
            ctx.drawImage(Data.images.waterCollector, (this.pos.x+cx)*Zoom, (this.pos.y+cy)*Zoom)
        }
    }
}
class PipeNetwork {
    constructor() {

    }
}
class Pipe extends Hitbox {
    constructor(x, y, r) {
        super(x, y, 1*64, 1*64)
        this.world = Player.metadata.currentWorld
        this.rotation = r
        this.render = () => {
            rotateimg(Data.images.pipe, this.pos.x+cx, this.pos.y+cy, this.rotation*90)
        }
        //this.update()
        this.network = undefined
    }
    checkNetwork() {
        var compass = {
            up: v(this.pos.x, this.pos.y-1),
            down: v(this.pos.x, this.pos.y+1),
            left: v(this.pos.x-1, this.pos.y),
            right: v(this.pos.x+1, this.pos.y),
        }
        function checkOverlap(pos, p) {
            return p.world.grid.requestChunk(Math.floor(pos.x/320), Math.floor(pos.y/320))
        }
        let up = checkOverlap(compass.up, this)
        return (up)
    }
}



/*
for (let i = 3; i < 10; i++) {addBuild(new Belt(5*64, i*64, 0))}
for (let i = 4; i < 8; i++) {addBuild(new Belt(7*64, i*64, 2))}
for (let i = 2; i < 8; i++) {addBuild(new Belt(8*64, i*64, 0))}
addBuild(new Belt(5*64, 2*64, 1))
addBuild(new Inserter(6*64+16, 4*64+16, 1))

addBuild(new Item(340, 350, {name: "Iron", amount: 1}, Data.images.ironPlate))
addBuild(new Item(340, 300, {name: "Iron", amount: 1}, Data.images.ironPlate))
addBuild(new Assembly(6*64, 9*64))
addBuild(new Inserter(7*64+16, 8*64+16, 2))
addBuild(new Inserter(8*64+16, 8*64+16, 0))

addBuild(new Chest(5*64, 11*64))
addBuild(new Inserter(5*64+16, 10*64+16, 0))

addBuild(new Chest(8*64, 0*64))
addBuild(new Inserter(8*64+16, 1*64+16, 0))
*/
function addBuild(x, y, b) {
    if (b.tileObject) {
        var tilePos = v(b.pos.x/64, b.pos.y/64),
            dim = v(b.w/64, b.h/64),

            emptySpace = true

        for (let x = 0; x < dim.x && emptySpace; x++) {
            for (let y = 0; y < dim.y && emptySpace; y++) {
                var tile = Player.metadata.currentWorld.grid.requestTile(tilePos.x+x, tilePos.y+y)
                if (tile.buildObject != undefined) {
                    emptySpace = false
                }
            }            
        }

        if (emptySpace) {
            for (let x = 0; x < dim.x && emptySpace; x++) {
                for (let y = 0; y < dim.y && emptySpace; y++) {
                    var tile = Player.metadata.currentWorld.grid.requestTile(tilePos.x+x, tilePos.y+y)
                    tile.buildObject = b
                    tile.buildSection = v(x, y)
                }            
            }
        }

        console.log(Player.metadata.currentWorld.grid.requestTile(tilePos.x, tilePos.y))

        
    } else {
        let overlap = false /*
        for(let h of Player.metadata.currentWorld.metadata.hitboxes) {
            if(overlapping(h, {x:x.x, y:x.y, w:x.y-1, h:x.h-1})) overlap = true
        } */
        var cd = Player.metadata.currentWorld.grid
        if(!overlap) cd.insertMob(Math.floor(x), Math.floor(y), b)
    }
}
function fetchMobiles() {
    Player.metadata.currentWorld.grid
}

