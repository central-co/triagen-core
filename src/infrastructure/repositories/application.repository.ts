import { IApplicationRepository } from "@domain/interfaces/repositories/application.repository.interface";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ApplicationRepository extends IApplicationRepository {
    constructor(
        @Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient,
    ) {
        super();
    }

    async save(shortCode: string, candidateId: string, jobId: string): Promise<any> {
        return await this.prisma.application.create({
            data: {
                shortCode: shortCode,
                candidateId: candidateId,
                jobId: jobId,
            }
        });
    }

    async findByShortCode(shortCode: string): Promise<any> {
        return await this.prisma.application.findUnique({
            where: {
                shortCode: shortCode,
            }
        });
    }
}
