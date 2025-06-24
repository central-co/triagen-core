import { IEmailProvider } from "@domain/interfaces/providers/email.provider.interface";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transporter } from "nodemailer";

@Injectable()
export class NodemailerEmailProvider extends IEmailProvider {
    constructor(
        private readonly configService: ConfigService,
        @Inject('NODEMAILER_TRANSPORTER') private readonly transporter: Transporter,
    ) {
        super();
    }

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        await this.transporter.sendMail({
            from: this.configService.get<string>('SMTP_FROM'),
            to: to,
            subject: subject,
            text: body,
        });
    }
}
