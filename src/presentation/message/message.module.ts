import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { ValidateWebhookUseCase } from "@domain/usecases/validate-webhook.usecase";

@Module({
    controllers: [MessageController],
    providers: [MessageService, ValidateWebhookUseCase],
})
export class MessageModule {}
