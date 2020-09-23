const north = {
  userRepresentation: "N",
  rows: 0,
  columns: -1,
};
const east = {
  userRepresentation: "E",
  rows: 1,
  columns: 0,
};
const south = {
  userRepresentation: "S",
  rows: 0,
  columns: 1,
};
const west = {
  userRepresentation: "W",
  rows: -1,
  columns: 0,
};

const orientations = [north, east, south, west];

function getRoomSize() {
  let receivedSize = "5 5"; //prompt("How big it is?");
  let parsedSize = receivedSize.split(" ");
  return {
    rows: parsedSize[0],
    columns: parsedSize[1],
  };
}

function getInitialPosition() {
  let receivedPosition = "4 4 E"; //prompt("Where are you?");
  let parsedPosition = receivedPosition.split(" ");
  let orientationRepresentation = parsedPosition[2];
  return [
    {
      row: parseInt(parsedPosition[0]),
      column: parseInt  (parsedPosition[1]),
    },
    orientationRepresentation,
  ];
}

function getNavigationCommands() {
  return "ELLFRFLFFRFF"; //prompt("What are your commands?");
}

function followNavigationCommands(navigationCommands) {
  let orientationsIndex = findOrientationByRepresentation(
    initialOrientationRepresentation,
  );
  console.log(orientationsIndex);
  [...navigationCommands].map((command) => {
    switch (command) {
      case "F":
        console.log('before position: ', position);
        position = goStraight(position, orientations[orientationsIndex]);
        console.log('after position: ', position);
        console.log('--------------------------------------');
        break;
      case "L":
        console.log('before orientationsIndex: ', orientationsIndex);
        orientationsIndex = turnLeft(orientationsIndex);
        console.log('after orientationsIndex: ', orientationsIndex);
       
        console.log('orientation: ', orientations[orientationsIndex].userRepresentation);

        break;
      case "R":
        orientationsIndex = turnRight(orientationsIndex);
        console.log('orientation: ', orientations[orientationsIndex].userRepresentation);

        break;

      default:
        console.log("unknown order");
        break;
    }
  });
  return orientationsIndex;
}

function findOrientationByRepresentation(representation) {
  return orientations.findIndex(
    (orientation) => orientation.userRepresentation === representation,
  );
}

function goStraight(position, orientation) {
  let updatedPosition = position;
  updatedPosition.row += orientation.rows;
  updatedPosition.column += orientation.columns;

  return updatedPosition;
}

function turnLeft(orientationIndex) {
  let updatedIndex = orientationIndex - 1;
  updatedIndex < 0 && (updatedIndex = orientations.length - 1);

  return updatedIndex;
}

function turnRight(orientationIndex) {
  let updatedIndex = orientationIndex + 1;
  updatedIndex >= orientations.length && (updatedIndex = 0);

  return updatedIndex;
}

function reportPosition(index) {
  console.log(`Final position = ${position.row},${position.column}`);
  console.log(`Final orientation = ${orientations[index].userRepresentation}`);
}

const roomSize = getRoomSize();

let [position, initialOrientationRepresentation] = getInitialPosition();

let navigationCommands = getNavigationCommands();

console.log(`1. roomSize = ${roomSize.rows},${roomSize.columns}`);
console.log(`2. position = ${position.row},${position.column}`);
console.log(`3. orientation = ${initialOrientationRepresentation}`);


console.log(`3. navigationCommands = ${navigationCommands}`);

let index = followNavigationCommands(navigationCommands);
reportPosition(index);
