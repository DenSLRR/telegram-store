import TelegramBot from "node-telegram-bot-api";
import {DbService} from "./db";
import {USER_STATE, UserStateValues} from "./types/state";
import {MESSAGES} from "./constatnts/messages";
import {Keyboard} from "./keybord";
import {InventoryVapeProps, VAPE} from "./constatnts/inventory";
import {getRandomId} from "./utils/random-id";
import "dotenv/config";




export class BotResponse {
    readonly _bot: TelegramBot;
    readonly _db: DbService;
    _state: Record<string, UserStateValues> = {};
    _itemName: string = '';
    _itemCount: string = '';
    _order: {itemId: string, count: string}[] = [];

    _personName: string  = '';
    _personAddress: string  = '';
    _personPhone: string  = '';
    leadsId = process.env.LEADS_CHATID!


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
        // this.setState(chatId, USER_STATE.MAIN)
        return await this._bot.sendMessage(chatId, MESSAGES.START, Keyboard.MAIN )
    }

    async getVape(chatId: string) {
        for (const item of VAPE) {
            let text = `${item.name}\n\n${item.description}\n\nНомер товара: ${item.id}\nЦена: ${item.price} лей`;
            await this._bot.sendMessage(chatId, text, Keyboard.EMPTY); // Ждём завершения отправки каждого сообщения
        }

        return await this._bot.sendMessage(chatId, 'Для продолжения нажмите на кнопку ⬇️', Keyboard.CHECKOUT);
    }

    async clear (chatId: string) {
        this.setState(chatId, USER_STATE.MAIN)
        this._itemName = ''
        this._itemCount = ''
        this._order = [];
        this._personName = '';
        this._personAddress = '';
        this._personPhone = '';
    }

    async cancel(chatId: string) {
        await this.clear(chatId);

        return this.bot.sendMessage(chatId, 'Окей, давай попробуем еще раз 😇', Keyboard.MAIN);
    }



     getOrderById(orderId: number, arr: InventoryVapeProps[] ): InventoryVapeProps | null {
         const res = arr.find(item => item.id === orderId);
         if (!res) return null;
         return res;
    }

    async startOrder(chatId: string) {
        this.setState(chatId, USER_STATE.START_ORDER);

        return await this._bot.sendMessage(chatId, MESSAGES.PROVIDE_ITEM, Keyboard.EMPTY);
    }

    async orderWhatItem(chatId: string, itemId: string) {
        this._itemName = itemId;
        this.setState(chatId, USER_STATE.ASKING_COUNT);
        return await this._bot.sendMessage(chatId, MESSAGES.PROVIDE_COUNT, Keyboard.EMPTY);
    }

    async orderSetProductCount(chatId: string, count: string) {
        this._itemCount = count;
        this.setState(chatId, USER_STATE.ADD_OR_NO);

        this._order.push({
            itemId: this._itemName,
            count: this._itemCount
        });
        console.log(this._order)

        return await this._bot.sendMessage(chatId, 'Отлично!',Keyboard.ADD_OR_NO);
    }

    async startGetPersonalInfo (chatId: string) {
        this.setState(chatId, USER_STATE.GET_PERSON_NAME)

        return await this._bot.sendMessage(chatId, MESSAGES.PROVIDE_PERSON_NAME, Keyboard.EMPTY);
    }

    async getUserName(chatId: string, name: string) {
        this._personName = name;
        this.setState(chatId, USER_STATE.GET_ADDRESS);

        return await this._bot.sendMessage(chatId, MESSAGES.PROVIDE_ADDRESS, Keyboard.EMPTY);

    }



    async getUserAddress(chatId: string, address: string) {
        this._personAddress = address;
        this.setState(chatId, USER_STATE.GET_PERSON_PHONE);

        return await this._bot.sendMessage(chatId, MESSAGES.PROVIDE_PHONE, Keyboard.EMPTY);
    }

    async getUserPhone(chatId: string, phone: string) {
        this._personPhone = phone;
        this.setState(chatId, USER_STATE.CONFIRM_ORDER);
        await  this.bot.sendMessage(chatId, MESSAGES.CONFIRM_ORDER, Keyboard.CONFIRM_ORDER);
        let text = `Заказ:\n\nВаше имя: ${this._personName}\nАдрес доставки: ${this._personAddress}\nВаш номер телефона: ${this._personPhone}\n\n Вы заказали:\n\n`

        this._order.map(item => {
            const product = this.getOrderById(+item.itemId, VAPE)

            if (!product) return

            text += `${product.name} x${item.count} - ${+product.price * +item.count}\n\n`;
        })
        return await this.bot.sendMessage(chatId, text);

    }

    async confirmOrder(chatId: string) {
        const res  = {
            name: this._personName,
            address: this._personAddress,
            phone: this._personPhone,
            items: this._order,
            orderId: getRandomId()
        }
        let text = `Номер заказа: ${res.orderId}\n\nИмя: ${res.name}\nАдрес доставки: ${res.address}\nНомер телефона: ${res.phone}\n\n`;


        this._order.map(item => {
            const product = this.getOrderById(+item.itemId, VAPE)

            if (!product) return

            text += `${product.name} x${item.count} - ${+product.price * +item.count}\n\n`;
        })

        await this.bot.sendMessage(this.leadsId, text)

        await this.clear(chatId);
        return await this.bot.sendMessage(chatId, MESSAGES.CONGRATULATION, Keyboard.MAIN)
    }


}