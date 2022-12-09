use itertools::Itertools;

pub fn parse_input(input: String) -> Vec<(String, u32)> {
    input
        .lines()
        .map(|x| {
            let (dir, amt) = x.split(" ").collect_tuple().unwrap();
            (dir.to_string(), amt.parse::<u32>().unwrap())
        })
        .collect()
}

pub fn part_1(moves: &Vec<(String, u32)>) -> u32 {
    move_rope(moves, 2)
}

pub fn part_2(moves: &Vec<(String, u32)>) -> u32 {
    move_rope(moves, 10)
}

fn move_rope(moves: &Vec<(String, u32)>, rope_length: usize) -> u32 {
    let mut knots: Vec<(i32, i32)> = vec![(0, 0); rope_length];
    let mut tail_visited: Vec<(i32, i32)> = vec![(0, 0)];

    moves.into_iter().for_each(|(dir, amt)| {
        for _ in 0..*amt {
            match dir.as_str() {
                "U" => knots[0].0 += 1,
                "D" => knots[0].0 -= 1,
                "L" => knots[0].1 -= 1,
                _ => knots[0].1 += 1, // implies "R"
            }

            knots = knots
                .iter_mut()
                .enumerate()
                .fold(vec![], |mut new_knots: Vec<(i32, i32)>, (i, knot)| {
                    if i == 0 {
                        new_knots.push(knot.clone());
                    } else {
                        new_knots.push(move_knot(new_knots.last().unwrap().clone(), knot.clone()));
                    }
                    new_knots
                })
                .into_iter()
                .collect();

            tail_visited.push(knots.last().unwrap().clone());
        }
    });

    tail_visited.into_iter().unique().count() as u32
}

fn move_knot(head_pos: (i32, i32), tail_pos: (i32, i32)) -> (i32, i32) {
    if are_touching(head_pos, tail_pos) {
        return tail_pos.clone();
    }

    let (head_y, head_x) = head_pos;
    let (mut tail_y, mut tail_x) = tail_pos;

    if head_x < tail_x {
        tail_x -= 1;
    }

    if head_x > tail_x {
        tail_x += 1;
    }

    if head_y < tail_y {
        tail_y -= 1;
    }

    if head_y > tail_y {
        tail_y += 1;
    }

    (tail_y, tail_x)
}

fn are_touching(pos1: (i32, i32), pos2: (i32, i32)) -> bool {
    (pos1.0 - pos2.0).abs() <= 1 && (pos1.1 - pos2.1).abs() <= 1
}
