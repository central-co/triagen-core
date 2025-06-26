import { IsEmail, IsString } from 'class-validator';

export class CreateApplicationDto {
    @IsString()
        first_name: string;

    @IsString()
        last_name: string;

    @IsEmail()
        email: string;

    @IsString()
        resume: string;

    @IsString()
        job_id: string;
}
