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
                    text: buttons_1.BUTTONS.VAPE,
                },
            ],
            // [
            //     {
            //         text: BUTTONS.LIQUID,
            //     },
            // ],
            // [
            //     {
            //         text: BUTTONS.ACCESSORIES,
            //     },
            // ],
        ],
    },
};
Keyboard.CHECKOUT = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: buttons_1.BUTTONS.CHECKOUT,
                },
            ],
            [
                {
                    text: buttons_1.BUTTONS.MAIN,
                },
            ],
        ],
    },
};
Keyboard.ADD_OR_NO = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: buttons_1.BUTTONS.ADD,
                },
            ],
            [
                {
                    text: buttons_1.BUTTONS.SET_ITEMS,
                },
            ],
            [
                {
                    text: buttons_1.BUTTONS.CANCEL,
                },
            ],
        ],
    },
};
Keyboard.CONFIRM_ORDER = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: buttons_1.BUTTONS.CONFIRM,
                },
            ],
            [
                {
                    text: buttons_1.BUTTONS.CANCEL,
                },
            ],
        ],
    },
};
