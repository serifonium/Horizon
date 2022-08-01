


var Player = {
    vx: 0,
    vy: 0,
    x: 64,
    y: 64,
    loadup: () => {

    },
    speed: 3,
    metadata: {},
    render: () => {
        ctx.fillStyle = "#222222"
        ctx.fillRect(Player.x+cx, Player.y+cy, 64, 64)
    }, update: () => {
        function getTile(x, y) {
            return Player.metadata.currentWorld.grid[Math.floor(x/64)][Math.floor(y/64)]
        }
        Player.metadata.currentTile = getTile(Player.x, Player.y)
        if(getTile(Player.x + Player.vx, Player.y).type !== "void") Player.x += Player.vx
        if(getTile(Player.x, Player.y + Player.vy).type !== "void") Player.y += Player.vy

        if (Player.x < window.innerWidth / 2) {
            cx = 0
        } else if (Player.x > Player.metadata.currentWorld.width * 64 - window.innerWidth / 2) {
            cx = -(Player.metadata.currentWorld.width * 64 - window.innerWidth)
        } else {
            cx = -(Player.x - window.innerWidth / 2)
        }
        if (Player.y < window.innerHeight / 2) {
            cy = 0
        } else if (Player.y > Player.metadata.currentWorld.height * 64 - window.innerHeight / 2) {
            cy = -(Player.metadata.currentWorld.height * 64 - window.innerHeight)
        } else {
            cy = -(Player.y - window.innerHeight / 2)
        }
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