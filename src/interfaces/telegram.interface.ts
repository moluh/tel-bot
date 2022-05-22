export interface ITelegramResponse {
    data: ITelegramData
    status: number
    statusText: string
}

export interface ITelegramData {
    ok: boolean
    result: IResult
}

export interface IResult {
    message_id: number
    from: object
    chat: object
    date: number
    text: string
}
