use std::collections::HashMap;
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::cmp;

#[derive(Debug)]
struct Grab {
    red: i32,
    green: i32,
    blue: i32,
}

#[derive(Debug)]
struct Game {
    game_number: i32,
    grabs: Vec<Grab>,
}

trait ScoreGame {
    fn score_part_one(&self) -> i32;
    fn score_part_two(&self) -> i32;
}

impl ScoreGame for Game {
    fn score_part_one(&self) -> i32 {
        let (red, green, blue) = (12, 13, 14);

        let invalid = self
            .grabs
            .iter()
            .any(|g| g.red > red || g.green > green || g.blue > blue);

        if invalid {
            0
        } else {
            self.game_number
        }
    }

    fn score_part_two(&self) -> i32 {
        let tuple = self.grabs
            .iter()
            .fold((0, 0, 0), |acc, g| {
                (
                    cmp::max(acc.0, g.red),
                    cmp::max(acc.1, g.green),
                    cmp::max(acc.2, g.blue)
                )
            });

        tuple.0 * tuple.1 * tuple.2
    }
}

fn read_game(game: &String) -> Game {
    let mut splits = game.split(":");
    let game_num: i32 = splits
        .nth(0)
        .unwrap()
        .split(" ")
        .nth(1)
        .unwrap()
        .parse()
        .unwrap();

    let grabs: Vec<Grab> = splits
        .nth(0)
        .unwrap()
        .split(";")
        .map(|grab| grab.trim())
        .map(|grab| read_grab(&grab))
        .collect();

    return Game {
        game_number: game_num,
        grabs: grabs,
    };
}

fn read_grab(grab: &str) -> Grab {
    let splits: HashMap<_, _> = grab
        .split(",")
        .map(|s| s.trim().split(" "))
        .map(|mut s| {
            let num = s.next().unwrap().parse().unwrap_or(0);
            let color = s.next().unwrap();
            (color, num)
        })
        .collect();

    return Grab {
        red: splits.get("red").cloned().unwrap_or(0),
        green: splits.get("green").cloned().unwrap_or(0),
        blue: splits.get("blue").cloned().unwrap_or(0),
    };
}

fn main() {
    let file = File::open("input.txt").expect("Unable to open file");
    let reader = BufReader::new(file);

    let mut part_one: i32 = 0;
    let mut part_two: i32 = 0;

    for line in reader.lines() {
        let l = line.expect("Error reading from file");
        let game = read_game(&l);

        // println!("{l} -> {:?} : {}", game, game.score_part_one());
        part_one += game.score_part_one();
        part_two += game.score_part_two();
    }

    println!("Part one: {part_one}");
    println!("Part two: {part_two}");
}
