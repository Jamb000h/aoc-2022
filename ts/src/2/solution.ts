import { getLines } from "../utils";

type RPS = "R" | "P" | "S";
type Round = [RPS, RPS];

export const parseInputForDay = (file: string): Round[] =>
  getLines(file).map(rowToRound);

export const task1 = (rounds: Round[]) => rounds.map(getRoundScore).sum();

export const task2 = (rounds: Round[]) =>
  rounds.map(fixMove).map(getRoundScore).sum();

const rowToRound = (row: string) => row.split(" ").map(normalizeInput) as Round;

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

const getRoundScore = (round: Round): number => {
  const [_, you] = round;
  return getShapeScore(you) + getResultScore(round);
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
