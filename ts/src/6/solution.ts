import "../utils";

export const parseInputForDay = (file: string): any[] => {
  return file.split("");
};

export const task1 = (input: string[]) =>
  input.windows(4).findIndex((w) => new Set(w).size === 4) + 4;

export const task2 = (input: string[]) =>
  input.windows(14).findIndex((w) => new Set(w).size === 14) + 14;
