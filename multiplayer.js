if(MODE === "multiplayer")  {
    const serverURL = "http://localhost:5001";
    const socket = io(serverURL, {
        withCredentials: false,
        origin: "*"
    })

    


    var multiplayers = []
    var ID = null
    var ids = {}
    askForUser()
    function askForUser() {
        var user = prompt("Please enter a username");
        if (user != null) {
            if (user == "" || user.length > 30) {
                alert("Username is too long or invaild")
                askForUser();
            } else {
                Player.name = user;
                //fconsole.log("..." + socket.id)
                socket.emit("onPlayerConnect", { name : user, x: Player.x, y: Player.y})
            }
        } else {
            askForUser()
        }
    
    }
    socket.emit("requestUniversalNotification", ({text: Player.name + " has joined the server.", time: 3000, colour: "#232e42"}))
    function sendUN(txt, time, colour) {
        socket.emit("requestUniversalNotification", ({text: txt, time: time, colour: colour}))

    }

    socket.on('reciveID', (id) => {
        ID = id
    })
    socket.on('createPlayer', (clientInfo, id) => {
        if(socket.id != id) {
            multiplayers.push(new Hitbox(clientInfo.x, clientInfo.y, 64, 64))
            multiplayers[multiplayers.length - 1].name = clientInfo.name
            multiplayers[multiplayers.length - 1].render = (m) => {
                ctx.fillStyle = "#aaaaaa"
                ctx.fillRect(m.x+cx, m.y+cy, m.w, m.h)
                ctx.font = "50px Arial"
                ctx.textAlign = "center"
                ctx.fillText(String(m.name), m.x+cx+m.w/2, m.y+cy - 30)
            }
            multiplayers[multiplayers.length - 1].id = id
            ids[id] = multiplayers[multiplayers.length - 1]
        }
    })
    socket.on('createExistingPlayers', (list) => {
        for (const prop in list) {
            const value = list[prop];
            console.log(value, socket.id)
            if(prop !== socket.id) {
                multiplayers.push(new Hitbox(value.x, value.y, 64, 64))
                multiplayers[multiplayers.length - 1].id = prop
                multiplayers[multiplayers.length - 1].name = value.name
                multiplayers[multiplayers.length - 1].render = (m) => {
                    ctx.fillStyle = "#aaaaaa"
                    ctx.fillRect(m.x+cx, m.y+cy, m.w, m.h)
                    ctx.font = "50px Arial"
                    ctx.textAlign = "center"
                    ctx.fillText(String(m.name), m.x+cx+m.w/2, m.y+cy - 30)
                }
            }
    
        }
    })
    socket.on("updateLocation", (pos) => {
        let player = null
        for(let t of multiplayers) {
            if(t.id === pos[2]) {
                player = t
            }
        }
        if(player !== null) {
            player.x = pos[0]
            player.y = pos[1]
        }
        
    })
    socket.on('requestPos', () => {
        socket.emit("sendPos", [Player.x, Player.y])
    })
    socket.on('removePlayer', (i) => {
        for(p in multiplayers) {
            let player = multiplayers[p]
            if(player.id === i) {
                multiplayers.splice(p, 1)
            }
        }
    })

    socket.on("universalNotification", (n) => {
        sendChatMsg(n.text, n.time, n.colour)
    })

    setInterval(() => {
        socket.emit("sendPos", [Player.x, Player.y])
    },1000/60)
}