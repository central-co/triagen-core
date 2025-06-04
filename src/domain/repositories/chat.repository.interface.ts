export abstract class ChatRepository {
    abstract saveMessage(chatId: string, message: any): Promise<void>;
    abstract getMessages(chatId: string): Promise<any[]>;
}
