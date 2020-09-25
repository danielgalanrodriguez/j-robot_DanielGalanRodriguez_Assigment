const north = {
  userRepresentation: "N",
  columns: 0,
  rows: -1,
};
const east = {
  userRepresentation: "E",
  columns: 1,
  rows: 0,
};
const south = {
  userRepresentation: "S",
  columns: 0,
  rows: 1,
};
const west = {
  userRepresentation: "W",
  columns: -1,
  rows: 0,
};

const orientations = [north, east, south, west];

function getInputData() {
  const roomSizeReceived = document.getElementById("room-size").value;
  const positionReceived = document.getElementById("robot-position").value;
  const commandsReceived = document.getElementById("commands-to-follow").value;

  return [roomSizeReceived, positionReceived, commandsReceived];
}

function parseRoomSize(roomSizeReceived) {
  let parsedSize = roomSizeReceived.split(" ");

  return {
    columns: parseInt(parsedSize[0]),
    rows: parseInt(parsedSize[1]),
  };
}

function parseInitialPosition(positionReceived) {
  let parsedPosition = positionReceived.split(" ");
  let orientationRepresentation = parsedPosition[2];
  return [
    {
      column: parseInt(parsedPosition[0]),
      row: parseInt(parsedPosition[1]),
    },
    orientationRepresentation,
  ];
}

function executeNavigationCommands(
  initialPosition,
  initialOrientationRepresentation,
  navigationCommands,
) {
  let orientationsIndex = findOrientationByRepresentation(
    initialOrientationRepresentation,
  );
  let position = { ...initialPosition };
  console.log(orientationsIndex);
  [...navigationCommands].map((command) => {
    switch (command) {
      case "F":
        console.log("before position: ", position);
        position = goForward(position, orientations[orientationsIndex]);
        console.log("after position: ", position);
        console.log("--------------------------------------");
        break;
      case "L":
        console.log("before orientationsIndex: ", orientationsIndex);
        orientationsIndex = turnLeft(orientationsIndex);
        console.log("after orientationsIndex: ", orientationsIndex);

        console.log(
          "orientation: ",
          orientations[orientationsIndex].userRepresentation,
        );

        break;
      case "R":
        orientationsIndex = turnRight(orientationsIndex);
        console.log(
          "orientation: ",
          orientations[orientationsIndex].userRepresentation,
        );

        break;

      default:
        console.log("unknown order");
        break;
    }
  });
  return [position, orientations[orientationsIndex].userRepresentation];
}

function findOrientationByRepresentation(representation) {
  return orientations.findIndex(
    (orientation) => orientation.userRepresentation === representation,
  );
}

function goForward(position, orientation) {
  let updatedPosition = { ...position };
  updatedPosition.column += orientation.columns;
  updatedPosition.row += orientation.rows;

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

function reportPosition(finalPosition, finalOrientationRepresentation) {
  console.log(`Final position = ${finalPosition.column},${finalPosition.row}`);
  console.log(`Final orientation = ${finalOrientationRepresentation}`);

  let resultElement = document.getElementById("text-results");
  resultElement.innerText = `Report: ${finalPosition.column} ${finalPosition.row} ${finalOrientationRepresentation}`;

  console.log("exit");
}

function stopAnimation() {
  let robotImage = document.getElementById("robot-image");
  robotImage.classList.add("robot-end-line");
  robotImage.classList.remove("robot-image-start-animation");
}

function startAnimation() {
  let robotImage = document.getElementById("robot-image");
  robotImage.classList.add("robot-image-start-animation");
  robotImage.classList.remove("robot-end-line");
}

function resetControlRoom() {
  let reportParagraphElement = document.getElementById("text-results");
  let reportText = reportParagraphElement.innerText;

  if (reportText.length > 0) {
    reportParagraphElement.innerText = "";
    let robotImage = document.getElementById("robot-image");
    robotImage.classList.add("robot-image-start-animation");
    robotImage.classList.remove("robot-end-line");
  }
}

/**
 * Main function
 */

function executeCommands() {
  resetControlRoom();
  const [
    roomSizeReceived,
    positionReceived,
    navigationCommands,
  ] = getInputData();

  const roomSize = parseRoomSize(roomSizeReceived);

  let [
    initialPosition,
    initialOrientationRepresentation,
  ] = parseInitialPosition(positionReceived);

  console.log(`1. roomSize = ${roomSize.columns},${roomSize.rows}`);
  console.log(`2. position = ${initialPosition.row},${initialPosition.column}`);
  console.log(`3. orientation = ${initialOrientationRepresentation}`);

  console.log(`3. navigationCommands = ${navigationCommands}`);

  let [
    finalPosition,
    finalOrientationRepresentation,
  ] = executeNavigationCommands(
    initialPosition,
    initialOrientationRepresentation,
    navigationCommands,
  );
  startAnimation();
  setTimeout(() => {
    stopAnimation();
    reportPosition(finalPosition, finalOrientationRepresentation);
  }, 2000);
}

module.exports = [
  orientations,
  parseRoomSize,
  parseInitialPosition,
  executeNavigationCommands,
  findOrientationByRepresentation,
  goForward,
  turnLeft,
  turnRight,
];
