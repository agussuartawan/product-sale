import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { SaleService } from "../service/sale.service"
import { SaleRequest } from "../dto/request/sale.request"
import { type Sale } from "../schema/sale.schema"

@Controller("api/v1/sales")
export class SaleController {
    constructor(private readonly saleService: SaleService) {}

    @Post()
    async create(@Body() req: SaleRequest): Promise<Sale> {
        return await this.saleService.create(req)
    }

    @Get()
    async getAll(): Promise<Sale[]> {
        return await this.saleService.getAll()
    }

    @Get("/:id")
    async findOne(@Param("id") id: string): Promise<Sale> {
        return await this.saleService.findById(id)
    }
}
