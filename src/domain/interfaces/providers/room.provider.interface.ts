export abstract class IRoomProvider {
    abstract createRoom(name: string, metadata: any): Promise<void>;
    abstract listRooms(): Promise<string[]>;
}
