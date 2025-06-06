import { Message } from "@domain/entities/message.entity";
import { LLMService } from "@domain/interfaces/llm.inteface";
import { ChatRepository } from "@domain/repositories/chat.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GenerateResponseUseCase {
    constructor(
        private readonly llm: LLMService,
        private readonly chatRepository: ChatRepository,
    ) {}
    async execute(message: Message): Promise<Message> {
        const context = await this.chatRepository.getMessages(message.from.id);
        if (context.length === 0) {
            throw new Error("Context cannot be empty");
        }

        let systemPrompt = context.slice(0, context.length - 1)
            .map((msg) => {
                return `${msg.from.name}: ${msg.text}`;
            });

        console.log("System Prompt:", systemPrompt);
        console.log("System prompt with join:", systemPrompt.join("\n"));
        console.log("Type of System prompt with join:", typeof systemPrompt.join("\n"));

        const response = await this.llm.generateResponse(
            context[context.length - 1].text,
            systemPrompt.join("\n")
        )

        console.log("Response from LLM:", response);

        return new Message(
            '1',
            {
                id: message.from.id,
                name: 'Assistant',
            },
            Date.now(),
            'text',
            response,
        );

    }
}
