import { ValidateWebhookUseCase } from "@domain/usecases/validate-webhook.usecase";
import { HttpException, HttpStatus, Injectable, Query } from "@nestjs/common";

@Injectable()
export class MessageService {
    constructor(private readonly validadeWebhook: ValidateWebhookUseCase) {}

    async getWhatsappMessage(@Query() query: Record<string, any>) {
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

    async postWhatsappMessage() {
        // Call use case for posting a WhatsApp message
        return {
            message: "WhatsApp message posted successfully",
            timestamp: new Date().toISOString(),
        };
    }
}
