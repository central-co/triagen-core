import { GenerateResponseUseCase } from "@application/usecases/generate-response.usecase";
import { StoreMessageUseCase } from "@application/usecases/store-message.usecase";
import { SendMessageUseCase } from "@application/usecases/send-message.usecase";
import { ValidateWebhookUseCase } from "@application/usecases/validate-webhook.usecase";
import { WhatsappIncomingMapper } from "@infrastructure/mappers/whatsapp/whatsapp-incoming.mapper";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class MessageService {
    constructor(
        private readonly whatsappIncomingMapper: WhatsappIncomingMapper,
        private readonly validateWebhook: ValidateWebhookUseCase,
        private readonly storeMessage: StoreMessageUseCase,
        private readonly generateResponse: GenerateResponseUseCase,
        private readonly sendMessage: SendMessageUseCase,
    ) {}

    async getWhatsappMessage(query: Record<string, any>) {
        console.log(`Received query: ${JSON.stringify(query)}`);
        const mode = query['hub.mode'];
        const token = query['hub.verify_token'];
        const challenge = query['hub.challenge'];

        let message: string;
        try {
            message = await this.validateWebhook.execute({
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
        // Validate the incoming message structure
        if (!message.entry[0]?.changes[0]?.value?.messages) {
            console.info('Messages key not found in the request body');
            return {
                statusCode: HttpStatus.OK,
                statusMessage: 'Message received',
            };
        }

        const mappedMessage = await this.whatsappIncomingMapper.map(message);

        await this.storeMessage.execute(mappedMessage);

        const responseMessage = await this.generateResponse.execute(mappedMessage);
        await this.storeMessage.execute(responseMessage);

        const response = await this.sendMessage.execute(responseMessage);

        return response;
    }
}
