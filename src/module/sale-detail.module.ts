import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { SaleDetail, SaleDetailSchema } from "../schema/sale-detail.schema"
import { SaleDetailController } from "../controller/sale-detail.controller"
import { SaleDetailService } from "../service/sale-detail.service"

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SaleDetail.name, schema: SaleDetailSchema },
        ]),
    ],
    exports: [MongooseModule, SaleDetailService],
    controllers: [SaleDetailController],
    providers: [SaleDetailService],
})
export class SaleDetailModule {}
