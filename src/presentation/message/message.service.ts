import { ReceiveMessageUseCase } from "@application/usecases/receive-message.usecase";
import { ValidateWebhookUseCase } from "@application/usecases/validate-webhook.usecase";
import { WhatsappIncomingMapper } from "@infrastructure/mappers/whatsapp/whatsapp-incoming.mapper";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class MessageService {
    constructor(
        private readonly validadeWebhook: ValidateWebhookUseCase,
        private readonly receiveMessage: ReceiveMessageUseCase,
        private readonly whatsappIncomingMapper: WhatsappIncomingMapper,
    ) {}

    async getWhatsappMessage(query: Record<string, any>) {
        console.log(`Received query: ${JSON.stringify(query)}`);
        const mode = query['hub.mode'];
        const token = query['hub.verify_token'];
        const challenge = query['hub.challenge'];

        let message: string;
        try {
            message = await this.validadeWebhook.execute({
                mode: mode,
                verifyToken: token,
                challenge: challenge,
            });
        } catch (error) {
            throw new HttpException(
                'Invalid mode or verify token',
                HttpStatus.BAD_REQUEST
            )
        }

        return message;
    }

    async postWhatsappMessage(message: any) {
        console.log(`Received message: ${JSON.stringify(message)}`);
        const mappedMessage = await this.whatsappIncomingMapper.map(message);
        console.log(`Mapped message: ${JSON.stringify(mappedMessage)}`);

        await this.receiveMessage.execute(mappedMessage);

        return message;
    }
}
