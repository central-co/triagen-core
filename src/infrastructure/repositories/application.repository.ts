import { Inject, Injectable } from '@nestjs/common';

import { IApplicationRepository } from '@domain/interfaces/repositories/application.repository';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ApplicationRepository extends IApplicationRepository {
    constructor(
        @Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient,
    ) {
        super();
    }

    async save(interviewToken: string, job: { id: string; }, candidate: { name: string; email: string; phone?: string; resume?: string; }): Promise<any> {
        return await this.prisma.candidates.create({
            data: {
                job_id: job.id,
                name: candidate.name,
                email: candidate.email,
                phone: candidate.phone,
                resume_url: candidate.resume,
                interview_token: interviewToken,
            },
        });
    }

    async findByInterviewToken(interviewToken: string): Promise<any> {
        return await this.prisma.candidates.findUnique({
            where: {
                interview_token: interviewToken,
            },
            include: {
                jobs: true,
            },
        });
    }
}
