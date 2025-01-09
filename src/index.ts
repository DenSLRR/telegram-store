import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import {DbService} from "./db";
import {BotResponse} from "./response";
import {USER_STATE} from "./types/state";
import {BUTTONS} from "./constatnts/buttons";
import {MESSAGES} from "./constatnts/messages";


async function main () {

    if (!process.env.TG_TOKEN) {
        throw new Error('TG_TOKEN is required')
    }

    const bot = new TelegramBot(process.env.TG_TOKEN, { polling: true });
    const db = new DbService();
    const response = new BotResponse(bot, db);



    bot.on("message", async (msg) => {
        const chat_id = msg.chat.id.toString();
        const user = msg.from;
        const text = msg.text;

        if (!text || !user) return;


        const userState = response.getState(chat_id)

        if(userState) {
            switch (userState) {
                case USER_STATE.MAIN:
                    return bot.sendMessage(chat_id, MESSAGES.START);
                case USER_STATE.START_ORDER:
                    return response.orderWhatItem(chat_id, text)
                case USER_STATE.ASKING_COUNT:
                    return response.orderSetProductCount(chat_id, text)
                case USER_STATE.GET_PERSON_NAME:
                    return response.getUserName(chat_id, text)
                case USER_STATE.GET_ADDRESS:
                    return response.getUserAddress(chat_id, text)
                case USER_STATE.GET_PERSON_PHONE:
                    return response.getUserPhone(chat_id, text)
                case USER_STATE.CONFIRM_ORDER:
                    return response.confirmOrder(chat_id)

            }

        }


        switch (text) {
            case BUTTONS.VAPE:
                return await response.getVape(chat_id)
            case BUTTONS.MAIN:
                return await response.start(chat_id)
            case BUTTONS.CHECKOUT:
                return await response.startOrder(chat_id)
            case BUTTONS.ADD:
                return await response.startOrder(chat_id)
            case BUTTONS.CANCEL:
                return await response.cancel(chat_id)
            case BUTTONS.SET_ITEMS:
                return await response.startGetPersonalInfo(chat_id)

        }


        if (text == '/start') {
            return await response.start(chat_id)
        }


    })

}


main()
    .catch((e) => {
        console.log("unexpected error\n", e);
    })
    .finally(() => {
        console.log("script finished");
    });