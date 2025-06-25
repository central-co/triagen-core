import { IEmailProvider } from "@domain/interfaces/providers/email.provider.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SendEmailUseCase {
    constructor(
        private readonly emailProvider: IEmailProvider,
    ) {}

    async execute(emailData: any): Promise<void> {
        await this.emailProvider.sendEmail(
            emailData.to,
            emailData.subject,
            emailData.body,
        );
    }
}
