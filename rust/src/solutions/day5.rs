use itertools::Itertools;

pub fn parse_input(input: String) -> (Vec<Vec<char>>, Vec<(u32, u32, u32)>) {
    let parts: Vec<&str> = input.split("\r\n\r\n").collect();
    let mut stacks: Vec<Vec<char>> = Vec::new();
    let mut instructions: Vec<(u32, u32, u32)> = Vec::new();

    // Create and fill columns with found alphabets
    parts[0].lines().enumerate().for_each(|(i, line)| {
        line.chars()
            .enumerate()
            .skip(1)
            .step_by(4)
            .for_each(|(j, c)| {
                if i == 0 {
                    stacks.push(Vec::new());
                }
                if c.is_alphabetic() {
                    stacks.get_mut((j / 4) as usize).unwrap().push(c);
                }
            })
    });

    // Reverse all columns to have the correct order for the puzzle
    stacks.iter_mut().for_each(|stack| stack.reverse());

    parts[1]
        .lines()
        .map(|line| {
            line.split(" ")
                .filter_map(|s| s.parse::<u32>().ok())
                .collect_tuple()
                .unwrap()
        }) // subtract 1 from indices to support 0-based indexing
        .for_each(|(n, from, to)| instructions.push((n, from - 1, to - 1)));

    (stacks, instructions)
}

pub fn part_1((stacks, instructions): &(Vec<Vec<char>>, Vec<(u32, u32, u32)>)) -> String {
    let mut stacks_clone = stacks.clone();
    instructions.clone().into_iter().for_each(|(n, from, to)| {
        let split_point = stacks_clone.get(from as usize).unwrap().iter().len() - (n as usize);
        let mut crates = stacks_clone
            .get_mut(from as usize)
            .unwrap()
            .split_off(split_point)
            .into_iter()
            .rev()
            .collect();

        stacks_clone
            .get_mut(to as usize)
            .unwrap()
            .append(&mut crates);
    });

    stacks_clone
        .into_iter()
        .map(|x| x.last().unwrap().clone())
        .collect()
}

pub fn part_2((stacks, instructions): &(Vec<Vec<char>>, Vec<(u32, u32, u32)>)) -> String {
    let mut stacks_clone = stacks.clone();
    instructions.clone().into_iter().for_each(|(n, from, to)| {
        let split_point = stacks_clone.get(from as usize).unwrap().iter().len() - (n as usize);
        let mut crates = stacks_clone
            .get_mut(from as usize)
            .unwrap()
            .split_off(split_point);

        stacks_clone
            .get_mut(to as usize)
            .unwrap()
            .append(&mut crates);
    });

    stacks_clone
        .into_iter()
        .map(|x| x.last().unwrap().clone())
        .collect()
}
