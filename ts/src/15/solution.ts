import { getLines } from "../utils";
export const parseInputForDay = (file: string) =>
  getLines(file).map((line) => {
    return line.match(/x=(\-?\d+), y=(\-?\d+)/g).map((coords) => {
      return coords.match(/-?\d+/g).map(Number);
    });
  });

export const task1 = (input: any) => {
  let smallestX = Infinity;
  let largestX = -Infinity;

  input.forEach((row) => {
    row.forEach((pair) => {
      if (pair[0] < smallestX) {
        smallestX = pair[0];
      }

      if (pair[0] > largestX) {
        largestX = pair[0];
      }
    });
  });

  const row2000000 = new Array(Math.abs(smallestX) + Math.abs(largestX)).fill(
    false
  );
  const bottomModifier = Math.abs(smallestX);

  input.forEach((row) => {
    const [sensor, beacon] = row;
    const [x1Raw, y1] = sensor;
    const [x2Raw, y2] = beacon;
    const x1 = x1Raw + bottomModifier;
    const x2 = x2Raw + bottomModifier;
    const distanceToRow2000000 = Math.abs(y1 - 2000000);
    const manhattanDistanceToBeacon = manhattanDistance(x1, y1, x2, y2);

    if (distanceToRow2000000 > manhattanDistanceToBeacon) {
      return;
    }

    const occupiedX = manhattanDistanceToBeacon - distanceToRow2000000;

    for (let i = 1; i <= occupiedX; i++) {
      row2000000[x1 - i] = true;
      row2000000[x1 + i] = true;
    }

    row2000000[x1] = true;
  });

  input.forEach((row) => {
    const [_, beacon] = row;
    const [x2Raw, y2] = beacon;
    const x2 = x2Raw + bottomModifier;

    if (y2 === 2000000) {
      row2000000[x2] = false;
    }
  });

  return row2000000.filter(Boolean).length;
};

export const task2 = (input: any) => {
  const sensorSearchDistances: any[] = [];
  input.forEach((row: number[][]) => {
    const [sensor, beacon] = row;
    const [x1, y1] = sensor;
    const [x2, y2] = beacon;

    const manhattanDistanceToBeacon = manhattanDistance(x1, y1, x2, y2);
    sensorSearchDistances.push({
      distanceToBeacon: manhattanDistanceToBeacon,
      center: [x1, y1],
      top: [x1, y1 - manhattanDistanceToBeacon],
      bottom: [x1, y1 + manhattanDistanceToBeacon],
      left: [x1 - manhattanDistanceToBeacon, y1],
      right: [x1 + manhattanDistanceToBeacon, y1],
    });
  });

  for (let sensorSearchDistance of sensorSearchDistances) {
    // Check upper left of current sensor
    for (
      let x = sensorSearchDistance.center[0],
        y = sensorSearchDistance.top[1] - 1;
      x >= sensorSearchDistance.left[0] - 1 &&
      y <= sensorSearchDistance.center[1];
      x--, y++
    ) {
      if (x < 0 || y < 0 || x > 4000000 || y > 4000000) continue;
      if (coordsNotInBeaconSearchAreas(sensorSearchDistances, [x, y])) {
        return BigInt(x) * BigInt(4000000) + BigInt(y);
      }
    }
    // Check upper right of current sensor
    for (
      let x = sensorSearchDistance.center[0],
        y = sensorSearchDistance.top[1] - 1;
      x <= sensorSearchDistance.right[0] + 1 &&
      y <= sensorSearchDistance.center[1];
      x++, y++
    ) {
      if (x < 0 || y < 0 || x > 4000000 || y > 4000000) continue;
      if (coordsNotInBeaconSearchAreas(sensorSearchDistances, [x, y])) {
        return BigInt(x) * BigInt(4000000) + BigInt(y);
      }
    }
    // Check lower left of current sensor
    for (
      let x = sensorSearchDistance.center[0],
        y = sensorSearchDistance.bottom[1] + 1;
      x >= sensorSearchDistance.left[0] - 1 &&
      y >= sensorSearchDistance.center[1];
      x--, y--
    ) {
      if (x < 0 || y < 0 || x > 4000000 || y > 4000000) continue;
      if (coordsNotInBeaconSearchAreas(sensorSearchDistances, [x, y])) {
        console.log([x, y]);
        return BigInt(x) * BigInt(4000000) + BigInt(y);
      }
    }
    // Check lower right of current sensor
    for (
      let x = sensorSearchDistance.center[0],
        y = sensorSearchDistance.bottom[1] + 1;
      x <= sensorSearchDistance.right[0] + 1 &&
      y >= sensorSearchDistance.center[1];
      x++, y--
    ) {
      if (x < 0 || y < 0 || x > 4000000 || y > 4000000) continue;
      if (coordsNotInBeaconSearchAreas(sensorSearchDistances, [x, y])) {
        console.log([x, y]);
        return BigInt(x) * BigInt(4000000) + BigInt(y);
      }
    }
  }
  return -1;
};

const manhattanDistance = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const coordsNotInBeaconSearchAreas = (
  sensorSearchDistances: any[],
  coords
): boolean => {
  return sensorSearchDistances.every(
    (sensorSearchDistance) =>
      manhattanDistance(
        sensorSearchDistance.center[0],
        sensorSearchDistance.center[1],
        coords[0],
        coords[1]
      ) > sensorSearchDistance.distanceToBeacon
  );
};
