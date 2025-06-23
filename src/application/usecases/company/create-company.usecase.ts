import { ICompanyRepository } from '@domain/interfaces/repositories/company.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCompanyUseCase {
    constructor(private readonly companyRepo: ICompanyRepository) {}
    async execute(company: any): Promise<void> {
        await this.companyRepo.create(company.name, company.website);
    }
}
