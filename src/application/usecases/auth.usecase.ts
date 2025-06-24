import { ITokenProvider } from '@domain/interfaces/providers/token.provider.interface';
import { IApplicationRepository } from '@domain/interfaces/repositories/application.repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomUseCase } from './create-room.usecase';

@Injectable()
export class AuthUseCase {
    constructor(
        private readonly applicationRepo: IApplicationRepository,
        private readonly tokenProvider: ITokenProvider,
        private readonly createRoomUseCase: CreateRoomUseCase,
    ) {}

    async execute(shortCode: string): Promise<string> {
        const application = await this.applicationRepo.findByShortCode(shortCode);
        if (!application) {
            throw new NotFoundException(`Application with short code ${shortCode} not found`);
        }

        const roomName = `room-${this.slugify(application.candidate.email)}-${this.slugify(application.job.title)}`;
        const roomMetadata = {
            jobTitle: application.job.title,
            jobDescription: application.job.description,
            candidateEmail: application.candidate.email,
            candidateFirstName: application.candidate.firstName,
            candidateLastName: application.candidate.lastName,
            candidateResume: application.candidate.resume,
        }
        await this.createRoomUseCase.execute(roomName, roomMetadata);

        return await this.tokenProvider.generate(
            application.candidate.email,
            application.candidate.firstName,
            roomName,
        );
    }

    private slugify(value: string): string {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}
