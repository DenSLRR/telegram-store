import TelegramBot from "node-telegram-bot-api";
import {DbService} from "./db";
import {USER_STATE, UserStateValues} from "./types/state";
import {MESSAGES} from "./constatnts/messages";
import {Keyboard} from "./keybord";



export class BotResponse {
    readonly _bot: TelegramBot;
    readonly _db: DbService;
    _state: Record<string, UserStateValues> = {};

    constructor(
        private readonly bot: TelegramBot,
        private readonly db: DbService,
    ) {
        this._bot = bot;
        this._db = db;

    }

    setState (chatId: string, state: UserStateValues) {
        this._state[chatId] = state;
    }

    getState (chatId: string): UserStateValues | undefined {
        return this._state[chatId];
    }

    async start(chatId: string) {
        this.setState(chatId, USER_STATE.MAIN)

        return await this._bot.sendMessage(chatId, MESSAGES.START, Keyboard.MAIN )

    }









}