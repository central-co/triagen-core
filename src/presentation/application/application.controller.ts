import { Body, Controller, Post } from "@nestjs/common";
import { ApplicationService } from "./application.service";

@Controller('application')
export class ApplicationController {
    constructor(
        private readonly applicationService: ApplicationService,
    ) {}

    @Post('create')
    async createApplication(@Body() createApplicationDto: any): Promise<string> {
        return await this.applicationService.createApplication(createApplicationDto);
    }
}
