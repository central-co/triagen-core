import { IApplicationRepository } from "@domain/interfaces/repositories/application.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveApplicationUseCase {
    constructor(
        private readonly applicationRepo: IApplicationRepository,
    ) {}

    async execute(applicationData: any): Promise<void> {
        return await this.applicationRepo.save(
            applicationData.shortCode,
            applicationData.candidateId,
            applicationData.jobId
        );
    }
}
