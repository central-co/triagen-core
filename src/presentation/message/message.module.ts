import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { ValidateWebhookUseCase } from "@application/usecases/validate-webhook.usecase";
import { ReceiveMessageUseCase } from "@application/usecases/receive-message.usecase";
import { ChatRepository } from "@domain/repositories/chat.repository";
import { RedisChatRepository } from "@infrastructure/repositories/chat/redis-chat.repository";
import { RedisModule } from "@infrastructure/repositories/chat/redis.module";
import { MapperModule } from "@infrastructure/mappers/mapper.module";

@Module({
    imports: [
        RedisModule,
        MapperModule
    ],
    controllers: [MessageController],
    providers: [
        MessageService,
        ValidateWebhookUseCase,
        ReceiveMessageUseCase,
        {
            provide: ChatRepository,
            useClass: RedisChatRepository,
        }
    ],
})
export class MessageModule {}
