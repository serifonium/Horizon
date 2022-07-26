setInterval(() => {
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
        sendPos()
    }
},1000/60)
