import { Module } from '@nestjs/common';
import { CreateApplicationUseCase } from '@application/usecases/application/create-application.usecase';
import { SendEmailUseCase } from '@application/usecases/communication/send-email.usecase';
import { IEmailProvider } from '@domain/interfaces/providers/email.provider.interface';
import { IApplicationRepository } from '@domain/interfaces/repositories/application.repository.interface';
import { ICandidateRepository } from '@domain/interfaces/repositories/candidate.repository.interface';
import { NodemailerEmailProvider } from '@infrastructure/providers/nodemailer-email.provider';
import { NodemailerModule } from '@infrastructure/providers/nodemailer.module';
import { ApplicationRepository } from '@infrastructure/repositories/application.repository';
import { CandidateRepository } from '@infrastructure/repositories/candidate.repository';
import { PrismaModule } from '@infrastructure/repositories/prisma.module';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
    imports: [PrismaModule.forRoot(), NodemailerModule.forRoot()],
    controllers: [ApplicationController],
    providers: [
        ApplicationService,
        CreateApplicationUseCase,
        SendEmailUseCase,
        {
            provide: ICandidateRepository,
            useClass: CandidateRepository,
        },
        {
            provide: IApplicationRepository,
            useClass: ApplicationRepository,
        },
        {
            provide: IEmailProvider,
            useClass: NodemailerEmailProvider,
        },
    ],
})
export class ApplicationModule {}
