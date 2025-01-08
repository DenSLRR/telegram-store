import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import {DbService} from "./db";
import {BotResponse} from "./response";
import {USER_STATE} from "./types/state";
import {BUTTONS} from "./constatnts/buttons";


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
                    // return await response.start(chat_id);
                    return bot.sendMessage(chat_id, 'hello');
            }

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