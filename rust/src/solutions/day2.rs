pub mod solution {
    use itertools::Itertools;

    pub fn solve() {
        let input = read_and_parse_input();
        let rounds = wrangle_input(input);
        part_1(&rounds);
        part_2(&rounds);
    }

    fn read_and_parse_input() -> Vec<String> {
        crate::utils::read_operations::read_to_lines("../inputs/day2.txt")
    }

    fn wrangle_input(input: Vec<String>) -> Vec<(char, char)> {
        let mut rounds = Vec::new();
        for row in input {
            let (opponent, _, you) = row.chars().collect_tuple().unwrap();
            rounds.push((get_shape(&opponent), get_shape(&you)))
        }
        rounds
    }

    fn get_shape(c: &char) -> char {
        match c {
            'A' | 'X' => 'R',
            'B' | 'Y' => 'P',
            _ => 'S',
        }
    }

    fn get_score_for_shape(c: &char) -> u32 {
        match c {
            'R' => 1,
            'P' => 2,
            'S' => 3,
            _ => 0,
        }
    }

    fn get_score_for_outcome((opponent, you): (&char, &char)) -> u32 {
        match (opponent, you) {
            ('R', 'P') => 6,
            ('P', 'S') => 6,
            ('S', 'R') => 6,
            ('R', 'R') => 3,
            ('P', 'P') => 3,
            ('S', 'S') => 3,
            _ => 0,
        }
    }

    fn update_outcomes(input: &Vec<(char, char)>) -> Vec<(char, char)> {
        let mut rounds = Vec::new();
        for (opponent, needed_outcome) in input {
            if needed_outcome == &'R' {
                match opponent {
                    'R' => rounds.push(('R', 'S')),
                    'P' => rounds.push(('P', 'R')),
                    _ => rounds.push(('S', 'P')),
                }
            } else if needed_outcome == &'P' {
                match opponent {
                    'R' => rounds.push(('R', 'R')),
                    'P' => rounds.push(('P', 'P')),
                    _ => rounds.push(('S', 'S')),
                }
            } else {
                match opponent {
                    'R' => rounds.push(('R', 'P')),
                    'P' => rounds.push(('P', 'S')),
                    _ => rounds.push(('S', 'R')),
                }
            }
        }
        rounds
    }

    fn part_1(input: &Vec<(char, char)>) {
        let mut total_score = 0;
        for (opponent, you) in input {
            total_score += get_score_for_shape(you) + get_score_for_outcome((opponent, you))
        }

        println!("Day 2 part 1: {}", total_score)
    }

    fn part_2(input: &Vec<(char, char)>) {
        let updated_outcomes = update_outcomes(input);
        let mut total_score = 0;
        for (opponent, you) in updated_outcomes {
            total_score += get_score_for_shape(&you) + get_score_for_outcome((&opponent, &you))
        }

        println!("Day 2 part 2: {}", total_score)
    }
}
