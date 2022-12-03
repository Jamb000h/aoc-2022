import { getLines } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file)
    .map(Number)
    .groupBy((x: number) => x > 0)
    .map((x) => x.sum());
};

export const task1 = (input: number[]) => Math.max(...input);

export const task2 = (input: number[]) =>
  input
    .sort((a, b) => a - b)
    .slice(-3)
    .sum();
