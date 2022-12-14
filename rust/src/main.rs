#[path = "solutions/day1.rs"]
mod day1;

#[path = "solutions/day2.rs"]
mod day2;

#[path = "solutions/day3.rs"]
mod day3;

#[path = "solutions/day4.rs"]
mod day4;

#[path = "solutions/day5.rs"]
mod day5;

#[path = "solutions/day6.rs"]
mod day6;

#[path = "solutions/day7.rs"]
mod day7;

#[path = "solutions/day8.rs"]
mod day8;

#[path = "solutions/day9.rs"]
mod day9;

#[path = "solutions/day10.rs"]
mod day10;

#[path = "solutions/day11.rs"]
mod day11;

#[path = "solutions/day12.rs"]
mod day12;

// #[path = "solutions/day13.rs"]
// mod day13;

#[path = "solutions/day14.rs"]
mod day14;

fn main() {
    // Day 1
    let mut input_1 = day1::parse_input(
        std::fs::read_to_string("../inputs/day1.txt").expect("Failed to read day 1 input"),
    );
    println!("Day 1 part 1: {}", day1::part_1(&input_1));
    println!("Day 1 part 2: {}", day1::part_2(&mut input_1));

    // Day 2
    let input_2 = day2::parse_input(
        std::fs::read_to_string("../inputs/day2.txt").expect("Failed to read day 2 input"),
    );
    println!("Day 2 part 1: {}", day2::part_1(&input_2));
    println!("Day 2 part 2: {}", day2::part_2(&input_2));

    // Day 3
    let input_3 = day3::parse_input(
        std::fs::read_to_string("../inputs/day3.txt").expect("Failed to read day 3 input"),
    );
    println!("Day 3 part 1: {}", day3::part_1(&input_3));
    println!("Day 3 part 2: {}", day3::part_2(&input_3));

    // Day 4
    let input_4 = day4::parse_input(
        std::fs::read_to_string("../inputs/day4.txt").expect("Failed to read day 4 input"),
    );
    println!("Day 4 part 1: {}", day4::part_1(&input_4));
    println!("Day 4 part 2: {}", day4::part_2(&input_4));

    // Day 5
    let input_5 = day5::parse_input(
        std::fs::read_to_string("../inputs/day5.txt").expect("Failed to read day 5 input"),
    );
    println!("Day 5 part 1: {}", day5::part_1(&input_5));
    println!("Day 5 part 2: {}", day5::part_2(&input_5));

    // Day 6
    let input_6 = day6::parse_input(
        std::fs::read_to_string("../inputs/day6.txt").expect("Failed to read day 6 input"),
    );
    println!("Day 6 part 1: {}", day6::part_1(&input_6));
    println!("Day 6 part 2: {}", day6::part_2(&input_6));

    // Day 7
    let input_7 = day7::parse_input(
        std::fs::read_to_string("../inputs/day7.txt").expect("Failed to read day 7 input"),
    );
    println!("Day 7 part 1: {}", day7::part_1(&input_7));
    println!("Day 7 part 2: {}", day7::part_2(&input_7));

    // Day 8
    let input_8 = day8::parse_input(
        std::fs::read_to_string("../inputs/day8.txt").expect("Failed to read day 8 input"),
    );
    println!("Day 8 part 1: {}", day8::part_1(&input_8));
    println!("Day 8 part 2: {}", day8::part_2(&input_8));

    // Day 9
    let input_9 = day9::parse_input(
        std::fs::read_to_string("../inputs/day9.txt").expect("Failed to read day 9 input"),
    );
    println!("Day 9 part 1: {}", day9::part_1(&input_9));
    println!("Day 9 part 2: {}", day9::part_2(&input_9));

    // Day 10
    let input_10 = day10::parse_input(
        std::fs::read_to_string("../inputs/day10.txt").expect("Failed to read day 10 input"),
    );
    println!("Day 10 part 1: {}", day10::part_1(&input_10));
    println!("Day 10 part 2: {}", day10::part_2(&input_10));

    // Day 11
    let input_11 = day11::parse_input(
        std::fs::read_to_string("../inputs/day11.txt").expect("Failed to read day 11 input"),
    );
    println!("Day 11 part 1: {}", day11::part_1(&input_11));
    println!("Day 11 part 2: {}", day11::part_2(&input_11));

    // Day 12
    let input_12 = day12::parse_input(
        std::fs::read_to_string("../inputs/day12.txt").expect("Failed to read day 12 input"),
    );
    println!("Day 12 part 1: {}", day12::part_1(&input_12));
    println!("Day 12 part 2: {}", day12::part_2(&input_12));

    // // Day 13
    // let input_13 = day13::parse_input(
    //     std::fs::read_to_string("../inputs/day13.txt").expect("Failed to read day 13 input"),
    // );
    // println!("Day 13 part 1: {}", day13::part_1(&input_13));
    // println!("Day 13 part 2: {}", day13::part_2(&input_13));

    // Day 14
    let input_14 = day14::parse_input(
        std::fs::read_to_string("../inputs/day14.txt").expect("Failed to read day 14 input"),
    );
    println!("Day 14 part 1: {}", day14::part_1(&input_14));
    println!("Day 14 part 2: {}", day14::part_2(&input_14));
}
