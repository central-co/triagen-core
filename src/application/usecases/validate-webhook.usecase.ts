import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ValidateWebhookUseCase {
    constructor(
        private readonly configService: ConfigService,
    ) {}
    async execute(params: {mode: string, verifyToken: string, challenge: string}): Promise<string> {
        let message: string;

        if (params.mode === 'subscribe'){
            if (params.verifyToken === this.configService.get<string>('WHATSAPP_VERIFY_TOKEN')) {
                console.log("Webhook verified successfully with token:", params.verifyToken);
                message = params.challenge;
            } else {
                console.error("Invalid verify token:", this.configService.get<string>('WHATSAPP_VERIFY_TOKEN'));
                throw new Error("Invalid verify token");
            }
        } else {
            console.error("Invalid mode:", params.mode);
            throw new Error("Invalid mode");
        }

        return message;
    }
}
