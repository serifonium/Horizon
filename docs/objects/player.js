


var Player = {
    vx: 0,
    vy: 0,
    pos:v(64,64),
    w:64,
    h:64,

    chunkPos:v(),
    id:newId(),
    loadup: () => {

    },
    speed: 20,
    metadata: {},
    config:{
        looseItem:true,
    },
    render: () => {
        ctx.fillStyle = "#222222"
        ctx.fillRect((Player.pos.x+cx)*Zoom, (Player.pos.y+cy)*Zoom, 64*Zoom, 64*Zoom)
    }, update: () => {
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
document.addEventListener("keydown", (e) => {
    let a = true
    for(let k of currentKeys) {
        if(k === e.key) {
            a = false
        }
    }
    //console.log(e.key)
    if(!chatOpen) {
        if (a) {currentKeys.push(e.key)
            keyHistory.push(e.key)}
        if(e.key === "w") {
            Player.vy = -Player.speed
        } if(e.key === "s") {
            Player.vy = Player.speed
        }
        if(e.key === "a") {
            Player.vx = -Player.speed
        } if(e.key === "d") {
            Player.vx = Player.speed
        }
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
        Player.vy = 0
    }
    if(e.key === "a" || e.key === "d") {
        Player.vx = 0
    }
})