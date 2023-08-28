import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type SaleDetailDocument = HydratedDocument<SaleDetail>

@Schema()
export class SaleDetail {
    @Prop()
    xkProductId: string

    @Prop()
    qty: number

    @Prop()
    subTotal: number

    @Prop()
    disc: number

    @Prop()
    discPercent: number
}

export const SaleDetailSchema = SchemaFactory.createForClass(SaleDetail)
