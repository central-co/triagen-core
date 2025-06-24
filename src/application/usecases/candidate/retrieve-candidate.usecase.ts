import { ICandidateRepository } from "@domain/interfaces/repositories/candidate.repository.interface";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class RetriveCandidateUseCase {
    constructor(
        private readonly candidateRepo: ICandidateRepository,
    ) {}

    async execute(email: string): Promise<any> {
        return await this.candidateRepo.findByEmail(email);
    }
}
