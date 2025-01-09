import {ParseMode} from "node-telegram-bot-api";
import {BUTTONS} from "./constatnts/buttons";



export class Keyboard {
    static EMPTY = {
        parse_mode: "HTML" as ParseMode,
        disable_web_page_preview: true,
        reply_markup: {
            remove_keyboard: true,
        },
    };

    static MAIN  = {
        parse_mode: "HTML" as ParseMode,
        disable_web_page_preview: true,
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [
                    {
                        text: BUTTONS.VAPE,
                    },
                ],
                [
                    {
                        text: BUTTONS.LIQUID,
                    },
                ],
                [
                    {
                        text: BUTTONS.ACCESSORIES,
                    },
                ],
            ],
        },
    }
    static CHECKOUT  = {
        parse_mode: "HTML" as ParseMode,
        disable_web_page_preview: true,
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [
                    {
                        text: BUTTONS.CHECKOUT,
                    },
                ],
                [
                    {
                        text: BUTTONS.MAIN,
                    },
                ],
            ],
        },
    }
    static ADD_OR_NO  = {
        parse_mode: "HTML" as ParseMode,
        disable_web_page_preview: true,
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [
                    {
                        text: BUTTONS.ADD,
                    },
                ],
                [
                    {
                        text: BUTTONS.SET_ITEMS,
                    },
                ],
                [
                    {
                        text: BUTTONS.CANCEL,
                    },
                ],
            ],
        },
    }


}