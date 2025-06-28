import { Injectable } from '@nestjs/common';

import { IApplicationRepository } from '@domain/interfaces/repositories/application.repository';
import { ICandidateRepository } from '@domain/interfaces/repositories/candidate.repository';

import { customAlphabet } from 'nanoid';

@Injectable()
export class CreateApplicationUseCase {
    constructor(
        private readonly applicationRepo: IApplicationRepository,
        private readonly candidateRepo: ICandidateRepository,
    ) {}

    async execute(applicationData: any): Promise<string> {
        console.log('Creating application with data:',
            applicationData);
        let candidate = await this.candidateRepo.findByEmail(
            applicationData.email,
        );
        if (!candidate) {
            // Change this later to other usecase (CreateCandidateUseCase)
            candidate = await this.candidateRepo.save(
                applicationData.first_name,
                applicationData.last_name,
                applicationData.email,
                applicationData.resume,
            );
        }

        const shortCode = this.generateShortCode();

        await this.applicationRepo.save(
            shortCode,
            candidate.id,
            applicationData.job_id,
        );

        return shortCode;
    }

    private generateShortCode(): string {
        const alphabet =
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const nanoid7 = customAlphabet(alphabet,
            7);
        return nanoid7();
    }
}
