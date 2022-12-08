import "../utils";
import { getLines } from "../utils";

export const parseInputForDay = (file: string) =>
  getLines(file).map((x) => x.split("").map(Number));

export const task1 = (grid: number[][]) => {
  const visible = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (isVisible(y, x, grid)) {
        visible.push([y, x]);
      }
    }
  }

  return visible.length;
};

export const task2 = (grid: number[][]) => {
  const scenicScores = [];

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      scenicScores.push(getScenicScore(y, x, grid));
    }
  }

  return scenicScores.sortDescending()[0];
};

const getRow = (y: number, grid: number[][]) => grid[y];

const getColumn = (x: number, grid: number[][]) => grid.map((row) => row[x]);

const beforeAndAfter = (i: number, arr: number[]) => [
  arr.slice(0, i),
  arr.slice(i + 1),
];

const isVisible = (y: number, x: number, grid: number[][]) => {
  const treeHeight = grid[y][x];
  const rowParts = beforeAndAfter(x, getRow(y, grid));
  const columnParts = beforeAndAfter(y, getColumn(x, grid));

  return [...rowParts, ...columnParts].some(
    (trees) => trees.length === 0 || trees.every((tree) => tree < treeHeight)
  );
};

const getScenicScore = (x: number, y: number, grid: number[][]): number => {
  const treeHeight = grid[y][x];
  const [rowBefore, rowAfter] = beforeAndAfter(x, getRow(y, grid));
  const [columnBefore, columnAfter] = beforeAndAfter(y, getColumn(x, grid));
  return [rowBefore.reverse(), rowAfter, columnBefore.reverse(), columnAfter]
    .map((trees) => scenicScoreForDirection(treeHeight, trees))
    .product();
};

const scenicScoreForDirection = (value: number, trees: number[]): number => {
  let scenicScore = 0;
  for (const tree of trees) {
    scenicScore++;

    if (tree >= value) break;
  }

  return scenicScore;
};
