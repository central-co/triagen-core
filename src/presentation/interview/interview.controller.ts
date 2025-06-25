import { Body, Controller, Post } from '@nestjs/common';
import { InterviewService } from './interview.service';

@Controller('interview')
export class InterviewController {
    constructor(private readonly interviewService: InterviewService) {}

    @Post('start')
    async startInterview(
        @Body() startInterviewDto: any,
    ): Promise<{ token: string }> {
        return await this.interviewService.startInterview(startInterviewDto);
    }
}
