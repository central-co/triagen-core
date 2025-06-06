import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { ValidateWebhookUseCase } from "@application/usecases/validate-webhook.usecase";
import { StoreMessageUseCase } from "@application/usecases/store-message.usecase";
import { ChatRepository } from "@domain/repositories/chat.repository.interface";
import { RedisChatRepository } from "@infrastructure/repositories/chat/redis-chat.repository";
import { RedisModule } from "@infrastructure/repositories/chat/redis.module";
import { MapperModule } from "@infrastructure/mappers/mapper.module";
import { SendMessageUseCase } from "@application/usecases/send-message.usecase";
import { RequestService } from "@domain/interfaces/request.service.interface";
import { WhatsappRequestService } from "@infrastructure/services/whatsapp/whatsapp-request.service";
import { GeminiModule } from "@infrastructure/services/gemini/gemini.module";
import { GenerateResponseUseCase } from "@application/usecases/generate-response.usecase";
import { LLMService } from "@domain/interfaces/llm.inteface";
import { GeminiLLMService } from "@infrastructure/services/gemini/gemini-llm.service";

@Module({
    imports: [
        RedisModule,
        MapperModule,
        GeminiModule.forRoot(),
    ],
    controllers: [MessageController],
    providers: [
        MessageService,
        ValidateWebhookUseCase,
        StoreMessageUseCase,
        GenerateResponseUseCase,
        SendMessageUseCase,
        {
            provide: ChatRepository,
            useClass: RedisChatRepository,
        },
        {
            provide: LLMService,
            useClass: GeminiLLMService,
        },
        {
            provide: RequestService,
            useClass: WhatsappRequestService,
        }
    ],
})
export class MessageModule {}
