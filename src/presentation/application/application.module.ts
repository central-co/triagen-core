import { Module } from "@nestjs/common";
import { ApplicationController } from "./application.controller";
import { ApplicationService } from "./application.service";
import { SaveCandidateUseCase } from "@application/usecases/candidate/save-candidate.usecase";
import { PrismaModule } from "@infrastructure/repositories/prisma.module";
import { ICandidateRepository } from "@domain/interfaces/repositories/candidate.repository.interface";
import { CandidateRepository } from "@infrastructure/repositories/candidate.repository";
import { RetriveCandidateUseCase } from "@application/usecases/candidate/retrieve-candidate.usecase";
import { GenerateShortCodeUseCase } from "@application/usecases/generate-shortcode.usecase";
import { SaveApplicationUseCase } from "@application/usecases/application/save.application.usecase";

@Module({
    imports: [PrismaModule.forRoot()],
    controllers: [ApplicationController],
    providers: [
        ApplicationService,
        RetriveCandidateUseCase,
        SaveCandidateUseCase,
        GenerateShortCodeUseCase,
        SaveApplicationUseCase,
        {
            provide: ICandidateRepository,
            useClass: CandidateRepository,
        }
    ],
})
export class ApplicationModule {}
