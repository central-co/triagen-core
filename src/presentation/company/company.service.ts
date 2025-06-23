import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/company.dto';
import { CreateCompanyUseCase } from '@application/usecases/company/create-company.usecase';

@Injectable()
export class CompanyService {
    constructor(private readonly createCompanyUseCase: CreateCompanyUseCase) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<void> {
        await this.createCompanyUseCase.execute(createCompanyDto);
    }
}
