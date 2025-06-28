import { IsString } from "class-validator";

export class StartInterviewDto {
    @IsString()
    interview_code: string;
}
