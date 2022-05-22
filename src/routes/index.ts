import express from 'express'
import { RingRouter } from './../routes/ring.route'

export default class AllRoutes {
    ringRoutes: RingRouter = new RingRouter()

    constructor() {}

    public configRoutes(app: express.Application) {
        this.ringRoutes.routes(app)
    }
}
