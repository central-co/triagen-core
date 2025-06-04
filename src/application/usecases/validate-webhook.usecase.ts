import { Injectable } from "@nestjs/common";
import { config } from 'dotenv';
config();

@Injectable()
export class ValidateWebhookUseCase {
    async execute(params: {mode: string, verifyToken: string, challenge: string}): Promise<string> {
        let message: string;

        if (params.mode === 'subscribe'){
            if (params.verifyToken === process.env.WHATSAPP_VERIFY_TOKEN){
                console.log("Webhook verified successfully with token:", params.verifyToken);
                message = params.challenge;
            } else {
                console.error("Invalid verify token:", process.env.WHATSAPP_VERIFY_TOKEN);
                throw new Error("Invalid verify token");
            }
        } else {
            console.error("Invalid mode:", params.mode);
            throw new Error("Invalid mode");
        }

        return message;
    }
}
