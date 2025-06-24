import { Module } from '@nestjs/common';
import { AppController } from '@presentation/app.controller';
import { AppService } from '@presentation/app.service';
import { ConfigModule } from '@nestjs/config';
import { ITokenProvider } from '@domain/interfaces/providers/token.provider.interface';
import { JwtTokenProvider } from '@infrastructure/providers/jwt-token.provider';
import { AuthUseCase } from '@application/usecases/auth.usecase';
import { CompanyModule } from './company/company.module';
import { ApplicationModule } from './application/application.module';
import { IApplicationRepository } from '@domain/interfaces/repositories/application.repository.interface';
import { ApplicationRepository } from '@infrastructure/repositories/application.repository';
import { PrismaModule } from '@infrastructure/repositories/prisma.module';
import { CreateRoomUseCase } from '@application/usecases/create-room.usecase';
import { IRoomProvider } from '@domain/interfaces/providers/room.provider.interface';
import { LiveKitRoomProvider } from '@infrastructure/providers/livekit-room.provider';
import { LiveKitModule } from '@infrastructure/providers/livekit.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule.forRoot(),
        LiveKitModule.forRoot(),
        CompanyModule,
        ApplicationModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AuthUseCase,
        CreateRoomUseCase,
        {
            provide: ITokenProvider,
            useClass: JwtTokenProvider,
        },
        {
            provide: IRoomProvider,
            useClass: LiveKitRoomProvider,
        },
        {
            provide: IApplicationRepository,
            useClass: ApplicationRepository,
        }
    ],
})
export class AppModule {}
