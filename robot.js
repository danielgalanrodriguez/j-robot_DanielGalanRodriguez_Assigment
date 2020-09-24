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

function getUserData() {
  const roomSizeReceived = document.getElementById("room-size").value;
  const positionReceived = document.getElementById("robot-position").value;
  const commandsReceived = document.getElementById("commands-to-follow").value;

  return [roomSizeReceived, positionReceived, commandsReceived];
}

function parseRoomSize(roomSizeReceived) {
  let parsedSize = roomSizeReceived.split(" ");

  return {
    rows: parsedSize[0],
    columns: parsedSize[1],
  };
}

function parseInitialPosition(receivedPosition) {
  let parsedPosition = receivedPosition.split(" ");
  let orientationRepresentation = parsedPosition[2];
  return [
    {
      row: parseInt(parsedPosition[0]),
      column: parseInt(parsedPosition[1]),
    },
    orientationRepresentation,
  ];
}

function followNavigationCommands(
  initialPosition,
  initialOrientationRepresentation,
  navigationCommands,
) {
  let orientationsIndex = findOrientationByRepresentation(
    initialOrientationRepresentation,
  );
  let position = initialPosition;
  console.log(orientationsIndex);
  [...navigationCommands].map((command) => {
    switch (command) {
      case "F":
        console.log("before position: ", position);
        position = goStraight(position, orientations[orientationsIndex]);
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
  return [position, orientationsIndex];
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

function reportPosition(finalPosition, orientationsIndex) {
  console.log(`Final position = ${finalPosition.row},${finalPosition.column}`);
  console.log(
    `Final orientation = ${orientations[orientationsIndex].userRepresentation}`,
  );

  let resultElement = document.getElementById("text-results");
  resultElement.innerText = `Report: ${finalPosition.row} ${finalPosition.column} ${orientations[orientationsIndex].userRepresentation}`;

  console.log("exit");
  let robotImage = document.getElementById("robot-image");
  robotImage.classList.add("robot-end-line");
  robotImage.classList.remove("robot-image-start-animation");
}

function activateAnimation() {
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
  ] = getUserData();

  const roomSize = parseRoomSize(roomSizeReceived);

  let [
    initialPosition,
    initialOrientationRepresentation,
  ] = parseInitialPosition(positionReceived);

  console.log(`1. roomSize = ${roomSize.rows},${roomSize.columns}`);
  console.log(`2. position = ${initialPosition.row},${initialPosition.column}`);
  console.log(`3. orientation = ${initialOrientationRepresentation}`);

  console.log(`3. navigationCommands = ${navigationCommands}`);

  let [finalPosition, finalOrientationsIndex] = followNavigationCommands(
    initialPosition,
    initialOrientationRepresentation,
    navigationCommands,
  );
  activateAnimation();
  setTimeout(() => reportPosition(finalPosition, finalOrientationsIndex), 2000);
}
