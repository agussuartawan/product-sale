import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { Logger } from "@nestjs/common"

async function bootstrap() {
    const logger = new Logger("main.ts")
    const app = await NestFactory.create(AppModule)
    const port: number = 3070

    await app.listen(port)
    logger.log(`Server start on port ${port}`)
}
bootstrap()
