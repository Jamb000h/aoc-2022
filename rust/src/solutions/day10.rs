use itertools::Itertools;

enum Op {
    NOOP,
    ADDX,
}

pub struct OpRow {
    op_type: Op,
    duration: u32,
    value: i32,
}

struct CPU {
    cycle: i32,
    x: i32,
    signal_strengths: Vec<i32>,
}

pub fn parse_input(input: String) -> Vec<OpRow> {
    input
        .lines()
        .map(|x| {
            if x.starts_with("noop") {
                return OpRow {
                    op_type: Op::NOOP,
                    duration: 1,
                    value: 0,
                };
            } else {
                return OpRow {
                    op_type: Op::ADDX,
                    duration: 2,
                    value: x.split(" ").last().unwrap().parse::<i32>().unwrap(),
                };
            }
        })
        .collect()
}

pub fn part_1(op_rows: &Vec<OpRow>) -> i32 {
    let mut a_cpu = CPU {
        cycle: 0,
        x: 1,
        signal_strengths: vec![],
    };
    op_rows.into_iter().for_each(|op_row| {
        for _ in 0..op_row.duration {
            a_cpu.cycle += 1;
            if a_cpu.cycle == 20 || a_cpu.cycle % 40 == 20 {
                a_cpu.signal_strengths.push(a_cpu.cycle * a_cpu.x);
            }
        }

        match op_row.op_type {
            Op::ADDX => a_cpu.x += op_row.value,
            _ => (),
        }
    });
    a_cpu.signal_strengths.into_iter().sum()
}

pub fn part_2(op_rows: &Vec<OpRow>) -> String {
    let mut a_cpu = CPU {
        cycle: 0,
        x: 1,
        signal_strengths: vec![],
    };

    let mut crt = vec!["."; 240];
    op_rows.into_iter().for_each(|op_row| {
        for _ in 0..op_row.duration {
            let cycle_row = a_cpu.cycle / 40;
            let cycle_col = a_cpu.cycle % 40;
            if a_cpu.x == cycle_col || a_cpu.x - 1 == cycle_col || a_cpu.x + 1 == cycle_col {
                crt[(cycle_row * 40 + cycle_col) as usize] = "#"
            }
            a_cpu.cycle += 1;
        }

        match op_row.op_type {
            Op::ADDX => a_cpu.x += op_row.value,
            _ => (),
        }
    });

    "\n".to_owned()
        + &crt
            .chunks(40)
            .map(|row| row.join(""))
            .into_iter()
            .join("\n")
}
