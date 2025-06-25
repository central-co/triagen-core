import { SaveApplicationUseCase } from "@application/usecases/application/save-application.usecase";
import { RetrieveCandidateUseCase } from "@application/usecases/candidate/retrieve-candidate.usecase";
import { SaveCandidateUseCase } from "@application/usecases/candidate/save-candidate.usecase";
import { GenerateShortCodeUseCase } from "@application/usecases/shared/generate-shortcode.usecase";
import { SendEmailUseCase } from "@application/usecases/communication/send-email.usecase";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateApplicationDto } from "./dto/application.dto";

@Injectable()
export class ApplicationService {
    constructor(
        private readonly configService: ConfigService,
        private readonly retrieveCandidateUseCase: RetrieveCandidateUseCase,
        private readonly saveCandidateUseCase: SaveCandidateUseCase,
        private readonly generateShortCodeUseCase: GenerateShortCodeUseCase,
        private readonly saveApplicationUseCase: SaveApplicationUseCase,
        private readonly sendEmailUseCase: SendEmailUseCase,
    ) {}

    async createApplication(createApplicationDto: CreateApplicationDto): Promise<string> {
        let candidate = await this.retrieveCandidateUseCase.execute(createApplicationDto.email);

        if (!candidate) {
            candidate = await this.saveCandidateUseCase.execute(createApplicationDto);
        }

        const shortCode = this.generateShortCodeUseCase.execute();

        await this.saveApplicationUseCase.execute({
            shortCode: shortCode,
            candidateId: candidate.id,
            jobId: createApplicationDto.job_id,
        })

        await this.sendEmailUseCase.execute({
            to: candidate.email,
            subject: "Sua inscrição na vaga está confirmada!",
            body: `Oi, ${candidate.firstName}\n\nQuando estiver pronto, inicie sua entrevista pelo link abaixo:\n${this.configService.get<string>('APP_URL')}/interview/${shortCode}\n\nCaso haja problemas, acesse o link ${this.configService.get<string>('APP_URL')}/interview e insira o código ${shortCode}\n\nBoa sorte!\nTriaGen`
        });


        return shortCode;
    }
}
