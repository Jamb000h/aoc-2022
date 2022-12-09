import { getLines } from "../utils";

export const parseInputForDay = (file: string) =>
  getLines(file).map((row) => {
    const parts = row.split(" ");
    return [parts[0], Number(parts[1])];
  });

export const task1 = (moves: any) => {
  return moveRope(moves, 2);
};

export const task2 = (moves: any) => {
  return moveRope(moves, 10);
};

const moveRope = (moves, ropeLength): number => {
  let knots = Array.from({ length: ropeLength }, () => [0, 0]);
  let last_knot_visits = {
    "0-0": true,
  };
  moves.forEach((move) => {
    const [dir, amt] = move;

    for (let i = 0; i < amt; i++) {
      switch (dir) {
        case "U":
          knots[0][0] += 1;
          break;
        case "D":
          knots[0][0] -= 1;
          break;
        case "L":
          knots[0][1] -= 1;
          break;
        default: // Implies "R"
          knots[0][1] += 1;
          break;
      }

      knots = [knots[0]].concat(
        knots.windows(2).map((twoKnots) => {
          const [prevKnot, curKnot] = twoKnots;
          return moveKnot(prevKnot, curKnot);
        })
      );
      const lastKnot = knots.at(-1);
      last_knot_visits[lastKnot[0] + "-" + lastKnot[1]] = true;
    }
  });
  return Object.keys(last_knot_visits).length;
};

const moveKnot = (prevKnot, curKnot) => {
  if (touching(prevKnot, curKnot)) {
    return curKnot;
  }

  const [prevY, prevX] = prevKnot;
  const [curY, curX] = curKnot;

  // Same row
  if (prevX < curX) {
    curKnot[1] -= 1;
  }

  if (prevX > curX) {
    curKnot[1] += 1;
  }

  if (prevY < curY) {
    curKnot[0] -= 1;
  }

  if (prevY > curY) {
    curKnot[0] += 1;
  }

  return curKnot;
};

const touching = (prevKnot, curKnot) =>
  Math.abs(prevKnot[0] - curKnot[0]) <= 1 &&
  Math.abs(prevKnot[1] - curKnot[1]) <= 1;
