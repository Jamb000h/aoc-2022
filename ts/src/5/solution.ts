import { pivot } from "../utils";

export const parseInputForDay = (file: string): [string[][], number[][]] => {
  const [stacksLines, instructionsLines] = file.split("\r\n\r\n");

  const stacks: string[][] = pivot(
    stacksLines.split("\r\n").map((line) => line.split(""))
  )
    .map((col) => col.filter((c) => /[A-Z]/.test(c)))
    .filter((col) => col.length > 0)
    .map((col) => col.reverse());

  const instructions: number[][] = instructionsLines
    .split("\r\n")
    .map((line) => line.match(/\d+/g).map(Number));

  return [stacks, instructions];
};

export const task1 = (input: [string[][], number[][]]) => {
  const [stacks, instructions] = input;

  return moveCrates(CraneType.CrateMover9000, stacks, instructions);
};

export const task2 = (input: [string[][], number[][]]) => {
  const [stacks, instructions] = input;

  return moveCrates(CraneType.CrateMover9001, stacks, instructions);
};

enum CraneType {
  CrateMover9000,
  CrateMover9001,
}

const moveCrates = (
  craneType: CraneType,
  stacks: string[][],
  instructions: number[][]
) => {
  const stacksClone = [...stacks];

  instructions.forEach((instruction) => {
    const [n, from, to] = instruction;
    const fromStack = stacksClone[from - 1];
    const toStack = stacksClone[to - 1];
    const crates = fromStack.splice(fromStack.length - n);

    if (craneType === CraneType.CrateMover9000) {
      toStack.push(...crates.reverse());
    } else {
      toStack.push(...crates);
    }

    stacksClone[from - 1] = fromStack;
    stacksClone[to - 1] = toStack;
  });

  return stacksClone.map((stack) => stack.pop()).join("");
};
