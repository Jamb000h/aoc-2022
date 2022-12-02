use itertools::Itertools;

pub mod read_operations {
    pub fn read_to_vec_i32(file_path: &str) -> Vec<i32> {
        std::fs::read_to_string(file_path)
            .unwrap()
            .lines()
            .map(|row| row.parse::<i32>().unwrap())
            .collect()
    }

    pub fn read_to_vec_i64(file_path: &str) -> Vec<i64> {
        std::fs::read_to_string(file_path)
            .unwrap()
            .lines()
            .map(|row| row.parse::<i64>().unwrap())
            .collect()
    }

    pub fn read_to_lines(file_path: &str) -> Vec<String> {
        std::fs::read_to_string(file_path)
            .unwrap()
            .lines()
            .map(|row| row.to_owned())
            .collect()
    }
}
