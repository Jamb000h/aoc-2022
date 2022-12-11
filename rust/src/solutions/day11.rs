use std::cell::RefCell;

use itertools::Itertools;

#[derive(Copy, Clone, Debug)]
struct Operation {
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

pub fn parse_input(input: String) -> Vec<RefCell<Monkey>> {
    let mut monkeys: Vec<RefCell<Monkey>> = vec![];
    input.trim().split("\r\n\r\n").for_each(|m| {
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

        monkeys.push(RefCell::new(Monkey {
            items,
            operation,
            test_divisor,
            true_target,
            false_target,
        }));
    });

    monkeys
}

pub fn part_1(monkeys: &Vec<RefCell<Monkey>>) -> u64 {
    let mut inspect_amounts: Vec<usize> = vec![0; monkeys.len()];
    for _ in 0..20 {
        for (i, monkey) in monkeys.into_iter().enumerate() {
            let mut borrowed_monkey = monkey.borrow_mut();
            inspect_amounts[i] += borrowed_monkey.items.len();
            for item in &borrowed_monkey.items {
                let new_worry_level = get_worry_level(item.clone(), borrowed_monkey.operation) / 3;
                let receiving_monkey_index =
                    if monkey_test(new_worry_level, borrowed_monkey.test_divisor) {
                        borrowed_monkey.true_target
                    } else {
                        borrowed_monkey.false_target
                    };

                monkeys
                    .get(receiving_monkey_index)
                    .unwrap()
                    .borrow_mut()
                    .items
                    .push(new_worry_level);
            }

            borrowed_monkey.items = vec![];
        }
    }
    inspect_amounts.sort();
    inspect_amounts.into_iter().rev().take(2).product::<usize>() as u64
}

pub fn part_2(monkeys: &Vec<RefCell<Monkey>>) -> u64 {
    let mut inspect_amounts: Vec<usize> = vec![0; monkeys.len()];
    let common_multiplier: u64 = monkeys
        .iter()
        .map(|monkey| monkey.borrow().test_divisor)
        .product();
    for round in 0..10000 {
        for (i, monkey) in monkeys.into_iter().enumerate() {
            let mut borrowed_monkey = monkey.borrow_mut();
            inspect_amounts[i] += borrowed_monkey.items.len();
            for item in &borrowed_monkey.items {
                let new_worry_level = get_worry_level(item.clone(), borrowed_monkey.operation);
                let receiving_monkey_index =
                    if monkey_test(new_worry_level, borrowed_monkey.test_divisor) {
                        borrowed_monkey.true_target
                    } else {
                        borrowed_monkey.false_target
                    };
                let new_worry_level = new_worry_level % common_multiplier;
                monkeys
                    .get(receiving_monkey_index)
                    .unwrap()
                    .borrow_mut()
                    .items
                    .push(new_worry_level);
            }

            borrowed_monkey.items = vec![];
        }
    }
    inspect_amounts.sort();
    inspect_amounts.into_iter().rev().take(2).product::<usize>() as u64
}

fn get_worry_level(item: u64, op: Operation) -> u64 {
    let arg1 = if op.arg1 == 0 { item } else { op.arg1 };
    let arg2 = if op.arg2 == 0 { item } else { op.arg2 };
    match op.op {
        Op::ADD => return arg1 + arg2,
        _ => return arg1 * arg2, //implies OP::MULTIPLY
    }
}

pub fn monkey_test(item: u64, divisor: u64) -> bool {
    if item % divisor == 0 {
        return true;
    } else {
        return false;
    }
}
