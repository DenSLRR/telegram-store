"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotResponse = void 0;
const messages_1 = require("./constatnts/messages");
const keybord_1 = require("./keybord");
const inventory_1 = require("./constatnts/inventory");
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
        // this.setState(chatId, USER_STATE.MAIN)
        return await this._bot.sendMessage(chatId, messages_1.MESSAGES.START, keybord_1.Keyboard.MAIN);
    }
    async getVape(chatId) {
        for (const item of inventory_1.VAPE) {
            let text = `${item.name}\n\n${item.description}\n\nНомер товара: ${item.id}\nЦена: ${item.price} лей`;
            await this._bot.sendMessage(chatId, text, keybord_1.Keyboard.EMPTY); // Ждём завершения отправки каждого сообщения
        }
        return await this._bot.sendMessage(chatId, 'Для продолжения нажмите на кнопку ⬇️', keybord_1.Keyboard.CHECKOUT);
    }
}
exports.BotResponse = BotResponse;
