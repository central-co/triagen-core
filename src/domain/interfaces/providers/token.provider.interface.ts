export abstract class ITokenProvider {
    abstract generate(payload: any): Promise<string>;
}
