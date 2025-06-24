export abstract class IEmailProvider {
    abstract sendEmail(to: string, subject: string, body: string): Promise<void>;
}
