import { PrismaClient } from "@prisma/client";



export class DbService extends PrismaClient {
    constructor() {
        super();
        this.$connect();
    }











}