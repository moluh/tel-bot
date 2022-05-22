import express from 'express'
import { RingController } from '../controllers/ring.controller'

export class RingRouter {
    public controller: RingController = new RingController()

    public routes(app: express.Application) {
        app.route('/api/v1/ring').post(this.controller.sendMessage)
    }
}
