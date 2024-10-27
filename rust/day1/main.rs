use std::fs::File;
use std::io::{BufRead, BufReader};

struct ReplacePairs {
    value: &'static str,
    replace: &'static str,
}

fn replace_all(string: &String, replace: &[ReplacePairs]) -> String {
    let mut result = string.clone();
    for r in replace.iter() {
        result = result.replace(r.value, r.replace);
    }
    return result;
}

fn score(line: &String) -> i32 {
    let first_digit = line
        .find(|c: char| c.is_ascii_digit())
        .map(|idx| line.chars().nth(idx).unwrap());
    let last_digit = line
        .rfind(|c: char| c.is_ascii_digit())
        .map(|idx| line.chars().nth(idx).unwrap());
    let value_str: String = format!(
        "{}{}",
        first_digit.unwrap_or('0'),
        last_digit.unwrap_or('0')
    );
    return value_str.parse().unwrap();
}

const NUMBERS: [ReplacePairs; 9] = [
    ReplacePairs {
        value: "one",
        replace: "o1e",
    },
    ReplacePairs {
        value: "two",
        replace: "t2o",
    },
    ReplacePairs {
        value: "three",
        replace: "t3e",
    },
    ReplacePairs {
        value: "four",
        replace: "f4r",
    },
    ReplacePairs {
        value: "five",
        replace: "f5e",
    },
    ReplacePairs {
        value: "six",
        replace: "s6x",
    },
    ReplacePairs {
        value: "seven",
        replace: "s7n",
    },
    ReplacePairs {
        value: "eight",
        replace: "e8t",
    },
    ReplacePairs {
        value: "nine",
        replace: "n9e",
    },
];

fn main() {
    let file = File::open("input.txt").expect("Unable to open file");
    let reader = BufReader::new(file);

    let mut total: i32 = 0;
    let mut total_2: i32 = 0;

    for line in reader.lines() {
        let line = line.expect("Unable to read from file");
        let line_2 = replace_all(&line, &NUMBERS);

        total = total + score(&line);
        total_2 = total_2 + score(&line_2);
    }

    println!("Part 1: {}", total);
    println!("Part 2: {}", total_2);
}
