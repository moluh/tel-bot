import { differenceInDays } from 'date-fns'
import { DaysFor } from '../interfaces/calculate.interface'

const DAYS_ACTIVE: number = 21
const DAYS_PASIVE: number = 7

const calculate = ({ last_place, last_remove }: any) => {
    let diff_days: number = 0
    let cnp: number = 0
    let cnr: number = 0

    if (last_place) {
        diff_days = differenceInDays(new Date(), new Date(last_place))
        cnr = DAYS_ACTIVE - diff_days
        cnp = DAYS_ACTIVE - diff_days + DAYS_PASIVE
    } else {
        diff_days = differenceInDays(new Date(), new Date(last_remove))
        cnr = DAYS_ACTIVE - diff_days + DAYS_PASIVE
        cnp = DAYS_ACTIVE - diff_days + DAYS_PASIVE * 2
    }

    return {
        days_for: last_place ? DaysFor.REMOVE : DaysFor.PLACE,
        diff_days,
        cnp,
        cnr,
    }
}

export default calculate
