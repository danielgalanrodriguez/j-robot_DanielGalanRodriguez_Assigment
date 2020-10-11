const north = {
  symbol: 'N',
  columns: 0,
  rows: -1,
};
const east = {
  symbol: 'E',
  columns: 1,
  rows: 0,
};
const south = {
  symbol: 'S',
  columns: 0,
  rows: 1,
};
const west = {
  symbol: 'W',
  columns: -1,
  rows: 0,
};

const orientations = [north, east, south, west];

function getInputData() {
  const roomSizeReceived = document.getElementById('room-size').value;
  const positionReceived = document.getElementById('robot-position').value;
  const commandsReceived = document.getElementById('commands-to-follow').value;

  return [roomSizeReceived, positionReceived, commandsReceived];
}

function parseRoomSize(roomSizeReceived) {
  let parsedSize = roomSizeReceived.split(' ');

  return {
    columns: parseInt(parsedSize[0]),
    rows: parseInt(parsedSize[1]),
  };
}

function parseInitialPosition(positionReceived) {
  let parsedPosition = positionReceived.split(' ');
  let orientationSymbol = parsedPosition[2];
  return [
    {
      column: parseInt(parsedPosition[0]),
      row: parseInt(parsedPosition[1]),
    },
    orientationSymbol,
  ];
}

function executeNavigationCommands(
  roomSize,
  initialPosition,
  initialOrientationSymbol,
  navigationCommands
) {
  let orientationsIndex = findOrientationBySymbol(initialOrientationSymbol);
  let position = { ...initialPosition };

  [...navigationCommands].map((command) => {
    switch (command) {
      case 'F':
        position = goForward(
          position,
          orientations[orientationsIndex],
          roomSize
        );
        break;
      case 'L':
        orientationsIndex = turnLeft(orientationsIndex);

        break;
      case 'R':
        orientationsIndex = turnRight(orientationsIndex);
        break;

      default:
        console.log('unknown order');
        break;
    }
  });
  return [position, orientations[orientationsIndex].symbol];
}

function findOrientationBySymbol(representation) {
  return orientations.findIndex(
    (orientation) => orientation.symbol === representation
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

function reportPosition(finalPosition, finalOrientationSymbol) {
  let resultElement = document.getElementById('text-results');
  resultElement.innerText = `Report: ${finalPosition.column} ${finalPosition.row} ${finalOrientationSymbol}`;
}

function stopAnimation() {
  let robotImage = document.getElementById('robot-image');
  robotImage.classList.add('robot-end-line');
  robotImage.classList.remove('robot-image-start-animation');
}

function startAnimation() {
  let robotImage = document.getElementById('robot-image');
  robotImage.classList.add('robot-image-start-animation');
  robotImage.classList.remove('robot-end-line');
}

function resetControlRoom() {
  let reportParagraphElement = document.getElementById('text-results');
  let reportText = reportParagraphElement.innerText;

  if (reportText.length > 0) {
    reportParagraphElement.innerText = '';
    let robotImage = document.getElementById('robot-image');
    robotImage.classList.add('robot-image-start-animation');
    robotImage.classList.remove('robot-end-line');
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

  let [initialPosition, initialOrientationSymbol] = parseInitialPosition(
    positionReceived
  );

  let finalPosition = {};
  let finalOrientationSymbol = null;
  try {
    [finalPosition, finalOrientationSymbol] = executeNavigationCommands(
      roomSize,
      initialPosition,
      initialOrientationSymbol,
      navigationCommands
    );
  } catch (error) {
    finalPosition.column = "OUP'S";
    finalPosition.row = 'your robot hit wall';
    finalOrientationSymbol = '!';
  }
  startAnimation();
  setTimeout(() => {
    stopAnimation();
    reportPosition(finalPosition, finalOrientationSymbol);
  }, 2000);
}

try {
  module.exports = [
    orientations,
    parseRoomSize,
    parseInitialPosition,
    executeNavigationCommands,
    findOrientationBySymbol,
    goForward,
    turnLeft,
    turnRight,
  ];
} catch (error) {
  console.log(
    'A compiler should be used to handle better Exports/imports. Not used to keep it simple.'
  );
}
