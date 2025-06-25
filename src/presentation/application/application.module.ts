import { Module } from "@nestjs/common";
import { ApplicationController } from "./application.controller";
import { ApplicationService } from "./application.service";
import { SaveCandidateUseCase } from "@application/usecases/candidate/save-candidate.usecase";
import { PrismaModule } from "@infrastructure/repositories/prisma.module";
import { ICandidateRepository } from "@domain/interfaces/repositories/candidate.repository.interface";
import { CandidateRepository } from "@infrastructure/repositories/candidate.repository";
import { RetrieveCandidateUseCase } from "@application/usecases/candidate/retrieve-candidate.usecase";
import { GenerateShortCodeUseCase } from "@application/usecases/shared/generate-shortcode.usecase";
import { SaveApplicationUseCase } from "@application/usecases/application/save-application.usecase";
import { IApplicationRepository } from "@domain/interfaces/repositories/application.repository.interface";
import { ApplicationRepository } from "@infrastructure/repositories/application.repository";
import { SendEmailUseCase } from "@application/usecases/communication/send-email.usecase";
import { NodemailerModule } from "@infrastructure/providers/nodemailer.module";
import { IEmailProvider } from "@domain/interfaces/providers/email.provider.interface";
import { NodemailerEmailProvider } from "@infrastructure/providers/nodemailer-email.provider";

@Module({
    imports: [
        PrismaModule.forRoot(),
        NodemailerModule.forRoot(),
    ],
    controllers: [ApplicationController],
    providers: [
        ApplicationService,
        RetrieveCandidateUseCase,
        SaveCandidateUseCase,
        GenerateShortCodeUseCase,
        SaveApplicationUseCase,
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
