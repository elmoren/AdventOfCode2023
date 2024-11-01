use std::collections::HashMap;
use std::fs::File;
use std::io::{BufRead, BufReader};

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

    for line in reader.lines() {
        let l = line.expect("Error reading from file");
        let game = read_game(&l);

        println!("{:?}", game);
    }
}
