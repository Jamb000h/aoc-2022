import { getLines } from "../utils";

export const parseInputForDay = (file: string) =>
  getLines(file).map((x) => x.split(",").map((y) => y.split("-").map(Number)));

export const task1 = (input: number[][][]) =>
  input.filter(
    (pair) =>
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
      (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1])
  ).length;

export const task2 = (input: number[][][]) =>
  input.filter((pair) => !(pair[0][1] < pair[1][0] || pair[1][1] < pair[0][0]))
    .length;
