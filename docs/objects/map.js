var mapOpen = false

function mapRender() {
    if(mapOpen) {
        let sx = window.innerWidth/2 
        let sy = window.innerHeight/2
        /*
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
        }
        */
       
       var chunkMaps = Player.metadata.currentWorld.grid.chunkMaps,
            time = Math.floor(new Date().getTime()/10)%360



        for (let i = 0; i < Object.keys(chunkMaps).length; i++) {
            var mapKey = Object.keys(chunkMaps)[i],
                map = chunkMaps[mapKey],
                array = map.array

            if (array instanceof Array) {

                for (let chunkx = 0; chunkx < array.length; chunkx++) {
                    const row = array[chunkx];
                    if (row instanceof Array) {

                        for (let chunky = 0; chunky < row.length; chunky++) {
                            var chunk = row[chunky]

                            if (!!chunk) {
                                var grid = chunk.grid

                                for (let x = 0; x < grid.length; x++) {
                                    const gridRow = grid[x];
                                    for (let y = 0; y < gridRow.length; y++) {
                                        const tile = gridRow[y];
                                        
                                        var zV = Math.random()*50

                                    

                                        
                                        ctx.fillStyle = {
                                            grass:`rgb(${zV}, 255, ${zV})`,
                                            water:`rgb(${zV},${zV},255)`,
                                            wasteland:`rgb(255,${zV},${zV})`,
                                        }[chunk.grid[x][y].type]

                                        var mts = 2
                                        
                                        ctx.fillRect(sx + (tile.pos.x*mts), sy + (tile.pos.y*mts), mts, mts)
                                        
                                        if (tile.buildObject) {
                                            ctx.fillStyle = "#000"
                                            ctx.fillRect(sx + (tile.pos.x*mts), sy + (tile.pos.y*mts), (tile.buildObject.w/64)*mts, (tile.buildObject.h/64)*mts)
                                        }
                                        
                                
                                    }
                                }

                                

                            }


                            
                        }
                    }
                }
            }
            
        }
       
        /*
        for(let h of Player.metadata.currentWorld.metadata.hitboxes) {
            ctx.fillStyle = "#444444"
            if(h instanceof Enemy || h instanceof Hive) ctx.fillStyle = "#ff4444"

            if(h.type != "spawnArea") {
                ctx.fillRect(sx+h.x/16,sy+h.y/16, h.w/16, h.h/16)
            }
        }*/

        ctx.strokeStyle = "#000"
        ctx.strokeRect(sx+(Player.pos.x/32),sy+(Player.pos.y/32), 64/16, 64/16)
    }
}