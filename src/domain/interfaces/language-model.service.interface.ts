import { Message } from '@domain/entities/message.entity';

export abstract class LanguageModelService {
    abstract generateReply(messages: Message[]): Promise<string>;
}
