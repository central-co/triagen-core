import { Message } from "@domain/entities/message.entity";
import { ChatRepository } from "@domain/repositories/chat.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StoreMessageUseCase {
    constructor(
        private readonly chatRepository: ChatRepository,
    ) {}

    async execute(message: Message): Promise<void> {
        await this.chatRepository.saveMessage(message.from.id, message);
    }
}
