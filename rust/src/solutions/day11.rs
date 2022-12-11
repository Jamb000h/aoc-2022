use itertools::Itertools;

#[derive(Copy, Clone, Debug)]
pub struct Operation {
    op: Op,
    arg1: u64,
    arg2: u64,
}
#[derive(Copy, Clone, Debug)]
enum Op {
    MULTIPLY,
    ADD,
}
#[derive(Clone, Debug)]
pub struct Monkey {
    items: Vec<u64>,
    operation: Operation,
    test_divisor: u64,
    true_target: usize,
    false_target: usize,
}

impl Monkey {
    pub fn new(
        (items, operation, test_divisor, true_target, false_target): (
            Vec<u64>,
            Operation,
            u64,
            usize,
            usize,
        ),
    ) -> Monkey {
        Monkey {
            items,
            operation,
            test_divisor,
            true_target,
            false_target,
        }
    }

    pub fn throw_items(&mut self, worried: bool, common_multiplier: u64) -> Vec<(u64, usize)> {
        let mut thrown: Vec<(u64, usize)> = vec![];
        let worry_level_divisor = if worried { 1 } else { 3 };
        for item in &self.items {
            let mut new_worry_level =
                Self::get_worry_level(item, &self.operation) / worry_level_divisor;
            if common_multiplier > 0 {
                new_worry_level = new_worry_level % common_multiplier;
            }
            let receiving_monkey_index = if Self::test(new_worry_level, &self.test_divisor) {
                self.true_target.clone()
            } else {
                self.false_target.clone()
            };

            thrown.push((new_worry_level.clone(), receiving_monkey_index.clone()))
        }

        let _ = &self.items.clear();

        thrown
    }

    fn get_worry_level(item: &u64, op: &Operation) -> u64 {
        let arg1 = if op.arg1 == 0 { item } else { &op.arg1 };
        let arg2 = if op.arg2 == 0 { item } else { &op.arg2 };
        match op.op {
            Op::ADD => return arg1 + arg2,
            _ => return arg1 * arg2, //implies OP::MULTIPLY
        }
    }

    pub fn test(item: u64, divisor: &u64) -> bool {
        if item % divisor == 0 {
            return true;
        } else {
            return false;
        }
    }
}

pub fn parse_input(input: String) -> Vec<(Vec<u64>, Operation, u64, usize, usize)> {
    input
        .trim()
        .split("\r\n\r\n")
        .map(|m| {
            let (_, items, operation, test_divisor, true_target, false_target) =
                m.lines().collect_tuple().unwrap();

            let items: Vec<u64> = items
                .split(": ")
                .last()
                .unwrap()
                .split(", ")
                .map(|item| item.parse::<u64>().unwrap())
                .collect();

            let (arg1, op, arg2) = operation
                .split("= ")
                .last()
                .unwrap()
                .split(" ")
                .collect_tuple()
                .unwrap();

            let operation = Operation {
                arg1: arg1.parse::<u64>().or::<u64>(Ok(0)).unwrap(),
                op: match op {
                    "+" => Op::ADD,
                    _ => Op::MULTIPLY,
                },
                arg2: arg2.parse::<u64>().or::<u64>(Ok(0)).unwrap(),
            };

            let test_divisor = test_divisor
                .split(" ")
                .last()
                .unwrap()
                .parse::<u64>()
                .unwrap();

            let true_target = true_target
                .split(" ")
                .last()
                .unwrap()
                .parse::<usize>()
                .unwrap();

            let false_target = false_target
                .split(" ")
                .last()
                .unwrap()
                .parse::<usize>()
                .unwrap();

            (items, operation, test_divisor, true_target, false_target)
        })
        .collect()
}

pub fn part_1(monkeys_input: &Vec<(Vec<u64>, Operation, u64, usize, usize)>) -> u64 {
    let mut monkeys: Vec<Monkey> = monkeys_input
        .into_iter()
        .map(|m| Monkey::new(m.to_owned()))
        .collect();
    let mut inspect_amounts: Vec<usize> = vec![0; monkeys.len()];
    for _ in 0..20 {
        for i in 0..monkeys.len() {
            let throws = monkeys[i].throw_items(false, 0);
            inspect_amounts[i] += throws.len();
            throws.into_iter().for_each(|(item, target)| {
                monkeys.get_mut(target).unwrap().items.push(item);
            })
        }
    }
    inspect_amounts.sort();
    inspect_amounts.into_iter().rev().take(2).product::<usize>() as u64
}

pub fn part_2(monkeys_input: &Vec<(Vec<u64>, Operation, u64, usize, usize)>) -> u64 {
    let mut monkeys: Vec<Monkey> = monkeys_input
        .into_iter()
        .map(|m| Monkey::new(m.to_owned()))
        .collect();
    let mut inspect_amounts: Vec<usize> = vec![0; monkeys.len()];
    let common_multiplier: u64 = monkeys.iter().map(|monkey| monkey.test_divisor).product();
    for _ in 0..10000 {
        for i in 0..monkeys.len() {
            let throws = monkeys[i].throw_items(true, common_multiplier);
            inspect_amounts[i] += throws.len();
            throws.into_iter().for_each(|(item, target)| {
                monkeys.get_mut(target).unwrap().items.push(item);
            })
        }
    }
    inspect_amounts.sort();
    inspect_amounts.into_iter().rev().take(2).product::<usize>() as u64
}
