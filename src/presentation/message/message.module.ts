import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { ValidateWebhookUseCase } from "@application/usecases/validate-webhook.usecase";
import { ReceiveMessageUseCase } from "@application/usecases/receive-message.usecase";
import { ChatRepository } from "@domain/repositories/chat.repository.interface";
import { RedisChatRepository } from "@infrastructure/repositories/chat/redis-chat.repository";
import { RedisModule } from "@infrastructure/repositories/chat/redis.module";
import { MapperModule } from "@infrastructure/mappers/mapper.module";
import { SendMessageUseCase } from "@application/usecases/send-message.usecase";
import { RequestService } from "@domain/interfaces/request.service.interface";
import { WhatsappRequestService } from "@infrastructure/interfaces/whatsapp/whatsapp-request.service";
import { OpenAIModule } from "@infrastructure/interfaces/openai/openai.module";

@Module({
    imports: [
        RedisModule,
        MapperModule,
        OpenAIModule.forRoot(),
    ],
    controllers: [MessageController],
    providers: [
        MessageService,
        ValidateWebhookUseCase,
        ReceiveMessageUseCase,
        SendMessageUseCase,
        {
            provide: ChatRepository,
            useClass: RedisChatRepository,
        },
        {
            provide: RequestService,
            useClass: WhatsappRequestService,
        }
    ],
})
export class MessageModule {}
