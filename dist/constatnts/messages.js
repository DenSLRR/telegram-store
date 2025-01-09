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
    PROVIDE_COUNT: 'Введите количество ⬇️'
};
