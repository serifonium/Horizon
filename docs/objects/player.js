


var Player = {
    vx: 0,
    vy: 0,
    pos:v(64,64),
    w:64,
    h:64,

    rotation:32,
    vr:10,

    chunkPos:v(),
    id:newId(),
    loadup: () => {

    },
    speed: 3,
    metadata: {},
    config:{
        looseItem:true,
    },
    render: () => {
        ctx.fillStyle = "#222222"

        var pos = v((Player.pos.x+cx)*Zoom, (Player.pos.y+cy)*Zoom),
            dim = v(64*Zoom, 64*Zoom)

        ctx.save()
        ctx.translate(pos.x+(dim.x/2), pos.y+(dim.y/2))
        ctx.rotate(Player.rotation*(Math.PI/180))
        ctx.translate(-(pos.x+(dim.x/2)), -(pos.y+(dim.y/2)))

        ctx.fillRect(pos.x, pos.y, dim.x, dim.y)
        ctx.fillStyle = "#ff0000"

        ctx.fillRect(pos.x, pos.y, dim.x, 10)

        ctx.restore()
    }, update: () => {


        var movement = v(0,0)
        if (keys[keyCodes["w"]]) {
            movement.y += 1
        }
        if (keys[keyCodes["s"]]) {
            movement.y -= 1
        }
        if (keys[keyCodes["a"]]) {
            movement.x += 1
        }
        if (keys[keyCodes["d"]]) {
            movement.x -= 1
        }
        var angle = -getAngle(v(0,0), movement)+90,
            dst = Math.sign(getDistance(v(0,0), movement)),
            s = Player.speed*0.05*dst
            movement = v(cos(angle)*s,sin(angle)*s)

        Player.vx += movement.x
        Player.vy += movement.y

        Player.rotation += Player.vr
        Player.rotation = stopOverflow(Player.rotation)


        Player.vx *= 0.93
        Player.vy *= 0.93
        Player.vr *= 0.80


        var movementD = getAngle(v(0,0),v(Math.round(Player.vx),Math.round(-Player.vy))),
            movementS = getDistance(v(0,0),v(Math.round(Player.vx),Math.round(Player.vy)))

            Player.vr += Math.sign(angleDiff(movementD,Player.rotation))*(movementS/10)*((1-(Math.abs(angleDiff(movementD,Player.rotation))/180))*3)*5



        function getTile(x, y) {
            var tile = Player.metadata.currentWorld.grid.requestTile(Math.floor((x+32)/64), Math.floor((y+32)/64))
            
            return tile
        }
        Player.metadata.currentTile = getTile(Player.pos.x, Player.pos.y)

        if(getTile(Player.pos.x + Player.vx, Player.pos.y).type !== "s") {
            if(Player.metadata.currentTile.type === "shallowWater") Player.pos.x += Player.vx/2
            else Player.pos.x += Player.vx
        }
        if(getTile(Player.pos.x, Player.pos.y + Player.vy).type !== "s") {
            if(Player.metadata.currentTile.type === "shallowWater") Player.pos.y += Player.vy/2
            else Player.pos.y += Player.vy
        }
        
        
        cx = -((Player.pos.x+32) - window.innerWidth / 2 /Zoom)
        cy = -((Player.pos.y+32) - window.innerHeight/ 2/Zoom)




    }
}
prevChatMessage = ""
chatMessage = ""
chatOpen = false
debugActive = true
keyHistory = []
currentKeys = []

var keys = new Object(),
    keyCodes = {
        "w":87,
        "s":83,
        "a":65,
        "d":68,
    }
document.addEventListener("keydown", (e) => {
    let a = true
    for(let k of currentKeys) {
        if(k === e.key) {
            a = false
        }
    }
    keys[e.keyCode] = true
    console.log(e)
    if(!chatOpen) {
        if (a) {currentKeys.push(e.key)
            keyHistory.push(e.key)}
            /*
        if(e.key === "w") {
            
        } if(e.key === "s") {
        }
        if(e.key === "a") {
        } if(e.key === "d") {
        }*/
        if(e.key === "1") hotbarSelected = 0
        if(e.key === "2") hotbarSelected = 1
        if(e.key === "3") hotbarSelected = 2
        if(e.key === "4") hotbarSelected = 3
        if(e.key === "5") hotbarSelected = 4
        if(e.key === "6") hotbarSelected = 5
        if(e.key === "7") hotbarSelected = 6
        if(e.key === "8") hotbarSelected = 7
        if(e.key === "9") hotbarSelected = 8
        if(e.key === "0") hotbarSelected = 9
        if(e.key === "r") {
            if(selectedRotation < 3) selectedRotation++
            else selectedRotation = 0
        }
        if(e.key === "+") {if(Zoom+0.1 > 0.5 && Zoom+0.1 < 1.5) Zoom += 0.1}
        if(e.key === "-") {if(Zoom-0.1 > 0.5 && Zoom-0.1 < 1.5) Zoom += -0.1}
        if(e.key === "m") {
            if(mapOpen) mapOpen = false
            else mapOpen = true
        }
        
    }
    if(e.key === "upArrow") {
        
    }
    
   

    last = keyHistory.slice(-5).join("")
    if(last == "debug") {
        if(debugActive === false) debugActive = true
        else debugActive = false
    }

})
document.addEventListener("keyup", (e) => {
    for(let k in currentKeys) {
        if(currentKeys[k] === e.key) {
            currentKeys.splice(k, 1)
        }
    }
    if(e.key === "w" || e.key === "s") {
        //Player.vy = 0
    }
    if(e.key === "a" || e.key === "d") {
        //Player.vx = 0
    }
    keys[e.keyCode] = false
})