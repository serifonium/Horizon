var mapOpen = false

function mapRender() {
    if(mapOpen) {
        let sx = window.innerWidth/2 - Player.metadata.currentWorld.width*2
        let sy = window.innerHeight/2 - Player.metadata.currentWorld.height*2
        for(let x in Player.metadata.currentWorld.grid) {
            for(let y in Player.metadata.currentWorld.grid[x]) {
                if(Player.metadata.currentWorld.grid[x][y].type === "grass") ctx.fillStyle = "#00ff00"
                ctx.fillRect(sx + x*4, sy + y*4, 4.5, 4.5)
            }
        }
        for(let h of Player.metadata.currentWorld.metadata.hitboxes) {
            ctx.fillStyle = "#444444"
            if(h instanceof Enemy || h instanceof Hive) ctx.fillStyle = "#ff4444"

            if(h.type != "spawnArea") {
                ctx.fillRect(sx+h.x/16,sy+h.y/16, h.w/16, h.h/16)
            }
        }

        ctx.fillStyle = "ffffff"
        ctx.fillRect(sx+Player.x/16,sy+Player.y/16, 64/16, 64/16)
    }
}