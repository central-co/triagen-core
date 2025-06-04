import { Message } from "@domain/entities/message.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WhatsappIncomingMapper {
    async map(message: any): Promise<Message> {
        const contactInfo = message.entry[0].changes[0].value.contacts[0];
        const messageInfo = message.entry[0].changes[0].value.messages[0];

        const mappedMessage = new Message(
            messageInfo.id,
            {
                id: contactInfo.wa_id,
                name: contactInfo.profile.name,
            },
            messageInfo.timestamp,
            messageInfo.type,
            messageInfo.text.body,
        )

        return mappedMessage;
    }
}
