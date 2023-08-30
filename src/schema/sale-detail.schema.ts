import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type HydratedDocument } from "mongoose"

export type SaleDetailDocument = HydratedDocument<SaleDetail>

@Schema({
    collection: "sale_details",
})
export class SaleDetail {
    @Prop()
    productId: string

    @Prop()
    productName: string

    @Prop()
    productPrice: number

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
