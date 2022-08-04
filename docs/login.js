document.addEventListener("keyDown", (e) => {
    if(e.key == "Enter") {

    }
})

const serverURL = "http://localhost:5001";
    const socket = io(serverURL, {
        withCredentials: false,
        origin: "*"
    })






function signup() {
    let user = document.getElementById("userup").value
    let pass = document.getElementById("passup").value
    socket.emit("sendDetails", { user : user, pass: pass})
    //console.log("called", user, pass)    
}

socket.on("")