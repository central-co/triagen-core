import { AuthUseCase } from '@application/usecases/auth.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor(private readonly authUseCase: AuthUseCase) {}

    async getAuth(): Promise<{ token: string }> {
        console.log('Generating JWT token for authentication service');
        const token = await this.authUseCase.execute({
            identity: 'triagen-participant',
        });
        return {
            token: token,
        };
    }
}
