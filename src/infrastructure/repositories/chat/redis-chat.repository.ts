import { ChatRepository } from "@domain/repositories/chat.repository.interface";
import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisChatRepository extends ChatRepository {
    constructor(
        @InjectRedis() private readonly redis: Redis,
    ) {
        super();
    }

    private getKey(chatId: string): string {
        return `chat:${chatId}:messages`
    }

    async saveMessage(chatId: string, message: any): Promise<void> {
        const key = this.getKey(chatId);

        await this.redis.rpush(key, JSON.stringify(message));
    }

    async getMessages(chatId: string): Promise<any[]> {
        const key = this.getKey(chatId);

        const rawList = await this.redis.lrange(key, 0, -1);
        return rawList.map((item) => JSON.parse(item));
    }
}
