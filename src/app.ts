import { Config } from './config/config'
const config: Config = new Config()
import compression from 'compression'
import helmet from 'helmet'
import express from 'express'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import logger from 'morgan'
import AllRoutes from './routes'

class App {
    public app: express.Application = express()
    public allRoutes: AllRoutes = new AllRoutes()

    constructor() {
        this.init()
    }

    private init() {
        console.log('Loading Server...')
        this.configApp()
        this.allRoutes.configRoutes(this.app)
        this.listen()
    }

    private configApp(): void {
        this.app.use(logger('dev'))
        this.app.use(bodyParser.json({ type: 'application/json' }))
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(cors())
        this.app.use('/static', express.static(__dirname + '/public'))
        this.app.use(compression())
        this.app.use(helmet())

        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*')
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            )
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, PATCH, OPTIONS'
            )
            next()
        })
    }

    private listen() {
        this.app.listen(config.port, () =>
            console.log(`App listening on port: ${config.port}`)
        )
    }
}

export default new App().app
