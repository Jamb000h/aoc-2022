import { getLines } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file);
};

export const task1 = (input: string[]) =>
  Math.max(
    ...input
      .reduce(
        (prev, cur) => {
          if (cur.length === 0) {
            return [...prev, []];
          }
          const cloned = [...prev];
          cloned[cloned.length - 1].push(Number(cur));
          return cloned;
        },
        [[]]
      )
      .map((x) => x.reduce((prev, cur) => prev + cur, 0))
  );

export const task2 = (input: string[]) =>
  input
    .reduce(
      (prev, cur) => {
        if (cur.length === 0) {
          return [...prev, []];
        }
        const cloned = [...prev];
        cloned[cloned.length - 1].push(Number(cur));
        return cloned;
      },
      [[]]
    )
    .map((x) => x.reduce((prev, cur) => prev + cur, 0))
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((prev, cur) => prev + cur, 0);
