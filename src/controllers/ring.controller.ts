import { Request, Response, NextFunction } from 'express'
import { TelegramService } from './../services/telegram.service'

export class RingController {
    constructor() {}

    public async sendMessage(req: Request, res: Response) {
        try {
            const resp = await TelegramService.sendMessage(req.body)
            res.send(resp)
        } catch (e) {
            res.send(e)
        }
    }
}
