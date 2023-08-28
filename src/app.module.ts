import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MongooseModule } from "@nestjs/mongoose"
import { SaleModule } from "./module/sale.module"

@Module({
    imports: [
        MongooseModule.forRoot("mongodb://localhost:27017/product_sales"),
        SaleModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
