import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CreateCompanyUseCase } from '@application/usecases/company/create-company.usecase';
import { ICompanyRepository } from '@domain/interfaces/repositories/company.repository.interface';
import { CompanyRepository } from '@infrastructure/repositories/company.repository';
import { PrismaModule } from '@infrastructure/repositories/prisma.module';

@Module({
    imports: [PrismaModule.forRoot()],
    controllers: [CompanyController],
    providers: [
        CompanyService,
        CreateCompanyUseCase,
        {
            provide: ICompanyRepository,
            useClass: CompanyRepository,
        },
    ],
})
export class CompanyModule {}
