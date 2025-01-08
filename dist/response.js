"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotResponse = void 0;
const state_1 = require("./types/state");
const messages_1 = require("./constatnts/messages");
const keybord_1 = require("./keybord");
class BotResponse {
    constructor(bot, db) {
        this.bot = bot;
        this.db = db;
        this._state = {};
        this._bot = bot;
        this._db = db;
    }
    setState(chatId, state) {
        this._state[chatId] = state;
    }
    getState(chatId) {
        return this._state[chatId];
    }
    async start(chatId) {
        this.setState(chatId, state_1.USER_STATE.MAIN);
        return await this._bot.sendMessage(chatId, messages_1.MESSAGES.START, keybord_1.Keyboard.MAIN);
    }
}
exports.BotResponse = BotResponse;
