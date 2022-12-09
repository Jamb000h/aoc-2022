use itertools::Itertools;
use std::iter::Skip;

pub fn parse_input(input: String) -> Vec<u32> {
    let mut lines = input.lines().skip(1).into_iter();
    index_fs(&mut lines)
}

fn index_fs(input: &mut Skip<std::str::Lines>) -> Vec<u32> {
    let mut sub_dir_sizes: Vec<u32> = vec![];
    let mut size = 0;
    while let Some(cmd) = input.next() {
        if cmd.starts_with("$ ls") || cmd.starts_with("dir") {
            continue;
        }

        let parts = cmd
            .split(" ")
            .filter(|x| x != &"$")
            .collect_tuple()
            .unwrap();

        match parts {
            ("cd", "..") => break,
            ("cd", _) => {
                let current_sub_dir_sizes = index_fs(input);
                size += current_sub_dir_sizes.last().unwrap();
                sub_dir_sizes.extend(current_sub_dir_sizes);
            }
            (file_size, _) => {
                let file_size = file_size.parse::<u32>().unwrap();
                size += file_size;
            }
        }
    }
    sub_dir_sizes.push(size);
    sub_dir_sizes
}

pub fn part_1(dir_sizes: &Vec<u32>) -> u32 {
    dir_sizes.into_iter().filter(|dir| dir <= &&100000).sum()
}

pub fn part_2(dir_sizes: &Vec<u32>) -> u32 {
    let mut dir_sizes_clone = dir_sizes.clone();
    let minimum_delete_size = 30000000 - (70000000 - dir_sizes_clone.last().unwrap());
    dir_sizes_clone.sort();
    dir_sizes_clone
        .into_iter()
        .find(|dir| dir >= &minimum_delete_size)
        .unwrap()
        .clone()
}
