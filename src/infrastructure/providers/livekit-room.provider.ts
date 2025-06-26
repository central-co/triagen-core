import { Inject, Injectable } from '@nestjs/common';

import { IRoomProvider } from '@domain/interfaces/providers/room.provider.interface';

import { RoomServiceClient } from 'livekit-server-sdk';

@Injectable()
export class LiveKitRoomProvider extends IRoomProvider {
    constructor(
        @Inject('ROOM_SERVICE_CLIENT')
        private readonly roomService: RoomServiceClient,
    ) {
        super();
    }

    async createRoom(name: string, metadata: any): Promise<void> {
        try {
            await this.roomService.createRoom({
                name: name,
                metadata: JSON.stringify(metadata),
                maxParticipants: 2,
                departureTimeout: 5,
            });
        } catch (error) {
            if (error.message?.includes('already exists')) {
                return;
            }
            throw error;
        }
    }

    async listRooms(): Promise<string[]> {
        const rooms = await this.roomService.listRooms();
        return rooms.map((room) => room.name);
    }
}
