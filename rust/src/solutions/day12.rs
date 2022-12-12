pub fn parse_input(input: String) -> Vec<Vec<i32>> {
    input
        .lines()
        .map(|x| x.chars().map(|c| get_char_value(c)).collect())
        .collect()
}

pub fn part_1(grid: &Vec<Vec<i32>>) -> u32 {
    let mut start_index: (usize, usize) = (0, 0);
    let grid_max_y = grid.len() - 1;
    let grid_max_x = grid.get(0).unwrap().len() - 1;
    grid.into_iter().enumerate().for_each(|(y, row)| {
        row.into_iter().enumerate().for_each(|(x, col)| {
            if col == &-1 {
                start_index = (y, x);
            }
        })
    });

    let mut visited = vec![vec![false; grid[0].len()]; grid.len()];
    let mut stack = vec![(0, start_index.0, start_index.1)];
    let mut costs = vec![vec![u32::MAX; grid[0].len()]; grid.len()];
    while stack.len() > 0 {
        let (cost, y, x) = stack.pop().unwrap();
        if visited[y][x] {
            continue;
        }
        let value = grid[y][x];
        if value == 26 {
            return cost;
        }
        visited[y][x] = true;
        costs[y][x] = cost;
        get_neighbor_coords((y, x), grid_max_y, grid_max_x)
            .into_iter()
            .for_each(|(n_y, n_x)| {
                if visited[n_y][n_x] {
                    return;
                }
                let neighbor_value = grid[n_y][n_x];
                if neighbor_value - value > 1 {
                    return;
                }

                stack.push((cost + 1, n_y, n_x));
            });

        // Eww
        stack.sort_by(|(cost_a, _, _), (cost_b, _, _)| cost_b.cmp(cost_a));
    }

    0
}

pub fn part_2(grid: &Vec<Vec<i32>>) -> u32 {
    let mut start_index: (usize, usize) = (0, 0);
    let grid_max_y = grid.len() - 1;
    let grid_max_x = grid.get(0).unwrap().len() - 1;
    grid.into_iter().enumerate().for_each(|(y, row)| {
        row.into_iter().enumerate().for_each(|(x, col)| {
            if col == &26 {
                start_index = (y, x);
            }
        })
    });

    let mut visited = vec![vec![false; grid[0].len()]; grid.len()];
    let mut stack = vec![(0, start_index.0, start_index.1)];
    let mut costs = vec![vec![u32::MAX; grid[0].len()]; grid.len()];
    while stack.len() > 0 {
        let (cost, y, x) = stack.pop().unwrap();
        if visited[y][x] {
            continue;
        }
        let value = grid[y][x];
        if value == 0 || value == -1 {
            return cost;
        }
        visited[y][x] = true;
        costs[y][x] = cost;
        get_neighbor_coords((y, x), grid_max_y, grid_max_x)
            .into_iter()
            .for_each(|(n_y, n_x)| {
                if visited[n_y][n_x] {
                    return;
                }
                let neighbor_value = grid[n_y][n_x];
                if value - neighbor_value > 1 {
                    return;
                }

                stack.push((cost + 1, n_y, n_x));
            });

        // Eww
        stack.sort_by(|(cost_a, _, _), (cost_b, _, _)| cost_b.cmp(cost_a));
    }

    0
}

fn get_char_value(c: char) -> i32 {
    if c == 'E' {
        return 26;
    }

    if c == 'S' {
        return -1;
    }
    return c as i32 - 97;
}

fn get_neighbor_coords(
    coords: (usize, usize),
    grid_max_y: usize,
    grid_max_x: usize,
) -> Vec<(usize, usize)> {
    let mut neighbors = vec![];
    let (y, x) = coords;
    let min_y = if y == 0 { 0 } else { y - 1 };
    let min_x = if x == 0 { 0 } else { x - 1 };
    let max_y = (y + 1).min(grid_max_y);
    let max_x = (x + 1).min(grid_max_x);

    for yy in min_y..=max_y {
        for xx in min_x..=max_x {
            if yy != y && xx != x {
                continue;
            }

            if yy == y && xx == x {
                continue;
            }
            neighbors.push((yy, xx));
        }
    }
    neighbors
}
