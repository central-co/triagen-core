import { Injectable, NotFoundException } from '@nestjs/common';

import { IRoomProvider } from '@domain/interfaces/providers/room.provider.interface';
import { ITokenProvider } from '@domain/interfaces/providers/token.provider.interface';
import { IApplicationRepository } from '@domain/interfaces/repositories/application.repository';

@Injectable()
export class StartInterviewUseCase {
    constructor(
        private readonly applicationRepo: IApplicationRepository,
        private readonly tokenProvider: ITokenProvider,
        private readonly roomProvider: IRoomProvider,
    ) {}

    async execute(interviewToken: string): Promise<string> {
        const application = await this.applicationRepo.findByInterviewToken(interviewToken);
        if (!application) {
            throw new NotFoundException(
                `Application with short code ${interviewToken} not found`,
            );
        }

        console.log('Application found:', application);

        const roomName = `room-${application.email.toLowerCase()}-${application.jobs.id}`;
        await this.roomProvider.createRoom(
            roomName,
            {
                jobTitle: application.jobs.title,
                jobDescription: application.jobs.description,
                candidateEmail: application.email,
                candidateName: application.name,
                candidateResume: application.resume_url,
            });
        console.log(await this.roomProvider.listRooms());

        const token = await this.tokenProvider.generate(
            application.email,
            application.name,
            roomName,
        );

        return token;
    }
}
