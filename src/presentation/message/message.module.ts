import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ValidateWebhookUseCase } from '@application/usecases/validate-webhook.usecase';
import { ReceiveMessageUseCase } from '@application/usecases/receive-message.usecase';
import { ChatRepository } from '@domain/repositories/chat.repository.interface';
import { RedisChatRepository } from '@infrastructure/repositories/chat/redis-chat.repository';
import { RedisModule } from '@infrastructure/repositories/chat/redis.module';
import { MapperModule } from '@infrastructure/mappers/mapper.module';
import { SendMessageUseCase } from '@application/usecases/send-message.usecase';
import { GenerateResponseUseCase } from '@application/usecases/generate-response.usecase';
import { RequestService } from '@domain/interfaces/request.service.interface';
import { LanguageModelService } from '@domain/interfaces/language-model.service.interface';
import { WhatsappRequestService } from '@infrastructure/interfaces/whatsapp/whatsapp-request.service';
import { GeminiService } from '@infrastructure/interfaces/gemini/gemini.service';

@Module({
    imports: [RedisModule, MapperModule],
    controllers: [MessageController],
    providers: [
        MessageService,
        ValidateWebhookUseCase,
        ReceiveMessageUseCase,
        GenerateResponseUseCase,
        SendMessageUseCase,
        {
            provide: ChatRepository,
            useClass: RedisChatRepository,
        },
        {
            provide: RequestService,
            useClass: WhatsappRequestService,
        },
        {
            provide: LanguageModelService,
            useClass: GeminiService,
        },
    ],
})
export class MessageModule {}
