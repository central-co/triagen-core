import { Module } from '@nestjs/common';

import { CreateApplicationUseCase } from '@application/usecases/application/create-application.usecase';
import { SendEmailUseCase } from '@application/usecases/communication/send-email.usecase';
import { IEmailProvider } from '@domain/interfaces/providers/email.provider.interface';
import { IApplicationRepository } from '@domain/interfaces/repositories/application.repository';
import { ResendModule } from '@infrastructure/providers/resend.module';
import { ResendEmailProvider } from '@infrastructure/providers/resend-email.provider';
import { ApplicationRepository } from '@infrastructure/repositories/application.repository';
import { PrismaModule } from '@infrastructure/repositories/prisma.module';

import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
    imports: [PrismaModule.forRoot(), ResendModule.forRoot()],
    controllers: [ApplicationController],
    providers: [
        ApplicationService,
        CreateApplicationUseCase,
        SendEmailUseCase,
        {
            provide: IApplicationRepository,
            useClass: ApplicationRepository,
        },
        {
            provide: IEmailProvider,
            useClass: ResendEmailProvider,
        },
    ],
})
export class ApplicationModule {}
