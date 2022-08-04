var mapOpen = false

function mapRender() {
    if(mapOpen) {
        let sx = window.innerWidth/2 
        let sy = window.innerHeight/2
        for(let i = 0; i < 4; i++) {
            let o = ["x1y1array", "x0y1array", "x1y0array", "x0y0array"]
            for(let e in Player.metadata.currentWorld.grid.chunkMaps[o[i]].array) {
                for(let t in Player.metadata.currentWorld.grid.chunkMaps[o[i]].array[e]) {
                    let chunk = Player.metadata.currentWorld.grid.chunkMaps[o[i]].array[e][t]
                    if (chunk !== undefined  && chunk !== null) {
                        for(let x in chunk.grid) {
                            for(let y in chunk.grid[x]) {
                                if(chunk.grid[x][y].type === "grass") ctx.fillStyle = "#00ff00"
                                if(chunk.grid[x][y].type === "water") ctx.fillStyle = "#0000ff"
                                if(chunk.grid[x][y].type === "wasteland") ctx.fillStyle = "#ff0000"
                                let _x = x
                                let _y = y
                                if(i === 1 ||i === 3) _x = _x*-1
                                if(i === 2 ||i === 3) _y = _y*-1
                                ctx.fillRect(sx + _x*2 + chunk.pos.x*10, sy + _y*2 + chunk.pos.y*10, 2.5, 2.5)
                            }
                        }
                    }
                }
            }
        }/*
        for(let h of Player.metadata.currentWorld.metadata.hitboxes) {
            ctx.fillStyle = "#444444"
            if(h instanceof Enemy || h instanceof Hive) ctx.fillStyle = "#ff4444"

            if(h.type != "spawnArea") {
                ctx.fillRect(sx+h.x/16,sy+h.y/16, h.w/16, h.h/16)
            }
        }*/

        ctx.fillStyle = "ffffff"
        ctx.fillRect(sx+Player.x/32,sy+Player.y/32, 64/32, 64/32)
    }
}