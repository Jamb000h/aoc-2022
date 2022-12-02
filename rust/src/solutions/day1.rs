use itertools::Itertools;

pub fn parse_input(input: String) -> Vec<i32> {
    input
        .lines()
        .map(|x| x.parse::<i32>().unwrap_or(0))
        .group_by(|x| x > &0)
        .into_iter()
        .map(|(_, x)| x.into_iter().sum())
        .collect()
}

pub fn part_1(elves: &Vec<i32>) -> i32 {
    elves.iter().max().unwrap().to_owned()
}

pub fn part_2(elves: &mut Vec<i32>) -> i32 {
    elves.sort();
    elves.iter().rev().take(3).sum()
}
