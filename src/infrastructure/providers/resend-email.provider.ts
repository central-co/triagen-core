import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IEmailProvider } from '@domain/interfaces/providers/email.provider.interface';

import { Resend } from 'resend';

@Injectable()
export class ResendEmailProvider extends IEmailProvider {
    constructor(
        private readonly configService: ConfigService,
        @Inject('RESEND_CLIENT')
        private readonly resend: Resend,
    ) {
        super();
    }

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        await this.resend.emails.send({
            from: this.configService.getOrThrow<string>('EMAIL_FROM'),
            to: [to],
            subject: subject,
            html: body,
        });
    }
}
