pub fn parse_input(input: String) -> Vec<Vec<Vec<i32>>> {
    input
        .lines()
        .map(|x| {
            x.split(",")
                .map(|y| y.split("-").map(|z| z.parse::<i32>().unwrap()).collect())
                .collect()
        })
        .collect()
}

pub fn part_1(assignment_pairs: &Vec<Vec<Vec<i32>>>) -> i32 {
    assignment_pairs
        .into_iter()
        .filter(|pair| {
            (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1])
                || (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1])
        })
        .count() as i32
}

pub fn part_2(assignment_pairs: &Vec<Vec<Vec<i32>>>) -> i32 {
    assignment_pairs
        .into_iter()
        .filter(|pair| !(pair[0][1] < pair[1][0] || pair[1][1] < pair[0][0]))
        .count() as i32
}
