import { Inject, Injectable } from '@nestjs/common';

import { ICandidateRepository } from '@domain/interfaces/repositories/candidate.repository';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CandidateRepository extends ICandidateRepository {
    constructor(
        @Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient,
    ) {
        super();
    }

    async save(
        firstName: string,
        lastName: string,
        email: string,
        resume: string,
    ): Promise<any> {
        return await this.prisma.candidate.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                resume: resume,
            },
        });
    }

    async findByEmail(email: string): Promise<any> {
        return await this.prisma.candidate.findUnique({
            where: {
                email: email,
            },
        });
    }
}
