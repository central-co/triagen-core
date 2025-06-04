import { Message } from "@domain/entities/message.entity";
import { RequestService } from "@domain/interfaces/request.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SendMessageUseCase {
    constructor(
        private readonly requestService: RequestService,
    ) {}

    async execute(message: Message): Promise<any> {
        return await this.requestService.postRequest(message);
    }
}
