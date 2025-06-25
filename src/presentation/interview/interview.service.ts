import { StartInterviewUseCase } from "@application/usecases/interview/start-interview.usecase";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InterviewService {
    constructor(
        private readonly startInterviewUseCase: StartInterviewUseCase,
    ) {}

    async startInterview(startInterviewDto: any): Promise<{ token: string }> {
        const token = await this.startInterviewUseCase.execute(startInterviewDto.shortCode);
        return {
            token: token,
        };
    }
}
