import { IRoomProvider } from "@domain/interfaces/providers/room.provider.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateRoomUseCase {
    constructor(
        private readonly roomProvider: IRoomProvider,
    ) {}

    async execute(name: string, metadata: any): Promise<void> {
        await this.roomProvider.createRoom(name, metadata);
    }
}
