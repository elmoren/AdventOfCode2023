export interface Race {
    duration_ms: number,
    distance_mm: number
}

export function calc_distance(button_time_ms: number, race: Race): number {
    const distance_traveled = button_time_ms * (race.duration_ms - button_time_ms);
    return distance_traveled > 0 ? distance_traveled : 0;
}