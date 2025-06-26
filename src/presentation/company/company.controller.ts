import { Body, Controller, Post } from '@nestjs/common';

import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/company.dto';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post('create')
    async createCompany(
        @Body() createCompanyDto: CreateCompanyDto,
    ): Promise<void> {
        await this.companyService.createCompany(createCompanyDto);
    }
}
