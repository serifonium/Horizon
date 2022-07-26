if(MODE === "multiplayer")  {
    const serverURL = "http://localhost:5001";
    const socket = io(serverURL, {
        withCredentials: false,
        origin: "*"
    })

    var multiplayers = []
    console.log("yes")
    var ID = null
    var ids = {}

    socket.emit("onPlayerConnect", {x: Player.x, y: Player.y, name: "John"})
    socket.on('reciveID', (id) => {
        ID = id
    })
    socket.on('createPlayer', (clientInfo, id) => {
        multiplayers.push(new Hitbox(clientInfo.x, clientInfo.y, 64, 64))
        multiplayers[multiplayers.length - 1].render = (m) => {
            ctx.fillStyle = "#777777"
            ctx.fillRect(m.x+cx, m.y+cy, m.w, m.h)
        }
        multiplayers[multiplayers.length - 1].id = id
        ids[id] = multiplayers[multiplayers.length - 1]
    })
    socket.on("updateLocation", (pos) => {
        console.log("epic")
        let player = null
        for(let t of multiplayers) {
            if(t.id === pos.id) {
                player = t
            }
        }
        player.x = pos.x
        player.y = pos.y
    })
    function sendPos() {
        socket.emit("sendPos", {x: Player.x, y: Player.y, id: ID})
    }

    
}