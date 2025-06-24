import { AuthUseCase } from '@application/usecases/auth.usecase';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AppService {
    constructor(
        private readonly authUseCase: AuthUseCase,
    ) {}

    async postAuth(authDto: AuthDto): Promise<{ token: string }> {
        const token = await this.authUseCase.execute(authDto.shortCode);
        return {
            token: token,
        };
    }
}
