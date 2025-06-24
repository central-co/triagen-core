export abstract class ITokenProvider {
    abstract generate(email: string, name: string, roomName: string): Promise<string>;
}
