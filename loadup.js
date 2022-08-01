var MODE = "singleplayer" /*"multiplayer"*/
var Data = {
    images: {},
}





Data.titles = ["Can You Feel My Heart",
"Version 2",
"Subscribe to serifonium on twitch.tv",
"If you can see this, you have been in a coma for the past 14 years, we miss you.",
"serifonium's dm's are open...",
"we did it everyone, we broke the bad",
"(trigger warning: vikings)",
"all publicity is good publicity",
"THE RISE OF THE VIKINGS!!!!1!1!1!",
"lmao no title today, #owned"]

document.title = "Horizon: " + Data.titles[Math.floor(Math.random()*Data.titles.length)]

function addImg(src, directory = "") {
    Data.images[src] = new Image()
    Data.images[src].src = "./imgs/"+directory+src+".png"
}
Data.recipes = {
    ironCog: {
        ing: [{name: "Iron", amount: 2}],
        prod: [{name: "Iron Gear", amount: 1}],
        time: 500
    },
}
    

addImg("grass")
addImg("rail")
addImg("metal")
addImg("assembly")
addImg("belt")
addImg("woodChest")
addImg("inserter")
//addImg("grass")
addImg("ironPlate", "items/")


function overlapping(obj1, obj2) {
    // Check x and y for overlap
    if (obj2.x > obj1.w + obj1.x || obj1.x > obj2.w + obj2.x || obj2.y > obj1.h + obj1.y || obj1.y > obj2.h + obj2.y) {
        return false;
    }
    return true;
}
//function hitboxesInArea(x1, y1)
function DegToRad(d)  
{  
    // Converts degrees to radians  
    return d * 0.01745;  
}  
  
angle = 0
function rotateimg(img, x, y, angle)  
{  
    // Each loop we rotate the image  

    var surfacesurfaceContext = canvas.getContext('2d');  

    // Clear the canvas to White  
    // Save the current context  
    surfacesurfaceContext.save();  
    // Translate to the center point of our image  
    surfacesurfaceContext.translate(img.width * 0.5 + x, img.height * 0.5 + y);  
    // Perform the rotation  
    surfacesurfaceContext.rotate(DegToRad(angle));  
    // Translate back to the top left of our image  
    surfacesurfaceContext.translate(-img.width * 0.5 - x, -img.height * 0.5 - y);  
    // Finally we draw the image 
    surfacesurfaceContext.drawImage(img, x, y);  
    // And restore the context ready for the next loop  
    surfacesurfaceContext.restore();   
} 
var cx = 0
var cy = 0


function loop(x, fct, args = []) {
    for(let a = 0; a < x; a++) (
        fct(x, args)
    )
}





function x(x) {
    
}

var InterfaceOpen = null