import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/company.dto';
import { CreateCompanyUseCase } from '@application/usecases/company/save-company.usecase';

@Injectable()
export class CompanyService {
    constructor(private readonly createCompanyUseCase: CreateCompanyUseCase) {}

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<void> {
        await this.createCompanyUseCase.execute(createCompanyDto);
    }
}
