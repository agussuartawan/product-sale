import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { SaleDetail } from "../schema/sale-detail.schema"
import { type SaleDetailRequest } from "../dto/request/sale-detail.request"
import { HttpService } from "@nestjs/axios"
import { ProductResponse } from "src/client/product/product.response"
import { firstValueFrom, map } from "rxjs"
import { AxiosResponse } from "axios"

@Injectable()
export class SaleDetailService {
    constructor(
        @InjectModel(SaleDetail.name)
        private readonly saleDetail: Model<SaleDetail>,
        private readonly httpService: HttpService,
    ) {}

    async create(req: SaleDetailRequest[]): Promise<SaleDetail[]> {
        const saleDetails: SaleDetail[] = []
        const productIds = req.map((r) => r.productId)
        const products: ProductResponse[] = await this.getProducts(productIds)
        if (!products) {
            throw new HttpException(
                "Something wrong...",
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
        for (const r of req) {
            const product = products.find((item) => item.id === r.productId)
            if (product) {
                r.productId = product.id
                const createdSaleDetail = new this.saleDetail(r)
                saleDetails.push(await createdSaleDetail.save())
            }
        }

        return saleDetails
    }

    async find(ids: SaleDetail[]): Promise<SaleDetail[]> {
        return await this.saleDetail
            .find({
                _id: {
                    $in: ids,
                },
            })
            .exec()
    }

    async getProducts(productIds: string[]): Promise<ProductResponse[]> {
        const url = `${process.env.PRODUCT_DOMAIN}/api/v1/products/find-by-ids`
        const body = {
            ids: productIds,
        }
        return firstValueFrom(
            this.httpService.post(url, body).pipe(map((res) => res.data)),
        )
    }
}
