var hotbar = [
    "belt"
]
var hotbarSelected = 0
var selectedRotation = 0
function renderHotbar() {
    ctx.fillStyle = "#222222"
    ctx.fillRect((window.innerWidth - 640), window.innerHeight - 16, 64*10, 16)
    for(let i = 0; i < 10; i++) {
        if (hotbarSelected === i) ctx.fillStyle = "#8888ff"
        else ctx.fillStyle = "#888888"
        if(hotbar[i] === "belt") ctx.drawImage(Data.images.belt, (window.innerWidth - 640) + i*64, window.innerHeight - 80)
        ctx.fillRect((window.innerWidth - 640) + i*64, window.innerHeight - 48, 4, 48)
        ctx.fillRect((window.innerWidth - 640) + (i+1)*64 - 4, window.innerHeight - 48, 4, 48)
        ctx.fillRect((window.innerWidth - 640) + i*64, window.innerHeight - 20, 64, 4)
    }
}

document.addEventListener("mousedown", (e) => {
    let tx = Math.floor((e.clientX - cx) / 64)
    let ty = Math.floor((e.clientY - cy) / 64)
    let tileSelected = Player.metadata.currentWorld.grid[tx][ty]
    if(hotbar[hotbarSelected] === 'belt') addBuild(new Belt(tx*64, ty*64, selectedRotation))
    if(hotbar[hotbarSelected] === 'belt') addBuild(new Belt(tx*64, ty*64, selectedRotation))
    if(hotbar[hotbarSelected] === 'belt') addBuild(new Belt(tx*64, ty*64, selectedRotation))
})