import "../utils";

interface Monkey {
  items: number[];
  operation: (item: number) => number;
  test: (item: number) => boolean;
  testDivisor: number;
  trueTarget: number;
  falseTarget: number;
}

export const parseInputForDay = (file: string): Monkey[] =>
  file.split("\r\n\r\n").map((monkeyLines) => {
    const monkeyParts = monkeyLines.split("\r\n");
    const items = monkeyParts[1].split(": ")[1].split(", ").map(Number);
    const operationParts = monkeyParts[2].split(" = ")[1];
    let operation: (item: number) => number;
    switch (operationParts) {
      case "old * old":
        operation = (item: number) => Math.pow(item, 2);
        break;
      default:
        operation = operationParts.includes("*")
          ? (item: number) => item * Number(operationParts.split(" ").at(-1))
          : (item: number) => item + Number(operationParts.split(" ").at(-1));
    }
    const testDivisor = Number(monkeyParts[3].split(" ").at(-1));
    const test = (item: number) => item % testDivisor === 0;
    const trueTarget = Number(monkeyParts[4].split(" ").at(-1));
    const falseTarget = Number(monkeyParts[5].split(" ").at(-1));

    return {
      items,
      operation,
      test,
      testDivisor,
      trueTarget,
      falseTarget,
    } as Monkey;
  });

export const task1 = (monkeys: Monkey[]) => {
  const inspectsPerMonkey = Array(monkeys.length).fill(0);
  for (let _ = 0; _ < 20; _++) {
    monkeys.forEach((monkey, i) => {
      inspectsPerMonkey[i] += monkey.items.length;
      monkey.items.forEach((item) => {
        const itemValue = Math.floor(monkey.operation(item) / 3);
        const targetIndex = monkey.test(itemValue)
          ? monkey.trueTarget
          : monkey.falseTarget;
        monkeys[targetIndex].items.push(itemValue);
      });
      monkey.items = [];
    });
  }
  inspectsPerMonkey.sortAscending();
  return inspectsPerMonkey.at(-2) * inspectsPerMonkey.at(-1);
};

export const task2 = (monkeys: Monkey[]) => {
  const inspectsPerMonkey = Array(monkeys.length).fill(0);
  const leastCommonMultiplier = monkeys
    .map((monkey) => monkey.testDivisor)
    .product();
  for (let _ = 0; _ < 10000; _++) {
    monkeys.forEach((monkey, i) => {
      inspectsPerMonkey[i] += monkey.items.length;
      monkey.items.forEach((item) => {
        const itemValue = monkey.operation(item) % leastCommonMultiplier;
        const targetIndex = monkey.test(itemValue)
          ? monkey.trueTarget
          : monkey.falseTarget;
        monkeys[targetIndex].items.push(itemValue);
      });
      monkey.items = [];
    });
  }
  inspectsPerMonkey.sortAscending();
  return inspectsPerMonkey.at(-2) * inspectsPerMonkey.at(-1);
};
