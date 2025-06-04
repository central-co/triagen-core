import { Message } from "@domain/entities/message.entity";

export abstract class RequestService {
    abstract postRequest(message: Message): Promise<any>;
}
