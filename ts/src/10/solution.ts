import { getLines } from "../utils";

export const parseInputForDay = (file: string) =>
  getLines(file)
    .map((row) => {
      const parts = row.split(" ");
      if (parts.length > 1) {
        return ["noop", Number(parts[1])];
      }

      return ["noop"];
    })
    .flat();

export const task1 = (input: any) => {
  let x = 1;
  let cycle = 0;
  const signalStrengths = [];
  input.forEach((cmd) => {
    cycle++;

    if (cycle === 20 || cycle % 40 === 20) {
      signalStrengths.push(x * cycle);
    }

    if (cmd !== "noop") {
      x += cmd;
    }
  });

  return signalStrengths.sum();
};

export const task2 = (input: any) => {
  let x = 1;
  let cycle = 0;
  const crt = new Array(240).fill(".");
  input.forEach((cmd) => {
    const spriteLocation = [x - 1, x, x + 1];
    const cycleCol = cycle % 40;

    if (spriteLocation.includes(cycleCol)) {
      crt[cycle] = "#";
    }

    cycle++;

    if (cmd !== "noop") {
      x += cmd;
    }
  });

  return ["", ...crt.chunks(40).map((row) => row.join(""))].join("\n");
};
