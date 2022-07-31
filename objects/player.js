


var Player = {
    vx: 0,
    vy: 0,
    x: 64,
    y: 64,
    loadup: () => {

    },
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
            Player.vy = -4
        } if(e.key === "s") {
            Player.vy = 4
        }
        if(e.key === "a") {
            Player.vx = -4
        } if(e.key === "d") {
            Player.vx = 4
        }
    }

    if(e.key === "K") {

    }
    if(!chatOpen) {
        if(e.key === "`") {
            chatOpen = true
        }
    } else if(MODE === "multiplayer"){
        if(e.key === "Backspace") {chatMessage = chatMessage.slice(0, -1)}
        else if (e.key === "Shift" || e.key === "Meta" || e.key === "Control" || e.key === "Tab") {}
        else if (e.key === "Enter") {
            sendUN(Player.name+": " + chatMessage, 3000, "#000000")
            chatMessage = ""
            chatOpen = false
        } else if (e.key === "Escape") {
            chatMessage = ""
            chatOpen = false
        }
        else chatMessage += e.key
        
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