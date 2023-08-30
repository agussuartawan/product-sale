import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MongooseModule } from "@nestjs/mongoose"
import { SaleModule } from "./module/sale.module"
import * as path from "path"
import * as dotenv from "dotenv"
import * as process from "process"

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "dev"
dotenv.config({
    path: path.resolve(__dirname, `../.${ENV}.env`),
})
@Module({
    imports: [MongooseModule.forRoot(process.env.DB_URL), SaleModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
