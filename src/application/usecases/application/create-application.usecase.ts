import { Injectable } from '@nestjs/common';

import { IApplicationRepository } from '@domain/interfaces/repositories/application.repository';
import { CreateApplicationDto } from '@presentation/application/dto/application.dto';

import { customAlphabet } from 'nanoid';

@Injectable()
export class CreateApplicationUseCase {
    constructor(
        private readonly applicationRepo: IApplicationRepository,
    ) {}

    async execute(applicationData: CreateApplicationDto): Promise<string> {
        console.log(`Creating application with data: ${JSON.stringify(applicationData)}`);

        const criterias = this.planInterview();
        console.log(`Interview criteria: ${JSON.stringify(criterias)}`);

        const interviewCode = this.generateShortCode();

        await this.applicationRepo.save(
            interviewCode,
            {
                id: applicationData.job_id,
            },
            {
                name: applicationData.name,
                email: applicationData.email,
                phone: applicationData.phone,
                resume: applicationData.resume_text,
            },
        );

        return interviewCode;
    }

    private generateShortCode(): string {
        const alphabet =
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const nanoid7 = customAlphabet(
            alphabet,
            7,
        );
        return nanoid7();
    }

    private planInterview(): undefined {
        return;
    }
}
