var chat = []
var chatHistory = []

function sendChatMsg(txt, time, colour) {
    chat.unshift({text: txt, timeLeft: time, colour: colour})
    chatHistory.unshift({text: txt, timeLeft: time, colour: colour})
    Data.sfx.chatMSG.play()
}

sendChatMsg("Welcome to Horizon!", 1200, "#3333ff")
sendChatMsg("Any requests/bug reports should be sent to me via: github.com/serifonium", 1200, "#3333ff")

document.addEventListener("keydown", (e) => {
    if(!chatOpen) {
        if(e.key === "`") {
            chatOpen = true
        }
    } else {
        if(e.key === "Backspace") {chatMessage = chatMessage.slice(0, -1)}
        else if (e.key === "Shift" || e.key === "Meta" || e.key === "Control" || e.key === "Tab") {}
        else if (e.key === "Enter") {
            if(chatMessage.charAt(0) === "/") {
                let command = chatMessage.replace('/','');
                let commandSplit = command.split(" ")
                if(command === "debug") {
                    if(debugActive) debugActive = false
                    else debugActive = true
                } else if (chatMessage.substr(1, 4) === "give") {
                    console.log(commandSplit)
                } else if (chatMessage.substr(1, 5) === "speed") {
                    Player.speed = Number(command.replace(chatMessage.substr(1, 6),''))
                    sendChatMsg("Set player's speed to " + Player.speed, 1800, "#ff0000")
                } else if (chatMessage.substr(1, 9) === "evolution") {
                    command = command.replace(chatMessage.substr(1, 9),'')
                    if (command.includes("setSpeed")) {
                        command = command.replace("setSpeed",'')
                        Evolution.enemySpeed = Number(command)
                    } 
                } else if (commandSplit[0] === "tech") {
                    for (const property in Data.reasearch) {
                        if(String(property) === commandSplit[1]) {
                            Data.reasearch[property].onCompletion()
                        }
                    }
                } else if (commandSplit[0] === "tp") {
                    Player.x = commandSplit[1]*64
                    Player.y = commandSplit[2]*64
                    sendChatMsg("Set player's position to " + Player.x + ", Player.y", 1800, "#ff0000")
                } else if (commandSplit[0] === "summon") {
                    if(commandSplit[1] === "enemy") {
                        Player.metadata.currentWorld.metadata.hitboxes.push(new Enemy(Player.x, Player.y, Player.metadata.currentWorld))
                        sendChatMsg("Summoned Enemy", 1800, "#ff0000")
                    }
                } else if (commandSplit[0] === "sfx") {
                    for(let a in Data.sfx) {
                        if(String(a) === commandSplit[1]) {
                            Data.sfx[a].play()
                        }
                    }
                }
            } else {
                sendUN(Player.name+": " + chatMessage, 3000, "#000000")
                
                
            }
            prevChatMessage = chatMessage
            chatMessage = ""
            chatOpen = false
            
        } else if (e.key === "Escape") {
            chatMessage = ""
            chatOpen = false
        }
        else chatMessage += e.key
        
    }
    if(e.key === "ArrowUp") {
        chatOpen = true
        chatMessage = prevChatMessage
    }
})