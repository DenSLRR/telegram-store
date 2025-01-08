"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keyboard = void 0;
const buttons_1 = require("./constatnts/buttons");
class Keyboard {
}
exports.Keyboard = Keyboard;
Keyboard.EMPTY = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
        remove_keyboard: true,
    },
};
Keyboard.MAIN = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: buttons_1.BUTTONS.START,
                },
            ],
        ],
    },
};
