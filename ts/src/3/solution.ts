import { getLines, sumOf } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file);
};

export const task1 = (input: string[]) =>
  input
    .map((rucksack) => {
      const half1 = rucksack
        .slice(0, Math.floor(rucksack.length / 2))
        .split("");
      const half2 = rucksack.slice(Math.floor(rucksack.length / 2)).split("");
      return half1.find((x) => half2.includes(x));
    })
    .map((x) => PRIORITIES[x])
    .sum();

export const task2 = (input: string[]) =>
  input
    .map((x) => x.split(""))
    .chunks<string[]>(3)
    .map((x) => {
      const [c1, c2, c3] = x;
      return c1.find((x) => c2.includes(x) && c3.includes(x));
    })
    .map((x) => PRIORITIES[x])
    .sum();

const PRIORITIES = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};
