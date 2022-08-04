var MODE = "singleplayer" /*"multiplayer"*/
var Data = {
    images: {},
}

var Zoom = 1



Data.titles = ["Can You Feel My Heart",
"Version 2",
"Subscribe to serifonium on twitch.tv",
"If you can see this, you have been in a coma for the past 14 years, we miss you.",
"serifonium's dm's are open...",
"we did it everyone, we broke the bad",
"(trigger warning: vikings)",
"all publicity is good publicity",
"THE RISE OF THE VIKINGS!!!!1!1!1!",
"lmao no title today, #owned",
"hexagons coming soon..."]

document.title = "Horizon: " + Data.titles[Math.floor(Math.random()*Data.titles.length)]

function addImg(src, directory = "") {
    Data.images[src] = new Image()
    Data.images[src].src = "./docs/imgs/"+directory+src+".png"
}
Data.recipes = {
    ironCog: {
        ing: [{name: "Iron", amount: 2}],
        prod: [{name: "Iron Gear", amount: 1}],
        time: 500
    },
}
Data.fRecipes = {
    "Transport Belt": {
        ing: [{name: "Iron", amount: 10}, {name: "Iron Gear", amount: 10}],
        prod: [{name: "Transport Belt", amount: 20}],
        time: 12000
    }, "Inserter": {
        ing: [{name: "Iron", amount: 5}, {name: "Iron Gear", amount: 3}, {name: "Electronic", amount: 1}],
        prod: [{name: "Inserter", amount: 5}],
        time: 5000
    }, "Chest": {
        ing: [{name: "Wood", amount: 5}],
        prod: [{name: "Chest", amount: 1}],
        time: 1000
    }, "Landfill": {
        ing: [{name: "Stone", amount: 50}],
        prod: [{name: "Landfill", amount: 3}],
        time: 1000
    }, "Wall": {
        ing: [{name: "Stone", amount: 100}],
        prod: [{name: "Wall", amount: 5}],
        time: 5000
    }, "Turret": {
        ing: [{name: "Iron", amount: 15},{name: "Copper", amount: 5}],
        prod: [{name: "Turret", amount: 1}],
        time: 3000
    }, "Substation": {
        ing: [{name: "Electronic", amount: 15}, {name: "Iron", amount: 8}],
        prod: [{name: "Landfill", amount: 2}],
        time: 5000
    }, "Power Pole": {
        ing: [{name: "Copper", amount: 15}, {name: "Electronic", amount: 5}],
        prod: [{name: "Landfill", amount: 5}],
        time: 8000
    }, "Pipe": {
        ing: [{name: "Iron", amount: 10} ],
        prod: [{name: "Pipe", amount: 10}],
        time: 3000
    }, "Water Collector": {
        ing: [{name: "Copper", amount: 15}, {name: "Iron", amount: 5}, {name: "Iron Gear", amount: 2}],
        prod: [{name: "Water Collector", amount: 1}],
        time: 4000
    }, "Boiler": {
        ing: [{name: "Copper", amount: 25}, {name: "Iron", amount: 10}, {name: "Iron Gear", amount: 8}],
        prod: [{name: "Boiler", amount: 1}],
        time: 1000
    }, "Steam Engine": {
        ing: [{name: "Copper", amount: 40}, {name: "Iron", amount: 30}, {name: "Iron Gear", amount: 15}],
        prod: [{name: "Steam Engine", amount: 1}],
        time: 1000
    }, 
}

addImg("grass")
addImg("water")
addImg("shallowWater")
addImg("wasteland")
addImg("rail")
addImg("metal")
addImg("assembly")
addImg("belt")
addImg("woodChest")
addImg("inserter")
addImg("fabricator")
addImg("ironPlate", "items/")


Data.sfx = {
    chatMSG: new Audio("./docs/sfx/blipSelect.wav")
}

function overlapping(obj1, obj2) {
    // Check x and y for overlap
    if (obj2.pos.x > obj1.w + obj1.pos.x || obj1.pos.x > obj2.w + obj2.pos.x || obj2.pos.y > obj1.h + obj1.pos.y || obj1.pos.y > obj2.h + obj2.pos.y) {
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
    let w = img.width*Zoom
    let h = img.height*Zoom

    var surfacesurfaceContext = canvas.getContext('2d');  

    // Clear the canvas to White  
    // Save the current context  
    surfacesurfaceContext.save();  
    // Translate to the center point of our image  
    surfacesurfaceContext.translate(w * 0.5  + (x), h * 0.5  + (y));  
    // Perform the rotation  
    surfacesurfaceContext.rotate(DegToRad(angle));  
    // Translate back to the top left of our image  
    surfacesurfaceContext.translate(-w * 0.5  - (x), -h * 0.5 - (y));  
    // Finally we draw the image 
    surfacesurfaceContext.drawImage(img, x, y, w, h);  
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