import { ITokenProvider } from '@domain/interfaces/providers/token.provider.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUseCase {
    constructor(private readonly tokenProvider: ITokenProvider) {}

    async execute(payload: any): Promise<string> {
        console.log(
            `Generating JWT token with payload: ${JSON.stringify(payload)}`,
        );
        return await this.tokenProvider.generate(payload);
    }
}
