import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/application.dto';

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Post('create')
    async createApplication(
        @Body() createApplicationDto: CreateApplicationDto,
    ): Promise<string> {
        return await this.applicationService.createApplication(
            createApplicationDto,
        );
    }
}
