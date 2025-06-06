export abstract class LLMService {
    abstract generateResponse(prompt: string, context: string): Promise<string>;
}
