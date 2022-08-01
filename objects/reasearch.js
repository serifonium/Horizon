

Data.allReasearch = {
    Speed_1: {cost: {basic: 60}, onCompletion: () => {
        Player.speed = 4
        sendChatMsg("Speed 1 has finished reasearching.", 8000, "#00ff00")
        Data.reasearch.Speed_2 = Data.allReasearch.Speed_2
        delete Data.reasearch["Speed_1"] 
    }},
    Speed_2: {cost: {basic: 120, logistic: 120}, onCompletion: () => {
        Player.speed = 4.5
        sendChatMsg("Speed 2 has finished reasearching.", 8000, "#00ff00")
        Data.reasearch.Speed_3 = Data.allReasearch.Speed_3
        delete Data.reasearch["Speed_2"] 
    }},
    Speed_3: {cost: {basic: 210, logistic: 210, chemical: 210}, onCompletion: () => {
        Player.speed = 5.5
        sendChatMsg("Speed 3 has finished reasearching.", 8000, "#00ff00")
        Data.reasearch.Speed_4 = Data.allReasearch.Speed_4
        delete Data.reasearch["Speed_3"] 
    }},
    Speed_4: {cost: {basic: 800, logistic: 800, chemical: 800, advanced: 800}, onCompletion: () => {
        Player.speed = 7
        sendChatMsg("Speed 4 has finished reasearching.", 8000, "#00ff00")
        Data.reasearch.Speed_5 = Data.allReasearch.Speed_5
        delete Data.reasearch["Speed_4"] 
    }},
    Speed_5: {cost: {basic: 1500, logistic: 1500, chemical: 1500, advanced: 1500, quantum: 1500}, onCompletion: () => {
        Player.speed = 9
        sendChatMsg("Speed 5 has finished reasearching.", 8000, "#00ff00")
        delete Data.reasearch["Speed_5"] 
    }}
}
Data.reasearch = {
    Military_1: {cost: {basic: 10}, onCompletion: () => {
        sendChatMsg("Military 1 has finished reasearching.", 8000, "#00ff00")
        Data.reasearch = {cost: {basic: 90}, onCompletion: () => {

        }}
        delete Data.reasearch["Military_1"] 
    }},
    Speed_1: Data.allReasearch.Speed_1,
    Walls: {cost: {basic: 15}, onCompletion: () => {
        sendChatMsg("Walls has finished reasearching.", 8000, "#00ff00")
        delete Data.reasearch["Walls"] 
    }},
}