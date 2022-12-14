import { getLines } from "../utils";

export const parseInputForDay = (file: string): number[][][] => {
  const paths = getLines(file).map((path) => {
    return path.split(" -> ").map((x) => {
      return x.split(",").map(Number).reverse();
    });
  });

  return paths;
};
export const task1 = (paths: number[][][]) => {
  const grid = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => false)
  );

  const lowestY = fillGrid(grid, paths);
  let sands = 0;
  while (true) {
    let sandLoc = [0, 500];
    grid[0][500] = true;
    while (true) {
      const [y, x] = sandLoc;
      const [nextY, nextX] = moveSand(grid, sandLoc);
      if (nextY === y && nextX === x) {
        break;
      }
      grid[nextY][nextX] = true;
      grid[y][x] = false;
      sandLoc = [nextY, nextX];
      if (nextY > lowestY) {
        break;
      }
    }
    if (sandLoc[0] > lowestY) {
      console.log(sandLoc, lowestY);
      break;
    }
    sands++;
  }

  return sands;
};

export const task2 = (paths: number[][][]) => {
  const grid = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => false)
  );

  fillGrid(grid, paths, true);
  let sands = 0;
  while (true) {
    let sandLoc = [0, 500];
    grid[0][500] = true;
    while (true) {
      const [y, x] = sandLoc;
      const [nextY, nextX] = moveSand(grid, sandLoc);
      if (nextY === y && nextX === x) {
        break;
      }
      grid[nextY][nextX] = true;
      grid[y][x] = false;
      sandLoc = [nextY, nextX];
    }
    sands++;
    if (sandLoc[0] === 0 && sandLoc[1] === 500) {
      break;
    }
  }
  return sands;
};

const moveSand = (grid, sandLoc) => {
  const [y, x] = sandLoc;

  if (!grid[y + 1][x]) {
    return [y + 1, x];
  }

  if (!grid[y + 1][x - 1]) {
    return [y + 1, x - 1];
  }

  if (!grid[y + 1][x + 1]) {
    return [y + 1, x + 1];
  }

  return sandLoc;
};

const fillGrid = (grid: boolean[][], paths: number[][][], addFloor = false) => {
  let lowestY = 0;
  // Change to Array.windows()
  paths.forEach((path) => {
    path.windows(2).forEach((points) => {
      const [a, b] = points;
      for (let y = Math.min(a[0], b[0]); y <= Math.max(a[0], b[0]); y++) {
        for (let x = Math.min(a[1], b[1]); x <= Math.max(a[1], b[1]); x++) {
          grid[y][x] = true;
          if (y > lowestY) {
            lowestY = y;
          }
        }
      }
    });
  });

  if (addFloor) {
    grid[lowestY + 2].fill(true);
  }

  return lowestY;
};
