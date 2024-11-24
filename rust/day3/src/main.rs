use regex::Regex;
use std::cmp::min;
use std::fs;

#[derive(Debug)]
struct SchematicData {
    length: usize,
    width: usize,
    lines: Vec<String>,
}

#[derive(Debug)]
struct Schematic {
    data: SchematicData,
    part_list: Vec<Part>,
    gear_ratios: Vec<i32>,
}

#[derive(Debug)]
struct Part {
    row: usize,
    col: usize,
    size: usize,
    part_no: i32,
}

fn init(matrix: &str) -> Schematic {
    let lines: Vec<String> = matrix
        .split("\n")
        .map(|s| s.trim())
        .filter(|s| s.len() > 0)
        .map(|s| String::from(s))
        .collect();

    let data = SchematicData {
        length: lines.len(),
        width: lines.first().unwrap().len(),
        lines: lines,
    };

    let parts = read_parts(&data);
    let gear_ratios = find_gear_ratios(&data, &parts);

    return Schematic {
        data: data,
        part_list: parts,
        gear_ratios: gear_ratios,
    };
}

fn read_parts(data: &SchematicData) -> Vec<Part> {
    let mut parts: Vec<Part> = Vec::new();
    let re = Regex::new(r"[^0-9\.]").unwrap();

    for i in 0..data.length {
        let line = data.lines.get(i).unwrap();
        for j in 0..data.width {
            if j > 0 && line.chars().nth(j - 1).unwrap().is_digit(10) {
                continue;
            }

            let c = line.chars().nth(j).unwrap();
            if c.is_digit(10) {
                let candidate = read_number(&line[j..]);
                let mut test_str = String::new();
                let start = j.saturating_sub(1);
                let end = min(1 + j + candidate.len(), data.width);

                if i > 0 {
                    test_str.push_str(&data.lines.get(i - 1).unwrap()[start..end]);
                }

                test_str.push_str(&line[start..end]);

                if i + 1 < data.length {
                    test_str.push_str(&data.lines.get(i + 1).unwrap()[start..end]);
                }

                if re.is_match(&test_str) {
                    parts.push(Part {
                        row: i,
                        col: j,
                        size: candidate.len(),
                        part_no: candidate.parse().unwrap(),
                    });
                }
            }
        }
    }

    return parts;
}

fn find_gear_ratios(data: &SchematicData, parts_list: &Vec<Part>) -> Vec<i32> {
    let mut gears: Vec<i32> = Vec::new();

    for i in 0..data.length {
        let line = data.lines.get(i).unwrap();
        for j in 0..data.width {
            let c = line.chars().nth(j).unwrap();
            if c == '*' {
                let adj: Vec<i32> = parts_list
                    .iter()
                    .filter(|p| {
                        // Since parts only one one row, check row distance < 2
                        let row_distance = ((p.row as i32) - (i as i32)).abs();
                        // Then check if the gears column +/- 1 is within the part range 
                        return row_distance < 2 && p.col <= j + 1 && j - 1 <= p.col + p.size - 1
                    }
                    )
                    .map(|p| p.part_no)
                    .collect();

                if adj.len() == 2 {
                    gears.push(adj.into_iter().reduce(|a, b| a * b).unwrap());
                }
            }
        }
    }

    return gears;
}

fn read_number(v: &str) -> String {
    let number: String = v.chars().take_while(|s| s.is_digit(10)).collect();

    return number;
}

fn main() {
    let data = fs::read_to_string("src/input.txt").expect("Error reading file");
    let schematic: Schematic = init(&data);

    let part_1: i32 = schematic.part_list.iter().map(|p| p.part_no).sum();
    let part_2: i32 = schematic.gear_ratios.iter().sum();

    println!("Schematic {} x {}. Part Count: {}. Gear Count: {}", schematic.data.length, schematic.data.width, schematic.part_list.len(), schematic.gear_ratios.len());
    println!("Part 1: {}", part_1);
    println!("Part 2: {}", part_2);
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_IN_PT1: &str = r#"
    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..
    "#;

    const TEST_IN_PT2: &str = r#"
    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..
    "#;

    #[test]
    fn given_matrix_str_expect_initialized() {
        let schematic = init(TEST_IN_PT1);
        println!("{:#?}", schematic);
        assert_eq!(schematic.data.length, 10);
        assert_eq!(schematic.data.width, 10);
    }

    #[test]
    fn given_matrix_expect_parts_scored() {
        let schematic = init(TEST_IN_PT2);
        // println!("{:#?}", schematic.part_list);

        let v: i32 = schematic.part_list.iter().map(|p| p.part_no).sum();
        assert_eq!(v, 4361);
    }

    #[test]
    fn given_matrix_expect_gears_scored() {
        let schematic = init(TEST_IN_PT1);
        println!("{:#?}", schematic.gear_ratios);

        let v: i32 = schematic.gear_ratios.iter().sum();
        assert_eq!(v, 467835);
    }

    #[test]
    fn given_line_expect_first_number() {
        assert_eq!(read_number("12****"), "12");
        assert_eq!(read_number("123****321"), "123");
        assert_eq!(read_number("****321"), "");
        assert_eq!(read_number("****321"), "");
    }

    #[test]
    fn validate_regex() {
        let re = Regex::new(r"[^0-9\.]").unwrap();

        assert!(!re.is_match("........"));
        assert!(!re.is_match("....189...."));
        assert!(!re.is_match("189...."));
        assert!(!re.is_match("....1234"));

        assert!(re.is_match("189....*"));
        assert!(re.is_match("*189...."));
        assert!(re.is_match("189.$..."));
    }
}
