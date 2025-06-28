import { Body, Controller, Post } from '@nestjs/common';

import { InterviewService } from './interview.service';
import { StartInterviewDto } from './dto/start-interview.dto';

@Controller('interview')
export class InterviewController {
    constructor(private readonly interviewService: InterviewService) {}

    @Post('start')
    async startInterview(@Body() startInterviewDto: StartInterviewDto): Promise<{ token: string }> {
        return await this.interviewService.startInterview(startInterviewDto);
    }
}
