pub mod solution {

    pub fn solve() {
        let input = read_and_parse_input();
        let elves = wrangle_input(input);
        self::part_1(&elves);
        self::part_2(&elves);
    }

    fn read_and_parse_input() -> Vec<String> {
        crate::utils::read_operations::read_to_lines("../inputs/day1.txt")
    }

    fn wrangle_input(input: Vec<String>) -> Vec<Vec<i32>> {
        let mut elves = Vec::new();
        let mut elf = Vec::new();
        for row in input {
            if row.len() == 0 {
                elves.push(elf);
                elf = Vec::new();
            } else {
                elf.push(row.parse::<i32>().unwrap())
            }
        }
        elves.push(elf);
        elves
    }

    fn part_1(elves: &Vec<Vec<i32>>) {
        let largest: i32 = elves
            .iter()
            .map(|elf| elf.iter().sum::<i32>())
            .max()
            .unwrap();
        println!("Day 1 part 1: {}", largest)
    }

    fn part_2(elves: &Vec<Vec<i32>>) {
        let mut largest: Vec<i32> = elves.iter().map(|elf| elf.iter().sum::<i32>()).collect();
        largest.sort();
        let top_three_sum: i32 = largest.iter().rev().take(3).sum();
        println!("Day 1 part 2: {}", top_three_sum)
    }
}
