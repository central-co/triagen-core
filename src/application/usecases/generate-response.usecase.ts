import { Injectable } from '@nestjs/common';
import { Message } from '@domain/entities/message.entity';
import { LanguageModelService } from '@domain/interfaces/language-model.service.interface';

@Injectable()
export class GenerateResponseUseCase {
    constructor(private readonly lmService: LanguageModelService) {}

    async execute(messages: Message[]): Promise<string> {
        return await this.lmService.generateReply(messages);
    }
}
