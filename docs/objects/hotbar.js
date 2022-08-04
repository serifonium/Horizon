var hotbar = [
    "belt",
    "inserter",
    "chest",
    "assembly"
]
var hotbarSelected = 0
var selectedRotation = 0
var S = hotbar[hotbarSelected]
function renderHotbar() {
    ctx.fillStyle = "#222222"
    ctx.fillRect((window.innerWidth - 640), window.innerHeight - 16, 64*10, 16)
    S = hotbar[hotbarSelected]
    for(let i = 0; i < 10; i++) {
        if (hotbarSelected === i) ctx.fillStyle = "#8888ff"
        else ctx.fillStyle = "#888888"
        if(hotbar[i] === "belt") ctx.drawImage(Data.images.belt, (window.innerWidth - 640) + i*64, window.innerHeight - 80)
        if(hotbar[i] === "inserter") ctx.drawImage(Data.images.inserter, (window.innerWidth - 640) + i*64, window.innerHeight - 80)
        if(hotbar[i] === "chest") ctx.drawImage(Data.images.woodChest, (window.innerWidth - 640) + i*64, window.innerHeight - 80)
        if(hotbar[i] === "assembly") ctx.drawImage(Data.images.assembly, (window.innerWidth - 640) + i*64, window.innerHeight - 80, 64, 64)
        ctx.fillRect((window.innerWidth - 640) + i*64, window.innerHeight - 48, 4, 48)
        ctx.fillRect((window.innerWidth - 640) + (i+1)*64 - 4, window.innerHeight - 48, 4, 48)
        ctx.fillRect((window.innerWidth - 640) + i*64, window.innerHeight - 20, 64, 4)
    }
    let tx = Math.floor((hX - cx*Zoom)/Zoom / 64)
    let ty = Math.floor((hY - cy*Zoom)/Zoom / 64)
    ctx.globalAlpha = 0.6
    if(S === "belt") rotateimg(Data.images.belt, snap(hX-cx, 64)+cx, snap(hY-cy, 64)+cy, selectedRotation*90)
    if(S === "inserter") rotateimg(Data.images.inserter, snap(hX-cx, 64)+cx, snap(hY-cy, 64)+cy, selectedRotation*90-90);
    if(S === "chest") ctx.drawImage(Data.images.woodChest, snap(hX-cx, 64)+cx, snap(hY-cy, 64)+cy, Data.images.woodChest.width * Zoom, Data.images.woodChest.height * Zoom)
    if(S === "assembly") ctx.drawImage(Data.images.assembly, snap(hX-cx, 64)+cx, snap(hY-cy, 64)+cy, Data.images.assembly.width * Zoom, Data.images.assembly.height * Zoom)
    ctx.globalAlpha = 1
}
var hX = 0
var hY = 0
document.addEventListener("mousemove", (e) => {
    hX = e.clientX
    hY = e.clientY
    
    
})
document.addEventListener("mousedown", (e) => {
    let tx = Math.floor((e.clientX - cx*Zoom)/Zoom / 64)
    let ty = Math.floor((e.clientY - cy*Zoom)/Zoom / 64)
    let r = snap(e.clientX-cx, 64)
    let t = snap(e.clientY-cy, 64)
    console.log(v(r/64, t/64))
    let tileSelected = Player.metadata.currentWorld.grid.requestTile(tx, ty)
    if(hotbar[hotbarSelected] === 'belt') addBuild(Math.floor(tx), Math.floor(ty), new Belt(tx*64, ty*64, selectedRotation))
    if(hotbar[hotbarSelected] === 'inserter') addBuild(Math.floor(tx), Math.floor(ty), new Inserter(tx*64+16, ty*64+16, selectedRotation))
    if(hotbar[hotbarSelected] === 'chest') addBuild(Math.floor(tx), Math.floor(ty), new Chest(tx*64, ty*64))
    if(hotbar[hotbarSelected] === 'assembly') addBuild(Math.floor(tx), Math.floor(ty), new Assembly(tx*64, ty*64))
})