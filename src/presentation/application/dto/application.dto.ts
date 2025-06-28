import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
    @IsString()
        name: string;

    @IsEmail()
        email: string;

    @IsString()
    @IsOptional()
        phone: string;

    @IsOptional()
    @IsString()
        resume: string;

    @IsString()
        job_id: string;
}
