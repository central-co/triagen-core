import { Module } from "@nestjs/common";
import { InterviewController } from "./interview.controller";
import { InterviewService } from "./interview.service";
import { StartInterviewUseCase } from "@application/usecases/interview/start-interview.usecase";
import { ITokenProvider } from "@domain/interfaces/providers/token.provider.interface";
import { JwtTokenProvider } from "@infrastructure/providers/jwt-token.provider";
import { IRoomProvider } from "@domain/interfaces/providers/room.provider.interface";
import { LiveKitRoomProvider } from "@infrastructure/providers/livekit-room.provider";
import { IApplicationRepository } from "@domain/interfaces/repositories/application.repository.interface";
import { ApplicationRepository } from "@infrastructure/repositories/application.repository";
import { PrismaModule } from "@infrastructure/repositories/prisma.module";
import { LiveKitModule } from "@infrastructure/providers/livekit.module";

@Module({
    imports: [
        PrismaModule.forRoot(),
        LiveKitModule.forRoot(),
    ],
    controllers: [
        InterviewController
    ],
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
        }
    ],
})
export class InterviewModule {}
