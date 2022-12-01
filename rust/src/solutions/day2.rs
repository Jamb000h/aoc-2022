pub mod solution {
    pub fn solve() {
        let input = self::read_and_parse_input();
        self::part_1(input.clone());
        self::part_2(input.clone());
    }

    fn read_and_parse_input() -> Vec<(String, u32)> {
        let file_path = "./src/inputs/day2.txt";
        let input: Vec<(String, u32)> = crate::utils::read_operations::read_to_lines(file_path)
            .iter()
            .map(|row| {
                let parts: Vec<&str> = row.split_whitespace().collect();
                (parts[0].to_string(), parts[1].parse::<u32>().unwrap())
            })
            .collect();
        input
    }

    fn part_1(input: Vec<(String, u32)>) {
        let mut depth = 0;
        let mut pos = 0;

        for (cmd, val) in input {
            match cmd.as_str() {
                "forward" => pos += val,
                "up" => depth -= val,
                "down" => depth += val,
                _ => (),
            }
        }

        println!("Day 2 part 1: {}", depth * pos)
    }

    fn part_2(input: Vec<(String, u32)>) {
        let mut aim = 0;
        let mut depth = 0;
        let mut pos = 0;

        for (cmd, val) in input {
            match cmd.as_str() {
                "forward" => {
                    pos += val;
                    depth += aim * val
                }
                "up" => aim -= val,
                "down" => aim += val,
                _ => (),
            }
        }

        println!("Day 2 part 2: {}", depth * pos)
    }
}
