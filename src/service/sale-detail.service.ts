import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { SaleDetail } from "../schema/sale-detail.schema"
import { type SaleDetailRequest } from "../dto/request/sale-detail.request"
import { HttpService } from "@nestjs/axios"
import { ProductResponse } from "src/dto/response/product.response"
import { catchError, lastValueFrom, map } from "rxjs"

class Price {
    disc: number
    subTotal: number

    constructor(disc: number, subTotal: number) {
        this.disc = disc
        this.subTotal = subTotal
    }
}

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
        let products: ProductResponse[]
        try {
            products = await this.getProducts(productIds)
        } catch (err) {
            throw new HttpException(err.response, err.status)
        }

        for (const r of req) {
            const product = products.find((item) => item.id === r.productId)
            if (product) {
                r.productId = product.id
                r.productName = product.name
                r.productPrice = product.price

                const price = this.calculateSubTotal(
                    r.qty,
                    r.productPrice,
                    r.discPercent,
                )

                r.subTotal = price.subTotal
                r.disc = price.disc
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

    // Private section
    private calculateSubTotal(
        qty: number,
        price: number,
        discPercent: number,
    ): Price {
        const discDecimal = discPercent ? discPercent / 100 : 0
        const subTotal = qty * price
        const disc = subTotal * discDecimal
        const subTotalWithDisc = subTotal - disc

        return new Price(disc, subTotalWithDisc)
    }

    // Client section
    async getProducts(productIds: string[]): Promise<ProductResponse[]> {
        const url = `${process.env.PRODUCT_DOMAIN}/api/v1/products/find-by-ids`
        const body = {
            ids: productIds,
        }
        return await lastValueFrom(
            this.httpService.post(url, body).pipe(
                map((res) => res.data),
                catchError((error) => {
                    if (error.response) {
                        throw new HttpException(
                            error.response.data,
                            error.response.status,
                        )
                    } else {
                        throw new HttpException(
                            "Product server down...",
                            HttpStatus.INTERNAL_SERVER_ERROR,
                        )
                    }
                }),
            ),
        )
    }
}
