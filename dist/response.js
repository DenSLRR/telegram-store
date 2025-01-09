"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotResponse = void 0;
const state_1 = require("./types/state");
const messages_1 = require("./constatnts/messages");
const keybord_1 = require("./keybord");
const inventory_1 = require("./constatnts/inventory");
class BotResponse {
    constructor(bot, db) {
        this.bot = bot;
        this.db = db;
        this._state = {};
        this._itemName = '';
        this._itemCount = '';
        this._order = [];
        this._personName = '';
        this._personAddress = '';
        this._personPhone = '';
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
    async cancel(chatId) {
        this.setState(chatId, state_1.USER_STATE.MAIN);
        this._itemName = '';
        this._itemCount = '';
        this._order = [];
        this._personName = '';
        this._personAddress = '';
        this._personPhone = '';
        return this.bot.sendMessage(chatId, 'Окей, давай попробуем еще раз 😇', keybord_1.Keyboard.MAIN);
    }
    async startOrder(chatId) {
        this.setState(chatId, state_1.USER_STATE.START_ORDER);
        return await this._bot.sendMessage(chatId, messages_1.MESSAGES.PROVIDE_ITEM, keybord_1.Keyboard.EMPTY);
    }
    async orderWhatItem(chatId, itemId) {
        this._itemName = itemId;
        this.setState(chatId, state_1.USER_STATE.ASKING_COUNT);
        return await this._bot.sendMessage(chatId, messages_1.MESSAGES.PROVIDE_COUNT, keybord_1.Keyboard.EMPTY);
    }
    async orderSetProductCount(chatId, count) {
        this._itemCount = count;
        this.setState(chatId, state_1.USER_STATE.ADD_OR_NO);
        this._order.push({
            itemId: this._itemName,
            count: this._itemCount
        });
        console.log(this._order);
        return await this._bot.sendMessage(chatId, 'Отлично!', keybord_1.Keyboard.ADD_OR_NO);
    }
    async startGetPersonalInfo(chatId) {
        this.setState(chatId, state_1.USER_STATE.GET_PERSON_NAME);
        return await this._bot.sendMessage(chatId, messages_1.MESSAGES.PROVIDE_PERSON_NAME, keybord_1.Keyboard.EMPTY);
    }
    async getUserName(chatId, name) {
        this._personName = name;
        this.setState(chatId, state_1.USER_STATE.GET_ADDRESS);
        return await this._bot.sendMessage(chatId, messages_1.MESSAGES.PROVIDE_ADDRESS, keybord_1.Keyboard.EMPTY);
    }
    async getUserAddress(chatId, address) {
        this._personAddress = address;
        this.setState(chatId, state_1.USER_STATE.GET_PERSON_PHONE);
        return await this._bot.sendMessage(chatId, messages_1.MESSAGES.PROVIDE_PHONE, keybord_1.Keyboard.EMPTY);
    }
    async getUserPhone(chatId, phone) {
        this._personPhone = phone;
        this.setState(chatId, state_1.USER_STATE.CONFIRM_ORDER);
        return await this.bot.sendMessage(chatId, messages_1.MESSAGES.CONFIRM_ORDER, keybord_1.Keyboard.CONFIRM_ORDER);
    }
    async confirmOrder(chatId) {
        const res = {
            name: this._personName,
            address: this._personAddress,
            phone: this._personPhone,
            items: this._order
        };
        let text = `Ваше имя: ${this._personName}\nАдрес доставки: ${this._personAddress}\nВаш номер телефона: ${this._personPhone}\n\n`;
        return await this.bot.sendMessage(chatId, messages_1.MESSAGES.CONGRATULATION, keybord_1.Keyboard.MAIN);
    }
}
exports.BotResponse = BotResponse;
