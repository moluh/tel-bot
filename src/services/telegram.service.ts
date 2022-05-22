import axios from 'axios'
import * as dotenv from 'dotenv'
const result = dotenv.config()
if (result.error) throw result.error

const TOKEN = process.env.TOKEN
const GROUP_ID = process.env.GROUP_ID
const API_URL = process.env.API_URL
const SLUG = process.env.SLUG

export default class TelegramService {
    constructor() {}

    public sendMessage(data: any) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('En service, data: ', data)
                const json = {
                    chat_id: GROUP_ID,
                    parse_mode: 'HTML',
                    text: `data: ${data}`,
                }

                await axios
                    .post(`${API_URL}${SLUG}${TOKEN}/sendMessage`, json)
                    .then(function (response) {
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        reject(error)
                    })
            } catch (e) {
                reject(e)
            }
        })
    }
}
