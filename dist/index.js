"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const db_1 = require("./db");
const response_1 = require("./response");
const state_1 = require("./types/state");
const buttons_1 = require("./constatnts/buttons");
const messages_1 = require("./constatnts/messages");
async function main() {
    if (!process.env.TG_TOKEN) {
        throw new Error('TG_TOKEN is required');
    }
    const bot = new node_telegram_bot_api_1.default(process.env.TG_TOKEN, { polling: true });
    const db = new db_1.DbService();
    const response = new response_1.BotResponse(bot, db);
    bot.on("message", async (msg) => {
        const chat_id = msg.chat.id.toString();
        const user = msg.from;
        const text = msg.text;
        if (!text || !user)
            return;
        const userState = response.getState(chat_id);
        if (userState) {
            switch (userState) {
                case state_1.USER_STATE.MAIN:
                    return bot.sendMessage(chat_id, messages_1.MESSAGES.START);
                case state_1.USER_STATE.START_ORDER:
                    return response.orderWhatItem(chat_id, text);
                case state_1.USER_STATE.ASKING_COUNT:
                    return response.orderSetProductCount(chat_id, text);
                case state_1.USER_STATE.GET_PERSON_NAME:
                    return response.getUserName(chat_id, text);
                case state_1.USER_STATE.GET_ADDRESS:
                    return response.getUserAddress(chat_id, text);
                case state_1.USER_STATE.GET_PERSON_PHONE:
                    return response.getUserPhone(chat_id, text);
                case state_1.USER_STATE.CONFIRM_ORDER:
                    return response.confirmOrder(chat_id);
            }
        }
        switch (text) {
            case buttons_1.BUTTONS.VAPE:
                return await response.getVape(chat_id);
            case buttons_1.BUTTONS.MAIN:
                return await response.start(chat_id);
            case buttons_1.BUTTONS.CHECKOUT:
                return await response.startOrder(chat_id);
            case buttons_1.BUTTONS.ADD:
                return await response.startOrder(chat_id);
            case buttons_1.BUTTONS.CANCEL:
                return await response.cancel(chat_id);
            case buttons_1.BUTTONS.SET_ITEMS:
                return await response.startGetPersonalInfo(chat_id);
        }
        if (text == '/start') {
            return await response.start(chat_id);
        }
    });
}
main()
    .catch((e) => {
    console.log("unexpected error\n", e);
})
    .finally(() => {
    console.log("script finished");
});
