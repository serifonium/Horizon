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
},1000/60)
