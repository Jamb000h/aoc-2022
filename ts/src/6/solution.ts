import "../utils";

export const parseInputForDay = (file: string): any[] => {
  return file.split("");
};

export const task1 = (signal: string[]) => findMarkerIndex(signal, 4);

export const task2 = (signal: string[]) => findMarkerIndex(signal, 14);

const findMarkerIndex = (message: string[], messageSize: number) =>
  message
    .windows(messageSize)
    .findIndex((w) => new Set(w).size === messageSize) + messageSize;
