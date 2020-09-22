const north = {
    userInput : "N",
    rows: 0,
    columns: -1
}
const east = {
    userInput : "E",
    rows: 1,
    columns: 0
}
const south = {
    userInput : "S",
    rows: 0,
    columns: 1
}
const west = {
    userInput : "W",
    rows: 1,
    columns: 0
}

const orientation = [north,east,south,west]


function getRoomSize (){
    let inputSize = prompt("how big it is?");
    let parsedSize = inputSize.split(" ");
    return {
        rows : parsedSize[0],
        columns : parsedSize[1]
    }
}

function getInitialPosition() {

    let inputPosition = prompt("where are you?");
    let parsedPosition = inputPosition.split(" ");
    return {
        row : parsedPosition[0],
        column : parsedPosition[1],
        orientation : parsedPosition[2]
    }
}

function getNavigationCommands() {
    return prompt("What are your commands?");
}

function followNavigationCommands(navigationCommands){

    [...navigationCommands].map((command) => {

        switch (command) {
            case "F":
               console.log("Front!"); 
            break;            
            case "L":
            console.log("turn Left!");
            break;            
            case "R":
            console.log("turn Right!");
            break;
        
            default:
            console.log("unknown order");
            break;
        }

    })
}


const roomSize = getRoomSize();

let position = getInitialPosition();

let navigationCommands = getNavigationCommands();

followNavigationCommands(navigationCommands);

console.log(roomSize);
console.log(position);
console.log(navigationCommands);


