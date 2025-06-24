import { IApplicationRepository } from "@domain/interfaces/repositories/application.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RetrieveApplicationUseCase {
    constructor(
        private readonly applicationRepo: IApplicationRepository,
    ) {}

    async execute(shortCode: string): Promise<any> {
        return this.applicationRepo.findByShortCode(shortCode);
    }
}
