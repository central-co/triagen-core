import { Message } from "@domain/entities/message.entity";
import { ChatRepository } from "@domain/repositories/chat.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReceiveMessageUseCase {
    constructor(
        private readonly chatRepo: ChatRepository,
    ) {}

    async execute(message: Message): Promise<void> {
        await this.chatRepo.saveMessage(message.from.id, message);
    }
}
