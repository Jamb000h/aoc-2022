use itertools::Itertools;

pub fn parse_input(input: String) -> Vec<char> {
    input.chars().filter(|c| c.is_alphabetic()).collect()
}

pub fn part_1(signal: &Vec<char>) -> usize {
    signal
        .windows(4)
        .find_position(|cs| cs.iter().all_unique())
        .unwrap()
        .0
        + (4 as usize)
}

pub fn part_2(signal: &Vec<char>) -> usize {
    signal
        .windows(14)
        .find_position(|cs| cs.iter().all_unique())
        .unwrap()
        .0
        + (14 as usize)
}
