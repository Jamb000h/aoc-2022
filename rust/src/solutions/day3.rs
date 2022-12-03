use ::phf::phf_map;

pub fn parse_input(input: String) -> Vec<Vec<char>> {
    input
        .lines()
        .map(|x| x.chars().into_iter().collect())
        .collect()
}

pub fn part_1(rucksacks: &Vec<Vec<char>>) -> i32 {
    rucksacks
        .iter()
        .map(|rucksack| rucksack.split_at(rucksack.len() / 2))
        .map(|(compartment_1, compartment_2)| {
            compartment_1
                .iter()
                .find(|c| compartment_2.contains(c))
                .unwrap()
        })
        .map(|c| PRIORITIES.get(c).unwrap())
        .into_iter()
        .sum::<i32>()
}

pub fn part_2(rucksacks: &Vec<Vec<char>>) -> i32 {
    rucksacks
        .chunks(3)
        .into_iter()
        .map(|three_elves| {
            three_elves[0]
                .iter()
                .find(|c| three_elves[1].contains(c) && three_elves[2].contains(c))
                .unwrap()
        })
        .map(|c| PRIORITIES.get(c).unwrap())
        .into_iter()
        .sum::<i32>()
}

static PRIORITIES: phf::Map<char, i32> = phf_map! {
    'a' => 1,
    'b' => 2,
    'c' => 3,
    'd' => 4,
    'e' => 5,
    'f' => 6,
    'g' => 7,
    'h' => 8,
    'i' => 9,
    'j' => 10,
    'k' => 11,
    'l' => 12,
    'm' => 13,
    'n' => 14,
    'o' => 15,
    'p' => 16,
    'q' => 17,
    'r' => 18,
    's' => 19,
    't' => 20,
    'u' => 21,
    'v' => 22,
    'w' => 23,
    'x' => 24,
    'y' => 25,
    'z' => 26,
    'A' => 27,
    'B' => 28,
    'C' => 29,
    'D' => 30,
    'E' => 31,
    'F' => 32,
    'G' => 33,
    'H' => 34,
    'I' => 35,
    'J' => 36,
    'K' => 37,
    'L' => 38,
    'M' => 39,
    'N' => 40,
    'O' => 41,
    'P' => 42,
    'Q' => 43,
    'R' => 44,
    'S' => 45,
    'T' => 46,
    'U' => 47,
    'V' => 48,
    'W' => 49,
    'X' => 50,
    'Y' => 51,
    'Z' => 52,
};
