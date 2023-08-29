import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Sale } from "../schema/sale.schema"
import { Model } from "mongoose"
import { type SaleRequest } from "../dto/request/sale.request"
import { SaleDetailService } from "./sale-detail.service"

@Injectable()
export class SaleService {
    constructor(
        @InjectModel(Sale.name) private readonly saleModel: Model<Sale>,
        private readonly saleDetailService: SaleDetailService,
    ) {}

    async create(req: SaleRequest): Promise<Sale> {
        req.saleDetails = await this.saleDetailService.create(req.saleDetails)
        const createdSale = new this.saleModel(req)
        return await createdSale.save()
    }

    async getAll(): Promise<Sale[]> {
        return await this.saleModel.find().populate("saleDetails")
    }

    async findById(id: string): Promise<Sale> {
        return await this.saleModel.findOne({ _id: id }).populate("saleDetails")
    }
}
