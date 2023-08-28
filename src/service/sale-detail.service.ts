import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { SaleDetail } from "../schema/sale-detail.schema"
import { SaleDetailRequest } from "../dto/request/sale-detail.request"

@Injectable()
export class SaleDetailService {
    constructor(
        @InjectModel(SaleDetail.name) private saleDetail: Model<SaleDetail>,
    ) {}

    async create(req: SaleDetailRequest[]): Promise<SaleDetail[]> {
        const saleDetails: SaleDetail[] = []
        for (const r of req) {
            const createdSaleDetail = new this.saleDetail(r)
            saleDetails.push(await createdSaleDetail.save())
        }

        return saleDetails
    }

    async find(ids: SaleDetail[]): Promise<SaleDetail[]> {
        return this.saleDetail
            .find({
                _id: {
                    $in: ids,
                },
            })
            .exec()
    }
}
