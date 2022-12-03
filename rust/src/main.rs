#[path = "solutions/day1.rs"]
mod day1;

#[path = "solutions/day2.rs"]
mod day2;

#[path = "solutions/day3.rs"]
mod day3;

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

    // Day 2
    let input_3 = day3::parse_input(
        std::fs::read_to_string("../inputs/day3.txt").expect("Failed to read day 3 input"),
    );
    println!("Day 3 part 1: {}", day3::part_1(&input_3));
    println!("Day 3 part 2: {}", day3::part_2(&input_3));
}
