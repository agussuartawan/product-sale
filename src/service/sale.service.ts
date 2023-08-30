import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
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
        if (req.saleDetails.length === 0) {
            throw new HttpException(
                "Sale details cannot be empty",
                HttpStatus.BAD_REQUEST,
            )
        }
        const subTotals = req.saleDetails.map((val) => val.subTotal)
        req.total = subTotals.reduce(
            (accumulator: number, input: number): number => accumulator + input,
        )

        const createdSale = new this.saleModel(req)
        return await createdSale.save()
    }

    async getAll(): Promise<Sale[]> {
        return this.saleModel
            .find()
            .populate(
                "saleDetails",
                "productName productPrice qty disc subTotal",
            )
    }

    async findById(id: string): Promise<Sale> {
        return this.saleModel.findOne({ _id: id }).populate("saleDetails")
    }
}
