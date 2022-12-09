pub fn parse_input(input: String) -> Vec<Vec<u32>> {
    input
        .lines()
        .map(|row| row.chars().map(|x| x.to_digit(10).unwrap()).collect())
        .collect()
}

pub fn part_1(grid: &Vec<Vec<u32>>) -> usize {
    let mut visible = vec![];
    grid.iter().enumerate().for_each(|(y, row)| {
        row.into_iter().enumerate().for_each(|(x, _)| {
            let current_tree = grid[y][x];
            let col = get_col(x, grid);
            let (row_before, row_after) = row.split_at(x);
            let (col_before, col_after) = col.split_at(y);
            let row_after_without_self: Vec<&u32> = row_after.into_iter().skip(1).collect();
            let col_after_without_self: Vec<&u32> = col_after.into_iter().skip(1).collect();
            let row_before_vec = row_before.into_iter().collect();
            let col_before_vec = col_before.into_iter().collect();
            visible.push(
                vec![
                    row_before_vec,
                    row_after_without_self,
                    col_before_vec,
                    col_after_without_self,
                ]
                .into_iter()
                .find(|trees| {
                    trees.len() == 0 || trees.into_iter().all(|tree| tree < &&current_tree)
                })
                .is_some(),
            );
        })
    });

    visible.into_iter().filter(|tree| *tree).count()
}

pub fn part_2(grid: &Vec<Vec<u32>>) -> u32 {
    let mut scenic_scores = vec![];
    grid.iter().enumerate().for_each(|(y, row)| {
        row.into_iter().enumerate().for_each(|(x, _)| {
            let tree_height = grid[y][x];
            let col = get_col(x, grid);
            let (row_before, row_after) = row.split_at(x);
            let (col_before, col_after) = col.split_at(y);
            let row_after_without_self: Vec<&u32> = row_after.into_iter().skip(1).collect();
            let col_after_without_self: Vec<&u32> = col_after.into_iter().skip(1).collect();
            let row_before_vec: Vec<&u32> = row_before.into_iter().rev().collect();
            let col_before_vec: Vec<&u32> = col_before.into_iter().rev().collect();
            scenic_scores.push(
                vec![
                    row_after_without_self,
                    col_after_without_self,
                    row_before_vec,
                    col_before_vec,
                ]
                .into_iter()
                .map(|trees| {
                    let mut scenic_score = 0;
                    for tree in trees {
                        scenic_score += 1;

                        if tree >= &tree_height {
                            break;
                        }
                    }

                    scenic_score
                })
                .product(),
            )
        })
    });

    scenic_scores.sort();
    scenic_scores.reverse();
    scenic_scores[0]
}

fn get_col(x: usize, grid: &Vec<Vec<u32>>) -> Vec<u32> {
    grid.into_iter().map(|row| row[x]).collect()
}
