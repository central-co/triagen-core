import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreateApplicationUseCase } from '@application/usecases/application/create-application.usecase';
import { SendEmailUseCase } from '@application/usecases/communication/send-email.usecase';

import { CreateApplicationDto } from './dto/application.dto';

@Injectable()
export class ApplicationService {
    constructor(
        private readonly configService: ConfigService,
        private readonly createApplicationUseCase: CreateApplicationUseCase,
        private readonly sendEmailUseCase: SendEmailUseCase,
    ) {}

    async createApplication(createApplicationDto: CreateApplicationDto): Promise<string> {
        const shortCode = await this.createApplicationUseCase.execute(createApplicationDto);

        await this.sendEmailUseCase.execute({
            to: createApplicationDto.email,
            subject: 'Sua inscrição na vaga está confirmada!',
            body: `Olá!\n\nQuando estiver pronto, inicie sua entrevista pelo link abaixo:\n${this.configService.get<string>('APP_URL')}/interview/${shortCode}\n\nCaso haja problemas, acesse o link ${this.configService.get<string>('APP_URL')}/interview e insira o código ${shortCode}\n\nBoa sorte!\nTriaGen`,
        });

        return shortCode;
    }
}
