import { Injectable } from '@nestjs/common';

import { ICompanyRepository } from '@domain/interfaces/repositories/company.repository';

@Injectable()
export class CreateCompanyUseCase {
    constructor(private readonly companyRepo: ICompanyRepository) {}
    async execute(company: any): Promise<void> {
        await this.companyRepo.save(company.name,
            company.website);
    }
}
