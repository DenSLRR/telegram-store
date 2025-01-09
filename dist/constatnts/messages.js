"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = void 0;
require("dotenv/config");
exports.MESSAGES = {
    START: `
Добро пожаловать в ${process.env.PROJECT_NAME} 💨

Посмотреть наш ассортимент вы можете тут ⬇️
    `,
    PROVIDE_ITEM: 'Введите номер товара ⬇️',
    PROVIDE_COUNT: 'Введите количество ⬇️',
    PROVIDE_PERSON_NAME: 'Введите ваше имя ⬇️',
    PROVIDE_ADDRESS: 'Введите ваш адрес ⬇️',
    PROVIDE_PHONE: 'Введите ваш номер телефона ⬇️',
    CONFIRM_ORDER: 'Пожалуйста подтвердите заказ ✅',
    CONGRATULATION: 'Спасибо за ваш заказ!🎇\n\n Наш оператор свяжется с вами в ближайшее время!📲'
};
