import { SaveApplicationUseCase } from "@application/usecases/application/save-application.usecase";
import { RetriveCandidateUseCase } from "@application/usecases/candidate/retrieve-candidate.usecase";
import { SaveCandidateUseCase } from "@application/usecases/candidate/save-candidate.usecase";
import { GenerateShortCodeUseCase } from "@application/usecases/generate-shortcode.usecase";
import { SendEmailUseCase } from "@application/usecases/send-email.usecase";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApplicationService {
    constructor(
        private readonly configService: ConfigService,
        private readonly retrieveCandidateUseCase: RetriveCandidateUseCase,
        private readonly saveCandidateUseCase: SaveCandidateUseCase,
        private readonly generateShortCodeUseCase: GenerateShortCodeUseCase,
        private readonly saveApplicationUseCase: SaveApplicationUseCase,
        private readonly sendEmailUseCase: SendEmailUseCase,
    ) {}

    async createApplication(createApplicationDto: any): Promise<string> {
        // TODO: 1. Guardar o
        // 1. Guardar o candidato no repositorio
        // Buscar o candidato no repositorio, se não existir, criar um novo candidato
        // Buscar o job no repositorio, se não existir, retornar um erro
        // 2. Criar a application com o candidato e o job associados no repositorio
        // 3. Retornar um short code para o candidato, que vai ser usado para o login do candidato para iniciar a entrevista
        let candidate = await this.retrieveCandidateUseCase.execute(createApplicationDto.email);

        if (!candidate) {
            // Se o candidato não existir, salvar um novo candidato
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
