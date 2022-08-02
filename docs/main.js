var prevTick = Date.now()
var tick = Date.now()
var loopTick = 0
setInterval(() => {
    prevTick = Date.now()
    document.getElementById("myCanvas").width = window.innerWidth
    document.getElementById("myCanvas").height = window.innerHeight
    Player.metadata.currentWorld.render()
    Player.metadata.currentWorld.update()
    Player.render()
    Player.update()
    if(debugActive) {
        ctx.fillStyle = "#ff9999"
        ctx.font = "40px Arial"
        ctx.fillText("Debug Active", 30, 30+40)
        
    }
    if(MODE === "multiplayer")  {
        for(let player of multiplayers) {
            if(player.render !== undefined) {
                player.render(player)
            } if(player.debugRender !== undefined) {
                player.debugRender(player)
            }
            
        }

        
    }
    for(let c in chat) {
        if(chat[c].timeLeft < 800) {
            ctx.globalAlpha = chat[c].timeLeft/800
        }
        if(!chatOpen) {
            ctx.fillStyle = chat[c].colour
            ctx.font = "24px Arial"
            ctx.textAlign = "left"
            ctx.fillText(chat[c].text, 20, window.innerHeight - 20 - c*30)
        }
        chat[c].timeLeft += (tick - prevTick)
        if(chat[c].timeLeft < 0) {
            chat.splice(c, 1)
        }
        ctx.globalAlpha = 1
    } if(chatOpen) {
        ctx.globalAlpha = 0.3
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, 30, window.innerHeight)
        ctx.globalAlpha = 1
        for(let c in chatHistory) {
            ctx.fillStyle = chatHistory[c].colour
            ctx.font = "24px Arial"
            ctx.textAlign = "left"
            ctx.fillText(chatHistory[c].text, 20, window.innerHeight - 120 - c*30)
        }
    }
    ctx.fillStyle = "#000000"
    ctx.textalign = "center"
    ctx.font = "24px Arial"
    ctx.fillText(chatMessage, 60, window.innerHeight - 20)
    renderHotbar()
    mapRender()

    tick = Date.now()
    loopTick++
},1000/60)
