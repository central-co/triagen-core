import { Module } from '@nestjs/common';

import { StartInterviewUseCase } from '@application/usecases/interview/start-interview.usecase';
import { IRoomProvider } from '@domain/interfaces/providers/room.provider.interface';
import { ITokenProvider } from '@domain/interfaces/providers/token.provider.interface';
import { IApplicationRepository } from '@domain/interfaces/repositories/application.repository.interface';
import { JwtTokenProvider } from '@infrastructure/providers/jwt-token.provider';
import { LiveKitModule } from '@infrastructure/providers/livekit.module';
import { LiveKitRoomProvider } from '@infrastructure/providers/livekit-room.provider';
import { ApplicationRepository } from '@infrastructure/repositories/application.repository';
import { PrismaModule } from '@infrastructure/repositories/prisma.module';

import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';

@Module({
    imports: [PrismaModule.forRoot(), LiveKitModule.forRoot()],
    controllers: [InterviewController],
    providers: [
        InterviewService,
        StartInterviewUseCase,
        {
            provide: IApplicationRepository,
            useClass: ApplicationRepository,
        },
        {
            provide: ITokenProvider,
            useClass: JwtTokenProvider,
        },
        {
            provide: IRoomProvider,
            useClass: LiveKitRoomProvider,
        },
    ],
})
export class InterviewModule {}
