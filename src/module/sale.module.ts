import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { Sale, SaleSchema } from "../schema/sale.schema"
import { SaleController } from "../controller/sale.controller"
import { SaleService } from "../service/sale.service"
import { SaleDetailModule } from "./sale-detail.module"
import { SaleDetail, SaleDetailSchema } from "../schema/sale-detail.schema"

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Sale.name, schema: SaleSchema },
            { name: SaleDetail.name, schema: SaleDetailSchema },
        ]),
        SaleDetailModule,
    ],
    controllers: [SaleController],
    providers: [SaleService],
})
export class SaleModule {}
