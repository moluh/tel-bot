import { Request, Response, NextFunction } from 'express'
import TelegramService from './../services/telegram.service'

export class RingController {
    constructor() {}

    public async sendMessage(req: Request, res: Response) {
        const telegramService: TelegramService = new TelegramService()

        console.log('Sending msg... req.body', req.body)
        console.log('Sending msg... req', req)
        const resp = await telegramService.sendMessage(req.body)
        res.send(resp)
    }
}
