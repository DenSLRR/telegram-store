"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbService = void 0;
const client_1 = require("@prisma/client");
class DbService extends client_1.PrismaClient {
    constructor() {
        super();
        this.$connect();
    }
}
exports.DbService = DbService;
