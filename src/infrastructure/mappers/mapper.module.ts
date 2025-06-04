import { Module } from "@nestjs/common";
import { WhatsappIncomingMapper } from "./whatsapp/whatsapp-incoming.mapper";

@Module({
    imports: [],
    providers: [WhatsappIncomingMapper],
    exports: [WhatsappIncomingMapper],
})
export class MapperModule {}
