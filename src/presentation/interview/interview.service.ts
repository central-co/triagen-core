import { Injectable } from '@nestjs/common';

import { StartInterviewUseCase } from '@application/usecases/interview/start-interview.usecase';
import { StartInterviewDto } from './dto/start-interview.dto';

@Injectable()
export class InterviewService {
    constructor(
        private readonly startInterviewUseCase: StartInterviewUseCase,
    ) {}

    async startInterview(startInterviewDto: StartInterviewDto): Promise<{ token: string }> {
        console.log('Starting interview with code:', startInterviewDto.interview_code);
        const token = await this.startInterviewUseCase.execute(
            startInterviewDto.interview_code,
        );
        return {
            token: token,
        };
    }
}
