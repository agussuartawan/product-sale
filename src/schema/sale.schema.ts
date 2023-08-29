import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from "mongoose"
import { type HydratedDocument } from "mongoose"
import { type SaleDetail } from "./sale-detail.schema"

export type SaleDocument = HydratedDocument<Sale>

@Schema()
export class Sale {
    @Prop()
    date: Date

    @Prop()
    total: number

    @Prop()
    customer: string

    @Prop()
    isPaid: boolean

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "SaleDetail" }],
    })
    saleDetails: SaleDetail[]
}

export const SaleSchema = SchemaFactory.createForClass(Sale)
