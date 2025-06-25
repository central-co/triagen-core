import { Injectable } from '@nestjs/common';
import { ICandidateRepository } from '@domain/interfaces/repositories/candidate.repository.interface';

@Injectable()
export class SaveCandidateUseCase {
    constructor(private readonly candidateRepo: ICandidateRepository) {}

    async execute(candidateData: any): Promise<any> {
        return await this.candidateRepo.save(
            candidateData.first_name,
            candidateData.last_name,
            candidateData.email,
            candidateData.resume,
        );
    }
}
