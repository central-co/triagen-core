import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { MessageService } from "./message.service";

@Controller("message")
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Get("whatsapp")
    async getWhatsappMessage(@Query() query: Record<string, any>) {
        return this.messageService.getWhatsappMessage(query);
    }

    @Post("whatsapp")
    async postWhatsappMessage(@Body() message: any) {
        return this.messageService.postWhatsappMessage(message);
    }
}
