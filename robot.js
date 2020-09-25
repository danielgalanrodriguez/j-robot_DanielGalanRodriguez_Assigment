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
  roomSize,
  initialPosition,
  initialOrientationRepresentation,
  navigationCommands,
) {
  let orientationsIndex = findOrientationByRepresentation(
    initialOrientationRepresentation,
  );
  let position = { ...initialPosition };

  [...navigationCommands].map((command) => {
    switch (command) {
      case "F":
        position = goForward(
          position,
          orientations[orientationsIndex],
          roomSize,
        );
        break;
      case "L":
        orientationsIndex = turnLeft(orientationsIndex);

        break;
      case "R":
        orientationsIndex = turnRight(orientationsIndex);
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

function goForward(position, orientation, roomSize) {
  let updatedPosition = { ...position };
  updatedPosition.column += orientation.columns;
  updatedPosition.row += orientation.rows;

  if (
    updatedPosition.column < 0 ||
    updatedPosition.column >= roomSize.columns ||
    updatedPosition.row < 0 ||
    updatedPosition.row >= roomSize.rows
  ) {
    throw new Error(`Hey, the robot passed the end of the room! `);
  }

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
  let resultElement = document.getElementById("text-results");
  resultElement.innerText = `Report: ${finalPosition.column} ${finalPosition.row} ${finalOrientationRepresentation}`;
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

function startJourney() {
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

  let finalPosition = {},
    finalOrientationRepresentation = null;
  try {
    [finalPosition, finalOrientationRepresentation] = executeNavigationCommands(
      roomSize,
      initialPosition,
      initialOrientationRepresentation,
      navigationCommands,
    );
  } catch (error) {
    finalPosition.column = "OUP'S";
    finalPosition.row = "your robot hit wall";
    finalOrientationRepresentation = "!";
  }
  startAnimation();
  setTimeout(() => {
    stopAnimation();
    reportPosition(finalPosition, finalOrientationRepresentation);
  }, 2000);
}

try {
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
} catch (error) {
  console.log(
    "A compiler should be used to handle better Exports/imports. Not used to keep it simple.",
  );
}
