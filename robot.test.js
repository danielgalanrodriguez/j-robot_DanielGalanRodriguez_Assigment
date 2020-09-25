// import { parseRoomSize, parseInitialPosition } from "./robot.js";
const [
  orientations,
  parseRoomSize,
  parseInitialPosition,
  executeNavigationCommands,
  findOrientationByRepresentation,
  goForward,
  turnLeft,
  turnRight,
] = require("./robot.js");

const roomSize = "5 5";
const parsedRoomSize = { columns: 5, rows: 5 };
const initialPosition = "1 2 E";
const parsedInitialPosition = [{ column: 1, row: 2 }, "E"];
const navigationCommands = "RFLFFLRF";

test("to match parsed room size '5 5' to correct object", () => {
  expect(parsedRoomSize).toMatchObject(parseRoomSize(roomSize));
});

test("to match parsed initial position to correct object", () => {
  expect(parsedInitialPosition).toMatchObject(
    parseInitialPosition(initialPosition),
  );
});

test("to have a valid orientation object", () => {
  expect(findOrientationByRepresentation("N")).toBe(0);
  expect(findOrientationByRepresentation("E")).toBe(1);
  expect(findOrientationByRepresentation("S")).toBe(2);
  expect(findOrientationByRepresentation("W")).toBe(3);
});

test("to go forward correctly depending on the orientation ", () => {
  const finalPositionNorth = { column: 1, row: 1 };
  const finalPositionEast = { column: 2, row: 2 };
  const finalPositionSouth = { column: 1, row: 3 };
  const finalPositionWest = { column: 0, row: 2 };

  expect(finalPositionNorth).toMatchObject(
    goForward(parsedInitialPosition[0], orientations[0], parsedRoomSize),
  );
  expect(finalPositionEast).toMatchObject(
    goForward(parsedInitialPosition[0], orientations[1], parsedRoomSize),
  );
  expect(finalPositionSouth).toMatchObject(
    goForward(parsedInitialPosition[0], orientations[2], parsedRoomSize),
  );
  expect(finalPositionWest).toMatchObject(
    goForward(parsedInitialPosition[0], orientations[3], parsedRoomSize),
  );
});

test("to go throw an error if the wall is hit ", () => {
  const firstPosition = { column: 0, row: 0 };
  const lastPosition = { column: 4, row: 4 };

  expect(() =>
    goForward(firstPosition, orientations[0], parsedRoomSize),
  ).toThrow(Error);
  expect(() =>
    goForward(firstPosition, orientations[3], parsedRoomSize),
  ).toThrow(Error);
  expect(() =>
    goForward(lastPosition, orientations[1], parsedRoomSize),
  ).toThrow(Error);
  expect(() =>
    goForward(lastPosition, orientations[2], parsedRoomSize),
  ).toThrow(Error);
});

test("to change orientation to the left correctly ", () => {
  expect(orientations[3].userRepresentation).toBe("W");
  expect(turnLeft(3)).toBe(2);
  expect(orientations[2].userRepresentation).toBe("S");
  expect(turnLeft(2)).toBe(1);
  expect(orientations[1].userRepresentation).toBe("E");
  expect(turnLeft(1)).toBe(0);
  expect(orientations[0].userRepresentation).toBe("N");
  expect(turnLeft(0)).toBe(3);
  expect(orientations[3].userRepresentation).toBe("W");
});

test("to change orientation to the right correctly ", () => {
  expect(orientations[0].userRepresentation).toBe("N");
  expect(turnRight(0)).toBe(1);
  expect(orientations[1].userRepresentation).toBe("E");
  expect(turnRight(1)).toBe(2);
  expect(orientations[2].userRepresentation).toBe("S");
  expect(turnRight(2)).toBe(3);
  expect(orientations[3].userRepresentation).toBe("W");
  expect(turnRight(3)).toBe(0);
  expect(orientations[0].userRepresentation).toBe("N");
});

test("to execute correctly the given navigation commands ", () => {
  const finalReport = [{ column: 4, row: 3 }, "E"];
  expect(finalReport).toMatchObject(
    executeNavigationCommands(
      roomSize,
      parsedInitialPosition[0],
      "E",
      navigationCommands,
    ),
  );
});


test("to omit invalid navigation commands ", () => {
    const finalReport = [{ column: 4, row: 3 }, "E"];
    const invalidNavigationCommands = "WPflfbN"
    expect(finalReport).toMatchObject(
      executeNavigationCommands(
        roomSize,
        finalReport[0],
        "E",
        invalidNavigationCommands,
      ),
    );
  });
  