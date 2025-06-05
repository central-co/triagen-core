import { Message } from "@domain/entities/message.entity";
import { RequestService } from "@domain/interfaces/request.service.interface";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class WhatsappRequestService extends RequestService {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    private getUrl(): string {
        const baseUrl = this.configService.get<string>('WHATSAPP_API_URL');
        if (!baseUrl) {
            throw new Error('WHATSAPP_API_URL is not defined');
        }
        const phoneNumberId = this.configService.get<string>('WHATSAPP_PHONE_NUMBER_ID');
        if (!phoneNumberId) {
            throw new Error('WHATSAPP_PHONE_NUMBER_ID is not defined');
        }

        return `${baseUrl}/${phoneNumberId}/messages`;
    }
    private getPayload(message: Message, text: string): any {
        return {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: message.from.id,
            type: "text",
            text: {
                preview_url: false,
                body: text,
            },
            context: {
                message_id: message.id,
            }
        };
    }

    private getHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.configService.get<string>('WHATSAPP_API_KEY')}`,
        };
    }

    async postRequest(message: Message): Promise<any> {
        const url = this.getUrl();
        const payload = this.getPayload(message, 'teste');
        const headers = this.getHeaders();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload),
            });

            return response;
        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Failed to send message');
        }
    }
}
