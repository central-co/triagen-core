import { Injectable, NotFoundException } from '@nestjs/common';
import { IRoomProvider } from '@domain/interfaces/providers/room.provider.interface';
import { ITokenProvider } from '@domain/interfaces/providers/token.provider.interface';
import { IApplicationRepository } from '@domain/interfaces/repositories/application.repository.interface';

@Injectable()
export class StartInterviewUseCase {
    constructor(
        private readonly applicationRepo: IApplicationRepository,
        private readonly tokenProvider: ITokenProvider,
        private readonly roomProvider: IRoomProvider,
    ) {}

    async execute(shortCode: string): Promise<string> {
        const application =
            await this.applicationRepo.findByShortCode(shortCode);
        if (!application) {
            throw new NotFoundException(
                `Application with short code ${shortCode} not found`,
            );
        }

        const roomName = `room-${application.candidate.email.toLowerCase()}-${application.job.title.toLowerCase()}`;
        await this.roomProvider.createRoom(roomName, {
            jobTitle: application.job.title,
            jobDescription: application.job.description,
            candidateEmail: application.candidate.email,
            candidateFirstName: application.candidate.firstName,
            candidateLastName: application.candidate.lastName,
            candidateResume: application.candidate.resume,
        });
        console.log(await this.roomProvider.listRooms());

        const token = await this.tokenProvider.generate(
            application.candidate.email,
            application.candidate.firstName,
            roomName,
        );

        return token;
    }
}
