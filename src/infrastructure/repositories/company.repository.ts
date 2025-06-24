import { ICompanyRepository } from '@domain/interfaces/repositories/company.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CompanyRepository extends ICompanyRepository {
    constructor(
        @Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient,
    ) {
        super();
    }

    async save(name: string, website: string): Promise<void> {
        await this.prisma.company.create({
            data: {
                name: name,
                website: website,
            },
        });
    }
}
