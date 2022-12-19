import "../utils";
import { bfs3D, generateEmptyVisited3D, getLines, neighbors3D } from "../utils";

export const parseInputForDay = (file: string) =>
  getLines(file).map((line) => {
    const [x, y, z] = line.split(",");
    return [y, x, z].map(Number);
  });

export const task1 = (input: number[][]) => {
  const grid = [];
  const maxY = Math.max(...input.map((cube) => cube[0]));
  const maxX = Math.max(...input.map((cube) => cube[1]));
  const maxZ = Math.max(...input.map((cube) => cube[2]));
  for (let y = 0; y <= maxY; y++) {
    grid.push([]);
    for (let x = 0; x <= maxX; x++) {
      grid[y].push([]);
      for (let z = 0; z <= maxZ; z++) {
        grid[y][x].push(false);
      }
    }
  }

  input.forEach((cube) => {
    const [y, x, z] = cube;
    grid[y][x][z] = true;
  });

  return input
    .map((cube) => {
      const [y, x, z] = cube;
      const filledNeighbors = neighbors3D(y, x, z, grid, false).filter(
        ([nY, nX, nZ]) => grid[nY][nX][nZ]
      );
      return 6 - filledNeighbors.length;
    })
    .sum();
};

export const task2 = (input: number[][]) => {
  const grid = [];
  const maxY = Math.max(...input.map((cube) => cube[0]));
  const maxX = Math.max(...input.map((cube) => cube[1]));
  const maxZ = Math.max(...input.map((cube) => cube[2]));
  // We are submerging this thing in water, so let's create a
  // 1x1 barrier of water around it
  for (let y = 0; y <= maxY + 2; y++) {
    grid.push([]);
    for (let x = 0; x <= maxX + 2; x++) {
      grid[y].push([]);
      for (let z = 0; z <= maxZ + 2; z++) {
        grid[y][x].push(false);
      }
    }
  }

  // Fill droplet with cubes
  // (remember to account for water barrier)
  input.forEach((cube) => {
    const [y, x, z] = cube;
    grid[y + 1][x + 1][z + 1] = true;
  });

  // Start pouring water from (0,0,0) and check where it can
  // spread to via cube faces
  const reachable = bfs3D(
    0,
    0,
    0,
    grid,
    generateEmptyVisited3D(grid),
    false,
    undefined,
    (y, x, z, aGrid) => aGrid[y][x][z] === true
  );
  // If we couldn't reach a particular position, mark it as if
  // it was a cube as it affects actual cubes the same way
  for (let y = 1; y <= maxY + 1; y++) {
    for (let x = 1; x <= maxX + 1; x++) {
      for (let z = 1; z <= maxZ + 1; z++) {
        if (
          !reachable.V.some(([nY, nX, nZ]) => nY === y && nX === x && nZ === z)
        ) {
          grid[y][x][z] = true;
        }
      }
    }
  }

  return input
    .map((cube) => {
      const [y, x, z] = cube;
      const filledNeighbors = neighbors3D(
        y + 1,
        x + 1,
        z + 1,
        grid,
        false
      ).filter(([nY, nX, nZ]) => grid[nY][nX][nZ]);
      return 6 - filledNeighbors.length;
    })
    .sum();
};
