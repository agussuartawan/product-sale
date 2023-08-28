import { Controller } from "@nestjs/common"
import { SaleDetailService } from "../service/sale-detail.service"

@Controller("api/v1/sales/details")
export class SaleDetailController {
    constructor(private readonly saleDetailService: SaleDetailService) {}
}
