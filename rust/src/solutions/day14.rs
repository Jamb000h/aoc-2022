use std::collections::HashMap;

use itertools::Itertools;

pub fn parse_input(input: String) -> Vec<Vec<(usize, usize)>> {
    input
        .lines()
        .map(|line| {
            line.split(" -> ")
                .map(|pair| {
                    pair.split(",")
                        .map(|coord| coord.parse::<usize>().unwrap())
                        .collect_tuple()
                        .unwrap()
                })
                .collect()
        })
        .collect()
}

pub fn part_1(paths: &Vec<Vec<(usize, usize)>>) -> u32 {
    let mut filled: [[bool; 1000]; 1000] = [[false; 1000]; 1000];
    let lowest_y = fill_paths(&mut filled, paths);
    let mut rocks = 0;

    loop {
        // Generate rock
        let mut sand_pos = (0, 500);
        filled[0][500] = true;

        // and it falls
        loop {
            let (y, x) = sand_pos;
            // It falls here
            let (next_y, next_x) = rock_next_pos(&filled, sand_pos, lowest_y);
            // Did not move
            if next_y == y && next_x == x {
                break;
            }

            filled[next_y][next_x] = true;
            filled[y][x] = false;
            sand_pos = (next_y, next_x);

            // Free fall
            if next_y >= lowest_y {
                break;
            }
        }
        // Free fall
        if sand_pos.0 >= lowest_y {
            break;
        }
        rocks += 1;
    }

    rocks
}

pub fn part_2(paths: &Vec<Vec<(usize, usize)>>) -> u32 {
    let mut filled: [[bool; 1000]; 1000] = [[false; 1000]; 1000];
    let lowest_y = fill_paths(&mut filled, paths);
    let mut rocks = 0;

    loop {
        // Generate rock
        let mut sand_pos = (0, 500);
        filled[0][500] = true;

        // and it falls
        loop {
            let (y, x) = sand_pos;
            // It falls here
            let (next_y, next_x) = rock_next_pos(&filled, sand_pos, lowest_y);
            // Did not move
            if next_y == y && next_x == x {
                break;
            }

            filled[next_y][next_x] = true;
            filled[y][x] = false;
            sand_pos = (next_y, next_x);
        }
        rocks += 1;
        // All full
        if sand_pos.0 == 0 && sand_pos.1 == 500 {
            break;
        }
    }
    rocks
}

fn rock_next_pos(
    filled: &[[bool; 1000]; 1000],
    cur_pos: (usize, usize),
    lowest_y: usize,
) -> (usize, usize) {
    if cur_pos.0 > lowest_y {
        return cur_pos;
    }
    // Straight down
    if !filled[cur_pos.0 + 1][cur_pos.1] {
        return (cur_pos.0 + 1, cur_pos.1);
    }

    // Down and left
    // println!("{:?}", cur_pos);
    if !filled[cur_pos.0 + 1][cur_pos.1 - 1] {
        return (cur_pos.0 + 1, cur_pos.1 - 1);
    }

    // Down and right
    if !filled[cur_pos.0 + 1][cur_pos.1 + 1] {
        return (cur_pos.0 + 1, cur_pos.1 + 1);
    }

    // Nada
    cur_pos
}

fn fill_paths(filled: &mut [[bool; 1000]; 1000], paths: &Vec<Vec<(usize, usize)>>) -> usize {
    let mut lowest_y = 0;
    // Fill paths
    paths.into_iter().for_each(|path| {
        path.windows(2).for_each(|pair| {
            let (x1, y1) = pair.get(0).unwrap();
            let (x2, y2) = pair.get(1).unwrap();
            let min_y = y1.min(y2).clone();
            let max_y = y1.max(y2).clone();
            let min_x = x1.min(x2).clone();
            let max_x = x1.max(x2).clone();

            for y in min_y..=max_y {
                for x in min_x..=max_x {
                    filled[y][x] = true;
                }
                if y > lowest_y {
                    lowest_y = y;
                }
            }
        })
    });

    lowest_y
}
