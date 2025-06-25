import { ICandidateRepository } from "@domain/interfaces/repositories/candidate.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RetrieveCandidateUseCase {
    constructor(
        private readonly candidateRepo: ICandidateRepository,
    ) {}

    async execute(email: string): Promise<any> {
        return await this.candidateRepo.findByEmail(email);
    }
}
