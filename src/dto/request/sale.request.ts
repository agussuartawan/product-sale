import { type SaleDetailRequest } from "./sale-detail.request"

export class SaleRequest {
    date: Date
    total: number
    customer: string
    isPaid: boolean
    saleDetails: SaleDetailRequest[]
}
