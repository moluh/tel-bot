import * as dotenv from 'dotenv'
const result = dotenv.config()
if (result.error) {
    throw result.error
}

export class Config {
    private readonly env: NodeJS.ProcessEnv = process.env

    constructor() {}

    private getValue(key: string, throwOnMissing = true): string | any {
        const value = this.env[key]

        if (!value && throwOnMissing)
            throw new Error(`Missing .env VALUE: \n${key}\n`)

        return value
    }

    public ensureValues(keys: string[]) {
        keys.forEach((k) => this.getValue(k, true))
        return this
    }

    get nodeEnv(): string {
        return String(this.env.ENV)
    }

    get port(): number {
        return Number(this.env.PORT)
    }
}

new Config().ensureValues(['ENV', 'PORT', 'API_URL', 'TOKEN', 'GROUP_ID'])
