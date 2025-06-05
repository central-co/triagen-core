import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { config } from 'dotenv';
config();

@Injectable()
export class ValidateWebhookUseCase {
    constructor(
        private readonly configService: ConfigService,
    ) {}
    async execute(params: {mode: string, verifyToken: string, challenge: string}): Promise<string> {
        let message: string;

        if (params.mode === 'subscribe'){
            if (params.verifyToken === this.configService.get<string>('whatsapp.verifyToken')) {
                console.log("Webhook verified successfully with token:", params.verifyToken);
                message = params.challenge;
            } else {
                console.error("Invalid verify token:", this.configService.get<string>('whatsapp.verifyToken'));
                throw new Error("Invalid verify token");
            }
        } else {
            console.error("Invalid mode:", params.mode);
            throw new Error("Invalid mode");
        }

        return message;
    }
}
