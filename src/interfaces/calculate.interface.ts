export interface ICalculate {
    diff_days: number
    days_for: DaysFor
    countdown_next_place: number
    countdown_next_remove: number
}

export enum DaysFor {
    REMOVE,
    PLACE,
}
