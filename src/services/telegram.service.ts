import axios from 'axios'
import { add, format } from 'date-fns'
import * as dotenv from 'dotenv'
import calculate from '../helpers/calculateData'
import { IBodyRequest } from '../interfaces/body.interface'
import { ICalculate } from '../interfaces/calculate.interface'
import { ITelegramData } from '../interfaces/telegram.interface'
const result = dotenv.config()
if (result.error) throw result.error

const TOKEN = process.env.TOKEN
const GROUP_ID = process.env.GROUP_ID
const API_URL = process.env.API_URL
const SLUG = process.env.SLUG

export class TelegramService {
    constructor() {}

    public static async sendMessage(body: IBodyRequest): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const calc = calculate({ ...body })
            const data: ICalculate = {
                diff_days: calc.diff_days,
                days_for: calc.days_for,
                countdown_next_place: calc.cnp,
                countdown_next_remove: calc.cnr,
            }

            let fc1: Date | string = add(new Date(), {
                days: data.countdown_next_place,
            })
            let fc2: Date | string = add(new Date(), {
                days: data.countdown_next_remove,
            })
            fc1 = format(fc1, 'dd/MM/yyyy')
            fc2 = format(fc2, 'dd/MM/yyyy')

            const json = {
                chat_id: GROUP_ID,
                parse_mode: 'HTML',
                text: `
User: <b>${body.username || 'Indocumentad@'}</b>
Fecha: <b>${format(new Date(), 'EEEE dd MMM yyyy')}</b>
Poner anillo: <b> En ${data.countdown_next_place} días (${fc1})</b>
Sacar anillo: <b> En ${data.countdown_next_remove} días (${fc2})</b>
Descripción: <b> Hace ${data.diff_days} días te ${
                    body.last_place ? 'PUSISTE' : 'SACASTE'
                }  el anillo.</b>
`,
            }

            const res = await axios.post<ITelegramData>(
                `${API_URL}${SLUG}${TOKEN}/sendMessage`,
                json
            )
            if (res.data.ok) resolve(res.data.result)
            else reject(res.data)
        })
    }
}
