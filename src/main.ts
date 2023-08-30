import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { Logger } from "@nestjs/common"
import * as process from "process"
import * as mongoose from "mongoose"

async function bootstrap() {
    const logger = new Logger("main.ts")
    const app = await NestFactory.create(AppModule)
    const port: number = parseInt(process.env.PORT)

    mongoose.set({ debug: true })

    await app.listen(port)
    logger.log(`Server start on port ${port}`)
}
bootstrap()
