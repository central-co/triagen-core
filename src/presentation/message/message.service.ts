import { ReceiveMessageUseCase } from "@application/usecases/receive-message.usecase";
import { SendMessageUseCase } from "@application/usecases/send-message.usecase";
import { ValidateWebhookUseCase } from "@application/usecases/validate-webhook.usecase";
import { WhatsappIncomingMapper } from "@infrastructure/mappers/whatsapp/whatsapp-incoming.mapper";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class MessageService {
    constructor(
        private readonly whatsappIncomingMapper: WhatsappIncomingMapper,
        private readonly validadeWebhook: ValidateWebhookUseCase,
        private readonly receiveMessage: ReceiveMessageUseCase,
        private readonly sendMessage: SendMessageUseCase,
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
        // Validate the incoming message structure
        if (!message.entry[0]?.changes[0]?.value?.messages) {
            console.info('Messages key not found in the request body');
            return {
                statusCode: HttpStatus.OK,
                statusMessage: 'Message received',
            };
        }

        const mappedMessage = await this.whatsappIncomingMapper.map(message);
        console.log(`Mapped message: ${JSON.stringify(mappedMessage)}`);

        await this.receiveMessage.execute(mappedMessage);

        // TODO: Implement the logic to send a response message
        // ! TA MOCKADO ISSO AQUI AINDA, TEM QUE TER TODO UM PROCESSO ANTES DISSO
        const response = await this.sendMessage.execute(mappedMessage);

        return response;
    }
}
