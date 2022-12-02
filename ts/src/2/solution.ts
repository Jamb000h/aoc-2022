import { getLines } from "../utils";

type Row = [String, String];
type RPS = "R" | "P" | "S";
type Round = [RPS, RPS];

export const parseInputForDay = (file: string): Round[] => {
  return normalizeInputs(
    getLines(file).map((row) => row.split(" ")) as unknown as Row[]
  );
};

export const task1 = (input: Round[]) =>
  input.map(getScore).reduce((prev, cur) => prev + cur, 0);

export const task2 = (input: Round[]) =>
  input
    .map(fixMove)
    .map(getScore)
    .reduce((prev, cur) => prev + cur, 0);

const normalizeInputs = (inputs: Row[]): Round[] =>
  inputs.map((row) => {
    return row.map(normalizeInput) as Round;
  });

const normalizeInput = (input: String): RPS => {
  switch (input) {
    case "A":
    case "X":
      return "R";
    case "B":
    case "Y":
      return "P";
    default:
      return "S";
  }
};

const getScore = (round: Round): number => {
  const [_, you] = round;
  const shapeScore = getShapeScore(you);
  const resultScore = getResultScore(round);
  return shapeScore + resultScore;
};

const getShapeScore = (shape: RPS) => {
  switch (shape) {
    case "R":
      return 1;
    case "P":
      return 2;
    case "S":
      return 3;
  }
};

const getResultScore = (round: Round): number => {
  switch (round.join("")) {
    case "RP":
    case "SR":
    case "PS":
      return 6;
    case "RR":
    case "SS":
    case "PP":
      return 3;
    default:
      return 0;
  }
};

const fixMove = (round: Round): Round => {
  const [opponent, move] = round;

  switch (move) {
    case "R":
      return [opponent, getLosingMove(opponent)];
    case "P":
      return [opponent, opponent];
    case "S":
      return [opponent, getWinningMove(opponent)];
  }
};

const getLosingMove = (move: RPS): RPS => {
  switch (move) {
    case "R":
      return "S";
    case "P":
      return "R";
    default:
      return "P";
  }
};

const getWinningMove = (move: RPS): RPS => {
  switch (move) {
    case "R":
      return "P";
    case "P":
      return "S";
    default:
      return "R";
  }
};
