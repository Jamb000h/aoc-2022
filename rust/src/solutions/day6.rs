use itertools::Itertools;

pub fn parse_input(input: String) -> Vec<char> {
    input.chars().filter(|c| c.is_alphabetic()).collect()
}

pub fn part_1(signal: &Vec<char>) -> usize {
    find_marker_index(signal, 4)
}

pub fn part_2(signal: &Vec<char>) -> usize {
    find_marker_index(signal, 14)
}

fn find_marker_index(signal: &Vec<char>, message_size: usize) -> usize {
    signal
        .windows(message_size)
        .find_position(|cs| cs.iter().all_unique())
        .unwrap()
        .0
        + (message_size as usize)
}
